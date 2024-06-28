import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { JwtData } from './decorators/types/jwt-data.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDTO) {
    const userDto = await this.userService.create(data);
    const user = await this.userService.findOne(userDto.id);

    const { accessToken, refreshToken } = this.generateTokensPair(user);

    user.refreshToken = await hash(refreshToken, 10);

    await this.userService.update(user.id, user);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(data: SignInDTO) {
    const existingUser = await this.userService.findOneByEmail(data.email);

    if (!existingUser) {
      throw new BadRequestException('No such user exists');
    }

    const passwordMatch = await compare(data.password, existingUser.password);

    if (!passwordMatch) {
      throw new BadRequestException('No such user exists');
    }

    const { accessToken, refreshToken } = this.generateTokensPair(existingUser);

    existingUser.refreshToken = await hash(refreshToken, 10);

    await this.userService.update(existingUser.id, existingUser);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const tokenData = this.jwtService.decode(refreshToken) as JwtData;

    const existingUser = await this.userService.findOne(tokenData.userId, true);

    if (!existingUser) {
      throw new BadRequestException('No user matches the provided credentials');
    }

    const tokensPair = this.generateTokensPair(existingUser);

    existingUser.refreshToken = await hash(tokensPair.refreshToken, 10);

    await this.userService.update(tokenData.userId, existingUser);

    return tokensPair;
  }

  private generateTokensPair(user: User) {
    const { id, ...rest } = this.getSafeUser(user);

    const jwtPayload = { sub: id, data: rest };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: process.env['ACCESS_SECRET'],
      expiresIn: `${process.env['ACCESS_EXPIRATION_TIME']}s`,
    });

    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: process.env['REFRESH_SECRET'],
      expiresIn: `${process.env['REFRESH_EXPIRATION_TIME']}s`,
    });

    return { accessToken, refreshToken };
  }

  private getSafeUser(user: User): Omit<User, 'password' | 'refreshToken'> {
    const { password, refreshToken, ...rest } = user;

    return rest;
  }
}
