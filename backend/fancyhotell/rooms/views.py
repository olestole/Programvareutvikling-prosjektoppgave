from rest_framework import viewsets, views, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from django.contrib.auth.models import User
from rest_framework import generics
from fancyhotell.rooms.models import Room, Booking
from fancyhotell.rooms.serializers import (
    RoomSerializer,
    RoomDetailSerializer,
    BookingCreateSerializer,
    BookingDetailSerializer,
    BookingSerializer,
    BookingCreateSerializerWithCustomerData,
)
from fancyhotell.rooms.permissions import RoomPermissions, BookingPermissions
from fancyhotell.users.models import UserCustomer, Customer, Address
from fancyhotell.rooms.errors import RoomNotAvailable, RoomDoesNotExist


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

    def retrieve(self, request, reference=None):
        queryset = Booking.objects.all()
        booking = get_object_or_404(queryset, booking_reference=reference)
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

            # If the user is logged in, use the existing data
            if not request.user.is_anonymous and request.user.is_authenticated:
                customer = UserCustomer.objects.get(pk=request.user.id).customer

            # If not, use the customer data to create a new customer object
            else:
                address = Address(**serializer.data["customer"]["address"])
                address.save()
                del serializer.data["customer"]["address"]
                customer = Customer(address=address, **serializer.data["customer"])
                customer.save()

            from_date = parse_date(serializer.data["from_date"])
            to_date = parse_date(serializer.data["to_date"])
            if not room.is_available(from_date, to_date):
                raise RoomNotAvailable()

            booking_data = serializer.data
            booking_data.pop("customer")
            booking = Booking(customer=customer, **booking_data)
            booking.save()

            serializer = BookingDetailSerializer(booking)

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
