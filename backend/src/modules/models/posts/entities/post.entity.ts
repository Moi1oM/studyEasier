import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../../users/entities/user.entity';

@Entity()
export class Post extends BaseEntity {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  // INPUT COLUMNS
  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public image: string;

  @Column({ default: 0 })
  public clicks: number;

  // RELATED COLUMNS
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  author: User;
}
