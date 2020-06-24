import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TYPE_ORM_MODULE_OPTIONS } from './config/database';
import { UserModule } from './app/user/user.module';
import { RouterModule, Routes } from 'nest-router'
import { AuthModule } from './app/auth/auth.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/auth',
        module: AuthModule
      },
      {
        path: '/users',
        module: UserModule
      },
    ]
  }
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TYPE_ORM_MODULE_OPTIONS),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
