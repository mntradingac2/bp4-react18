export interface IKeyAllowlist<T> {
    include: Array<keyof T>;
}
export declare type KeyAllowlist<T> = IKeyAllowlist<T>;
export interface IKeyDenylist<T> {
    exclude: Array<keyof T>;
}
export declare type KeyDenylist<T> = IKeyDenylist<T>;
export declare function arraysEqual(arrA: any[], arrB: any[], compare?: (a: any, b: any) => boolean): boolean;
export declare function shallowCompareKeys<T extends {}>(objA: T | null | undefined, objB: T | null | undefined, keys?: KeyDenylist<T> | KeyAllowlist<T>): boolean;
export declare function deepCompareKeys(objA: any, objB: any, keys?: Array<string | number | symbol>): boolean;
export declare function getDeepUnequalKeyValues<T extends {}>(objA?: T, objB?: T, keys?: Array<keyof T>): {
    key: keyof T;
    valueA: T[keyof T];
    valueB: T[keyof T];
}[];
