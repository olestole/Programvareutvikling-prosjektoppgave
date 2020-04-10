# Fancy hotell backend

## Table of content

- [How to use](#how-to-use)
  - [Setting up the project](#Setup)
  - [Development](#development)
  - [Linting and formatting](#linting-and-formatting)
  - [Running tests](#tests)
- [Project structure](#structure)
  - [Apps](#apps)
- [Settings](#settings)
- [Documentation](#documentaion)

## How to use

### Setup

The backend requires python 3. Make sure to get it installed.

```sh
$ git clone git@gitlab.stud.idi.ntnu.no:tdt4140-2020/37.git
$ cd backend
```

### Development

**Installing dependencies**

```sh
# Create a new python virtual environment
$ python3 -m venv venv
$ source venv/bin/activate
# Install python dependencies
$ pip install -r requirements/dev.txt
```

**Migrate the database**

```sh
$ ./manage.py migrate
```

The first time you create the database, you have to create a superuser:

```sh
$ django-admin createsuperuser --email admin@example.com --username admin
```

**Loading test data**
There are a set of fixtures used to provide some data for testing. Load this data into the database
by running the command:

```sh
$ ./manage.py loaddata room_fixtures
```

**Start the development server**

```sh
$ ./manage.py runserver
# Server runs on localhost:8000
```

### Linting and formatting

**Black**

```sh
$ black --check fancyhotell

# To let black format your code, omit the --check
$ black fancyhotell
```

**flake8**

We use flake8 as our linter for python. Make sure the code passes the checks.

```sh
$ flake8
```

### tests

We use `pytest` to test our project. It is installed with the installation steps above.

```sh
# To run the tests, simply run
$ pytest
```

Pytest configuration is in the file `pytest.ini`. It is set up to run tests defined in all files
following the following naming schema:

- The file starts with `test_`
- The file ends with `_tests.py`
- The file is called `tests.py` or `test.py`

Any tests created in these files will be run automatically when you run `pytest`.

The file `conftest.py` defines the testata we use, along with a set of _fixtures_. See the pytest
documentaion for how these special functions work, and how to use them.

## Structure

### Apps

The backend application consists of two _django apps_, `users`, and `rooms`. Each app is in its own
folder in the root `backend` folder.

The `users` app defines models, views and serializers for user data, while the `rooms` app defines
the same for rooms and bookings. In addition to the serializers, views and models, we also define
permissions for each of the apps. These are used to control what users should have access to do
f.ex. that only administrators can edit rooms.

## Settings

The application settings is defined in `settings.py`. This is, among other things, applications
installed, allowed CORS urls, middlewares and secret key.

A setting of particular interest, is the DATABASE_URL. This variable provides the url, with
username and password, to the database that the application should use. This defaults to an
sqlite database in the
same directory as `manage.py`. To change this setting, you can provide an environment variable with
the same name, `DATABASE_URL`. This can be whichever valid database url, so long as it is supported
by django. In addition to the default supported databases, we support postgreSQL, which we use in
deployment.

## Documentation

We have two different documentaion engines for the API, both using the openAPI specification. These
are two wep pages providing an overview of the API, with details about what endpoints are available,
what HTTP methods they allow, and what data an endpoint requires or provides.

> NOTE: The payload shown by these pages will not always be 100% correct.

These pages are auto-generated, so you do not need to update these yourself. You can browse the
documdocumentaion at https://fancyhotell.herokuapp.com/redoc and
https://fancyhotell.herokuapp.com/swagger. Or navigate to the pages from the backend landing page.
