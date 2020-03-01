from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from rest_framework import generics, permissions, status, views, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from fancyhotell.rooms.errors import RoomDoesNotExist, RoomNotAvailable
from fancyhotell.rooms.models import Booking, Room
from fancyhotell.rooms.permissions import BookingPermissions, RoomPermissions
from fancyhotell.rooms.serializers import (
    BookingCreateSerializer,
    BookingCreateSerializerWithCustomerData,
    BookingDetailSerializer,
    BookingSerializer,
    RoomDetailSerializer,
    RoomSerializer,
)
from fancyhotell.users.models import Address, Customer, User


class RoomViewset(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [RoomPermissions]

    def list(self, request):
        queryset = Room.get_available()
        serializer = RoomSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=pk)
        serializer = RoomDetailSerializer(room)
        return Response(serializer.data)


class BookingViewset(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [BookingPermissions]

    def get_queryset(self):
        if self.request.user.is_anonymous:
            return None

        return Booking.objects.all()

    def list(self, request):
        serializer = BookingSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Booking.objects.all()
        booking = get_object_or_404(queryset, pk=pk)
        serializer = BookingDetailSerializer(booking)
        return Response(serializer.data)

    def create(self, request):
        if request.user.is_anonymous:
            serializer = BookingCreateSerializerWithCustomerData(data=request.data)
        elif request.user.is_authenticated:
            serializer = BookingCreateSerializer(data=request.data)

        if serializer.is_valid():
            if not Room.objects.filter(pk=serializer.data["room_id"]):
                raise RoomDoesNotExist()

            room = Room.objects.get(pk=serializer.data["room_id"])

            booking_data = serializer.data

            # If the user is logged in, use the existing data
            if not request.user.is_anonymous and request.user.is_authenticated:
                customer = User.objects.get(pk=request.user.id).customer

            # If not, use the customer data to create a new customer object
            else:
                address = Address(**serializer.data["customer"]["address"])
                address.save()
                del serializer.data["customer"]["address"]
                customer = Customer(address=address, **serializer.data["customer"])
                customer.save()

                booking_data.pop("customer")

            from_date = parse_date(serializer.data["from_date"])
            to_date = parse_date(serializer.data["to_date"])
            if not room.is_available(from_date, to_date):
                raise RoomNotAvailable()

            booking = Booking(customer=customer, **booking_data)
            booking.save()

            serializer = BookingDetailSerializer(booking)

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
