import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (user) return user;

    return null;
  }

  async userEmailVerify(email: string) {
    const user: User = await this.getByEmail(email);
    user.activated = true;
    await this.usersRepository.save(user);
    return user.name;
  }

  async getAll() {
    return await this.usersRepository.find();
  }

  async getAllUserEmailsAndName(): Promise<any[]> {
    const users = await this.usersRepository.find();
    const newDatas = users.map((u) => {
      return { email: u.email, name: u.name };
    });
    return newDatas;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
