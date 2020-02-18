from rest_framework.exceptions import APIException


class RoomNotAvailable(APIException):
    status_code = 400
    default_detail = "Room not available at selected dates"
    default_code = "bad_request"
