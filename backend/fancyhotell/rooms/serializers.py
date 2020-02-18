from fancyhotell.rooms.models import Room, Booking, ImageModel
from rest_framework import serializers


class ImagesSeriazer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel


class RoomSerializer(serializers.ModelSerializer):
    images = ImagesSeriazer

    class Meta:
        model = Room
        fields = ["id", "room_number", "title", "price", "capacity", "images"]


class RoomDetailSerializer(RoomSerializer):
    class Meta:
        model = Room
        fields = [
            "id",
            "room_number",
            "title",
            "description",
            "price",
            "capacity",
            "images",
        ]
