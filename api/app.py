import os
from db import create_db_and_tables, engine
from sqlmodel import Session, select

from typing import Union, Annotated

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models import Account, AccountCreate, AccountPublic, Asset, Story

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
    return
