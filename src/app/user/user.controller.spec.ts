import { Test } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { User } from './user.entity'
import { Request } from '../../common/request'
import { createRequest } from 'node-mocks-http'
import { factory } from './user.factory'

require('dotenv').config()

describe('UserController', () => {
  let userController: UserController
  let userService: UserService
  let userServiceFindSpy

  const mockUser = new User({ balance: 30 })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository
      ],
    }).compile()

    userService = moduleRef.get<UserService>(UserService)
    userController = moduleRef.get<UserController>(UserController)
    userServiceFindSpy = jest
      .spyOn(userService, "find")
      .mockImplementation(id => Promise.resolve(mockUser))
  })

  describe('me', () =>{
    const currentUser: User = factory.build('user')

    describe('When token is not valid', () => {
      it('should return bad request exception', async ()=>{
        const req: Request = createRequest()
        req.user = currentUser

        await userController.me(req)

        expect(userServiceFindSpy).toBeCalledTimes(1)
      })
    })
  })
})
