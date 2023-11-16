from django.views import View
from django.http import JsonResponse

class LoginView(View):
    def post(self, request, *args, **kwargs):
        print('logging in... ')
        return JsonResponse({"response": 'hello'})