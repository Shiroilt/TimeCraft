from django.shortcuts import render


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views import View
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.http import urlsafe_base64_decode
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import NotFound, ValidationError
User = get_user_model()
from userauths.models import Profile, User
from userauths.serializer import MyTokenObtainPairSerializer, ProfileSerializer, RegisterSerializer, UserSerializer
import random
import shortuuid


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

def generate_otp():
        uuid_key = shortuuid.uuid()
        unique_key = uuid_key[:6]
        return unique_key



class PasswordResetEmailVerify(APIView):
    def get(self, request, email):
        user = get_object_or_404(User, email=email)
        
        # Generate and store OTP in user model
        otp = generate_otp()
        user.otp = otp
        user.save()

        # Generate token and UID for reset link
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = f"{settings.FRONTEND_URL}password-change/?uid={uid}&token={token}"

        # Send email with OTP and reset link
        subject = "Password Reset Request"
        message = f"Your OTP for password reset is: {otp}\n\nClick the link below to reset your password:\n{reset_link}"
        sender_email = settings.EMAIL_HOST_USER
        recipient_list = [email]

        send_mail(subject, message, sender_email, recipient_list)

        return Response({"message": "Password reset email with OTP sent successfully."})




class PasswordChangeView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request):
        payload = request.data

        otp = payload.get("otp")
        uidb64 = payload.get("uidb64")
        password = payload.get("password")

        try:
            # Decode UID
            uid = urlsafe_base64_decode(uidb64).decode()
            
            # Get user by decoded UID and OTP
            user = User.objects.get(id=uid, otp=otp)

            # Change password
            user.set_password(password)
            user.otp = ""  # Clear OTP after successful reset
            user.save()

            return Response({"message": "Password Changed Successfully"}, status=status.HTTP_201_CREATED)

        except (User.DoesNotExist, ValueError, TypeError):
            return Response({"message": "Invalid UID or OTP"}, status=status.HTTP_400_BAD_REQUEST)
        

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_id = self.kwargs.get('user_id')

        # Check if user_id is missing or not a valid integer
        if not user_id or not user_id.isdigit():
            raise ValidationError({"error": "Invalid user ID provided"})

        try:
            user = User.objects.get(id=int(user_id))
            profile = Profile.objects.get(user=user)
            return profile
        except User.DoesNotExist:
            raise NotFound({"error": "User not found"})
        except Profile.DoesNotExist:
            raise NotFound({"error": "Profile not found"})
    