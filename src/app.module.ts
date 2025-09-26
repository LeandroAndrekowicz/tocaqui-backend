import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/db.config';
import { ConfigModule } from '@nestjs/config';
import { UserSessionModule } from './user-session/user-session.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PersonModule,
    UserSessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
