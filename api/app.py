from db import create_db_and_tables, engine, SQLModel
from sqlmodel import Session, select

from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from models import Account, AccountCreate, AccountPublic

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
