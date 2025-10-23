import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AcademyService } from './academy.service';
import { CreateAcademyDto } from './dto/create-academy';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/cuurent.user';
import type { AuthenticatedUser } from 'src/auth/cuurent.user';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Academy')
@Controller('academy')
export class AcademyController {
  constructor(private readonly academyService: AcademyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new academy' })
  @ApiResponse({
    status: 201,
    description: 'The academy has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createAcademy(@Body() createAcademyDto: CreateAcademyDto) {
    return this.academyService.createAcademy(createAcademyDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get academy by ID' })
  @ApiResponse({
    status: 200,
    description: 'The academy details.',
  })
  @ApiResponse({ status: 404, description: 'Academy not found.' })
  async getAcademyById(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    if (isNaN(Number(id))) {
      throw new Error('Invalid academy ID');
    }
    if (user.role !== 'ADMIN') {
      throw new Error('Access denied');
    }
    return this.academyService.getAcademyById(Number(id));
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get academy by email' })
  @ApiResponse({
    status: 200,
    description: 'The academy details.',
  })
  @ApiResponse({ status: 404, description: 'Academy not found.' })
  async getAcademyByEmail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('email') email: string,
  ) {
    if (user.role !== 'ADMIN') {
      throw new Error('Access denied');
    }
    return this.academyService.getAcademyByEmail(email);
  }
}
