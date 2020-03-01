from fancyhotell.users.models import Customer, Address, User
from rest_framework import serializers


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["street_name", "street_number", "city", "postal_code", "country"]


class CustomerDataSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Customer
        fields = ["email", "first_name", "last_name", "phone", "address"]

class UserReadSerializer(serializers.ModelSerializer):
    customer = CustomerDataSerializer()

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "customer"]


class UserCreateSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    phone = serializers.CharField()

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "phone", "address", "password"]
        extra_kwargs = {'password': {'write_only': True}, 'phone': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        user = User.objects.create_user(email, password)
        address = Address(**validated_data["address"])
        address.save()
        customer = Customer(address=address, first_name=validated_data["first_name"],
            last_name=validated_data["last_name"], email=validated_data["email"],
            phone=validated_data["phone"])
        customer.save()