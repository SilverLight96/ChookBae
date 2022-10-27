from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
import api_setting
import datetime
from django.db import transaction
from django.shortcuts import render
from django.db.models import Q
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
                raise Exception('보유하고 있는 포인트보다 많습니다.')
        try:   
            pre=Prediction.objects.get(match_id=match_pk,user_id=1)
            raise Exception('이미 예측하셨습니다.')
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
            
    @swagger_auto_schema(operation_id="승부 예측", operation_description="승부 예측하기", request_body=param)
    def post(self, request, format=None):
        ingredient = self.get_object(request.data['match_pk'],request.data['point'],request.data['predict'])
        #print(request.META.get('HTTP_ACCEPT'))
        return Response({200: '배팅 성공'})


class predictinfo(APIView):
    id = openapi.Parameter('id', openapi.IN_PATH, description='match_id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="유저의 승부 예측 여부를 조회", operation_description="제공 받은 토큰 값을 기준으로 유저를 파악하고 해당 유저가 승부 예측을 했는지 확인한다", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        try:
            predict=Prediction.objects.get(match_id=id ,user_id=1)
            return Response(True,"이미 예측을 하셨습니다.")
        except Prediction.DoesNotExist:
            return Response(False,"예측을 하지 않았습니다")
        except Prediction.MultipleObjectsReturned:
            return Response({False,'뭐하냐?'})


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
        

   
