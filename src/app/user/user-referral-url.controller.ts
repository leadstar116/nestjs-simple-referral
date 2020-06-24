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
export class UserReferralUrlController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('referral-url')
  @ApiOperation({ description: 'Get user referral url' })
  public async referralUrl(@Req() req: Request) {
    const referralToken = await this.userService.getReferralToken(req.user.id)
    const referralUrl = `/sign-up?referralToke=${referralToken}`

    return { referralToken, referralUrl }
  }
}
