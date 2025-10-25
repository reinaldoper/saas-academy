import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, MembershipPlan, PaymentStatus } from '@prisma/client';
import bcrypt from 'bcrypt';
const userRole = Role;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const { name, email, password, role, membershipPlanId, academyId } = data;
    const existUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existUser) {
      throw new Error('User with this email already exists');
    }
    const existAcademy = await this.prisma.academy.findUnique({
      where: { id: academyId },
    });
    if (!existAcademy) {
      throw new Error('Academy not found');
    }
    const userCountAcademy = await this.prisma.user.count({
      where: { academyId },
    });
    const payment = await this.prisma.payment.findFirst({
      where: {
        academyId,
        status: PaymentStatus.COMPLETED,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (userCountAcademy >= 10 && !payment) {
      throw new Error(
        'Please complete a payment to add more users to this academy',
      );
    }
    let existMembership: MembershipPlan | null = null;
    if (membershipPlanId) {
      existMembership = await this.prisma.membershipPlan.findFirst({
        where: { id: membershipPlanId, academyId },
      });
    } else {
      existMembership = await this.prisma.membershipPlan.create({
        data: {
          name: 'Default Plan',
          price: 0,
          duration: 0,
          academyId,
        },
      });
    }
    const newRole = userCountAcademy === 0 ? userRole.ADMIN : role;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (userCountAcademy === 0) {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: newRole,
          membershipPlanId: existMembership?.id,
          academyId,
        },
      });
      return user;
    } else {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: newRole,
          membershipPlanId: existMembership?.id,
          academyId,
        },
      });
      return user;
    }
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
