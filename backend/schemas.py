from pydantic import BaseModel

class CustomerCreate(BaseModel):
    name: str
    status: str

class CustomerUpdate(BaseModel):
    name:str
    status: str


class CustomerResponse(BaseModel):
    id: int
    name: str
    status: str

    class Config:
        from_attributes = True

class DealCreate(BaseModel):
    title: str
    amount: int
    status: str
    customer_id: int


class DealResponse(BaseModel):
    id: int
    title: str
    amount: int
    status: str
    customer_id: int

    class Config:
        from_attributes = True




