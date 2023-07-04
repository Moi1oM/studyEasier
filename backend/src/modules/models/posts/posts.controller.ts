import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/functions/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import User from '../users/entities/user.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    description: '게시물 생성',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postsService.create(user, createPostDto);
  }

  @ApiOperation({
    description: '내 게시물 가져오기',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('myPost')
  async findSpecAuthor(@CurrentUser() user: User) {
    return user.posts;
  }

  @ApiOperation({
    description: '작성자 상관 없이 게시물 전부 가져오기',
  })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({
    description: 'id에 해당하는 게시물 가져오기',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiOperation({
    description: '게시글 수정',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    const author = await this.postsService.getAuthorFromPost(+id);
    if (author.email === user.email) {
      return this.postsService.update(+id, updatePostDto);
    }

    throw new UnauthorizedException('허용되지 않은 접근입니다.');
  }

  @ApiOperation({
    description: 'jwt상의 user와 id의 user가 같을 때만 삭제',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@CurrentUser() user: User, @Param('id') id: string) {
    const author = await this.postsService.getAuthorFromPost(+id);
    if (author.email === user.email) {
      return await this.postsService.remove(+id);
    }

    throw new UnauthorizedException('허용되지 않은 접근입니다.');
  }
}
