from django.contrib.auth.models import User
from fancyhotell.users.models import Customer, Address
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "is_staff"]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["street_name", "street_number", "city", "postal_code", "country"]


class CustomerDataSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Customer
        fields = ["email", "first_name", "last_name", "address"]
