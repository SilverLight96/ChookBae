from time import time
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from django.core.mail import EmailMessage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from .tokens import account_activation_token
from django.utils.encoding import force_bytes, force_text
from django.contrib import auth
from django.utils import timezone
from worldcup.translation import venue_k, team_k, player_k, player_pos

from worldcup.models import Player, PlayerCard
from worldcup.models import Prediction
from worldcup.models import Point
# from worldcup.models import User

from chookbae.settings import SECRET_KEY
from .serializers import (
    UserSerializer,
    AuthenticateSerializer,
    UserUpdateSerializer
)
from .models import User, profile_image_path
from django.core.mail import EmailMessage
import re
import string
import random
import jwt, datetime

def make_random_code():
    code_list = string.ascii_uppercase + '0123456789'
    code = ''

    for _ in range(10):
        code += random.choice(code_list)
    return code

# 회원가입
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    nickname = request.data.get('nickname')
    password = request.data.get('password')
    password_confirm = request.data.get('password_confirm')
    nickname_check = re.findall('[a-z]', nickname)
    nickname_check += re.findall('[A-Z]', nickname)
    email = request.data.get('email')

    User = get_user_model()

    if User.objects.filter(email=email):
        return Response({'error: 이메일 중복'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(nickname=nickname):
        return Response({'닉네임 중복'}, status=status.HTTP_400_BAD_REQUEST)

    # if len(nickname) < 2 or len(nickname) > 10 or not nickname_check or re.findall('[`~!@#$%^&*(),<.>/?]+', nickname):
    
    if len(nickname) < 2 or len(nickname) > 10 or re.findall('[`~!@#$%^&*(),<.>/?]+', nickname):
        return Response({'닉네임 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

    if password != password_confirm:
        return Response({'비밀번호가 일치하지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

    if len(password) < 8 or not re.findall('[a-z]', password) \
        or not re.findall('[0-9]+', password) or not re.findall('[`~!@#$%^&*(),<.>/?]+', password):
        return Response({'비밀번호 형식이 맞지 않습니다. 영어, 숫자, 특수기호가 들어가야합니다.'}, status.HTTP_400_BAD_REQUEST)

    serializers = UserSerializer(data=request.data)

    if serializers.is_valid(raise_exception=True):
        user = serializers.save()
        user.is_active = False
        user.set_password(request.data.get('password'))

        if not user.nickname:
            user.nickname = nickname

        user.save()
        current_site = get_current_site(request)
        message = render_to_string('user_activate_email.html',{
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)).encode().decode(),
                'token': account_activation_token.make_token(user),
            })
        mail_subject = "[CHOOKBAE] 회원가입 인증 메일입니다."
        user_email = user.email
        email = EmailMessage(mail_subject, message, to=[user_email])
        email.send()
        return Response(serializers.data, status=status.HTTP_201_CREATED)

#유저 닉네임 중복 체크 
@api_view(['GET'])
@permission_classes([AllowAny])
def check_nickname(request, nickname):
    User = get_user_model()

    if User.objects.filter(nickname=nickname):
        return Response({'ID 중복'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(status=status.HTTP_200_OK)


#이메일 인증 링크 클릭시 실행되는 함수
def activate(request, uid64, token):

    uid = force_text(urlsafe_base64_decode(uid64))
    user = User.objects.get(pk=uid)

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True #유저 권한 활성화
        user.save()
        # auth.login(request, user)
        # return Response(status=status.HTTP_200_OK)
        return redirect('https://k7a202.p.ssafy.io')
    else:
        return Response({'이메일 인증 오류'}, status=status.HTTP_400_BAD_REQUEST)

#  로그인
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    # 유저가 존재하는지 확인
    User = get_user_model()
    email = request.data.get('email')
    password = request.data.get('password')
    #로그인한 유저의 id를 받아온다
    if not User.objects.filter(email=email).exists():
        return Response({'아이디가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, email=email)
    if not user.check_password(password):
        return Response({'비밀번호가 틀렸습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if not user.is_active:
        return Response({'이메일 인증을 해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

    # 토큰 생성
    # today = datetime.date.today()
    today = datetime.date.today()
    #오늘이 최초 회원가입일 경우
    if user.login_count == 0:
        user.last_login = timezone.now()
        print("처음 회원가입 보상 1000포인트 지급")
        user.points += 1000
        
        #포인트 내역에 추가
        Point.objects.create(user_id=user,point=1000, info="처음 회원가입 보상",time=timezone.now())
        
        user.login_count += 1
        user.save(update_fields=['last_login','login_count', 'points'])
    #최근 로그인 날짜가 오늘이 아닐 경우
    elif user.last_login.date() != today:
        #로그인 횟수 1 증가
        user.login_count += 1
        #로그인 횟수를 저장
        user.last_login = timezone.now()
        print("출석체크 보상으로 500포인트 지급되었습니다.")
        
        #포인트 내역에 추가
        Point.objects.create(user_id=user,point=500, info="로그인 보상",time=timezone.now())
        user.points += 500

        user.save(update_fields=['last_login', 'login_count','points'])
    else:
        print("오늘은 이미 출석체크를 했습니다.")
        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])
    
    

    
    payload = {
      'id' : user.id, # 유저의 id
      'exp' : datetime.datetime.now() + datetime.timedelta(minutes=60), # 토큰 유효기간 60분
      'iat' : datetime.datetime.now() # 토큰 발행 시간
      }

    token = jwt.encode({'id': user.id}, SECRET_KEY, algorithm='HS256')
    # res = Response()
    # res.set_cookie(key='jwt',value=token,httponly=True)
    # res.data={
    #     'nickname': user.nickname,
    #     'jwt':token
    # }
    return Response({'token':token},status=status.HTTP_200_OK)

# 토큰을 이용해 로그아웃
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def logout(request):
#     res = Response()
#     res.delete_cookie('jwt')
#     res.data = {
#         'message': '로그아웃 되었습니다.'
#     }
#     return Response(res, status=status.HTTP_200_OK)


#회원정보수정
#update user's password
@api_view(['PATCH'])
def update(request):
    # User = get_user_model()
    # user = get_object_or_404(User, nickname=request.data['nickname'])
    #토큰 송신
    token_receive = request.META.get('HTTP_AUTHORIZATION')
    # token_receive = request.COOKIES.get('jwt')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['id'])
        #토큰 값의 유저 닉네임을 변경
        user.nickname = request.data['new_nickname']
        user.save()
        password = request.data.get('password')
        new_password = request.data.get('new_password')
        new_password_confirm = request.data.get('new_password_confirm')

 
        serializer = UserUpdateSerializer(user, data=request.data)

        if serializer.is_valid(raise_exception=True):
            me = serializer.save()

        if new_password:
            if password == new_password or new_password != new_password_confirm:
                return Response({'password mismatch'}, status.HTTP_400_BAD_REQUEST)

            if len(new_password) < 8 or len(new_password) > 20 or not re.findall('[a-z]', new_password) \
                or not re.findall('[0-9]+', new_password) or not re.findall('[`~!@#$%^&*(),<.>/?]+', new_password):
                return Response({'비밀번호 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

            me.set_password(new_password)
            me.save()
        return Response({'id': user.id, 'new_nickname': user.nickname, 'email': user.email,'password':user.password},status=status.HTTP_200_OK)
    except jwt.ExpiredSignatureError:
        return Response({'error': '토큰이 유효하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    


#마이페이지
@api_view(['GET'])
def mypage(request):
    # token_receive = request.COOKIES.get('jwt')
    token_receive = request.META.get('HTTP_AUTHORIZATION')
    print(token_receive)
    try:
        C_list=[]
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['id'])
        #유저가 소유한 카드 리스트
        card_list = PlayerCard.objects.filter(user_id=user.id)
        for i in card_list:
            card=Player.objects.get(id=i.player_id.id)
            player_name= player_k(i.player_id.id)
            C_list.append({'player_image' : card.player_image, 'fullname' : player_name, 'value' : card.value, })
        # card_list = Player.objects.filter().values('fullname','player_image','value')

        #유저의 예측 내역 조회
        predict_match = Prediction.objects.filter(user_id=user.id).values()

        #유저의 포인트 사용 내역 전부 가져오기 values()로 가져오면 딕셔너리 형태로 가져옴 튜플은 values_list()
        point_list = Point.objects.filter(user_id=user.id).values()
        
        return Response({'predict_match':predict_match,'nickname':user.nickname,'point':user.points \
        ,'card_list':C_list,'point_list':point_list},status=status.HTTP_200_OK)
    except jwt.ExpiredSignatureError:
        return Response({'error': '토큰이 유효하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    