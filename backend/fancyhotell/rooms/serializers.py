from rest_framework import serializers
from fancyhotell.rooms.models import Room, Booking, ImageModel
from fancyhotell.users.serializers import CustomerDataSerializer


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = ["image"]


class RoomSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)

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


class BookingSerializer(serializers.Serializer):
    customer = CustomerDataSerializer()
    people = serializers.IntegerField()
    from_date = serializers.DateField()
    to_date = serializers.DateField()
    comment = serializers.CharField()


class UserBookingSerializer(serializers.Serializer):
    people = serializers.IntegerField()
    from_date = serializers.DateField()
    to_date = serializers.DateField()
    comment = serializers.CharField()
