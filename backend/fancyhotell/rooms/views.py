from rest_framework import viewsets, views, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
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
from fancyhotell.users.models import UserCustomer, Customer
from fancyhotell.rooms.errors import RoomNotAvailable


class RoomViewset(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def list(self, request):
        queryset = Room.get_available()
        serializer = RoomSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=pk)
        serializer = RoomDetailSerializer(room)
        return Response(serializer.data)

    @action(detail=True, methods=["POST"])
    def book(self, request, *args, **kwargs):
        room = self.get_object()
        if request.user.isAuthenticated():
            serializer = BookingCreateSerializer(data=request.data)
        else:
            serializer = BookingCreateSerializerWithCustomerData(data=request.data)

        if serializer.is_valid():
            print(request)
            # Id the user is logged in, use the existing data
            if request.user.isAuthenticated():
                customer = UserCustomer.objects.get(request.user.id)
            # If not, use the customer data to create a new customer object
            else:
                customer = Customer.objects.get_or_create(
                    **serializer.data["customer_data"]
                )

            from_date = serializer.data["from_date"]
            to_date = serializer.data["to_date"]
            if not room.is_available(from_date, to_date):
                raise RoomNotAvailable()

            booking = Booking.get_or_create(customer=customer, **serializer.data)

            serializer = BookingDetailSerializer(booking)

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingViewset(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def list(self, request):
        serializer = BookingSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, reference=None):
        queryset = Booking.objects.all()
        booking = get_object_or_404(queryset, booking_reference=reference)
        serializer = BookingDetailSerializer(booking)
        return Response(serializer.data)
