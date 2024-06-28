import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, createCarDto: CreateCarDto) {
    const user = await this.userService.findOne(userId, true);
    const newCar = this.carRepository.create(createCarDto);
    newCar.owner = user;
    return this.carRepository.save(newCar);
  }

  findAllByUser(userId: string) {
    return this.carRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  findOne(id: string, throwOnNull?: boolean) {
    const car = this.carRepository.findOne({
      where: {
        id,
      },
      relations: ['owner'],
    });
    if (!car && throwOnNull) {
      throw new Error(`No car ${id} found`);
    }
    return car;
  }

  findActive(userId: string) {
    return this.carRepository.findOneBy({
      owner: {
        id: userId,
      },
      active: true,
    });
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id);
    const { userId, ...rest } = updateCarDto;
    const mergedCar = this.carRepository.merge(car, rest);
    if (userId) {
      const user = await this.userService.findOne(userId);
      mergedCar.owner = user;
    }
    return this.carRepository.save(mergedCar);
  }

  async remove(id: string) {
    const car = await this.findOne(id, true);
    return this.carRepository.remove(car);
  }

  async getActive(userId: string) {
    return this.carRepository.findOneBy({
      active: true,
      owner: {
        id: userId
      }
    })
  }

  async setActive(id: string, userId: string) {
    const car = await this.findOne(id);

    if (car.owner.id !== userId) {
      throw new Error(`No car ${id} found`);
    }

    const activeCar = await this.carRepository.findOne({
      where: {
        active: true,
      },
    });

    if (activeCar) {
      await this.carRepository.update(activeCar.id, {
        active: false,
      });
    }

    car.active = true;
    return this.carRepository.save(car);
  }
}
