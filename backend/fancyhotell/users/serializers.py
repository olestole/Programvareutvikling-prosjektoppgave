from fancyhotell.users.models import Customer, Address, User
from rest_framework import serializers
from django.db import transaction


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
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone",
            "address",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        email = validated_data.pop("email")
        phone = validated_data.pop("phone")
        user = User.objects.create_user(email, password)
        address = Address(**validated_data["address"])
        address.save()
        customer = Customer(
            address=address,
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=email,
            phone=phone,
        )
        customer.save()
        user.customer = customer
        user.save()
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False)
    customer = CustomerDataSerializer(required=False)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "address",
            "password",
            "customer",
        ]
        extra_kwargs = {"password": {"write_only": True, "required": False}}

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.save()
        customer = instance.customer
        customer.email = instance.email
        customer.save()
        customer_data = validated_data.get("customer", None)
        if customer_data is not None:
            customer.first_name = customer_data.get("first_name", customer.first_name)
            customer.last_name = customer_data.get("last_name", customer.last_name)
            customer.phone = customer_data.get("phone", customer.phone)
            customer.save()

            address_data = customer_data.get("address", None)
            if address_data is not None:
                address = customer.address
                address.street_name = address_data.get(
                    "street_name", address.street_name
                )
                address.street_number = address_data.get(
                    "street_number", address.street_number
                )
                address.city = address_data.get("city", address.city)
                address.postal_code = address_data.get(
                    "postal_code", address.postal_code
                )
                address.country = address_data.get("country", address.country)
                address.save()
        return instance
