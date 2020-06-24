import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { User } from '../user/user.entity';

const authService: AuthService = jest.genMockFromModule('./auth.service');
authService.validateUser = jest.fn();

describe('Local strategy', () => {
  const localStrategy = new LocalStrategy(authService);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe('validate', () => {
    const email = 'test@gmail.com';
    const password = 'mypassword';

    it('should return a User', async () => {
      const spy = jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValue(new User());
      const ret = await localStrategy.validate(email, password);

      expect(ret.constructor.name).toEqual('User');
      expect(spy).toHaveBeenCalledWith(email, password);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return unauthorized if User is invalid', async () => {
      const spy = jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValue(undefined);

      await expect(
        localStrategy.validate(email, password),
      ).rejects.toStrictEqual(new UnauthorizedException());

      expect(spy).toHaveBeenCalledWith(email, password);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
