import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/models/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: '로그인 하기',
    summary: '로그인',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() body: LoginAuthDto) {
    return await this.authService.jwtLogIn(body);
  }

  @ApiOperation({
    description: '회원가입',
    summary: '회원가입',
  })
  @Post('register')
  async register(@Body() registerData: CreateUserDto) {
    return await this.authService.jwtRegister(registerData);
  }
}
