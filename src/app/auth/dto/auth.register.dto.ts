import {
  IsString,
  IsEmail,
  IsNotEmpty
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../user/user.entity';

export class AuthRegisterDto {
  @ApiProperty({
    name: 'firstName',
    description:
      'First name of the new User',
  })
  @IsNotEmpty()
  public readonly firstName: string

  @ApiProperty({
    name: 'lastName',
    description:
      'Last name of the new User',
  })
  @IsNotEmpty()
  public readonly lastName: string

  @ApiProperty({
    name: 'email',
    description:
      'Email address of the new User',
  })
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string

  @ApiProperty({
    name: 'password',
    description: 'Password of new User',
  })
  @IsNotEmpty()
  @IsString()
  public readonly password: string

  @ApiProperty({
    name: 'referralToken',
    description: 'referral Token',
  })
  @IsString()
  public referralToken: string

  public toUser (): User {
    const { referralToken, ...params} = this

    return Object.assign(new User(), params)
  }
}
