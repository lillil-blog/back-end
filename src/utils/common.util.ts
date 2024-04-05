import * as bcrypt from 'bcrypt';

export class CommonUtil {
    static async generateHash(v: string) {
        const SALT = 10;

        return bcrypt.hash(v, SALT);
    }

    static async compareHash(v: string, target: string) {
        return bcrypt.compare(v, target);
    }
}
