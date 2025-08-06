from typing import Dict, Any
from sqlmodel import Field, SQLModel
from sqlalchemy import Column
from sqlalchemy.types import JSON
from sqlalchemy.ext.mutable import MutableDict

class AccontBase(SQLModel):
    email: str = Field(default=None, unique=True, index=True)


class Account(AccontBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str = Field()


class AccountCreate(AccontBase):
    email: str
    password: str


class AccountPublic(AccontBase):
    id: int


class AccountUpdate(SQLModel):
    password: str | None = None


# Story

class StoryBase(SQLModel):
    title: str

class Story(StoryBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: Dict[str, Any] = Field(sa_type=JSON)


# Asset


class AssetBase(SQLModel):
    assetName: str

class Asset(AssetBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    # Create a column for storing files as blob
    file: bytes = Field()


class AssetCreate(AssetBase):
    assetName: str
    file: bytes = Field()


class AssetPublic(AssetBase):
    id: int
    file: bytes = Field()
    assetName: str


class AssetUpdate(SQLModel):
    file: bytes | None = None

