import * as React from "react";
import { AbstractPureComponent2, Intent, MaybeElement, Props } from "../../common";
import { IconName } from "../icon/icon";
import { IOverlayLifecycleProps } from "../overlay/overlay";
export declare type AlertProps = IAlertProps;
export interface IAlertProps extends IOverlayLifecycleProps, Props {
    canEscapeKeyCancel?: boolean;
    canOutsideClickCancel?: boolean;
    cancelButtonText?: string;
    children?: React.ReactNode;
    confirmButtonText?: string;
    icon?: IconName | MaybeElement;
    intent?: Intent;
    isOpen: boolean;
    loading?: boolean;
    style?: React.CSSProperties;
    transitionDuration?: number;
    portalContainer?: HTMLElement;
    onCancel?(evt?: React.SyntheticEvent<HTMLElement>): void;
    onConfirm?(evt?: React.SyntheticEvent<HTMLElement>): void;
    onClose?(confirmed: boolean, evt?: React.SyntheticEvent<HTMLElement>): void;
}
export declare class Alert extends AbstractPureComponent2<AlertProps> {
    static defaultProps: AlertProps;
    static displayName: string;
    render(): React.JSX.Element;
    protected validateProps(props: AlertProps): void;
    private handleCancel;
    private handleConfirm;
    private internalHandleCallbacks;
}
