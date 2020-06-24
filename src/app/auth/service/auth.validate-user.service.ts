import { User } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export default class AuthValidateUserService
{
  constructor(protected userRepository: UserRepository) {}

  async call(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email })

    if (await this.isPasswordMatched(user, password)) {
      delete user.passwordHash
      return user
    }

    return null
  }

  protected async isPasswordMatched(user, password): Promise<boolean> {
    if (!user) return false

    return user.passwordHash &&
      (await bcrypt.compare(password, user.passwordHash))
  }
}
