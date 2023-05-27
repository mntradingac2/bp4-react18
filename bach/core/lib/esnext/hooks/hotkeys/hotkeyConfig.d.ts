export interface HotkeyConfig {
    allowInInput?: boolean;
    combo: string;
    disabled?: boolean;
    label: React.ReactNode;
    global?: boolean;
    group?: string;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    onKeyDown?(e: KeyboardEvent): any;
    onKeyUp?(e: KeyboardEvent): any;
}
