from django.urls import re_path, path
from .views import StyleCalculatorView
from . import views

# comment
urlpatterns = [
    re_path(r"", views.index, name='index'),
    path('style_calculator/', StyleCalculatorView.as_view(), name='style_calculator'),
]