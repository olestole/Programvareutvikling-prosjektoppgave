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
        fields = ["id", "room_number", "title", "description", "price", "capacity"]


class BookingCreateSerializer(serializers.ModelSerializer):
    room_id = serializers.IntegerField()

    class Meta:
        model = Booking
        fields = ["room_id", "from_date", "to_date", "comment", "people"]


class BookingCreateSerializerWithCustomerData(BookingCreateSerializer):
    customer = CustomerDataSerializer()

    class Meta:
        model = Booking
        fields = BookingCreateSerializer.Meta.fields + ["customer"]


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "from_date", "to_date", "room", "customer"]


class BookingDetailSerializer(serializers.ModelSerializer):
    room = RoomDetailSerializer()
    customer = CustomerDataSerializer()

    class Meta:
        model = Booking
        fields = [
            "id",
            "from_date",
            "to_date",
            "booking_reference",
            "comment",
            "people",
            "room",
            "customer",
        ]