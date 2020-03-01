from django.shortcuts import get_object_or_404
from fancyhotell.users.serializers import UserCreateSerializer, UserReadSerializer
from fancyhotell.users.models import User
from fancyhotell.users.permissions import UserPermissions
from rest_framework import viewsets, status
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [UserPermissions]

    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        else:
            return User.objects.filter(email=self.request.user.email)

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return UserReadSerializer
        elif self.action == "create" or self.request.method == "POST":
            return UserCreateSerializer
        return UserReadSerializer

    def list(self, request):
        serializer = UserReadSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = get_object_or_404(self.get_queryset(), pk=pk)
        self.check_object_permissions(request, user)
        serializer = UserReadSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        serializer = UserCreateSerializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            return Response("OK")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
