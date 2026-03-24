from django.db import models
from django.conf import settings
from django.utils import timezone
from store.models import Product  # Import Product from store app
from vendor.models import Vendor  # Import Vendor from vendor app

class Advertisement(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    ad_id = models.AutoField(primary_key=True)  
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="advertisements")  # Corrected vendor reference
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="advertisements", null=True, blank=True)  # Corrected product reference
    title = models.CharField(max_length=50, null=False)  
    image = models.ImageField(upload_to="advertisements/", null=False)  
    description = models.CharField(max_length=255, unique=True, null=False)  
    start_date = models.DateField(null=False)  
    end_date = models.DateField(null=False)  
    amount = models.DecimalField(max_digits=20, decimal_places=2, null=False)  
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")  

    def __str__(self):
        return f"{self.title} ({self.vendor})"
    
    @classmethod
    def delete_expired_ads(cls):
        """Delete ads where end_date is in the past."""
        cls.objects.filter(end_date__lt=timezone.now().date()).delete()
