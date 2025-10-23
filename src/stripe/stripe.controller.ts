import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  Req,
  BadRequestException,
} from '@nestjs/common';
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
    @Req() req: Request,
    @Headers('stripe-signature') signature: string | string[] | undefined,
  ) {
    const event = this.stripeService.verifyWebhookSignature(
      req.body as unknown as Buffer,
      signature,
    );
    if (event) {
      return this.stripeService.handleWebhookEvent(event);
    }
    throw new BadRequestException('Invalid signature');
  }
}
