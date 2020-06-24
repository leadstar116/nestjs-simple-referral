import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}

@Injectable()
export class JwtAuthGuardOnly extends JwtAuthGuard {
  constructor(private actions: string[] = []) { super() }

  canActivate(
    context: ExecutionContext,
  ) {
    return this.isAuthRequire(context)
  }

  protected isAuthRequire(context: ExecutionContext) {
    return this.actions.indexOf(context.getHandler().name) >= 0
  }
}

@Injectable()
export class JwtAuthGuardExcept extends JwtAuthGuard {
  constructor(private actions: string[] = []) { super() }

  canActivate(
    context: ExecutionContext,
  ) {    
    return this.isAuthRequire(context)
  }

  protected isAuthRequire(context :ExecutionContext) {
    return this.actions.indexOf(context.getHandler().name) < 0
  }
}
