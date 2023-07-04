import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { UsersService } from 'src/modules/models/users/users.service';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendHurryMail(toEmail: string, name: string): Promise<any> {
    // console.log(toEmail, name);
    const data: any = await this.mailerService.sendMail({
      to: toEmail,
      from: process.env.MAIL_USER,
      subject: '과제 독촉 메일',
      text: 'NEXT 스터디',
      html: `<h1>멋사 여름방학 스터디</h1>
          <div>
            ${name}님. 과제를 제출해주시길 바랍니다.
            <br/>
            <a href='google.com'>과제 하러 가기.</a>
            <br/>
            <p>본 메일은 제출 여부에 상관없이 전송됩니다.</p>
          </div>`,
    });
    return data;
  }

  async sendEmailVeirfy(toEmail: string) {
    // console.log(toEmail);
    const data: any = await this.mailerService.sendMail({
      to: toEmail,
      from: process.env.MAIL_USER,
      subject: '이메일 인증',
      text: 'NEXT 스터디',
      html: `<h1>멋사 여름방학 스터디</h1>
          <div>
            열심히 공부하실 스터디원님! 이메일을 인증해주세요.
            <br/>
            <a href=${process.env.BASE_URL}/email/verify?email=${toEmail}>인증하기</a>
            <br/>
            <p>디자인은 차차 해보겠습니다</p>
          </div>`,
    });
    return data;
  }
}
