import * as React from "react";
import { HotkeyConfig } from "./hotkeyConfig";
export interface UseHotkeysOptions {
    document?: Document;
    showDialogKeyCombo?: string;
}
export interface UseHotkeysReturnValue {
    handleKeyDown: React.KeyboardEventHandler<HTMLElement>;
    handleKeyUp: React.KeyboardEventHandler<HTMLElement>;
}
export declare function useHotkeys(keys: readonly HotkeyConfig[], options?: UseHotkeysOptions): UseHotkeysReturnValue;
