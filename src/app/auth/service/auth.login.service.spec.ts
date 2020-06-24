import { User } from '../../user/user.entity'
import { JwtService } from '@nestjs/jwt';
import AuthLoginService from './auth.login.service'
import { AuthTokenDto } from '../dto/auth.token.dto'

describe('AuthLoginService', () => {
  let jwtService: JwtService

  describe('call', () => {
    const mockUserObject = new User({ id: 1 })
    const token = 'valid-jwt-token-123456789'

    let jwtSerivceSpy

    const tokenDto = Object.assign(new AuthTokenDto(), {
      token: token,
      id: mockUserObject.id,
    })

    beforeEach( async() => {
      jwtService = new JwtService({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '12h' },
      })

      jwtSerivceSpy = jest
        .spyOn(jwtService, 'sign')
        .mockReturnValue(token)
    })

    it('should return JWT token for valid email and password', async () => {
      await expect(new AuthLoginService(jwtService).call(mockUserObject)).resolves.toEqual(
        tokenDto,
      )
      expect(jwtSerivceSpy).toHaveBeenCalledTimes(1)
    })
  })
})
