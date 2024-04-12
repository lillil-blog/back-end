export class CheckerUtil {
    static isNull(v: any) {
        return v === null || v === undefined;
    }

    static isNotNull(v: any) {
        return v !== null && v !== undefined;
    }

    static isDefined(v: any) {
        return typeof v === 'object';
    }

    static isEquals(v1: any, v2: any) {
        return v1 === v2;
    }
}
