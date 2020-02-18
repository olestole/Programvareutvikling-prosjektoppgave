# Fancy hotell backend

```sh
$ git clone git@gitlab.stud.idi.ntnu.no:tdt4140-2020/37.git
$ cd backend
```

## Development

**Installing dependencies**

```sh
$ python3 -m venv venv
$ source venv/bin/activate
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

**Start the development server**

```sh
$ ./manage.py runserver
# Server runs on localhost:8000
```

## Linting and formatting

**Black**

```sh
$ black --check fancyhotell
```

**flake8**

```sh
$ flake8
```
