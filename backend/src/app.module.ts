import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './commons/common/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import User from './modules/models/users/entities/user.entity';
import { Post } from './modules/models/posts/entities/post.entity';
import { AuthModule } from './modules/functions/auth/auth.module';
import { UsersModule } from './modules/models/users/users.module';
import { PostsModule } from './modules/models/posts/posts.module';
import { EmailModule } from './modules/functions/email/email.module';

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      entities: [User, Post],
      synchronize: true, // 개발용으로만
      logging: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
