
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(min_length=2, max_length=10)
    password = serializers.CharField(min_length=8, write_only=True)
    password_confirm = password
    email = serializers.EmailField(min_length=15, max_length=50)

    class Meta:
        model = get_user_model()
        fields = ('id', 'nickname', 'password', 'password_confirm', 'email', 'profile_image', )
        read_only_fields = ('id', )


class AuthenticateSerializer(UserSerializer):

    class Meta:
        model = get_user_model()
        fields = ('email', 'password',)


class UserUpdateSerializer(UserSerializer):
    nickname = serializers.CharField(min_length=2, max_length=10,required=False)
    password = serializers.CharField(min_length=8,write_only=True, required=False)
    new_nickname = nickname
    new_password = password
    new_password_confirm = password

    class Meta:
        model = get_user_model()
        fields = ('nickname','new_nickname', 'password', 'new_password', 'new_password_confirm', 'profile_image', )