from rest_framework import permissions


class BookingPermissionClass(permissions.BasePermission):
    """
    Class that only allows admin to list.
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True


class RoomPermissions(permissions.BasePermission):
    """
    Permissionclass for rooms
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff
