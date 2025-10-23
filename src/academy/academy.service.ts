import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAcademyDto } from './dto/create-academy';

@Injectable()
export class AcademyService {
  constructor(private prisma: PrismaService) {}

  async createAcademy(data: CreateAcademyDto) {
    return this.prisma.academy.create({
      data,
    });
  }

  async getAcademyById(id: number) {
    return this.prisma.academy.findUnique({
      where: { id },
      include: {
        users: true,
        membershipPlans: true,
        payments: true,
        trainers: true,
      },
    });
  }

  async getAcademyByEmail(email: string) {
    return this.prisma.academy.findUnique({
      where: { email },
      include: {
        users: true,
        membershipPlans: true,
        payments: true,
        trainers: true,
      },
    });
  }
}
