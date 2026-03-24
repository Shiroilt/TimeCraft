from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

app = Celery("backend")

# Load task modules from all registered Django app configs.
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

# Periodic Task: Automatically Remove Expired Ads at Midnight
app.conf.beat_schedule = {
    "remove-expired-ads": {
        "task": "advertisement.tasks.remove_expired_ads",  # Verify path!
        "schedule": crontab(hour=0, minute=0),  # Runs every midnight
    },
}

@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
