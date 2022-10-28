from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    #react와 연동
    path('', views.signup),
    path('email/<str:email>/', views.check_email), #이메일 인증 및 중복 확인
    path('login/', views.login), #로그인
    # path('delete/', views.delete), #회원탈퇴
    path('nickname/<str:nickname>/', views.check_nickname), #닉네임 중복 확인'
]