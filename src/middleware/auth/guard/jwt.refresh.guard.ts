import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JWTRefreshGuard extends AuthGuard('refresh') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (info) {
            switch (info.constructor) {
                case TokenExpiredError:
                    throw new UnauthorizedException('All Authentication has expired. Please log in again.');
                case JsonWebTokenError:
                    throw new UnauthorizedException('Invalid authentication. Please log in again.');
                case NotBeforeError:
                    throw new UnauthorizedException('There is a problem with authentication. Please log in again.');
            }
        }

        return super.handleRequest(err, user, info, context, status);
    }
}
