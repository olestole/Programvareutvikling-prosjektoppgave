import pytest


@pytest.mark.parametrize("url,response_code", [("/rooms", 200), ("/admin", 401)])
def test_public_api_routes(client, url, response_code):
    response = client.get("/api" + url)
    assert response.status_code == response_code


@pytest.mark.parametrize("url,response_code", [("/admin", 200)])
def test_admin_api_routes(admin_client, url, response_code):
    response = admin_client.get("/api" + url)
    assert response.status_code == response_code
