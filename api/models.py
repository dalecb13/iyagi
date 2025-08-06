from typing import Dict, Any
from sqlmodel import Field, SQLModel
from sqlalchemy.types import JSON

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


# class AssetBase(SQLModel):
#     location: str

class Asset(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    location: str = Field(unique=True)

# class AssetCreate(AssetBase):
#     location: str

# class AssetPublic(AssetBase):
#     id: int
#     location: str
