import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/admin.decorator';
import { UserRole } from 'src/auth/enums/user-role.enum';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles([UserRole.Admin])
  @Get()
  async geAllProfiles(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.userService.findAll(page, perPage);
  }

  @Get('employees')
  async getAllEmployees(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.userService.findAllEmployees(page, perPage);
  }

  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id, true);
  }

  @Roles([UserRole.Admin])
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
