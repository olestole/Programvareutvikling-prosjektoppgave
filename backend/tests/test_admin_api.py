import pytest


@pytest.mark.django_db
def test_create_rooms_not_admin(api_client_with_auth):
    res = api_client_with_auth.post("/api/rooms/")
    assert res.status_code == 403


@pytest.mark.django_db
@pytest.mark.parametrize(
    "data, resp",
    [
        (
            {
                "title": "test room works",
                "description": "This is a test",
                "capacity": 2,
                "amenities": ["TV", "BATH"],
                "room_number": 202,
                "price": 199.99,
            },
            201,
        ),
        (
            {
                "title": "test room no amenities",
                "description": "This is a test",
                "room_number": 203,
                "price": 199.99,
                "capacity": 2,
            },
            201,
        ),
        (
            {
                "title": "test room no price",
                "description": "This is a test",
                "room_number": 203,
                "capacity": 2,
            },
            201,
        ),
        (
            {
                "title": "test room no description",
                "room_number": 203,
                "price": 199.99,
                "capacity": 2,
            },
            201,
        ),
        (
            {
                "title": "test room no capacity",
                "description": "no capacity on this room should fail",
                "room_number": 204,
                "price": 199.99,
            },
            400,
        ),
        (
            {
                "title": "test room no duplicate room number",
                "description": "test",
                "room_number": 101,
                "capacity": 2,
                "price": 199.99,
            },
            400,
        ),
    ],
)
def test_create_rooms(admin_api_client_with_auth, data, resp):
    res = admin_api_client_with_auth.post("/api/rooms/", data)

    assert res.status_code == resp
