from django.contrib.auth.models import User
from django.shortcuts import render
from django.views import View
from rest_framework.response import Response
from django.http import JsonResponse
from .sendgrid import Sendgrid


from .models import StylePricePoint, QuantityRange, FabricType, StyleCategory, UserStyle, Style, ClientCompany, \
    QuotationRequest
from .serializers import StyleCategorySerializer, UserStyleSerializer, StyleSerializer, ClientCompanySerializer
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


class UserStylesView(View):
    def get(self, request, user_id, post_id=None):
        try:
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)

        style_results = []
        user = User.objects.get(pk=user_id)
        companies = ClientCompany.objects.filter(user=user)
        company_data = ClientCompanySerializer(companies.first(), many=False).data if companies.exists() else {}

        user_styles = user.styles.all()
        user_styles_data = UserStyleSerializer(user_styles, many=True).data

        for user_style_data in user_styles_data:
            user_style_data['style']['current_image'] = 0 if user_style_data['style']['images'] else -1
            # add a fabric information image if available
            if user_style_data['style']['fabric_information']:
                fabric_information = user_style_data['style']['fabric_information'][0]
                fabric_info_image = fabric_information.get('color_swatch_image')
                if fabric_info_image:
                    user_style_data['style']['images'].append({'id': -1, 'image':fabric_info_image})

            style_results.append(user_style_data['style'])

        return JsonResponse({'style_data': style_results, 'company_info': company_data})


class TradeshowStylesView(View):
    def get(self, request, user_id):
        try:
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)
        user = User.objects.get(pk=user_id)
        companies = ClientCompany.objects.filter(user=user)
        company_data = ClientCompanySerializer(companies.first(), many=False).data if companies.exists() else {}

        # right now this returns all styles, but in the future, maybe we can do a style.is_tradeshow
        styles = Style.objects.filter(is_tradeshow=True).order_by('model_number')
        styles_data = StyleSerializer(styles, many=True).data
        style_results = []
        for style in styles_data:
            style['current_image'] = 0 if style['images'] else -1
            # add a fabric information image if available
            if style['fabric_information']:
                fabric_information = style['fabric_information'][0]
                fabric_info_image = fabric_information.get('color_swatch_image')
                if fabric_info_image:
                    style['images'].append({'id': -1, 'image':fabric_info_image})
            style_results.append(style)
        return JsonResponse({'style_data': style_results, 'company_info': company_data})

class ShowroomStylesView(View):
    def get(self, request, user_id):
        try:
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)

        user = User.objects.get(pk=user_id)
        companies = ClientCompany.objects.filter(user=user)
        company_data = ClientCompanySerializer(companies.first(), many=False).data if companies.exists() else {}


        styles = Style.objects.filter(is_showroom=True)
        styles_data = StyleSerializer(styles, many=True).data
        style_results = []
        for style in styles_data:
            style['current_image'] = 0 if style['images'] else -1
            # add a fabric information image if available
            if style['fabric_information']:
                fabric_information = style['fabric_information'][0]
                fabric_info_image = fabric_information.get('color_swatch_image')
                if fabric_info_image:
                    style['images'].append({'id': -1, 'image':fabric_info_image})
            style_results.append(style)
        return JsonResponse({'style_data': style_results, 'company_info': company_data})


class StylesAdminView(View):
    def get(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            if not user.is_staff:
                return Response(data={"error": "access denied. not staff"}, status=400)
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)
        styles = Style.objects.all().order_by("id")
        styles_data = StyleSerializer(styles, many=True).data
        style_by_id_results = {}
        for style in styles_data:
            style['current_image'] = 0 if style['images'] else -1
            # add a fabric information image if available
            if style['fabric_information']:
                fabric_information = style['fabric_information'][0]
                fabric_info_image = fabric_information.get('color_swatch_image')
                if fabric_info_image:
                    style['images'].append({'id': -1, 'image': fabric_info_image})
            style_by_id_results[style['id']] = style
        users = User.objects.all()
        user_info_list = []
        for user in users:
            company = user.company.first().company_name if user.company.exists() else 'no-company'
            user_info_list.append({
                'user_id': user.id,
                'username': user.username,
                'email': user.email or 'no-email',
                'company': company
            })



        return JsonResponse({'style_data': style_by_id_results, 'user_info_list': user_info_list})

    def post(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            if not user.is_staff:
                return Response(data={"error": "access denied. not staff"}, status=400)
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)
        data = json.loads(request.body)
        target_user_id = data.get("target_user_id")
        target_user = User.objects.get(pk=target_user_id)
        user_styles = target_user.styles.all()
        style_results = None
        if data.get('action') == "fetch_user_styles":
            user_styles_data = UserStyleSerializer(user_styles, many=True).data
            style_results = []
            for user_style_data in user_styles_data:
                user_style_data['style']['current_image'] = 0 if user_style_data['style']['images'] else -1
                style_results.append(user_style_data['style'])
        elif data.get('action') == "add_styles_to_user":
            selected_styles = data.get("selected_styles")
            existing_style_ids = [user_style.style.id for user_style in user_styles]
            selected_style_ids = [style['id'] for style in selected_styles]
            # filter out the ones they already have assigned to them
            style_ids_to_add = set(selected_style_ids) - set(existing_style_ids)
            for style_id in style_ids_to_add:
                style = Style.objects.get(pk=style_id)
                UserStyle.objects.create(style=style, user=target_user)
        elif data.get('action') == "remove_styles_from_user":
            selected_styles = data.get("selected_styles")
            selected_style_ids = [style['id'] for style in selected_styles]
            style_ids_to_delete = set(selected_style_ids)
            for style_id in style_ids_to_delete:
                UserStyle.objects.filter(user=target_user, style_id=style_id).delete()
        return JsonResponse({'user_styles': style_results})




class QuotationRequestView(View):
    def post(self, request, user_id):
        try:
            validate_token(request.headers.get("Authorization"), user_id)
        except Exception as e:
            return Response(data={"error": "access denied..who are you?"}, status=400)
        data = json.loads(request.body)
        user = User.objects.get(pk=user_id)
        is_tradeshow = data.get('isTradeShow')
        user_companies = ClientCompany.objects.filter(user=user)
        # if the user doesnt have a company or its a tradeshow, then we want to create one
        create_new_company_profile = is_tradeshow or not user_companies.exists()
        try:
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
            if create_new_company_profile:
                client_company = ClientCompany(**client_company_data)
                if not is_tradeshow:
                    #  if not a tradeshow, we would want to attach the company to the user
                    client_company.user = user
                    pass
                client_company.save()
            else:
                # update company information
                client_company = user_companies.first()
                for field, value in client_company_data.items():
                    setattr(client_company, field, value)
                client_company.save()

            # create quotation request
            requested_styles = data.get('requested_styles')
            style_model_numbers = None
            quotation_request = None
            if requested_styles:
                style_ids = [style['id'] for style in requested_styles]
                style_model_numbers = [style['model_number'] for style in requested_styles]
                styles = Style.objects.filter(pk__in=style_ids)
                quotation_request = QuotationRequest(user=user,company=client_company, request_notes=data.get('quotation_request_notes', ''))
                quotation_request.save()
                quotation_request.styles.set(styles)
                quotation_request.save()

            # send email
            sendgrid = Sendgrid()
            sendgrid.set_from_veisais()
            sendgrid.set_reply_to_veisais()
            sendgrid.set_to_email_veisais()
            sendgrid.set_subject(f"Quotation Request from {client_company.company_name}")
            request_notes = quotation_request.request_notes if quotation_request else "N/A"
            sendgrid.send_quotation_request(user, style_model_numbers, client_company, request_notes)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        return JsonResponse({'error': ''})


