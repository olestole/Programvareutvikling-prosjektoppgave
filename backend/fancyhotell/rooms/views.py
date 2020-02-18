from rest_framework import viewsets, views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import generics
from django.http import Http404
from fancyhotell.rooms.models import Room, Booking
from fancyhotell.rooms.serializers import RoomSerializer, RoomDetailSerializer


class RoomViewset(viewsets.ViewSet):
    queryset = Room.objects.all()

    def list(self, request):
        queryset = Room.objects.all()
        serializer = RoomSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=pk)
        serializer = RoomDetailSerializer(room)
        return Response(serializer.data)
