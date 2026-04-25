from django.contrib import admin
from subscription.models import SubscriptionPlan, UserSubscription, SubscriptionCouponAccess

class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'tier', 'price', 'billing_cycle', 'product_discount_percent', 'service_discount_percent', 'includes_vendor_coupons', 'active')
    list_filter = ('tier', 'billing_cycle', 'active')
    search_fields = ('name',)
    list_editable = ('active', 'product_discount_percent', 'service_discount_percent')

class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'plan_name', 'status', 'payment_status', 'start_date', 'end_date', 'is_active_display')
    list_filter = ('status', 'payment_status', 'plan')
    search_fields = ('user__email', 'user__username', 'usid')
    readonly_fields = ('usid', 'date', 'start_date', 'stripe_subscription_id', 'stripe_customer_id')
    raw_id_fields = ('user', 'plan')

    def is_active_display(self, obj):
        return "✅" if obj.is_active else "❌"
    is_active_display.short_description = "Is Active"

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = "User Email"

    def plan_name(self, obj):
        return obj.plan.name if obj.plan else "—"
    plan_name.short_description = "Plan"

class SubscriptionCouponAccessAdmin(admin.ModelAdmin):
    list_display = ('subscription_user', 'coupon_code', 'vendor_name', 'revealed', 'revealed_at', 'date')
    list_filter = ('revealed',)
    search_fields = ('subscription__user__email', 'coupon__code')
    readonly_fields = ('date', 'revealed_at')

    def subscription_user(self, obj):
        return obj.subscription.user.email
    subscription_user.short_description = "User"

    def coupon_code(self, obj):
        return obj.coupon.code
    coupon_code.short_description = "Coupon"

    def vendor_name(self, obj):
        return obj.coupon.vendor.name if hasattr(obj.coupon, 'vendor') and obj.coupon.vendor else "—"
    vendor_name.short_description = "Vendor"

admin.site.register(SubscriptionPlan, SubscriptionPlanAdmin)
admin.site.register(UserSubscription, UserSubscriptionAdmin)
admin.site.register(SubscriptionCouponAccess, SubscriptionCouponAccessAdmin)
