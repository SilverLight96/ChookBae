from django.urls import path
from . import views
app_name = 'accounts'

urlpatterns = [
    #react와 연동
    path('', views.signup),
    # path('email/<str:email>/', views.check_email), #이메일 인증 및 중복 확인
    path('login/', views.login), #로그인
    path('logout/', views.logout), #로그아웃
    # path('check/', views.check), #로그인 확인
    path('mypage/', views.mypage), #마이페이지
    path('update/', views.update), #회원정보 수정')
    path('nickname/<str:nickname>/', views.check_nickname), #닉네임 중복 확인'
    path('activate/<slug:uid64>/<slug:token>/',views.activate, name='activate'),
]