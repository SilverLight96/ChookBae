
from rest_framework import serializers
from django.contrib.auth import get_user_model
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

def profile_image_path(instance, filename):
    return f'user/{instance.pk}/{filename}'

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
        fields = ('email',)


class UserUpdateSerializer(UserSerializer):
    nickname = serializers.CharField(min_length=2, max_length=10,required=False)
    password = serializers.CharField(min_length=8,write_only=True, required=False)
    new_nickname = nickname
    new_password = password
    new_password_confirm = password
    new_profile_image = ProcessedImageField(
        upload_to=profile_image_path,
        processors=[ResizeToFill(250, 250)],
        format='PNG',
        options={'quality': 100},
        null=True, 
        blank=True,
        default='user/default.png'
    )
    class Meta:
        model = get_user_model()
        fields = ('nickname','new_nickname', 'password', 'new_password', 'new_password_confirm', 'new_profile_image', )


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('profile_image',)