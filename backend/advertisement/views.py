from rest_framework import generics, permissions
from .models import Advertisement
from .serializers import AdvertisementSerializer
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status


class CreateAdvertisementView(generics.CreateAPIView):
    serializer_class = AdvertisementSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        vendor = self.request.user

        # Check if there is already an active advertisement from any vendor
        existing_ad = Advertisement.objects.filter(status="approved", end_time__gt=timezone.now()).exists()
        if existing_ad:
            return Response({"error": "Only one vendor can advertise at a time."},
                            status=status.HTTP_400_BAD_REQUEST)

        # If no active ad exists, create a new one
        serializer.save(vendor=vendor, status="approved", start_time=timezone.now())


    def perform_create(self, serializer):
        # Save the advertisement with the vendor being the currently logged-in user
        serializer.save(vendor=self.request.user, status="pending")
class ManageAdvertisementView(generics.UpdateAPIView):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer
    permission_classes = [permissions.IsAdminUser]
class ActiveAdvertisementsView(generics.ListAPIView):
    queryset = Advertisement.objects.filter(status="approved")
    serializer_class = AdvertisementSerializer