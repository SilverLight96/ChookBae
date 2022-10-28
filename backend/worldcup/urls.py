from django.urls import path
from . import views

app_name = 'worldcup'

urlpatterns = [
    
    path('predict', views.matchpredict.as_view()),
    path('predict/<int:id>', views.predictinfo.as_view()),
    path('card', views.card.as_view()),
    
]