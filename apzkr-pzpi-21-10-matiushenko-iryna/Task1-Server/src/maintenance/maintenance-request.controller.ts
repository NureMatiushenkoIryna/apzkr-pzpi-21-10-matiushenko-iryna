import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { MaintenanceRequestService } from './maintenance-request.service';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dto/update-maintenance-request.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { UserId } from 'src/auth/decorators/userid.decorator';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { JwtData } from 'src/auth/decorators/types/jwt-data.type';

@ApiBearerAuth()
@ApiTags('maintenance-requests')
@UseGuards(AuthGuard)
@Controller('maintenance-requests')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {}

  @Post()
  create(@Body() createMaintenanceRequestDto: CreateMaintenanceRequestDto) {
    return this.maintenanceRequestService.create(createMaintenanceRequestDto);
  }

  @ApiQuery({
    required: false,
    name: 'page',
  })
  @ApiQuery({
    required: false,
    name: 'perPage',
  })
  @Get()
  findAll(
    @UserId() userId: string,
    @Req() request: Request,
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
  ) {
    const { user } = request.user as JwtData;
    switch (user.role) {
      case UserRole.Admin:
        return this.maintenanceRequestService.findAll(page, perPage);
      case UserRole.Customer:
        return this.maintenanceRequestService.findAllRequestsByUser(
          page,
          perPage,
          userId,
        );
      case UserRole.Employee:
        return this.maintenanceRequestService.findAllRequestsByStation(
          page,
          perPage,
          user.stationId,
        );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceRequestService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaintenanceRequestDto: UpdateMaintenanceRequestDto,
  ) {
    return this.maintenanceRequestService.update(
      id,
      updateMaintenanceRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenanceRequestService.remove(id);
  }
}
