import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AcademyModule } from './academy/academy.module';
import { MembershipPlanModule } from './membership-plan/membership-plan.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, AcademyModule, MembershipPlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
