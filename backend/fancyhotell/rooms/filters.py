from django_filters import Filter, CharFilter
from django_filters.rest_framework.filterset import FilterSet
from django_filters.constants import EMPTY_VALUES

from fancyhotell.rooms.models import Room, Amenity


class AmenityFilter(Filter):
    def filter(self, qs, val):
        if val in EMPTY_VALUES:
            return qs

        values = val.split(",")

        for v in values:
            qs = qs.filter(amenities__in=[v])
        return qs


class RoomFilterSet(FilterSet):

    amenities = AmenityFilter()

    class Meta:
        model = Room
        fields = ["amenities"]
