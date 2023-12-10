from django.contrib import admin
from django.utils.html import format_html
from .models import (QuantityRange, FabricType, StyleCategory,
                     StylePricePoint, Style, StyleImage, UserStyle, StyleSource)



class StyleImageInline(admin.TabularInline):
    model = StyleImage
    fields = ('image', 'image_preview')
    extra=1
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />'.format(obj.image.url))
        return '-'



class StyleAdmin(admin.ModelAdmin):
    inlines = [StyleImageInline]


admin.site.register(QuantityRange)
admin.site.register(FabricType)
admin.site.register(StyleCategory)
admin.site.register(StylePricePoint)
admin.site.register(Style, StyleAdmin)
admin.site.register(UserStyle)
admin.site.register(StyleSource)