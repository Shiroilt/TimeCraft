from rest_framework import serializers
from .models import Advertisement

class AdvertisementSerializer(serializers.ModelSerializer):
    product_slug = serializers.ReadOnlyField(source='product.slug') 

    class Meta:
        model = Advertisement
        fields = "__all__"  # Use "__all__" correctly
        extra_fields = ["product_slug"]  # Add extra fields explicitly

    def to_representation(self, instance):
        """ Add 'product_slug' to the serialized response. """
        representation = super().to_representation(instance)
        representation["product_slug"] = instance.product.slug  # Ensure product_slug is included
        return representation
