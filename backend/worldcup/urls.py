from django.urls import path
from . import views

app_name = 'worldcup'

urlpatterns = [
    
    path('predict', views.matchpredict.as_view()),
    path('predict/<int:id>', views.predictinfo.as_view()),
    path('predict/list/<int:id>', views.predictlist.as_view()),
    path('predict/info/<int:id>', views.predicdetail.as_view()),
    path('card', views.card.as_view()),
    path('card/combine', views.combine.as_view()),
    path('card/team',views.teamlist.as_view()),
    path('rank', views.rank.as_view()),
    path('match/group', views.GroupInfo.as_view()),
    path('match/team/<int:id>', views.MatchInfoByTeam.as_view()),
    path('match/date/<int:id>', views.MatchInfoByDate.as_view()),
    path('match/detail/<int:id>', views.MatchDetail.as_view()),
    path('match/table/<str:id>', views.MatchTable.as_view()),
    path('match/teaminfo/<int:id>', views.TeamInfo.as_view()),
    path('player/ranking', views.PlayerRanking.as_view()),      # 선수 실제 랭킹
    path('player/info/<int:id>', views.PlayerInfo.as_view()),   # 선수 정보
]