import { User } from './user.entity';
export const factory = require('factory-girl').factory;

factory.define('user', User,
  {
    email: "test@domain.com",
    firstName: "Jon",
    lastName: "Doe",
  }
)
