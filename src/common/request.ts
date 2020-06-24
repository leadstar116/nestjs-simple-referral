import { Request as ExpressRequest } from 'express';
import { User } from '../app/user/user.entity';

export interface Request extends ExpressRequest{
  user: User
}
