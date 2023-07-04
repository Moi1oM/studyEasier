import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'hcloud0806@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '전성운',
    description: '자기 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345',
    description: '비밀번호',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
