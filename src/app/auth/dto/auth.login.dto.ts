import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthLoginDto {
  @ApiProperty({
    name: 'email',
    description: 'Email of User',
  })
  @IsString()
  @IsNotEmpty()
  public readonly email: string

  @ApiProperty({
    name: 'password',
    description: 'Password of User',
  })
  @IsString()
  @IsNotEmpty()
  public readonly password: string
}
