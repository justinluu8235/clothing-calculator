from django.contrib import admin

from .models import QuantityRange, FabricType, StyleCategory, StylePricePoint

admin.site.register(QuantityRange)
admin.site.register(FabricType)
admin.site.register(StyleCategory)
admin.site.register(StylePricePoint)

