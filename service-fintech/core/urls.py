from django.contrib import admin
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from ninja import NinjaAPI
from accounts.api import router as accounts_router

api = NinjaAPI(title="Fintech Simulator API")

api.add_router("/accounts", accounts_router)

@api.get("/hello")
def hello(request):
    return {"message": "Hello from Fintech Service (Django Ninja)!"}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls),
]

urlpatterns += staticfiles_urlpatterns()
