from rest_framework import serializers
from .models import Player,User



class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model= Player
        fields = ( 'player_image', 'fullname', 'value', )


class UserrankSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ( 'nickname', 'value', )

class goalrankSerializer(serializers.ModelSerializer):
    class Meta:
        model= Player
        fields = ( 'fullname', 'goal', 'value',)