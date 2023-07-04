import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { UsersService } from 'src/modules/models/users/users.service';
import User from 'src/modules/models/users/entities/user.entity';

type userDataType = {
  email: string;
  name: string;
};

@ApiTags('mail')
@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({
    description: '가입한 전부한테 독촉 메일 보내기',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('all')
  async postToAll() {
    const userDatas: userDataType[] =
      await this.usersService.getAllUserEmailsAndName();

    userDatas.forEach(async (userData) => {
      try {
        await this.emailService.sendHurryMail(userData.email, userData.name);
      } catch (e) {
        console.error(e);
      }
    });

    return '전송 완료';
  }

  @ApiOperation({
    description: '이메일 인증 메일 보내기',
  })
  @Post('verify')
  async sendEmailVerification(@Query('email') email: string) {
    await this.emailService.sendEmailVeirfy(email);
  }

  @ApiOperation({
    description: '이메일 인증 확인하기/직접 요청 보낼 이유가 없음',
    deprecated: true,
  })
  @Get('verify')
  async emailVerify(@Query('email') email: string) {
    const userName: string = await this.usersService.userEmailVerify(email);
    if (userName) {
      return '이메일 인증을 성공했습니다! 돌아가주세요.';
    }
    throw new HttpException(
      '뭔가 이상합니다! 관리자에게 연락하세요',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiOperation({
    description: '특정 사람한테 독촉 메일 보내기',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  async postToSpec(@Query('email') email: string) {
    // console.log(email);
    const user: User = await this.usersService.getByEmail(email);
    // console.log(user);
    try {
      await this.emailService.sendHurryMail(user.email, user.name);
    } catch (e) {
      console.error(e);
    }
    return user.name;
  }
}
