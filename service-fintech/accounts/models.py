from django.db import models
import uuid

class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.IntegerField(help_text="ID użytkownika z zewnętrznego systemu auth")
    account_number = models.CharField(max_length=26, unique=True)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=3, default='PLN')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.account_number} ({self.balance} {self.currency})"

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('DEPOSIT', 'Wpłata'),
        ('WITHDRAWAL', 'Wypłata'),
        ('TRANSFER', 'Przelew'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type}: {self.amount} for {self.account.account_number}"
