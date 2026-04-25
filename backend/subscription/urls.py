from django.urls import path
from subscription import views as subscription_views

urlpatterns = [
    path('plans/', subscription_views.SubscriptionPlanListView.as_view(), name='subscription-plans'),
    path('subscribe/', subscription_views.SubscribeView.as_view(), name='subscribe'),
    path('my-subscription/', subscription_views.MySubscriptionView.as_view(), name='my-subscription'),
    path('cancel/', subscription_views.CancelSubscriptionView.as_view(), name='cancel-subscription'),
    path('my-coupons/', subscription_views.CouponAccessListView.as_view(), name='my-coupons'),
    path('reveal-coupon/<int:pk>/', subscription_views.RevealCouponView.as_view(), name='reveal-coupon'),
    path('apply-discount/', subscription_views.ApplySubscriptionDiscountView.as_view(), name='apply-discount'),
]
