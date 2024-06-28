import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/auth/decorators/userid.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('cars')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@UserId() userId: string, @Body() createCarDto: CreateCarDto) {
    return this.carService.create(userId, createCarDto);
  }

  @Post(':id/set-active')
  setActive(@Param('id') id: string, @UserId() userId: string) {
    return this.carService.setActive(id, userId);
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.carService.findAllByUser(userId);
  }

  @Get('active')
  async getActive(@UserId() userId: string) {
    const activeCar = await this.carService.getActive(userId);
    return activeCar ?? JSON.stringify(activeCar);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
