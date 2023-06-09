import * as React from "react";
export declare function isRefObject<T>(value: React.Ref<T> | undefined): value is React.RefObject<T>;
export declare function isRefCallback<T>(value: React.Ref<T> | undefined): value is React.RefCallback<T>;
export declare function setRef<T>(refTarget: React.Ref<T> | undefined, ref: T | null): void;
export declare function combineRefs<T>(ref1: React.RefCallback<T>, ref2: React.RefCallback<T>): (instance: T | null) => void;
export declare function mergeRefs<T>(...refs: Array<React.Ref<T>>): React.RefCallback<T>;
export declare function getRef<T>(ref: T | React.RefObject<T> | null): T | null;
export declare function refHandler<T extends HTMLElement, K extends string>(refTargetParent: {
    [k in K]: T | null;
}, refTargetKey: K, refProp?: React.Ref<T> | undefined): React.RefCallback<T>;
export declare type IRef<T = HTMLElement> = IRefObject<T> | IRefCallback<T>;
export interface IRefObject<T = HTMLElement> {
    current: T | null;
}
export declare type IRefCallback<T = HTMLElement> = (ref: T | null) => any;
