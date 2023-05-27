import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { MaybeElement, Props } from "../../common/props";
import { IconName } from "../icon/icon";
import { IBackdropProps, OverlayableProps } from "../overlay/overlay";
export declare type DialogProps = IDialogProps;
export interface IDialogProps extends OverlayableProps, IBackdropProps, Props {
    children?: React.ReactNode;
    isOpen: boolean;
    icon?: IconName | MaybeElement;
    isCloseButtonShown?: boolean;
    style?: React.CSSProperties;
    title?: React.ReactNode;
    transitionName?: string;
    containerRef?: React.Ref<HTMLDivElement>;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
}
export declare class Dialog extends AbstractPureComponent2<DialogProps> {
    static defaultProps: DialogProps;
    private titleId;
    static displayName: string;
    constructor(props: DialogProps);
    render(): React.JSX.Element;
    protected validateProps(props: DialogProps): void;
    private maybeRenderCloseButton;
    private maybeRenderHeader;
}
