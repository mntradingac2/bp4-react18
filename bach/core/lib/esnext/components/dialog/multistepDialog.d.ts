import * as React from "react";
import { AbstractPureComponent2, Position } from "../../common";
import { DialogProps } from "./dialog";
import { DialogStepId } from "./dialogStep";
import { DialogStepButtonProps } from "./dialogStepButton";
export declare type MultistepDialogNavPosition = typeof Position.TOP | typeof Position.LEFT | typeof Position.RIGHT;
export declare type MultistepDialogProps = IMultistepDialogProps;
export interface IMultistepDialogProps extends DialogProps {
    backButtonProps?: DialogStepButtonProps;
    children?: React.ReactNode;
    closeButtonProps?: DialogStepButtonProps;
    finalButtonProps?: DialogStepButtonProps;
    navigationPosition?: MultistepDialogNavPosition;
    nextButtonProps?: DialogStepButtonProps;
    onChange?(newDialogStepId: DialogStepId, prevDialogStepId: DialogStepId | undefined, event: React.MouseEvent<HTMLElement>): void;
    resetOnClose?: boolean;
    showCloseButtonInFooter?: boolean;
    initialStepIndex?: number;
}
interface IMultistepDialogState {
    lastViewedIndex: number;
    selectedIndex: number;
}
export declare class MultistepDialog extends AbstractPureComponent2<MultistepDialogProps, IMultistepDialogState> {
    static displayName: string;
    static defaultProps: Partial<MultistepDialogProps>;
    state: IMultistepDialogState;
    render(): React.JSX.Element;
    componentDidUpdate(prevProps: MultistepDialogProps): void;
    private getDialogStyle;
    private renderLeftPanel;
    private renderDialogStep;
    private maybeRenderRightPanel;
    private renderFooter;
    private renderButtons;
    private getDialogStepChangeHandler;
    private getDialogStepChildren;
    private getInitialIndexFromProps;
}
export {};
