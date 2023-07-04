import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/models/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/modules/models/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginAuthDto) {
    const existedAccount = await this.usersService.getByEmail(data.email);
    const validatePassword: boolean = await bcrypt.compare(
      data.password,
      existedAccount.password,
    );
    if (!existedAccount || !validatePassword) {
      throw new UnauthorizedException();
    }
    const payload = { email: data.email, sub: existedAccount.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async jwtRegister(data: CreateUserDto) {
    const existedAccount = await this.usersService.getByEmail(data.email);

    if (existedAccount) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    data.password = await bcrypt.hash(data.password, 10);
    await this.usersService.create(data);
    return data;
  }
}
