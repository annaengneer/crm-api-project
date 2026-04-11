from fastapi import FastAPI, Depends,HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app= FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Hello FastAPI"}


@app.get("/customers", response_model=list[schemas.CustomerResponse])
def get_customers(db: Session = Depends(get_db)):
    customers = db.query(models.Customer).all()
    return customers

@app.post("/customers", response_model=schemas.CustomerResponse)
def create_customer(customer: schemas.CustomerCreate, db:Session=Depends(get_db)):
    new_customer=models.Customer(
        name=customer.name,
        status=customer.status
    )
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer


@app.get("/customers/{customer_id}", response_model=schemas.CustomerResponse)
def get_customer(customer_id:int, db: Session = Depends(get_db)):
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if customer is None:
       return {"message": "customer not found"}
    return customer

@app.delete("/customers/{customer_id}",response_model= schemas.CustomerResponse)
def delete_customer(customer_id:int, db: Session = Depends(get_db)):
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    db.delete(customer)
    db.commit()

    return customer


@app.patch("/customers/{customer_id}",response_model= schemas.CustomerResponse)
def update_customer(
    customer_id: int, 
    customer_data: schemas.CustomerUpdate, 
    db: Session = Depends(get_db)
    ):
    customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    customer.name = customer_data.name
    customer.status =customer_data.status

    db.commit()
    db.refresh(customer)

    return customer

