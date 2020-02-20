from django.contrib import admin
from fancyhotell.rooms.models import Room, Booking, ImageModel

admin.site.register(Room)
admin.site.register(Booking)
admin.site.register(ImageModel)
