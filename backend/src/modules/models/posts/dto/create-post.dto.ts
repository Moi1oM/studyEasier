import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: '나의 첫 알고리즘',
    description: '게시물 제목',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '오늘은 매우 힘들었다.',
    description: '게시물 내용',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: '이미지 주소 (아마 S3를 통해서 올린 주소가 담길 예정)',
    description: '이미지 주소',
    required: false,
  })
  image: string;
}
