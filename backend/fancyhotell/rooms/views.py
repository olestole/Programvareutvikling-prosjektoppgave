from rest_framework import viewsets, views, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import generics
from fancyhotell.rooms.models import Room, Booking
from fancyhotell.rooms.serializers import (
    RoomSerializer,
    RoomDetailSerializer,
    BookingSerializer,
    UserBookingSerializer,
)


class RoomViewset(viewsets.ModelViewSet):
    queryset = Room.objects.all()

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
            serializer = BookingSerializer(data=request.data)
        else:
            serializer = UserBookingSerializer(data=request.data)
        if serializer.is_valid():
            print(request)
            result = room.book(serializer.data, request.user)
            return Response(result)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
