export interface IOffset {
    left: number;
    top: number;
}
export declare function show(menu: JSX.Element, offset: IOffset, onClose?: () => void, isDarkTheme?: boolean): void;
export declare function hide(): void;
export declare function isOpen(): boolean;
