import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('checkout-session/:lookupKey')
  async createCheckoutSession(
    @Param('lookupKey') lookupKey: string,
  ): Promise<string> {
    return this.stripeService.createCheckoutSession(lookupKey);
  }

  @Get('portal-session/:sessionId')
  async createPortalSession(
    @Param('sessionId') sessionId: string,
  ): Promise<string> {
    return this.stripeService.createPortalSession(sessionId);
  }

  @Post('webhook')
  handleWebhook(
    @Body() body: Buffer,
    @Headers() headers: Record<string, string[]>,
  ) {
    const signature = headers['stripe-signature'] as string | string[];
    const event = this.stripeService.verifyWebhookSignature(body, signature);
    if (event) {
      return this.stripeService.handleWebhookEvent(event);
    }
    return { statusCode: 400, body: 'Invalid signature' };
  }
}
