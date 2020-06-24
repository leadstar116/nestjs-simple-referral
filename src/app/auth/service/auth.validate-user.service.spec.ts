import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt'
import AuthValidateUserService from './auth.validate-user.service'
import { AuthService } from '../auth.service';
import { UserRepository } from '../../user/user.repository';
import { User } from '../../user/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('../../user/user.repository.ts');
jest.mock('@nestjs/jwt');

describe('AuthValidateUserService', () => {
  let userRepository: UserRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        UserRepository,
        JwtService
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  describe('call', () => {
    const mockUserObject = new User({ id: 1, email: "xxx@email.com", passwordHash: "" })

    describe('When user is present', () => {
      let userRepositoryFindOneSpy

      beforeEach(() => {
        userRepositoryFindOneSpy = jest
          .spyOn(userRepository, 'findOne')
          .mockImplementation(()=> Promise.resolve(mockUserObject))
      })

      describe('And email and password does not match', () => {
        it('should return null if the password does not match', async () => {
          await expect(
            new AuthValidateUserService(userRepository).call("test@email.com", "password"),
          ).resolves.toEqual(null)
    
          expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1)
        })
      })

      describe('And email and password matches', () => {
        let userRepositoryFindOneSpy
        let userObject
  
        beforeEach(async() => {
          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash("password", salt)
          userObject = new User({ id: 1, email: "test@email.com", passwordHash: hash })
  
          userRepositoryFindOneSpy = jest
            .spyOn(userRepository, 'findOne')
            .mockImplementation(() => Promise.resolve(userObject))
        })
  
        it('should return user', async () => {
          const result = await new AuthValidateUserService(userRepository).call(
            "email",
            "password",
          )
  
          delete userObject.passwordHash
          expect(result).toEqual(userObject)
    
          expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('When user is not present', () => {
      let userRepositoryFindOneSpy

      beforeEach( async() => {
        userRepositoryFindOneSpy = jest
            .spyOn(userRepository, 'findOne')
            .mockImplementation(() => Promise.resolve(null))
      })

      it('should return user', async () => {
        await expect(
          new AuthValidateUserService(userRepository).call("email", "password"),
        ).resolves.toEqual(null)
  
        expect(userRepositoryFindOneSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
