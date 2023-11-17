from django.views import View
from django.http import JsonResponse
from rest_framework.response import Response
import json
from django.http import QueryDict
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login, logout
import jwt
from datetime import datetime, timedelta
from django.conf import settings

class LoginView(View):
    def post(self, request, *args, **kwargs):
        print('logging in... ')
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        login_dict = {'username': email, 'password': password}
        query_dict = QueryDict('', mutable=True)
        query_dict.update(login_dict)
        form = AuthenticationForm(request,query_dict)
        if form.is_valid():
            u = form.cleaned_data['username']
            p = form.cleaned_data['password']
            user = authenticate(username=u, password = p)
            login(request, user)
            token = jwt.encode(
                {'id': user.id, 'username': user.username, 'email': user.email, 'password': user.password,
                 'exp': datetime.utcnow() + timedelta(seconds=20)},
                settings.SECRET_KEY, algorithm='HS256')

            user_info = {
                'userData':
                    {
                        'username': user.username,
                        'email': user.email,
                        'id': user.id,
                    },
                'token': 'Bearer ' + str(token),
                'success': True
            }
            return JsonResponse(user_info)

        return JsonResponse({"error": 'error logging in'}, status=400)


class LogoutView(View):
    def get(self, request):
        print('logging out... ')
        logout(request)
        return JsonResponse({"msg": "logged out"}, status=200)