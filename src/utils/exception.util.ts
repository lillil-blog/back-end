import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionUtil {
    static check(condition: boolean, message: string, status: HttpStatus) {
        if (condition) {
            throw new HttpException(message, status);
        }
    }
}
