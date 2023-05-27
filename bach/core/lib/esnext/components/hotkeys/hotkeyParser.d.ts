export interface IKeyCodeTable {
    [code: number]: string;
}
export interface IKeyCodeReverseTable {
    [key: string]: number;
}
export interface IKeyMap {
    [key: string]: string;
}
export declare const KeyCodes: IKeyCodeTable;
export declare const Modifiers: IKeyCodeTable;
export declare const ModifierBitMasks: IKeyCodeReverseTable;
export declare const Aliases: IKeyMap;
export declare const ShiftKeys: IKeyMap;
export interface IKeyCombo {
    key?: string;
    modifiers: number;
}
export declare function comboMatches(a: IKeyCombo, b: IKeyCombo): boolean;
export declare const parseKeyCombo: (combo: string) => IKeyCombo;
export declare const getKeyComboString: (e: KeyboardEvent) => string;
export declare const getKeyCombo: (e: KeyboardEvent) => IKeyCombo;
export declare const normalizeKeyCombo: (combo: string, platformOverride?: string) => string[];
