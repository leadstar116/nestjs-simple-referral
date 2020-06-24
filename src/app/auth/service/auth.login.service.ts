import { User } from '../../user/user.entity'
import { AuthTokenDto } from '../dto/auth.token.dto'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

@Injectable()
export default class AuthLoginService
{
  constructor(protected jwtService: JwtService) {
  }

  async call(user: User): Promise<AuthTokenDto> {
    const payload = {
      email: user.email,
      sub: user.id,
    }

    const token = this.jwtService.sign(payload)

    return Object.assign(new AuthTokenDto(), {
      token: token,
      id: user.id,
    })
  }
}
