from django.urls import path
from . import views

app_name = 'worldcup'

urlpatterns = [
    
    path('predict', views.matchpredict.as_view()),
    path('predict/<int:id>', views.predictinfo.as_view()),
    path('v1/match/team/<int:id>/', views.MatchInfoByTeam.as_view()),
    path('v1/match/date/<int:id>/', views.MatchInfoByDate.as_view()),
    path('v1/match/detail/<int:id>/', views.MatchDetail.as_view()),
    path('v1/match/teaminfo/<int:id>/', views.TeamInfo.as_view()),
]