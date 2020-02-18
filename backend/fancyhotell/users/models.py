from django.db import models
from django.contrib.auth.models import User


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
    address = models.ForeignKey(Address, null=False, on_delete=models.PROTECT)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class UserCustomer(User):
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)

    def save(self, *args, **kwargs):
        # Force the username to match the users email
        self.username = self.email
        super().save(*args, **kwargs)
