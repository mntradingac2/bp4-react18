import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { HTMLDivProps, Props } from "../../common/props";
import type { DialogStepButtonProps } from "./dialogStepButton";
export declare type DialogStepId = string | number;
export declare type DialogStepProps = IDialogStepProps;
export interface IDialogStepProps extends Props, Omit<HTMLDivProps, "id" | "title" | "onClick"> {
    id: DialogStepId;
    panel: JSX.Element;
    panelClassName?: string;
    title?: React.ReactNode;
    backButtonProps?: DialogStepButtonProps;
    nextButtonProps?: DialogStepButtonProps;
}
export declare class DialogStep extends AbstractPureComponent2<DialogStepProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
