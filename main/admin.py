from django.contrib import admin

from .models import QuantityRange, FabricType, StyleCategory, StylePricePoint, Style, StyleImage, UserStyle



class StyleImageInline(admin.TabularInline):
    model = StyleImage
    extra=1

class StyleAdmin(admin.ModelAdmin):
    inlines = [StyleImageInline]


admin.site.register(QuantityRange)
admin.site.register(FabricType)
admin.site.register(StyleCategory)
admin.site.register(StylePricePoint)
admin.site.register(Style, StyleAdmin)
admin.site.register(StyleImage)
admin.site.register(UserStyle)
