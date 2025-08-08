import os
from db import create_db_and_tables, engine
from sqlmodel import Session, select

from typing import Union, Annotated

from fastapi import FastAPI, Path, UploadFile, Body
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from models import Account, AccountCreate, AccountPublic, Asset, AssetListItems, AssetRename, Story

FILE_DIR = "./assets"


origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/assets", StaticFiles(directory="assets"), name="assets")


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def read_root():
    return {"Hello": "World"}


def hash_password(password: str) -> str:
    # Use something like passlib here
    return f"not really hashed {password} hehehe"


@app.get("/accounts/", response_model=list[AccountPublic])
def read_accounts():
    with Session(engine) as session:
        accounts = session.exec(select(Account)).all()
        return accounts


@app.post("/accounts/", response_model=AccountPublic)
def create_account(account: AccountCreate):
    hashed_password = hash_password(account.password)
    with Session(engine) as session:
        extra_data = {"hashed_password": hashed_password}
        db_account = Account.model_validate(account, update=extra_data)
        session.add(db_account)
        session.commit()
        session.refresh(db_account)
        return db_account


@app.post("/story", response_model=list[Story])
def read_stories():
    return


@app.post('/assets')
def upload_assets(file: UploadFile):
    # Save file to directory
    filepath_join = os.path.join(FILE_DIR, file.filename)

    with open(filepath_join, "wb") as f:
        f.write(file.file.read())

    with Session(engine) as session:
        asset = Asset(location=filepath_join)
        session.add(asset)
        session.commit()

        returnedObject = dict()
        returnedObject["id"] = asset.id
        returnedObject["assetName"] = file.filename
        return returnedObject
    return


@app.get('/assets')
def get_assets():
    with Session(engine) as session:
        assets = session.exec(select(Asset)).all()
        returnedAssets = []
        for asset in assets:
            returnedAsset = AssetListItems(id=asset.id, location=asset.location, assetName=asset.assetName)
            returnedAssets.append(returnedAsset)
        return returnedAssets

@app.put('/assets/{asset_id}')
async def update_asset(asset_id: int, assetName: Annotated[str, Body()]):
    with Session(engine) as session:
        statement = select(Asset).where(Asset.id == asset_id)
        asset = session.exec(statement).first()
        
        asset.assetName = assetName
        session.add(asset)
        session.commit()
        session.refresh(asset)

        return asset
    return


@app.get('/asset_image/{image_name}')
def get_asset_image(image_name: str):
    return FileResponse(f"assets/{image_name}")
