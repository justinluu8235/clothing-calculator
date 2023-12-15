from django.urls import re_path, path
from .views import (StyleCalculatorView, UserStylesView, QuotationRequestView,
                    TradeshowStylesView, ShowroomStylesView, StylesAdminView
                    )
from . import views

# comment
urlpatterns = [
    path('style_calculator/<int:user_id>', StyleCalculatorView.as_view(), name='style_calculator'),
    path('user_styles/<int:user_id>', UserStylesView.as_view(), name='user_styles'),
    path('tradeshow_styles/<int:user_id>', TradeshowStylesView.as_view(), name='tradeshow_styles'),
    path('showroom_styles/<int:user_id>', ShowroomStylesView.as_view(), name='showroom_styles'),
    path('styles_admin/<int:user_id>', StylesAdminView.as_view(), name='styles_admin'),
    path('quotation_request/<int:user_id>', QuotationRequestView.as_view(), name='quotation_request'),
    re_path(r"", views.index, name='index'),

]