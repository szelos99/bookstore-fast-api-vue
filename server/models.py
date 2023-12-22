from sqlalchemy import Column, Integer, String, Float

from database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    price = Column(Float, index=True)
    author = Column(String, index=True)


class User(Base):
    __tablename__ = "users"

    id = id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    hashed_password = Column(String, index=True)