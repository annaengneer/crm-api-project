from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Customer(Base):
    __tablename__ ="customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(String, nullable=False)

    deals = relationship("Deal", back_populates="customer")

class Deal(Base):
    __tablename__ = "deals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    amount = Column(Integer)
    status= Column(String)

    customer_id = Column(Integer, ForeignKey("customers.id"))

    customer = relationship("Customer", back_populates="deals") 

