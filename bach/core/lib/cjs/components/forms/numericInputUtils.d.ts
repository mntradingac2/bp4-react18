export declare function toLocaleString(num: number, locale?: string): string;
export declare function clampValue(value: number, min?: number, max?: number): number;
export declare function getValueOrEmptyValue(value?: number | string): string;
export declare function parseStringToStringNumber(value: number | string, locale: string | undefined): string;
export declare function isValueNumeric(value: string, locale: string | undefined): boolean;
export declare function isValidNumericKeyboardEvent(e: React.KeyboardEvent, locale: string | undefined): boolean;
export declare function toMaxPrecision(value: number, maxPrecision: number): number;
export declare function sanitizeNumericInput(value: string, locale: string | undefined): string;
