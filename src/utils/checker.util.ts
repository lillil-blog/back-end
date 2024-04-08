import { ConflictException } from '@nestjs/common';

export class CheckerUtil {
    static assertCheck(condition: boolean, message: string) {
        if (!condition) {
            throw new ConflictException(message);
        }
    }
}
