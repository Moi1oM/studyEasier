import { User } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(user: User, createPostDto: CreatePostDto) {
    const newPost = { author: user, ...createPostDto };
    newPost.author.password = undefined;
    await this.postsRepository.save(newPost);
    return newPost;
  }

  // async findMine(user: User) {
  //   console.log(user);
  //   return await this.postsRepository
  //     .createQueryBuilder('post')
  //     .where('post.author = :author', { author: user.email })
  //     .getMany();
  // }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return this.postsRepository.delete(id);
  }

  async getAuthorFromPost(postId: number) {
    // Assuming `postRepository` is an instance of your TypeORM repository for the Post entity
    const post = await this.postsRepository.findOneOrFail({
      where: { id: postId },
      relations: ['author'],
    });
    if (!post) {
      throw new Error(`Post with ID ${postId} not found.`);
    }

    const author = post.author;

    return author;
  }
}
