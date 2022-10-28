from django.urls import path
from . import views

app_name = 'worldcup'

urlpatterns = [
    
    path('predict', views.matchpredict.as_view()),
]
