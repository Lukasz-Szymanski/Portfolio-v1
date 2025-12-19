from typing import List
from ninja import Router
from django.shortcuts import get_object_or_404
from .models import Account
from .schemas import AccountCreateSchema, AccountSchema
import random
import string

router = Router()

def generate_account_number():
    """Generuje losowy 26-cyfrowy numer konta (symulacja IBAN)"""
    return ''.join(random.choices(string.digits, k=26))

@router.post("/", response=AccountSchema)
def create_account(request, payload: AccountCreateSchema):
    """
    Tworzy nowe konto dla użytkownika.
    Generuje unikalny numer konta.
    """
    # Sprawdzamy czy user już ma konto w tej walucie (opcjonalne, ale dobra praktyka)
    if Account.objects.filter(user_id=payload.user_id, currency=payload.currency).exists():
        return Account.objects.get(user_id=payload.user_id, currency=payload.currency)

    account = Account.objects.create(
        user_id=payload.user_id,
        currency=payload.currency,
        account_number=generate_account_number(),
        balance=0.00
    )
    return account

@router.get("/{user_id}", response=List[AccountSchema])
def list_accounts(request, user_id: int):
    """Pobiera wszystkie konta danego użytkownika"""
    return Account.objects.filter(user_id=user_id)

@router.get("/details/{account_number}", response=AccountSchema)
def get_account_balance(request, account_number: str):
    """Pobiera szczegóły konta po jego numerze"""
    account = get_object_or_404(Account, account_number=account_number)
    return account
