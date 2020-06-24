import { Test } from '@nestjs/testing'
import {
  BadRequestException,
  Logger,
} from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { User } from '../user/user.entity'
import { AuthRegisterDto } from './dto/auth.register.dto'
import { AuthTokenDto } from './dto/auth.token.dto';
import { AuthLoginDto } from './dto/auth.login.dto'
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

jest.mock('./auth.service')

describe('AuthController', () => {
  let controller: AuthController
  let authService: AuthService

  const mockUserObject: User = Object.assign(new User(), {
    id: 1,
  })

  const mockTokenObject: AuthTokenDto = Object.assign(new AuthTokenDto(), {
    token: "xxxx"
  })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        UserRepository,
        Logger,
      ],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
    controller = moduleRef.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('Register', () => {
    const registerDto = Object.assign(new AuthRegisterDto(), {
      password: 'password',
      email: 'test@gmail.com',
      firstName: 'test',
      lastName: 'test',
    })

    let authRegisterServiceSpy

    describe('When user is already present', () => {
      beforeEach(() => {
        authRegisterServiceSpy = jest
          .spyOn(authService, 'register')
          .mockImplementation((params) => {
            throw 'Exception'
          })
      })
      it('should return error', async () => {
        await expect(controller.register(registerDto)).rejects.toThrow(
          BadRequestException,
        )
  
        expect(authRegisterServiceSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('When user is not present', () => {
      let authLoginServiceSpy
      let authRegisterServiceSpy
      let authProcessReferralServiceSpy

      beforeEach(()=>{
        authLoginServiceSpy = jest
          .spyOn(authService, 'login')
          .mockReturnValue(Promise.resolve(mockTokenObject))

        authRegisterServiceSpy = jest
          .spyOn(authService, 'register')
          .mockResolvedValue(mockUserObject)
        
        authProcessReferralServiceSpy = jest
          .spyOn(authService, 'processReferral')
          .mockResolvedValue(true)
      })

      it('should return auth token', async () => {
        await expect(controller.register(registerDto)).resolves.toEqual(
          mockTokenObject,
        )
  
        expect(authRegisterServiceSpy).toHaveBeenCalledTimes(1)
        expect(authLoginServiceSpy).toHaveBeenCalledTimes(1)
      })

      describe('And referralToken is present', () => {
        beforeEach(() => {
          registerDto.referralToken = "xxxx"
        })
        it('should process referral', async () => {
          await expect(controller.register(registerDto)).resolves.toEqual(
            mockTokenObject,
          )
    
          expect(authRegisterServiceSpy).toHaveBeenCalledTimes(1)
          expect(authProcessReferralServiceSpy).toHaveBeenCalledTimes(1)
          expect(authLoginServiceSpy).toHaveBeenCalledTimes(1)
        })
      })

      describe('And referralToken is blank', () => {
        beforeEach(() => {
          registerDto.referralToken = ""
        })
        it('should not process referral', async () => {
          await expect(controller.register(registerDto)).resolves.toEqual(
            mockTokenObject,
          )
    
          expect(authRegisterServiceSpy).toHaveBeenCalledTimes(1)
          expect(authProcessReferralServiceSpy).toHaveBeenCalledTimes(0)
          expect(authLoginServiceSpy).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('Login', () => {
    const loginDto = Object.assign(new AuthLoginDto(), {
      password: 'password',
      username: 'test@gmail.com',
    })
    
    const tokenDto = Object.assign(new AuthTokenDto(), {
      token: 'valid-token-123456789',
      id: 'user-x',
    })

    describe('When data is valid', () => {
      it('should return JWT token', async () => {
        const authServiceSpy = jest
          .spyOn(authService, 'login')
          .mockResolvedValue(tokenDto)
        const req = { user: mockUserObject }
  
        await expect(controller.login(req, loginDto)).resolves.toEqual(tokenDto)
  
        expect(authServiceSpy).toHaveBeenCalledTimes(1)
        expect(authServiceSpy).toHaveBeenLastCalledWith(mockUserObject)
      })
    })
  })
})
