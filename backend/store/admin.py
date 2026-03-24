from django.contrib import admin
from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from store.models import (
    Product,
    Category,
    Gallery,
    Specification,
    Size,
    Color,
    Cart,
    CartOrder,
    CartOrderItem,
    ProductFaq,
    Review,
    Coupon,
    Notification,
    Wishlist,
    Tax,    
)
# Function to send payment confirmation email
def send_payment_confirmation_email(order):
    # subject = f"Payment Confirmation for Order #{order.oid}"
    # message = f"Dear {order.full_name},\n\nYour payment for order #{order.oid} has been successfully received. Thank you for your purchase!\n\nBest Regards,\nYour Team"
    # from_email = settings.DEFAULT_FROM_EMAIL
    # to_email = [order.email]

    # send_mail(subject, message, from_email, to_email)
    subject = f"Invoice for Order #{order.oid}"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = [order.email]

    context = {
        "order": order,
    }

    text_content = "Your order has been placed successfully. Find the invoice attached."
    html_content = render_to_string("email/invoice_email.html", context)

    email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    email.attach_alternative(html_content, "text/html")
    email.send()

class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 0


class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 0


class SizeInline(admin.TabularInline):
    model = Size
    extra = 0


class ColorInline(admin.TabularInline):
    model = Color
    extra = 0

class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "price",
        "category",
        "shipping_amount",
        "stock_qty",
        "in_stock",
        "vendor",
        "featured",
    ]
    list_editable = ["featured"]
    list_filter = ["date"]
    search_fields = ["title"]
    inlines = [GalleryInline, SpecificationInline, SizeInline, ColorInline]

class CartAdmin(admin.ModelAdmin):
    list_display = [
        "product",
        "cart_id",
        "qty",
        "price",
        "sub_total",
        "shipping_amount",
        "service_fee",
        "tax_fee",
        "total",
        "country",
        "size",
        "color",
        "date",
    ]

class CartOrderAdmin(admin.ModelAdmin):
    list_display = ["oid", "buyer", "payment_status", "total"]

    def save_model(self, request, obj, form, change):
        # Check if 'payment_status' has changed and is now "paid"
        if 'payment_status' in form.changed_data and obj.payment_status == "paid":
            send_payment_confirmation_email(obj)  # Send email when status changes to "paid"
        super().save_model(request, obj, form, change)

# class CartOrderAdmin(admin.ModelAdmin):
#     inlines = [CartOrderItemInlineAdmin]
#     search_fields = ["oid", "full_name", "email", "mobile"]
#     list_editable = ["order_status", "payment_status"]
#     list_filter = ["payment_status", "order_status"]
#     list_display = [
#         "oid",
#         "payment_status",
#         "order_status",
#         "sub_total",
#         "shipping_amount",
#         "tax_fee",
#         "service_fee",
#         "total",
#         "saved",
#         "date",
#     ]


class CartOrderItemAdmin(admin.ModelAdmin):
    list_filter = ["order", "oid"]
    # list_editable = ['date']
    list_display = [
        "order_id",
        "vendor",
        "product",
        "qty",
        "price",
        "sub_total",
        "shipping_amount",
        "service_fee",
        "tax_fee",
        "total",
        "date",
    ]

class ProductFaqAdmin(admin.ModelAdmin):
    list_editable = ["active", "answer"]
    list_display = ["user", "question", "answer", "active"]


class ProductReviewAdmin(admin.ModelAdmin):
    list_editable = ["active"]
    list_editable = ["active"]
    list_display = ["user", "product", "review", "reply", "rating", "active"]


class NotificationAdmin(admin.ModelAdmin):
    list_editable = ["seen"]
    list_display = ["order", "seen", "user", "vendor", "date"]


class CouponAdmin(admin.ModelAdmin):
    list_editable = [
        "code",
        "active",
    ]
    list_display = ["vendor", "code", "discount", "active", "date"]


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)

admin.site.register(Cart, CartAdmin)
admin.site.register(CartOrder, CartOrderAdmin)
admin.site.register(CartOrderItem, CartOrderItemAdmin)

admin.site.register(ProductFaq, ProductFaqAdmin)
admin.site.register(Review, ProductReviewAdmin)
admin.site.register(Wishlist)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Coupon, CouponAdmin)
admin.site.register(Tax)