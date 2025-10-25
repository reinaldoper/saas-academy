import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMembershipPlanDto } from './dto/create-membership-plan.dto';
import { UpdateMembershipPlanDto } from './dto/update-membership-plan.dto';

@Injectable()
export class MembershipPlanService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMembershipPlanDto) {
    return this.prisma.membershipPlan.create({ data });
  }

  async findAllByAcademy(academyId: number) {
    return this.prisma.membershipPlan.findMany({
      where: { academyId },
    });
  }

  async findOne(id: number) {
    const plan = await this.prisma.membershipPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('Plano não encontrado');
    return plan;
  }

  async update(id: number, data: UpdateMembershipPlanDto) {
    await this.findOne(id);
    return this.prisma.membershipPlan.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.membershipPlan.delete({ where: { id } });
  }
}
