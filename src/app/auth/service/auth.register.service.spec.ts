import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt'
import AuthRegisterService from './auth.register.service'
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../user/user.repository';
import { AuthRegisterDto } from '../dto/auth.register.dto';
import { User } from '../../user/user.entity';

jest.mock('../../user/user.repository.ts');
jest.mock('@nestjs/jwt');
jest.mock('bcrypt');

const actualbBcrypt = jest.requireActual('bcrypt')

describe('AuthRegisterService', () => {
  let userRepository: UserRepository

  const registerDto = Object.assign(new AuthRegisterDto(), {
    firstName: "xxx",
    lastName: "xxx",
    password: 'password',
    email: 'test@gmail.com',
  });

  let userRepositorySaveSpy

  beforeEach(async () => {
    jest.resetAllMocks

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        UserRepository,
        JwtService,
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);

    jest
      .spyOn(bcrypt, 'genSalt')
      .mockReturnValue(Promise.resolve('$2b$10$npDxaK0RyxYzcpoy.0OHD.'))
    jest.spyOn(bcrypt, 'hash').mockImplementation(actualbBcrypt.hash)

    userRepositorySaveSpy = jest
      .spyOn(userRepository, 'save')
      .mockImplementation((user: User) => Promise.resolve(user))
  });

  describe('call', () => {
    describe('When user is not present', () => {
      it('should return new user', async () => {
        const result = await new AuthRegisterService(userRepository).call(registerDto)

        expect(result.email).toEqual(registerDto.email)
        expect(result.passwordHash).toEqual(
          '$2b$10$npDxaK0RyxYzcpoy.0OHD.bFIvNhS79E5qzLXtHJ9Yy9bh9Xcq.PK',
        )
        expect(result.firstName).toEqual(registerDto.firstName)
        expect(result.lastName).toEqual(registerDto.lastName)

        expect(userRepositorySaveSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
