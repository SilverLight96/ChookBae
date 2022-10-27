from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from chookbae.settings import SECRET_KEY
from .serializers import (
    UserSerializer,
    AuthenticateSerializer,
    UserUpdateSerializer
)
from .models import User
from django.core.mail import EmailMessage
import re
import string
import random
import jwt

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

    if len(nickname) < 2 or len(nickname) > 10 or not nickname_check or re.findall('[`~!@#$%^&*(),<.>/?]+', nickname):
        return Response({'error: 아이디 형식이 맞지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

    if password != password_confirm:
        return Response({'error: 비밀번호가 일치하지 않습니다.'}, status.HTTP_400_BAD_REQUEST)

    if len(password) < 8 or not re.findall('[a-z]', password) \
        or not re.findall('[0-9]+', password) or not re.findall('[`~!@#$%^&*(),<.>/?]+', password):
        return Response({'error: 비밀번호 형식이 맞지 않습니다. 영어, 숫자, 특수기호가 들어가야합니다.'}, status.HTTP_400_BAD_REQUEST)

    serializers = UserSerializer(data=request.data)

    if serializers.is_valid(raise_exception=True):
        user = serializers.save()
        user.is_active = False
        user.set_password(request.data.get('password'))

        if not user.nickname:
            user.nickname = nickname

        user.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)

#유저 닉네임 중복 체크
@api_view(['GET'])
@permission_classes([AllowAny])
def check_nickname(request, nickname):
    User = get_user_model()

    if User.objects.filter(nickname=nickname):
        return Response({'error: ID 중복'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response(status=status.HTTP_200_OK)


#유저 이메일 중복체크
@api_view(['GET'])
@permission_classes([AllowAny])
def check_email(request, email):
    User = get_user_model()

    if User.objects.filter(email=email):
        return Response({'error: 이메일 중복'}, status=status.HTTP_400_BAD_REQUEST)

    #이메일 인증
    else:
        code = make_random_code()
        message = f'아래의 인증번호를 사용하여 이메일 주소 인증을 완료하면 다음 단계로 진행이 가능합니다.\n\n인증번호 : {code}\n\n감사합니다.'
        mail_title = '회원가입을 위한 인증번호 발송 메일입니다.'
        mail_to = email
        email = EmailMessage(mail_title, message, to=[mail_to])
        email.send()
        return Response({'code': code})

#  로그인
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    # 유저가 존재하는지 확인
    User = get_user_model()
    email = request.data.get('email')
    password = request.data.get('password')

    if not User.objects.filter(email=email).exists():
        return Response({'error: 아이디가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, email=email)

    if not user.check_password(password):
        return Response({'error: 비밀번호가 틀렸습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if not user.is_active:
        return Response({'error: 이메일 인증을 해주세요.'}, status=status.HTTP_400_BAD_REQUEST)

    # 토큰 생성
    token = jwt.encode({'id': user.id}, SECRET_KEY, algorithm='HS256')
    return Response({token:'token'},status=status.HTTP_200_OK)

# jwt.decode로 토큰을 받아서 회원탈퇴
# @api_view(['PATCH'])
# def delete(request):
    
#     # User = get_user_model()
#     # user = get_object_or_404(User, email=request.data['email'])

#     # if request.user == user and user.check_password(request.data['password']):
#     #     user.delete()
#     #     return Response(status=status.HTTP_204_NO_CONTENT)
#     # return Response({'error: 본인 인증 실패'},status=status.HTTP_401_UNAUTHORIZED)

    