import { Controller,  Get,  Req, UseGuards } from '@nestjs/common';
import { Request } from '../../common/request';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('User')
@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('me')
  @ApiOperation({ description: 'Get user profile' })
  public async me(@Req() req: Request) {
    return this.userService.find(req.user.id)
  }
}
