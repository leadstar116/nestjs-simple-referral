import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from '../../common/request';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('User')
@Controller('')
@UseGuards(JwtAuthGuard)
export class UserReferralLinkController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('referral-link')
  @ApiOperation({ description: 'Get user referral link' })
  public async referralLink(@Req() req: Request) {
    return await this.userService.getReferralToken(req.user.id)
  }
}
