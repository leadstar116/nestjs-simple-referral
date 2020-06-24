import { User } from '../../user/user.entity';
import AuthProcessReferralService from './auth.process-referral.service';

jest.mock('@nestjs/jwt');
jest.mock('bcrypt');

const encodeBase64 = (id: number): string => {
  return Buffer.from(id.toString()).toString('base64')
}

describe('AuthProcessReferralService', () => {
  const subject = new AuthProcessReferralService(null)

  let referrer: User
  let referee: User
  let users: User[]

  beforeEach(async () => {
    referrer = new User({ id: 1, referralCount: 0, balance: 0 })
    referee = new User({ id: 2, referralCount: 0, balance: 0, referrerId: 1 })
    users = [referrer, referee]

    jest
      .spyOn(subject, 'fetchUser')
      .mockImplementation((id: number ) => {
        const user = users.find((u)=> u.id == id)

        return Promise.resolve(user)
      })
    jest
      .spyOn(subject, 'updateUser')
      .mockImplementation((user) => Promise.resolve(user))
  });

  describe('call', () => {
    describe('When referrerToken is not present', () => {
      it('should should return false', async () => {
        const result = await subject.call(referee, null)

        expect(result).toEqual(false)
      })
    })

    describe('When referrerToken is present', () => {
      describe('And referrer referralCount is less than 4', () => {
        beforeEach(async () => {
          referrer.referralCount = 2
          await subject.call(referee, encodeBase64(referee.referrerId))
        })
  
        it('should add 10 to referee balance', async () => {
          expect(referee.balance).toEqual(10)
        })
  
        it('should add increase referralCount of referrer', async () => {
          expect(referrer.referralCount).toEqual(3)
        })
      })

      describe('And referrer referralCount is 4', () => {
        beforeEach(async () => {
          referrer.referralCount = 4
          referrer.balance = 10

          await subject.call(referee, encodeBase64(referee.referrerId))
        })
  
        it('should add 10 to referee balance', async () => {
          expect(referee.balance).toEqual(10)
        })
  
        it('should reset referralCount of referrer', async () => {
          expect(referrer.referralCount).toEqual(0)
        })

        it('should add 10 to referrer balance', async () => {
          expect(referrer.balance).toEqual(20)
        })
      })
    })
  })
})
