from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from django.shortcuts import get_object_or_404
from datetime import timedelta
from decimal import Decimal

from subscription.models import (
    SubscriptionPlan, 
    UserSubscription, 
    SubscriptionCouponAccess, 
    get_active_subscription
)
from subscription.serializers import (
    SubscriptionPlanSerializer, 
    UserSubscriptionSerializer, 
    SubscriptionCouponAccessSerializer, 
    SubscribeSerializer
)
from store.models import Coupon, Cart

class SubscriptionPlanListView(generics.ListAPIView):
    queryset = SubscriptionPlan.objects.filter(active=True).order_by('tier')
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [AllowAny]

class SubscribeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = SubscribeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            plan = serializer.validated_data['plan']
            user = request.user
            
            if plan.billing_cycle == 'monthly':
                end_date = timezone.now() + timedelta(days=30)
            else:
                end_date = timezone.now() + timedelta(days=365)
                
            subscription = UserSubscription.objects.create(
                user=user,
                plan=plan,
                status='active',
                payment_status='paid',
                end_date=end_date
            )
            
            if plan.includes_vendor_coupons:
                active_coupons = Coupon.objects.filter(active=True, vendor__isnull=False)
                coupon_accesses = [
                    SubscriptionCouponAccess(subscription=subscription, coupon=coupon)
                    for coupon in active_coupons
                ]
                SubscriptionCouponAccess.objects.bulk_create(coupon_accesses)
                
            response_data = UserSubscriptionSerializer(subscription).data
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MySubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        subscription = get_active_subscription(request.user)
        if not subscription:
            return Response({"message": "No active subscription"}, status=status.HTTP_200_OK)
        return Response(UserSubscriptionSerializer(subscription).data, status=status.HTTP_200_OK)

class CancelSubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        subscription = get_active_subscription(request.user)
        if not subscription:
            return Response({"message": "No active subscription to cancel"}, status=status.HTTP_400_BAD_REQUEST)
            
        subscription.status = 'cancelled'
        subscription.auto_renew = False
        subscription.save()
        return Response({"message": "Subscription cancelled successfully"}, status=status.HTTP_200_OK)

class CouponAccessListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        subscription = get_active_subscription(request.user)
        if not subscription or subscription.plan.tier != 3 or not subscription.plan.includes_vendor_coupons:
            return Response({"detail": "Platinum subscription required"}, status=status.HTTP_403_FORBIDDEN)
            
        accesses = SubscriptionCouponAccess.objects.filter(subscription=subscription)
        serializer = SubscriptionCouponAccessSerializer(accesses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RevealCouponView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        access = get_object_or_404(SubscriptionCouponAccess, pk=pk, subscription__user=request.user)
        if not access.revealed:
            access.revealed = True
            access.revealed_at = timezone.now()
            access.save()
        return Response({"coupon_code": access.coupon.code}, status=status.HTTP_200_OK)

class ApplySubscriptionDiscountView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart_id = request.data.get('cart_id')
        user_id = request.data.get('user_id')
        
        if not cart_id or not user_id:
            return Response({"error": "cart_id and user_id are required"}, status=status.HTTP_400_BAD_REQUEST)
            
        subscription = get_active_subscription(request.user)
        if not subscription:
            return Response({"discount": 0, "discount_type": "none"}, status=status.HTTP_200_OK)
            
        plan = subscription.plan
        carts = Cart.objects.filter(cart_id=cart_id, user_id=user_id)
        
        for item in carts:
            discounted_price = item.price * (1 - plan.product_discount_percent / Decimal('100.0'))
            item.sub_total = discounted_price * item.qty
            item.save()
            
        return Response({
            "discount_percent": plan.product_discount_percent,
            "subscription_tier": plan.name,
            "service_discount_percent": plan.service_discount_percent,
            "message": "Subscription discount applied"
        }, status=status.HTTP_200_OK)
