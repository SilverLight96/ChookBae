from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    #react와 연동
    path('', views.signup),
    
]