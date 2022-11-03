from rest_framework import serializers
from .models import User,Match



class UserrankSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ( 'nickname', 'value', )


class matchidSerializer(serializers.ModelSerializer):
    class Meta:
        model= Match
        fields = ( 'id',)