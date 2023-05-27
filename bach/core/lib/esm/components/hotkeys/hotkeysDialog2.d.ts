import * as React from "react";
import { HotkeyConfig } from "../../hooks";
import { DialogProps } from "../dialog/dialog";
export interface HotkeysDialog2Props extends DialogProps {
    globalGroupName?: string;
    hotkeys: readonly HotkeyConfig[];
}
export declare const HotkeysDialog2: React.FC<HotkeysDialog2Props>;
