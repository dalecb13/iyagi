from sqlmodel import Field, SQLModel, create_engine

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


SQLModel.metadata.create_all(engine)
