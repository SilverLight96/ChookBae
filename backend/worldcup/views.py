from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
import datetime
import operator
from django.db import transaction
from django.shortcuts import render
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from .models import User, Point, Venue, Team, Match, Player, PlayerCard, Prediction, Bet, EmailCert

# Create your views here.

# 승부 예측 POST
 
class matchpredict(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['match_pk', 'point', 'predict'],
    properties={
        'match_pk': openapi.Schema(type=openapi.TYPE_NUMBER, description="경기 번호"),
        'point': openapi.Schema(type=openapi.TYPE_NUMBER, description="배팅 포인트"),
        'predict': openapi.Schema(type=openapi.TYPE_NUMBER, description="승부 예측"),
        })

    @transaction.atomic()
    def get_object(self, match_pk,point,predict):

        match=Match.objects.get(id=match_pk)
        user=User.objects.get(id=1)
        if(user.points<point):
            return ('보유하고 있는 포인트를 확인해 주세요.')
             
        try:
            pre=Prediction.objects.get(match_id=match_pk,user_id=1)
            return ('이미 예측을 완료한 경기입니다.')
           
        except Prediction.DoesNotExist:
            user.points-=point
            user.save()
            po=Point.objects.create(user_id=user,point=point,info='경기 결과 예측 배팅')
            pred=Prediction.objects.create(user_point=point,predict=predict,match_id=match,user_id=user)
           

        try:  
            match_num=Bet.objects.get(id=match_pk)
        except Bet.DoesNotExist:
            bet=Bet.objects.create(id=match, win=0, draw=0, lose=0)
            
        bet=Bet.objects.get(id=match_pk)
        
        if(predict==0):
            bet.win+=point
        elif(predict==1):
            bet.draw+=point
        else: 
            bet.lose+=point

        bet.save()
        
        return ('success')
            
    @swagger_auto_schema(operation_id="승부 예측", operation_description="승부 예측하기", request_body=param)
    def post(self, request, format=None):
        ingredient = self.get_object(request.data['match_pk'],request.data['point'],request.data['predict'])

        #print(request.META.get('HTTP_AUTHORIZATION'))
        print(ingredient)
        if (ingredient=='success'):
            return Response(ingredient,status=status.HTTP_200_OK)
        else :
            return Response(ingredient,status=status.HTTP_400_BAD_REQUEST)
        


class predictinfo(APIView):
    id = openapi.Parameter('id', openapi.IN_PATH, description='match_id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="유저의 승부 예측 여부를 조회", operation_description="제공 받은 토큰 값을 기준으로 유저를 파악하고 해당 유저가 승부 예측을 했는지 확인한다", manual_parameters=[id])
    def get(self, request, id):
        try:
            predict=Prediction.objects.get(match_id=id ,user_id=1)
            return Response({True}, status=status.HTTP_200_OK)
        except Prediction.DoesNotExist:
            return Response({False}, status=status.HTTP_200_OK)
        except Prediction.MultipleObjectsReturned:
            return Response({False}, status=status.HTTP_400_BAD_REQUEST)


# AUTO 정산            
@transaction.atomic()
def predictcalc():
    today=datetime.datetime.now().date()
    time=datetime.datetime.now().time()
    matches= Match.objects.filter(Q(start_date=today, start_time__lte=time) | Q(start_date=today-datetime.timedelta(days=1), start_time__gt=time))
    for match in matches:
        result=0
        dang=0

        bet=Bet.objects.get(id=match.id)
        total=bet.win+bet.draw+bet.lose
        if(match.team1_score>match.team2_score and bet.win!=0):
            result=0
            dang=total/bet.win
        elif(match.team1_score==match.team2_score and bet.draw!=0):
            result=1
            dang=total/bet.draw
        elif(match.team1_score<match.team2_score and bet.lose!=0):
            result=2
            dang=total/bet.lose

        predictinfo=Prediction.objects.filter(match_id=match.id,predict=result)

        for pre in predictinfo:
            user=User.objects.get(id=pre.user_id.id)
            user.points+=(dang*pre.user_point)
            user.save()
            po=Point.objects.create(user_id=user,point=dang*pre.user_point,info='경기 예측 성공')
        


# 경기 정보 조회 (국가별) GET
class MatchInfoByTeam(APIView):
    country = openapi.Parameter('id', openapi.IN_PATH, description='team id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="경기 정보 조회 (국가별)", operation_description="국가 고유번호로 경기 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        games = []
        homegame = Match.objects.filter(team1_id=id)
        awaygame = Match.objects.filter(team2_id=id)
        for hg in homegame:
            games.append(hg.id)
        for ag in awaygame:
            games.append(ag.id)
        
        match_list = []
        for g in sorted(games):
            match = Match.objects.get(id=g)
            curr_info = [match.id, match.start_date, match.start_time, match.venue_id.venue_name, match.venue_id.address,
                        match.team1_id.country, match.team1_id.logo, match.team1_id.group, match.team2_id.country, match.team2_id.logo]
            match_list.append(curr_info)
        
        return Response(match_list)


# 경기 정보 조회 (날짜별) GET
class MatchInfoByDate(APIView):
    date = openapi.Parameter('id', openapi.IN_PATH, description='date in YYYYMMDD', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="경기 정보 조회 (날짜별)", operation_description="날짜 입력으로 경기 조회 (날짜양식: YYYYMMDD)", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        id=str(id)
        match_date = datetime.datetime(int(id[:4]), int(id[4:6]), int(id[6:8]))   # 경기 시간을 datetime 포맷으로 변환
                
        match_list = []
        games = Match.objects.filter(start_date=str(match_date)[:10])
        for g in games:
            match = Match.objects.get(id=g.id)
            curr_info = [match.id, match.start_date, match.start_time, match.venue_id.venue_name, match.venue_id.address,
                        match.team1_id.country, match.team1_id.logo, match.team1_id.group, match.team2_id.country, match.team2_id.logo]
            match_list.append(curr_info)
        
        match_list = sorted(match_list, key=operator.itemgetter(2, 7))

        return Response(match_list)


# 경기 상세 정보 조회 GET
class MatchDetail(APIView):
    game = openapi.Parameter('id', openapi.IN_PATH, description='match id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="경기 상세 정보 조회", operation_description="경기 고유번호로 상세 정보 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        match = Match.objects.get(id=id)
        match_detail = [match.id, match.start_date, match.start_time, match.venue_id.venue_name, match.venue_id.address,
                        match.team1_id.id, match.team1_id.country, match.team1_id.logo, match.team1_id.group, match.team1_id.rank, match.team1_id.win, match.team1_id.draw, match.team1_id.loss,
                        match.team1_id.points, match.team1_id.last_five, match.team1_id.goal_diff, match.team1_id.manager, match.team1_id.round,
                        match.team2_id.id, match.team2_id.country, match.team2_id.logo, match.team2_id.group, match.team2_id.rank, match.team2_id.win, match.team2_id.draw, match.team2_id.loss,
                        match.team2_id.points, match.team2_id.last_five, match.team2_id.goal_diff, match.team2_id.manager, match.team2_id.round]
        
        return Response(match_detail)


# 팀 정보 조회 GET
class TeamInfo(APIView):
    team = openapi.Parameter('id', openapi.IN_PATH, description='team id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="팀 정보 조회", operation_description="팀 고유번호로 정보 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        team = Team.objects.get(id=id)
        team_info = [[team.manager, 0, 0]]

        players = Player.objects.filter(team_id=id)
        for p in players:
            team_info.append([p.fullname, p.position, p.number])
        
        return Response(team_info)