import { AuthRegisterDto } from '../dto/auth.register.dto'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity'
import { Injectable } from '@nestjs/common';

export class UserDuplicatedEmailException extends Error {
  constructor(message) {
    super(message);
    this.name = "UserDuplicatedEmailException";
  }
}

@Injectable()
export default class AuthRegisterService
{
  constructor(private userRepository: Repository<User>) {}

  async call(params: AuthRegisterDto): Promise<User> {
    this.ensureUserNotExist(params.email)

    return await this.registerUser(params)
  }

  protected async registerUser(params: AuthRegisterDto) {
    const { password, ...userParams } = params
    const passwordHash = await this.generatePasswordHash(password)

    const user = new User({ ...userParams, passwordHash: passwordHash })

    return await this.userRepository.save(user)
  }

  protected async ensureUserNotExist(email: string) {
    const existingUser = await this.userRepository.findOne({ email: email })

    if (existingUser) {
      throw new UserDuplicatedEmailException('A User with that email already exists')
    }
  }

  protected async generatePasswordHash(password: string) {
    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(password, salt)
  }
}
