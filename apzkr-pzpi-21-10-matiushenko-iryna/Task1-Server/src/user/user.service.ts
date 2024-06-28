import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { UserRole } from 'src/auth/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(page: number, perPage: number) {
    const [items, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      items,
      total,
    };
  }

  async findAllEmployees(page: number, perPage: number) {
    const [items, total] = await this.userRepository.findAndCount({
      where: {
        role: In([UserRole.Admin, UserRole.Employee]),
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      items,
      total,
    };
  }

  async findOne(id: string, throwOnNull?: boolean): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user && throwOnNull) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const userToCreate = this.userRepository.create(createUserDto);

    userToCreate.password = await hash(userToCreate.password, 10);

    const user = await this.userRepository.save(userToCreate);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);

    if (!result.affected) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }

    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.remove(user);
  }

  async exists(id: string) {
    return this.userRepository.existsBy({
      id,
    });
  }
}
