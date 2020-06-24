import { Injectable } from '@nestjs/common'
import { User } from '../user/user.entity';
import { AuthRegisterDto } from './dto/auth.register.dto'
import { JwtService } from '@nestjs/jwt'
import { AuthTokenDto } from './dto/auth.token.dto'
import AuthLoginService from './service/auth.login.service'
import AuthValidateUserService from './service/auth.validate-user.service'
import { UserRepository } from '../user/user.repository'
import AuthRegisterService from './service/auth.register.service'
import AuthProcessReferralService from './service/auth.process-referral.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    return await new AuthValidateUserService(this.userRepository).call(email, password)
  }

  public async register(params: AuthRegisterDto): Promise<User> {
    return await new AuthRegisterService(this.userRepository).call(params)
  }

  public async login(user: User): Promise<AuthTokenDto> {
    return await new AuthLoginService(this.jwtService).call(user)
  }

  public async processReferral(user: User, referralToken: string): Promise<boolean> {
    return await new AuthProcessReferralService(this.userRepository).call(user, referralToken)
  }
}
