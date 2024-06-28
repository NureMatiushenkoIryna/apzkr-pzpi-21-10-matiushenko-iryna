import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ChargingService } from './charging.service';
import { CreateChargingDto } from './dto/create-charging.dto';
import { UpdateChargingDto } from './dto/update-charging.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserId } from 'src/auth/decorators/userid.decorator';

@ApiBearerAuth()
@ApiTags('chargings')
@UseGuards(AuthGuard)
@Controller('chargings')
export class ChargingController {
  constructor(private readonly chargingService: ChargingService) {}

  @Post()
  create(
    @UserId() userId: string,
    @Body() createChargingDto: CreateChargingDto,
  ) {
    return this.chargingService.create(userId, createChargingDto);
  }

  @ApiQuery({
    name: 'carId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'stationId',
    type: String,
    required: false,
  })
  @Get()
  findAll(
    @Query('carId') carId?: string,
    @Query('stationId') stationId?: string,
  ) {
    if (carId || stationId) {
      return this.chargingService.findAll(carId, stationId);
    }
    throw new BadRequestException('Either carId or stationId must be provided');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chargingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChargingDto: UpdateChargingDto,
  ) {
    return this.chargingService.update(id, updateChargingDto);
  }
}
