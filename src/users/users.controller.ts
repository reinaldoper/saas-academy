import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/cuurent.user';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

export interface AuthenticatedUser {
  userId: number;
  role: string;
  email: string;
}

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteUser(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (user.role !== 'ADMIN') {
      throw new BadRequestException('Only admins can delete users');
    }
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.usersService.deleteUser(Number(id));
  }
}
