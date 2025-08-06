from db import create_db_and_tables, engine
from sqlmodel import Session, select

from typing import Union, Annotated

from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from models import Account, AccountCreate, AccountPublic, AssetCreate, Story

app = FastAPI()


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
def upload_assets(file: Annotated[bytes, File()]):
    # Save file to database
    with Session(engine) as session:
        asset = AssetCreate(file=file)
        session.add(asset)
        session.commit()
    return


@app.get('/assets')
def get_assets(file: UploadFile):
    return
