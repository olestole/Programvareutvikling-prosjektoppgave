import pytest
from django.utils.timezone import timedelta, now
from fancyhotell.rooms.models import Booking


def get_time_string(**kwargs):
    time = now()
    if kwargs.values:
        time = time + timedelta(**kwargs)

    return time.strftime("%Y-%m-%d")


@pytest.mark.django_db
@pytest.mark.parametrize(
    "url,response_code",
    [
        ("/rooms/", 200),
        ("/rooms/1/", 200),
        ("/users/", 401),
        ("/bookings/", 401),
        ("/admin/rooms/", 401),
    ],
)
def test_public_api_routes_status_code(api_client, url, response_code):
    """
    Test the route permissions. A client should be able to access public routes,
    and be denied admin routes.
    """
    response = api_client.get("/api" + url)
    assert response.status_code == response_code


@pytest.mark.django_db
@pytest.mark.parametrize(
    "opts, rooms",
    [
        ("?amenities=TV", [1, 2, 4]),
        ("?amenities=TV,WIFI", [1, 2, 4]),
        ("?amenities=TV,ELEVATOR", [1, 4]),
        ("?amenities=SAFE,INTERNET,BATH", [3, 4]),
        (
            f"?from_date={get_time_string()}&to_date={get_time_string(days=3)}",
            [1, 2, 3, 4],
        ),
        (
            f"?from_date={get_time_string()}&people=3&to_date={get_time_string(days=3)}",
            [1, 2],
        ),
        ("?people=1", [1, 2, 3, 4]),
        ("?people=2", [1, 2, 3]),
        ("?people=3", [1, 2]),
        ("?people=4", [2]),
        ("?people=4&amenities=TV", [2]),
        ("?people=2&amenities=WIFI,TV", [1, 2]),
    ],
)
def test_room_list(api_client, opts, rooms):
    client = api_client
    resp = client.get("/api/rooms/" + opts)
    data = resp.json()
    assert [item["id"] for item in data] == rooms


@pytest.mark.django_db
@pytest.mark.parametrize(
    "data, response_code",
    [
        (
            {
                "email": "test@test.com",
                "password": "password",
                "first_name": "Ola",
                "last_name": "nordmann",
                "phone": 123456789,
                "address": {
                    "street_name": "Road",
                    "street_number": 1,
                    "postal_code": "1234",
                    "city": "Oslo",
                    "country": "Norway",
                },
            },
            200,
        ),
        ({"email": "test@test.com", "password": "password"}, 400),
        (
            {
                "email": "test@test.com",
                "password": "password",
                "first_name": "Ola",
                "last_name": "nordmann",
                "address": {
                    "street_name": "Road",
                    "street_number": 1,
                    "postal_code": "1234",
                    "city": "Oslo",
                    "country": "Norway",
                },
            },
            400,
        ),
        (
            {
                "email": "test@test.com",
                "password": "password",
                "first_name": "Ola",
                "last_name": "nordmann",
                "phone": 123456789,
                "address": {
                    "street_number": 1,
                    "postal_code": "1234",
                    "city": "Oslo",
                    "country": "Norway",
                },
            },
            400,
        ),
    ],
)
def test_create_user(api_client, data, response_code):
    res = api_client.post("/api/users/", data, format="json")
    assert res.status_code == response_code


@pytest.mark.django_db
def test_get_users(api_client_with_auth):
    res = api_client_with_auth.get("/api/users/")
    assert res.status_code == 200
    assert len(res.json()) == 1


@pytest.mark.django_db
@pytest.mark.parametrize(
    "data, resp",
    [
        (
            {
                "room_id": 1,
                "from_date": f"{get_time_string(days=1)}",
                "to_date": f"{get_time_string(days=3)}",
                "people": 2,
            },
            200,
        ),
        (
            {
                "room_id": 3,
                "from_date": f"{get_time_string(days=1)}",
                "to_date": f"{get_time_string(days=3)}",
                "people": 1,
            },
            200,
        ),
        (
            {
                "room_id": 2,
                "from_date": f"{get_time_string(days=-1)}",
                "to_date": f"{get_time_string(days=2)}",
                "people": 1,
            },
            400,
        ),
        (
            {
                "room_id": 20,
                "from_date": f"{get_time_string(days=2)}",
                "to_date": f"{get_time_string(days=3)}",
                "people": 1,
            },
            400,
        ),
        (
            {
                "room_id": 2,
                "from_date": f"{get_time_string(days=1)}",
                "to_date": f"{get_time_string(days=2)}",
                "people": 5,
            },
            400,
        ),
        (
            {
                "room_id": 2,
                "from_date": f"{get_time_string(days=1)}",
                "to_date": f"{get_time_string(days=-2)}",
                "people": 1,
            },
            400,
        ),
    ],
)
def test_book_room(api_client_with_auth, data, resp):
    res = api_client_with_auth.post("/api/bookings/", data)
    assert res.status_code == resp

    if resp == 200:
        res_data = res.json()
        assert (
            Booking.objects.filter(room=data["room_id"]).last().room.pk
            == data["room_id"]
        )
        assert res_data["booking_reference"] is not None
        data.pop("room_id")
        for k, v in data.items():
            assert res_data[k] == v


@pytest.mark.django_db
@pytest.mark.parametrize(
    "data, resp",
    [
        (
            {
                "room_id": 1,
                "from_date": f"{get_time_string(days=4)}",
                "to_date": f"{get_time_string(days=6)}",
                "people": 2,
            },
            400,
        ),
        (
            {
                "room_id": 1,
                "from_date": f"{get_time_string(days=4)}",
                "to_date": f"{get_time_string(days=6)}",
                "people": 2,
                "customer": {
                    "email": "test@test.com",
                    "first_name": "Ola",
                    "last_name": "nordmann",
                    "phone": 123456789,
                    "address": {
                        "street_name": "Road",
                        "street_number": 1,
                        "postal_code": "1234",
                        "city": "Oslo",
                        "country": "Norway",
                    },
                },
            },
            200,
        ),
        (
            {
                "room_id": 2,
                "from_date": f"{get_time_string(days=4)}",
                "to_date": f"{get_time_string(days=6)}",
                "people": 2,
                "comment": "I want this room to be super clean!",
                "customer": {
                    "email": "test@test.com",
                    "first_name": "Ola",
                    "last_name": "nordmann",
                    "phone": 123456789,
                    "address": {
                        "street_name": "Road",
                        "street_number": 1,
                        "postal_code": "1234",
                        "city": "Oslo",
                        "country": "Norway",
                    },
                },
            },
            200,
        ),
        (
            {
                "room_id": 1,
                "from_date": f"{get_time_string(days=4)}",
                "to_date": f"{get_time_string(days=6)}",
                "people": 2,
                "customer": {
                    "first_name": "Ola",
                    "last_name": "nordmann",
                    "phone": 123456789,
                    "address": {
                        "street_name": "Road",
                        "street_number": 1,
                        "postal_code": "1234",
                        "city": "Oslo",
                        "country": "Norway",
                    },
                },
            },
            400,
        ),
    ],
)
def test_book_room_no_user(api_client, data, resp):
    res = api_client.post("/api/bookings/", data, format="json")
    print(res.json())
    assert res.status_code == resp


@pytest.mark.django_db
def test_get_bookings_no_auth(api_client):
    res = api_client.get("/api/bookings/")
    assert res.status_code == 401


@pytest.mark.django_db
def test_get_bookings(api_client_with_auth):
    assert api_client_with_auth.get("/api/bookings/").json() == []
    booking_data = {
        "room_id": 3,
        "from_date": f"{get_time_string(days=8)}",
        "to_date": f"{get_time_string(days=10)}",
        "people": 1,
    }
    booking_res = api_client_with_auth.post("/api/bookings/", booking_data).json()

    res = api_client_with_auth.get("/api/bookings/")
    assert res.status_code == 200
    assert len(res.json()) == 1
    assert res.json()[0]["id"] == booking_res["id"]
