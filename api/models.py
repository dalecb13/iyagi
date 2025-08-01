from typing import Optional, Dict, Any
from sqlmodel import Field, SQLModel, create_engine
from sqlalchemy.dialects.postgresql import JSONB

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
    content: dict

class Story(StoryBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: Dict[str, Any] = Field(default_factory=dict, sa_column_kwargs={"type": JSONB})
