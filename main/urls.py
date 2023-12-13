from django.urls import re_path, path
from .views import StyleCalculatorView, ShowRoomView, QuotationRequestView
from . import views

# comment
urlpatterns = [
    path('style_calculator/<int:user_id>', StyleCalculatorView.as_view(), name='style_calculator'),
    path('showroom/<int:user_id>', ShowRoomView.as_view(), name='showroom'),
    path('quotation_request/<int:user_id>', QuotationRequestView.as_view(), name='quotation_request'),
    re_path(r"", views.index, name='index'),

]