from rest_framework import serializers
from .models import Player



class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model= Player
        fields = ( 'player_image', 'fullname', 'value', )


            