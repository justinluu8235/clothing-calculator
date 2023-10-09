from django.urls import re_path
from . import views

# comment
urlpatterns = [
    re_path(r"", views.index, name='index'),
]