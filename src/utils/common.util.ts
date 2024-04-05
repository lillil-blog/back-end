import bcrypt from 'bcrypt';

export class CommonUtil {
    static generateHash(v: string) {
        const SALT = 10;

        return bcrypt.hash(v, SALT);
    }

    static compareHash(v: string, target: string) {
        return bcrypt.compare(v, target);
    }
}
