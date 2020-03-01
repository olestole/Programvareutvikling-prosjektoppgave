from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class Address(models.Model):
    street_name = models.CharField(max_length=100, blank=False)
    street_number = models.IntegerField()
    city = models.CharField(max_length=100, blank=False)
    postal_code = models.CharField(max_length=10, blank=False)
    country = models.CharField(max_length=50, default="Norway")


class Customer(models.Model):
    email = models.EmailField(blank=False)
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    phone = models.CharField(max_length=20, null=True)
    address = models.ForeignKey(Address, null=False, on_delete=models.PROTECT)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class User(AbstractUser):
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, null=True)

    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
