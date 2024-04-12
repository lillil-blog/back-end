import { UnauthorizedException } from '@nestjs/common';

export class ExceptionUtil {
    static check(condition: boolean, message: string) {
        if (!condition) {
            throw new UnauthorizedException(message);
        }
    }
}
