from typing import List
from ninja import Router
from ninja.errors import HttpError
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.http import HttpResponse
from .models import Account, Transaction
from .schemas import AccountCreateSchema, AccountSchema, TransferSchema, TransactionSchema
from .pdf_generator import generate_pdf_confirmation
import random
import string
import uuid
from celery import Celery

# Konfiguracja klienta do zlecania zadań
celery_app = Celery("fintech_producer", broker="redis://redis:6379/0")

router = Router()

@router.get("/transactions/{transaction_id}/pdf")
def get_transaction_pdf(request, transaction_id: uuid.UUID):
    """Generuje PDF z potwierdzeniem transakcji"""
    # W prawdziwym systemie: sprawdzić czy user jest właścicielem konta!
    tx = get_object_or_404(Transaction, id=transaction_id)
    
    pdf_content = generate_pdf_confirmation(tx)
    
    response = HttpResponse(pdf_content, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="confirmation_{tx.id}.pdf"'
    return response

@router.get("/test-worker")
def trigger_worker_task(request):
    """Zleca zadanie do Workera (Celery)"""
    celery_app.send_task("main.say_hello")
    return {"status": "Zadanie wysłane do kolejki Redisa!"}

@router.get("/transactions/{account_id}", response=List[TransactionSchema])
def list_transactions(request, account_id: uuid.UUID):
    """Pobiera historię transakcji dla danego konta"""
    return Transaction.objects.filter(account_id=account_id).order_by('-created_at')

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

@router.post("/init-demo/{user_id}", response=AccountSchema)
def init_demo_account(request, user_id: int):
    """
    Inicjalizuje konto demo dla nowego użytkownika z gotową historią transakcji.
    Oraz upewnia się, że istnieją konta 'systemowe' do testowania przelewów.
    """
    # 0. Upewnij się, że istnieją odbiorcy testowi (Landlord, Sklep)
    # Robimy to w trybie "get_or_create"
    if not Account.objects.filter(account_number="10000000000000000000000001").exists():
        Account.objects.create(
            user_id=99991, 
            currency="PLN", 
            account_number="10000000000000000000000001", 
            balance=50000.00
        )
    
    if not Account.objects.filter(account_number="20000000000000000000000002").exists():
        Account.objects.create(
            user_id=99992, 
            currency="PLN", 
            account_number="20000000000000000000000002", 
            balance=5000.00
        )

    # 1. Sprawdź czy user ma już konto
    if Account.objects.filter(user_id=user_id).exists():
        return Account.objects.filter(user_id=user_id).first()

    with transaction.atomic():
        account = Account.objects.create(
            user_id=user_id,
            currency="PLN",
            account_number=generate_account_number(),
            balance=10000.00
        )
        
        # Generujemy fejkowe transakcje
        Transaction.objects.create(account=account, amount=12000.00, transaction_type='DEPOSIT', description="Initial Seed Capital")
        Transaction.objects.create(account=account, amount=-2500.00, transaction_type='TRANSFER_OUT', description="Apartment Rent (Downtown)")
        Transaction.objects.create(account=account, amount=-400.00, transaction_type='TRANSFER_OUT', description="Grocery Shopping")
        Transaction.objects.create(account=account, amount=900.00, transaction_type='TRANSFER_IN', description="Freelance Gig Payment")
    
    return account
