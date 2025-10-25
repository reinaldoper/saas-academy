import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MembershipPlanService } from './membership-plan.service';
import { CreateMembershipPlanDto } from './dto/create-membership-plan.dto';
import { UpdateMembershipPlanDto } from './dto/update-membership-plan.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('membership-plan')
@Controller('membership-plan')
export class MembershipPlanController {
  constructor(private readonly service: MembershipPlanService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Membership plan created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() dto: CreateMembershipPlanDto) {
    return this.service.create(dto);
  }

  @Get('academy/:academyId')
  @ApiResponse({
    status: 200,
    description: 'List of membership plans retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findByAcademy(@Param('academyId', ParseIntPipe) academyId: number) {
    return this.service.findAllByAcademy(academyId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Membership plan retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Membership plan updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMembershipPlanDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Membership plan deleted successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
