from rest_framework import serializers
from django.db import transaction
from fancyhotell.rooms.models import Room, Booking, ImageModel, Amenity
from fancyhotell.users.serializers import CustomerDataSerializer
from django.utils import timezone


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = ["image"]


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["amenity"]

    def to_representation(self, instance):
        return instance.get_amenity_display()

    def to_internal_value(self, data):
        return {"amenity": data}


# For listing all amenities. We change to_representation in
# order to get the display value as well as the key for usage
# in filters.
class AmenityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["amenity"]

    def to_representation(self, instance):
        return {"key": instance.amenity, "value": instance.get_amenity_display()}


class RoomSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = Room
        fields = ["id", "room_number", "title", "price", "capacity", "images"]


class RoomDetailSerializer(RoomSerializer):
    unavailable_dates = serializers.SerializerMethodField()
    amenities = AmenitySerializer(many=True, required=False, default=[])

    def get_unavailable_dates(self, obj):
        bookings = (
            Booking.objects.filter(from_date__gte=timezone.now())
            .filter(room=obj.id)
            .order_by("from_date")
        )
        dates = []
        for booking in bookings:
            dates.append({"from": booking.from_date, "to": booking.to_date})

        return dates

    # Override create for amenities
    def create(self, validated_data):
        amenities = [
            amenity["amenity"] for amenity in validated_data.pop("amenities", [])
        ]

        with transaction.atomic():
            instance = super().create(validated_data)
            for amenity in amenities:
                Amenity.objects.get_or_create(pk=amenity)
            if amenities:
                instance.amenities.set(amenities)
                instance.save()

        return instance

    class Meta:
        model = Room
        fields = [
            "id",
            "room_number",
            "title",
            "description",
            "price",
            "capacity",
            "amenities",
            "unavailable_dates",
        ]


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
        fields = ["id", "from_date", "to_date", "room", "customer", "people"]


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


class AdminRoomDetailSerializer(serializers.ModelSerializer):
    number_of_future_bookings = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = [
            "id",
            "room_number",
            "title",
            "description",
            "price",
            "capacity",
            "amenities",
            "unavailable_dates",
            "number_of_future_bookings",
        ]

    def get_number_of_future_bookings(self, obj):
        return (
            Booking.objects.filter(room=obj.id)
            .filter(from_date__gt=timezone.now())
            .count()
        )

    def get_unavailable_dates(self, obj):
        bookings = (
            Booking.objects.filter(from_date__gte=timezone.now())
            .filter(room=obj.id)
            .order_by("from_date")
        )
        dates = []
        for booking in bookings:
            dates.append({"from": booking.from_date, "to": booking.to_date})

        return dates

    # Override create for amenities
    def create(self, validated_data):
        amenities = [
            amenity["amenity"] for amenity in validated_data.pop("amenities", [])
        ]

        with transaction.atomic():
            instance = super().create(validated_data)
            for amenity in amenities:
                Amenity.objects.get_or_create(pk=amenity)
            if amenities:
                instance.amenities.set(amenities)
                instance.save()

        return instance
