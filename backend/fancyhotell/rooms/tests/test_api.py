import pytest
from rest_framework.test import APIClient


@pytest.mark.django_db
@pytest.mark.parametrize("url,response_code", [("/rooms", 200), ("/rooms/1", 200)])
def test_public_api_routes_status_code(client, url, response_code):
    """
    Test the route permissions. A client should be able to access public routes, and be denied admin
    routes.
    """
    response = client.get("/api" + url)
    assert response.status_code == response_code


@pytest.mark.django_db
class TestRoomsNotLoggedIn:
    def test_room_list(self):
        client = APIClient()
        resp = client.get("/api/rooms/")
        data = resp.content
        assert len(data) == 4
