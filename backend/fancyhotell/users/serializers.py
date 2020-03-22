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

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.email = validated_data.get("email", instance.email)
            instance.phone = validated_data.get("phone", instance.phone)
            instance.save()
            # Update address
            address_data = validated_data.get("address", None)
            if address_data is not None:
                address = instance.address
                address.street_name = address_data.get(
                    "street_name", instance.street_name
                )
                address.street_number = address_data.get(
                    "street_number", instance.street_number
                )
                address.city = address_data.get(
                    "city", instance.city
                )
                address.postal_code = address_data.get(
                    "postal_code", instance.postal_code
                )
                address.country = address_data.get(
                    "country", instance.country
                )
                # Update address fields as above city, postal_code, country
                # ...
                instance.save()
            customer_data = validated_data.get("customer", None)
            if customer_data is not None:
                customer = instance.customer
                # same as above for all fields..."id" "email", "first_name",
                # "last_name","phone","address", "password",
                customer.id = customer_data.get(
                    "id", instance.id
                )
                customer.email = customer_data.get(
                    "email", instance.email
                )
                customer.first_name = customer_data.get(
                    "first_name", instance.first_name
                )
                customer.last_name = customer_data.get(
                    "last_name", instance.last_name
                )
                customer.phone = customer_data.get(
                    "phone", instance.phone
                )
                customer.address = customer_data.get(
                    "address", instance.address
                )
                customer.password = customer_data.get(
                    "password", instance.password
                )
                customer.save()
        return instance
