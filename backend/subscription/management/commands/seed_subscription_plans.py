from django.core.management.base import BaseCommand
from subscription.models import SubscriptionPlan

class Command(BaseCommand):
    help = 'Seeds the database with default Subscription Plans'

    def handle(self, *args, **kwargs):
        if SubscriptionPlan.objects.exists():
            self.stdout.write(self.style.WARNING('Subscription plans already exist. Skipping seeding.'))
            return

        plans = [
            {
                'name': 'Silver',
                'tier': 1,
                'price': 9.99,
                'billing_cycle': 'monthly',
                'product_discount_percent': 5.00,
                'service_discount_percent': 0.00,
                'includes_vendor_coupons': False,
                'description': '5% discount on all watch purchases.'
            },
            {
                'name': 'Gold',
                'tier': 2,
                'price': 19.99,
                'billing_cycle': 'monthly',
                'product_discount_percent': 10.00,
                'service_discount_percent': 0.00,
                'includes_vendor_coupons': False,
                'description': '10% discount on all watch purchases.'
            },
            {
                'name': 'Platinum',
                'tier': 3,
                'price': 34.99,
                'billing_cycle': 'monthly',
                'product_discount_percent': 15.00,
                'service_discount_percent': 10.00,
                'includes_vendor_coupons': True,
                'description': '15% product discount + 10% service discount + exclusive partner brand coupons.'
            }
        ]

        created_plans = []
        for plan_data in plans:
            plan = SubscriptionPlan.objects.create(**plan_data)
            created_plans.append(plan.name)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(created_plans)} subscription plans: {", ".join(created_plans)}'))
