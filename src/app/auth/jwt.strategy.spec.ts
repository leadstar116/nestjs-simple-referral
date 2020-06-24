import { JwtStrategy } from './jwt.strategy';

describe('JWT strategy', () => {
  const jwtStrategy = new JwtStrategy();

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should validate', () => {
    const payLoad = {
      sub: '00179238-a8b1-4ad3-abd7-bd2791e0cd3d',
      email: 'test@gmail.com',
    };
    return expect(jwtStrategy.validate(payLoad)).resolves.toStrictEqual({
      id: payLoad.sub,
      email: payLoad.email,
    });
  });

  it('should return teserId undefined when payload is missing sub', () => {
    const payLoad = {
      email: 'test@gmail.com',
    };
    return expect(jwtStrategy.validate(payLoad)).resolves.toStrictEqual({
      id: undefined,
      email: payLoad.email,
    });
  });

  it('should return email undefined when payload is missing email', () => {
    const payLoad = {
      sub: '00179238-a8b1-4ad3-abd7-bd2791e0cd3d',
    };
    return expect(jwtStrategy.validate(payLoad)).resolves.toStrictEqual({
      id: payLoad.sub,
      email: undefined,
    });
  });

  it('should return both undefined when payload is empty', () => {
    const payLoad = {};
    return expect(jwtStrategy.validate(payLoad)).resolves.toStrictEqual({
      id: undefined,
      email: undefined,
    });
  });
});
