from django.contrib import admin
from fancyhotell.users.models import Customer, Address, User

# Register your models here.
admin.site.register(Customer)
admin.site.register(Address)
admin.site.register(User)
