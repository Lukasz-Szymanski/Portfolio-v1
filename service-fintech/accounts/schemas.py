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
