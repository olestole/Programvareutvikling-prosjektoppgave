"""fancyhotell URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from rest_framework import routers, permissions
from fancyhotell.users.views import UserViewSet
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="Fancy hotell API",
        default_version="v1",
        description="API for Fancy hotell booking service.",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# router for the API.
# Register all apps to be included in the API here
# Example: router.register(r"myapp", MyappViewSet)
router = routers.DefaultRouter()
router.register(r"users", UserViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(r"^api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/", include(router.urls)),
    path("", TemplateView.as_view(template_name="index.html"), name="index"),
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]

urlpatterns += staticfiles_urlpatterns()
