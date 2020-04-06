import pytest
import uuid

from django.core.management import call_command
from fancyhotell.users.models import Address, Customer, User


@pytest.fixture(scope="session")
def django_db_setup(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        call_command("loaddata", "room_fixtures")


@pytest.fixture
def test_password():
    return "strong-test-pass"


@pytest.fixture
def create_user(db, django_user_model, test_password):
    def make_user(**kwargs):
        kwargs["password"] = test_password
        if "email" not in kwargs:
            kwargs["email"] = f"{str(uuid.uuid4())}@test.com"
            address_data = {
                "street_name": "Road",
                "street_number": 1,
                "postal_code": 1234,
                "city": "Oslo",
                "country": "Norway",
            }

        address = Address(**address_data)
        address.save()
        customer = Customer(
            email=kwargs["email"],
            first_name="Ola",
            last_name="Nordmann",
            address=address,
        )
        customer.save()

        return User.objects.create_user(customer=customer, **kwargs)

    return make_user


@pytest.fixture
def api_client():
    """
    Fixture that provides an APIClient for REST testing.
    """
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def api_client_with_auth(db, create_user, api_client):
    """
    Fixture that provides a client with auth
    """
    user = create_user()
    api_client.force_authenticate(user=user)
    yield api_client
    api_client.force_authenticate(user=None)


@pytest.fixture
def admin_api_client_with_auth(db, create_user, api_client):
    """
    Fixture that provides an admin client with auth
    """
    user = create_user(is_staff=True)
    api_client.force_authenticate(user=user)
    yield api_client
    api_client.force_authenticate(user=None)
