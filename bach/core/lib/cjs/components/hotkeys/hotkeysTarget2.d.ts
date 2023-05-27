import * as React from "react";
import { HotkeyConfig, UseHotkeysOptions } from "../../hooks";
export interface HotkeysTarget2RenderProps {
    handleKeyDown: React.KeyboardEventHandler<HTMLElement>;
    handleKeyUp: React.KeyboardEventHandler<HTMLElement>;
}
export interface HotkeysTarget2Props {
    children: JSX.Element | ((props: HotkeysTarget2RenderProps) => JSX.Element);
    hotkeys: readonly HotkeyConfig[];
    options?: UseHotkeysOptions;
}
export declare const HotkeysTarget2: ({ children, hotkeys, options }: HotkeysTarget2Props) => JSX.Element;
