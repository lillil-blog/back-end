export class CheckerUtil {
    static isNull(v: any): boolean {
        return v === null || v === undefined;
    }

    static isNotNull(v: any): boolean {
        return v !== null && v !== undefined;
    }

    static isDefined(v: any): boolean {
        return typeof v === 'object';
    }

    static isEquals(v1: any, v2: any): boolean {
        return v1 === v2;
    }
}
