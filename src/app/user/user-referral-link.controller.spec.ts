import { Test } from '@nestjs/testing'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { User } from './user.entity'
import { Request } from '../../common/request'
import { createRequest } from 'node-mocks-http'
import { factory } from './user.factory'
import { UserReferralLinkController } from './user-referral-link.controller';

require('dotenv').config()

describe('UserReferralLinkController', () => {
  let controller: UserReferralLinkController
  let userService: UserService
  let userServiceGetReferralTokenSpy
  const mockedReferralToken = 'xxxxx'

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserReferralLinkController],
      providers: [
        UserService,
        UserRepository
      ],
    }).compile()

    userService = moduleRef.get<UserService>(UserService)
    controller = moduleRef.get<UserReferralLinkController>(UserReferralLinkController)

    userServiceGetReferralTokenSpy = jest
      .spyOn(userService, "getReferralToken")
      .mockReturnValue(mockedReferralToken)
  })

  describe('referral-link', () =>{
    const user: User = factory.build('user')

    describe('When user is authenticated', () => {
      it('should return referral token for sign up', async () => {
        const req: Request = createRequest()
        req.user = user

        const result = await controller.referralLink(req)

        expect(result).toEqual(mockedReferralToken)
        expect(userServiceGetReferralTokenSpy).toBeCalledTimes(1)
      })
    })
  })
})
