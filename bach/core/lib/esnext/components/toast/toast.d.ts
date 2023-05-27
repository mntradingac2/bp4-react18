import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { ActionProps, IntentProps, LinkProps, MaybeElement, Props } from "../../common/props";
import { IconName } from "../icon/icon";
export declare type IToastProps = ToastProps;
export interface ToastProps extends Props, IntentProps {
    action?: ActionProps & LinkProps;
    icon?: IconName | MaybeElement;
    isCloseButtonShown?: boolean;
    message: React.ReactNode;
    onDismiss?: (didTimeoutExpire: boolean) => void;
    timeout?: number;
}
export declare class Toast extends AbstractPureComponent2<ToastProps> {
    static defaultProps: ToastProps;
    static displayName: string;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ToastProps): void;
    componentWillUnmount(): void;
    private maybeRenderActionButton;
    private handleActionClick;
    private handleCloseClick;
    private triggerDismiss;
    private startTimeout;
}
