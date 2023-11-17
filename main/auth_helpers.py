from django.contrib.auth.models import User
import jwt
from django.conf import settings
def validate_token(bearer_token, user_id: int):
    user = User.objects.get(pk=user_id)
    if not bearer_token:
        raise Exception("access denied..who are you?")
    token = bearer_token.split(' ')[1]  # remove Bearer
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    token_user_id = decoded['id']
    token_email = decoded['email']
    has_access = False
    if user.id == token_user_id and user.email == token_email:
        has_access = True

    if not has_access:
        raise Exception("access denied..who are you?")