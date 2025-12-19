from django.contrib import admin
from .models import Account, Transaction

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('account_number', 'user_id', 'balance', 'currency', 'created_at')
    search_fields = ('account_number', 'user_id')
    list_filter = ('currency', 'created_at')

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'amount', 'transaction_type', 'created_at')
    list_filter = ('transaction_type', 'created_at')
    search_fields = ('account__account_number', 'description')
