import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './user.enum';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User extends BaseEntity {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  // INPUT COLUMNS

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;

  // RELATED COLUMNS
  @OneToMany(() => Post, (post) => post.author, {
    eager: true,
    nullable: true,
  })
  posts: Post[];
}

export default User;
