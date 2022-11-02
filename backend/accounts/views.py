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
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login

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

    if not User.objects.filter(email=email).exists():
        return Response({'아이디가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, email=email)

    if not user.check_password(password):
        return Response({'비밀번호가 틀렸습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if not user.is_active:
        return Response({'이메일 인증을 해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

    # 토큰 생성

    payload = {
      'id' : user.id, # 유저의 id
      'exp' : datetime.datetime.now() + datetime.timedelta(minutes=60), # 토큰 유효기간 60분
      'iat' : datetime.datetime.now() # 토큰 발행 시간
      }

    token = jwt.encode({'id': user.id}, SECRET_KEY, algorithm='HS256')
    res = Response()
    res.set_cookie(key='jwt',value=token,httponly=True)
    res.data={
        'jwt':token
    }
    # print(res.data)
    # refresh = RefreshToken.for_user(user)
    # update_last_login(None, user)
    # return Response({refresh:refresh.access_token}, status=status.HTTP_200_OK)
    return res
#로그인 유지
# @api_view(['GET'])
# def check(request):
#     token_receive = request.COOKIES.get('jwt')
#     try:
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         user = User.objects.get(id=payload['id'])
#         return Response({'id': user.id, 'nickname': user.nickname, 'email': user.email})
#     except jwt.ExpiredSignatureError:
#         return Response({'error': '로그인 시간이 만료되었습니다.'}, status=status.HTTP_400_BAD_REQUEST)


# 토큰을 이용해 로그아웃
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    res = Response()
    res.delete_cookie('jwt')
    res.data = {
        'message': '로그아웃 되었습니다.'
    }
    return Response(res, status=status.HTTP_200_OK)


#회원정보수정
#update user's password
@api_view(['PATCH'])
def update(request):
    # User = get_user_model()
    # user = get_object_or_404(User, nickname=request.data['nickname'])
    
    token_receive = request.META.get('HTTP_AUTHORIZATION')
    print(token_receive)
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['id'])
        return Response({'id': user.id, 'nickname': user.nickname, 'email': user.email})
    except jwt.ExpiredSignatureError:
        return Response({'error': '토큰이 유효하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    # password = request.data.get('password')
    # new_password = request.data.get('new_password')
    # new_password_confirm = request.data.get('new_password_confirm')

    # # if request.user == user and user.check_password(password):
    # # if request.user == user:
    # serializer = UserUpdateSerializer(user, data=request.data)

    # if serializer.is_valid(raise_exception=True):
    #         me = serializer.save()

    # if new_password:
    #         if password == new_password or new_password != new_password_confirm:
    #             return Response({'password mismatch'}, status.HTTP_400_BAD_REQUEST)

    #         if len(new_password) < 8 or len(new_password) > 20 or not re.findall('[a-z]', new_password) \
    #             or not re.findall('[0-9]+', new_password) or not re.findall('[`~!@#$%^&*(),<.>/?]+', new_password):
    #             return Response({'비밀번호 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

    #         me.set_password(new_password)
    #         me.save()
    # return Response(serializer.data)


#마이페이지 정보: 나 자신의 정보를 담아서 react의 mypage로 정보를 보내줌
@api_view(['GET'])
def mypage(request):
    me = get_object_or_404(User, nickname=request.user.nickname)
    if request.user == me:
        return render(request,'k7a202.p.ssafy.io/mypage',{'me':me})


#worldcup app에서 현재 나의 보유 선수 조회
# @api_view(['GET'])
# def myplayer(request):
#     me = get_object_or_404(User, nickname=request.user.nickname)
#     if request.user == me:
#         myplayers = me.player.all()
#         serializer = PlayerSerializer(myplayers, many=True)
#         return Response(serializer.data)