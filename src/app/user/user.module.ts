import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserReferralUrlController } from './user-referral-url.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController, UserReferralUrlController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
