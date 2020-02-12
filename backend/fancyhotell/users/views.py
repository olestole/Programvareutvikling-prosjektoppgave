from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import serializers, viewsets
from fancyhotell.users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
