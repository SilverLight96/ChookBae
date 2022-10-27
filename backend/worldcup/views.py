from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
from django.shortcuts import render
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

    def get_object(self, match_pk,point,predict):

            match=Match.objects.get(id=match_pk)
            user=User.objects.get(id=1)
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
            
            predict=Prediction.objects.create(user_point=point,predict=predict,match_id=match,user_id=user)

       

    @swagger_auto_schema(operation_id="승부 예측", operation_description="승부 예측하기", request_body=param)
    def post(self, request, format=None):
        ingredient = self.get_object(request.data['match_pk'],request.data['point'],request.data['predict'])
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
