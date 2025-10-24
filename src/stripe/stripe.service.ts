import {
  Injectable,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import Stripe from 'stripe';
const STRIP_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(STRIP_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
});

const YOUR_DOMAIN = process.env.YOUR_DOMAIN || '';
const ENDPOINT_SECRET = process.env.ENDPOINT_SECRET || '';

@Injectable()
export class StripeService {
  async createCheckoutSession(lookupKey: string): Promise<string> {
    const prices = await stripe.prices.list({
      lookup_keys: [lookupKey],
      expand: ['data.product'],
    });
    if (!prices.data.length) {
      throw new NotAcceptableException(
        'Preço não encontrado para lookupKey fornecida',
      );
    }

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/?canceled=true`,
    });

    if (!session.url) {
      throw new NotAcceptableException('Session URL is null');
    }
    return session.url;
  }

  async createPortalSession(sessionId: string): Promise<string> {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!checkoutSession.customer) {
      throw new NotAcceptableException('Customer is null');
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: YOUR_DOMAIN,
    });

    return portalSession.url;
  }

  verifyWebhookSignature(
    body: Buffer,
    signature: string | string[] | undefined,
  ): Stripe.Event | null {
    try {
      return stripe.webhooks.constructEvent(
        body,
        signature as string,
        ENDPOINT_SECRET,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new BadRequestException(`Webhook Error: ${err.message}`);
      }
      return null;
    }
  }

  handleWebhookEvent(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription;
    const status = subscription.status;

    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        return `Trial will end soon. Status: ${status}`;
        break;
      case 'customer.subscription.deleted':
        return `Subscription deleted. Status: ${status}`;
        break;
      case 'customer.subscription.created':
        return `Subscription created. Status: ${status}`;
        break;
      case 'customer.subscription.updated':
        return `Subscription updated. Status: ${status}`;
        break;
      case 'entitlements.active_entitlement_summary.updated':
        return `Entitlement summary updated. Status: ${status}`;
        break;
      default:
        return `Unhandled event type: ${event.type}`;
    }
  }
}
