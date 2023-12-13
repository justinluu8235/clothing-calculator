from django.contrib.auth.models import User
from django.shortcuts import render
from django.views import View
from rest_framework.response import Response
from django.http import JsonResponse
from .models import StylePricePoint, QuantityRange, FabricType, StyleCategory, UserStyle, Style, ClientCompany, \
    QuotationRequest
from .serializers import StyleCategorySerializer, UserStyleSerializer, StyleSerializer
import json
from .auth_helpers import validate_token
def index(request):
    return render(request, 'index.html')

class StyleCalculatorView(View):
    def get(self, request, user_id):
        try:
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)

        quantity_ranges = QuantityRange.objects.all()
        fabric_types = FabricType.objects.all()
        style_categories = StyleCategory.objects.all()
        style_cat_serializer = StyleCategorySerializer(style_categories, many=True)
        fabrics = []
        quantitys = []
        categories = []
        for fabric_type in fabric_types:
            fabrics.append({'id': fabric_type.id, 'label': fabric_type.fabric_name})
        for quantity_range in quantity_ranges:
            quantitys.append({'id': quantity_range.id, 'label': quantity_range.__str__()})
        for style_category in style_categories:
            categories.append({'id': style_category.id, 'label': style_category.style_category_name})
        style_cat_serialized_by_id = {}
        for style_cat in style_cat_serializer.data:
            style_cat_serialized_by_id[style_cat.get('id')] = style_cat

        response = {
            'quantity_ranges': quantitys,
            'fabric_types': fabrics,
            'style_categories': categories,
            'serialized_style_categories_by_id': style_cat_serialized_by_id
        }
        return JsonResponse(response)

    def post(self, request,  user_id):
        try:
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)

        data = json.loads(request.body)
        price_point = StylePricePoint.objects.filter(style_category_id=data['style_category'], fabric_type_id=data['fabric_type'],
                                       quantity_range_id=data['quantity_range'], size=data['size'])
        if price_point:
            return JsonResponse({'estimated_cost': price_point.first().estimated_cost})
        else:
            return JsonResponse({'estimated_cost': 'N/A'})


class ShowRoomView(View):
    def get(self, request, user_id):
        try:
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)

        style_results = []
        user = User.objects.get(pk=user_id)
        if user.is_superuser and user.is_staff:
            styles = Style.objects.all()
            styles_data = StyleSerializer(styles, many=True).data
            for style in styles_data:
                style['current_image'] = 0 if style['images'] else -1
                style_results.append(style)

        else:
            user_styles = user.styles.all()
            user_styles_data = UserStyleSerializer(user_styles, many=True).data

            for user_style_data in user_styles_data:
                user_style_data['style']['current_image'] = 0 if user_style_data['style']['images'] else -1
                style_results.append(user_style_data['style'])


        return JsonResponse({'style_data': style_results})



class QuotationRequestView(View):
    def post(self, request, user_id):
        try:
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)
        data = json.loads(request.body)
        is_tradeshow = data.get('isTradeShow')
        create_new_company_profile = is_tradeshow
        try:
            if create_new_company_profile:
                client_company_data = {
                    'company_name': data.get('company_name', ''),
                    'address': data.get('address', ''),
                    'city': data.get('city', ''),
                    'state': data.get('state', ''),
                    'zip_code': data.get('zip_code', ''),
                    'main_contact_name': data.get('main_contact_name', ''),
                    'email': data.get('email', ''),
                    'phone_number': data.get('phone_number', ''),
                    'website': data.get('website', ''),
                    'additional_information': data.get('additional_information', ''),
                }
                client_company = ClientCompany(**client_company_data)
                client_company.save()
                if is_tradeshow:
                    # normally if not a tradeshow, we would want to attach the company to the user
                    pass
            # create quotation request
            requested_styles = data.get('requested_styles')
            if requested_styles:
                style_ids = [style['id'] for style in requested_styles]
                styles = Style.objects.filter(pk__in=style_ids)
                user = User.objects.get(pk=user_id)
                quotation_request = QuotationRequest(user=user, request_notes=data.get('request_notes', ''))
                quotation_request.save()
                quotation_request.styles.set(styles)
                quotation_request.save()
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        return JsonResponse({'error': ''})


