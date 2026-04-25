from django.db import models
from django.utils import timezone
from shortuuid.django_fields import ShortUUIDField
from userauths.models import User
from vendor.models import Vendor
# Coupon import removed to prevent circular dependency

class SubscriptionPlan(models.Model):
    PLAN_TIERS = (
        (1, 'Silver'),
        (2, 'Gold'),
        (3, 'Platinum'),
    )

    BILLING_CYCLES = (
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    )

    name = models.CharField(max_length=100)
    tier = models.IntegerField(choices=PLAN_TIERS)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    billing_cycle = models.CharField(max_length=50, choices=BILLING_CYCLES, default='monthly')
    product_discount_percent = models.DecimalField(max_digits=5, decimal_places=2)
    service_discount_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    includes_vendor_coupons = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
    active = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)
    sid = ShortUUIDField(unique=True, length=10, alphabet="abcdefg12345")

    class Meta:
        ordering = ['tier']

    def __str__(self):
        return self.name

class UserSubscription(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
        ('pending', 'Pending'),
    )

    PAYMENT_STATUS_CHOICES = (
        ('paid', 'Paid'),
        ('unpaid', 'Unpaid'),
        ('past_due', 'Past Due'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)
    stripe_subscription_id = models.CharField(max_length=500, null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=500, null=True, blank=True)
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS_CHOICES, default='unpaid')
    auto_renew = models.BooleanField(default=True)
    usid = ShortUUIDField(unique=True, length=10, alphabet="abcdefg12345")
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.email} — {self.plan.name if self.plan else 'No Plan'}"

    @property
    def is_active(self):
        return self.status == 'active' and (self.end_date is None or self.end_date > timezone.now())

class SubscriptionCouponAccess(models.Model):
    subscription = models.ForeignKey(UserSubscription, on_delete=models.CASCADE, related_name='coupon_accesses')
    coupon = models.ForeignKey('store.Coupon', on_delete=models.CASCADE, related_name='subscription_accesses')
    revealed = models.BooleanField(default=False)
    revealed_at = models.DateTimeField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [('subscription', 'coupon')]

    def __str__(self):
        return f"{self.subscription.user.email} → {self.coupon.code}"

def get_active_subscription(user):
    """Returns the active UserSubscription for a user, or None."""
    return UserSubscription.objects.filter(user=user, status='active').select_related('plan').first()
