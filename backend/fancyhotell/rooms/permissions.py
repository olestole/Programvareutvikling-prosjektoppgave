from rest_framework import permissions


class BookingPermissions(permissions.BasePermission):
    """
    Class that only allows admin to list.
    """

    def has_permission(self, request, view):
        if request.method == "GET":
            return request.user.is_authenticated
        if request.method == "POST":
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        if request.method in ["POST", "PUT", "UPDATE"]:
            return True
        if request.method == "GET":
            return (
                request.user.is_authenticated
                and obj.customer.email == request.user.email
            )
        return False


class RoomPermissions(permissions.BasePermission):
    """
    Permissionclass for rooms
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff
