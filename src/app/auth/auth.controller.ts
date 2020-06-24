import {
  Controller,
  Inject,
  Logger,
  LoggerService,
  Post,
  HttpStatus,
  Body,
  HttpCode,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common'
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { AuthRegisterDto } from './dto/auth.register.dto'
import { AuthService } from './auth.service'
import { AuthTokenDto } from './dto/auth.token.dto'
import { AuthLoginDto } from './dto/auth.login.dto'
import { LocalAuthGuard } from './local-auth.guard'

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description: 'Signup endpoint for authentication',
  })
  public async register(@Body() params: AuthRegisterDto): Promise<any> {
    try {
      const user = await this.authService.register(params)

      if (params.referralToken && user) {
        await this.authService.processReferral(user, params.referralToken)
      }

      return await this.authService.login(user)
    } catch (e) {
      throw new BadRequestException(e.message)
    }    
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Email & Password login endpoint for authentication',
  })
  @ApiOkResponse({
    description: 'Return JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Cannot authorize with given Username and Password',
  })
  async login(@Request() req, @Body() params: AuthLoginDto): Promise<AuthTokenDto> {
    return await this.authService.login(req.user)
  }
}
