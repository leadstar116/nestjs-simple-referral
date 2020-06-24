import { IsString, IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
  @ApiProperty({
    name: 'token',
    description: 'The JWT token of the API user',
  })
  @IsString()
  @IsJWT()
  public readonly token: string;

  @ApiProperty({
    name: 'id',
    description: 'User ID of the logged in user',
  })
  @IsString()
  public readonly id: string;
}
