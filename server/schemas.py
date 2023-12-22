from pydantic import BaseModel
from typing import Optional


class ItemBase(BaseModel):
    title: str
    author: str
    price: float


class ItemCreate(ItemBase):
    pass


class ItemUpdate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class UserLogin(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    username: Optional[str] = None
