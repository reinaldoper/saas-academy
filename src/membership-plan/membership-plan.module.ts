import { Module } from '@nestjs/common';
import { MembershipPlanService } from './membership-plan.service';
import { MembershipPlanController } from './membership-plan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MembershipPlanController],
  providers: [MembershipPlanService],
  imports: [PrismaModule],
})
export class MembershipPlanModule {}
