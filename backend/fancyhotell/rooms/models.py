from django.db import models
from fancyhotell.users.models import Customer
from django.utils import timezone


class ImageModel(models.Model):
    image = models.ImageField()


class Room(models.Model):
    room_number = models.IntegerField(default=0, unique=True, null=False)
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    price = models.DecimalField(default=0.00, decimal_places=2, max_digits=20)
    images = models.ManyToManyField(
        ImageModel, related_name="room", null=True, blank=True
    )
    capacity = models.IntegerField()

    def get_available(
        self,
        from_date=timezone.now(),
        to_date=timezone.now() + timezone.timedelta(days=30),
    ):
        booked_rooms = (
            Booking.objects.exclude(from_date__lte=to_date).exclude(
                to_date__gte=from_date
            )
        ).values("room")
        return Room.objects.exclude(id__in=booked_rooms)

    def book(self, booking, user):
        # TODO
        pass


class Booking(models.Model):
    from_date = models.DateField(null=False)
    to_date = models.DateField(null=False)
    room = models.ForeignKey(
        Room, related_name="booking", null=False, on_delete=models.PROTECT
    )
    booking_reference = models.UUIDField()
    comment = models.TextField(blank=True)
    customer = models.ForeignKey(
        Customer, related_name="booking", null=False, on_delete=models.PROTECT
    )
