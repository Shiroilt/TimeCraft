from celery import shared_task
from .models import Advertisement

@shared_task
def remove_expired_ads():
    """Delete expired advertisements daily."""
    Advertisement.delete_expired_ads()
