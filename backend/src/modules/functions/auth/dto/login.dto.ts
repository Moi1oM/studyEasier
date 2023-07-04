import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'hcloud0806@gmail.com',
    description: '가입한 이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345',
    description: '비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
