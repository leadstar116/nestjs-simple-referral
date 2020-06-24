import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserReferralLinkController } from './user-referral-link.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController, UserReferralLinkController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
