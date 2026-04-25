from rest_framework import serializers
from subscription.models import SubscriptionPlan, UserSubscription, SubscriptionCouponAccess

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = [
            'sid', 'name', 'tier', 'price', 'billing_cycle', 
            'product_discount_percent', 'service_discount_percent', 
            'includes_vendor_coupons', 'description', 'active'
        ]

class UserSubscriptionSerializer(serializers.ModelSerializer):
    plan = SubscriptionPlanSerializer(read_only=True)
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = UserSubscription
        fields = [
            'usid', 'plan', 'status', 'payment_status', 
            'start_date', 'end_date', 'is_active', 'auto_renew', 'date'
        ]

    def get_is_active(self, obj):
        return obj.is_active

class SubscriptionCouponAccessSerializer(serializers.ModelSerializer):
    coupon_code = serializers.SerializerMethodField()
    vendor_name = serializers.SerializerMethodField()
    discount_percent = serializers.SerializerMethodField()

    class Meta:
        model = SubscriptionCouponAccess
        fields = [
            'id', 'coupon_code', 'vendor_name', 'discount_percent',
            'revealed', 'revealed_at', 'date'
        ]

    def get_coupon_code(self, obj):
        return obj.coupon.code if obj.revealed else "****"

    def get_vendor_name(self, obj):
        return obj.coupon.vendor.name if obj.coupon and hasattr(obj.coupon, 'vendor') and obj.coupon.vendor else "—"

    def get_discount_percent(self, obj):
        return getattr(obj.coupon, 'discount', 0) if obj.coupon else 0

class SubscribeSerializer(serializers.Serializer):
    plan_sid = serializers.CharField(max_length=10)

    def validate(self, attrs):
        plan_sid = attrs.get('plan_sid')
        
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            raise serializers.ValidationError("Authentication is required.")
            
        user = request.user
        
        # Check if plan exists and is active
        try:
            plan = SubscriptionPlan.objects.get(sid=plan_sid, active=True)
        except SubscriptionPlan.DoesNotExist:
            raise serializers.ValidationError({"plan_sid": "Plan does not exist or is not active."})
        
        attrs['plan'] = plan
        
        # Check if user already has an active subscription
        from subscription.models import get_active_subscription
        if get_active_subscription(user):
            raise serializers.ValidationError("You already have an active subscription. Cancel it first.")
            
        return attrs
