import { DialogProps } from "../../components";
import { IHotkeyProps } from "./hotkey";
export interface IHotkeysDialogProps extends DialogProps {
    globalHotkeysGroup?: string;
}
export declare function isHotkeysDialogShowing(): boolean;
export declare function setHotkeysDialogProps(props: Partial<IHotkeysDialogProps>): void;
export declare function showHotkeysDialog(hotkeys: IHotkeyProps[]): void;
export declare function hideHotkeysDialog(): void;
export declare function hideHotkeysDialogAfterDelay(): void;
