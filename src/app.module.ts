import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/db.config';
import { ConfigModule } from '@nestjs/config';
import { UserSessionModule } from './user-session/user-session.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PersonModule,
    UserSessionModule,
    CategoryModule,
    CourseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
