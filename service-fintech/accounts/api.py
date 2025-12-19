from typing import List
from ninja import Router
from ninja.errors import HttpError
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Account, Transaction
from .schemas import AccountCreateSchema, AccountSchema, TransferSchema
import random
import string

from celery import Celery

# Konfiguracja klienta do zlecania zadań
celery_app = Celery("fintech_producer", broker="redis://redis:6379/0")

router = Router()

@router.get("/test-worker")
def trigger_worker_task(request):
    """Zleca zadanie do Workera (Celery)"""
    celery_app.send_task("main.say_hello")
    return {"status": "Zadanie wysłane do kolejki Redisa!"}

def generate_account_number():
    """Generuje losowy 26-cyfrowy numer konta (symulacja IBAN)"""
    return ''.join(random.choices(string.digits, k=26))

@router.post("/transfer", response={200: dict, 400: dict, 404: dict})
def make_transfer(request, payload: TransferSchema):
    """
    Wykonuje bezpieczny przelew środków między kontami (ACID).
    """
    # 1. Pobieramy konta (poza transakcją, żeby szybko odrzucić błędy)
    sender = get_object_or_404(Account, id=payload.sender_account_id)
    
    try:
        receiver = Account.objects.get(account_number=payload.receiver_account_number)
    except Account.DoesNotExist:
        return 404, {"message": "Konto odbiorcy nie istnieje"}

    if sender.currency != receiver.currency:
        return 400, {"message": "Przelewy międzywalutowe nie są jeszcze obsługiwane"}

    # 2. Blok atomowy - wszystko albo nic
    with transaction.atomic():
        # Blokujemy rekord nadawcy do zapisu (select_for_update), aby uniknąć Race Condition
        # (gdyby użytkownik kliknął przelew 2 razy w milisekundę)
        sender = Account.objects.select_for_update().get(id=sender.id)
        
        if sender.balance < payload.amount:
            return 400, {"message": "Niewystarczające środki na koncie"}

        # Wykonujemy operacje
        sender.balance -= payload.amount
        sender.save()

        receiver.balance += payload.amount
        receiver.save()

        # Tworzymy historię dla nadawcy
        Transaction.objects.create(
            account=sender,
            amount=-payload.amount,
            transaction_type='TRANSFER_OUT',
            description=f"Do: {receiver.account_number} | {payload.description}"
        )

        # Tworzymy historię dla odbiorcy
        Transaction.objects.create(
            account=receiver,
            amount=payload.amount,
            transaction_type='TRANSFER_IN',
            description=f"Od: {sender.account_number} | {payload.description}"
        )

    return 200, {"message": "Przelew wykonany pomyślnie", "new_balance": sender.balance}

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
