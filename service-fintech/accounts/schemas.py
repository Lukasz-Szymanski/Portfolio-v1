from ninja import Schema, Field
from decimal import Decimal
import uuid

class AccountCreateSchema(Schema):
    user_id: int
    currency: str = Field('PLN', min_length=3, max_length=3)

class AccountSchema(Schema):
    id: uuid.UUID
    user_id: int
    account_number: str
    balance: Decimal
    currency: str

class TransferSchema(Schema):
    sender_account_id: uuid.UUID
    receiver_account_number: str
    amount: Decimal = Field(..., gt=0.01, description="Kwota przelewu musi być dodatnia")
    description: str = "Przelew środków"
