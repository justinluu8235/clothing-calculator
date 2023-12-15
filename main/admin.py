from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import (Style, StyleImage, UserStyle, StyleSource, FabricSource,
                     ClientCompany, QuotationRequest)




class StyleImageInline(admin.TabularInline):
    model = StyleImage
    fields = ('image', 'image_preview')
    extra=1
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />'.format(obj.image.url))
        return '-'


class UserStyleAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'style_model_number')
    list_filter = ('user',)

    def user_email(self, obj):
        return obj.user.email

    def style_model_number(self, obj):
        return obj.style.model_number



class StyleAdmin(admin.ModelAdmin):
    inlines = [StyleImageInline]
    list_display = ('model_number','image_preview')




    def image_preview(self, obj):
        if obj.images.exists():
            first_image = obj.images.first()
            return format_html('<img src="{}" width="50" height="50" />'.format(first_image.image.url))
        return '-'

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'company')

    def company(self, obj):
        company = ClientCompany.objects.filter(user=obj)
        if company.exists():
            return company.first().company_name
        else:
            return "N/A"



admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Style, StyleAdmin)
admin.site.register(UserStyle, UserStyleAdmin)
admin.site.register(StyleSource)
admin.site.register(FabricSource)
admin.site.register(ClientCompany)
admin.site.register(QuotationRequest)
