from rest_framework.exceptions import APIException


class RoomNotAvailable(APIException):
    status_code = 400
    default_detail = "Room not available at selected dates"
    default_code = "bad_request"


class RoomDoesNotExist(APIException):
    status_code = 400
    default_detail = "The selected room does not exist"
    default_code = "bad_request"


class RoomDoesNotHaveCapacity(APIException):
    status_code = 400
    default_detail = "The selected room does not have enough capacity"
    default_code = "bad_request"
