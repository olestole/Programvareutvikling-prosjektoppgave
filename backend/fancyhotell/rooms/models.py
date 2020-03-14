from django.db import models
from fancyhotell.users.models import Customer
from django.utils import timezone
import uuid


class ImageModel(models.Model):
    image = models.ImageField(upload_to="images/")


class Room(models.Model):
    room_number = models.IntegerField(default=0, unique=True, null=False)
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    price = models.DecimalField(default=0.00, decimal_places=2, max_digits=20)
    images = models.ManyToManyField(
        ImageModel, related_name="room", null=True, blank=True
    )
    capacity = models.IntegerField()

    @classmethod
    def get_available(
        self,
        from_date=timezone.now(),
        to_date=timezone.now() + timezone.timedelta(days=30),
    ):
        booked_rooms = (
            Booking.objects.filter(from_date__lt=to_date)
            .filter(to_date__gt=from_date)
            .values("room")
        )
        return Room.objects.exclude(id__in=booked_rooms)

    def is_available(self, from_date, to_date):
        """
        Check whether the room is available in a specified time period.
        """
        return (
            # If there exists a booking on the room that either starts on a day
            # less than the selected from date, or ends on a day grater than the
            # selected start date, the room is not available
            not Booking.objects.filter(room=self.pk)
            .exclude(from_date__gte=to_date)
            .exclude(to_date__lte=from_date)
            .exists()
        )


class Booking(models.Model):
    from_date = models.DateField(null=False)
    to_date = models.DateField(null=False)
    room = models.ForeignKey(
        Room, related_name="booking", null=False, on_delete=models.PROTECT
    )
    booking_reference = models.UUIDField(default=uuid.uuid4)
    comment = models.TextField(blank=True)
    customer = models.ForeignKey(
        Customer, related_name="booking", null=False, on_delete=models.PROTECT
    )
    people = models.IntegerField(null=False, blank=True)
