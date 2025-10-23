import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  controllers: [StripeController, PrismaModule],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
