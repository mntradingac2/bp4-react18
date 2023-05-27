import * as React from "react";
import { HotkeysDialog2Props } from "../../components/hotkeys/hotkeysDialog2";
import { HotkeyConfig } from "../../hooks";
interface HotkeysContextState {
    hasProvider: boolean;
    hotkeys: HotkeyConfig[];
    isDialogOpen: boolean;
}
declare type HotkeysAction = {
    type: "ADD_HOTKEYS" | "REMOVE_HOTKEYS";
    payload: HotkeyConfig[];
} | {
    type: "CLOSE_DIALOG" | "OPEN_DIALOG";
};
export declare type HotkeysContextInstance = [HotkeysContextState, React.Dispatch<HotkeysAction>];
export declare const HotkeysContext: React.Context<HotkeysContextInstance>;
export interface HotkeysProviderProps {
    children: React.ReactChild;
    dialogProps?: Partial<Omit<HotkeysDialog2Props, "hotkeys">>;
    renderDialog?: (state: HotkeysContextState, contextActions: {
        handleDialogClose: () => void;
    }) => JSX.Element;
    value?: HotkeysContextInstance;
}
export declare const HotkeysProvider: ({ children, dialogProps, renderDialog, value }: HotkeysProviderProps) => React.JSX.Element;
export {};
