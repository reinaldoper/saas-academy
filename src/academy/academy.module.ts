import { Module } from '@nestjs/common';
import { AcademyService } from './academy.service';
import { AcademyController } from './academy.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AcademyController],
  providers: [AcademyService],
  imports: [PrismaModule],
})
export class AcademyModule {}
