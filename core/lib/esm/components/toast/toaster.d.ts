import React from "react";
import { AbstractPureComponent2, Position } from "../../common";
import { Props } from "../../common/props";
import { ToastProps } from "./toast";
export declare type IToastOptions = ToastProps & {
    key: string;
};
export declare type ToasterPosition = typeof Position.TOP | typeof Position.TOP_LEFT | typeof Position.TOP_RIGHT | typeof Position.BOTTOM | typeof Position.BOTTOM_LEFT | typeof Position.BOTTOM_RIGHT;
export declare type IToaster = ToasterInstance;
export interface ToasterInstance {
    show(props: ToastProps, key?: string): string;
    dismiss(key: string): void;
    clear(): void;
    getToasts(): IToastOptions[];
}
export interface OverlayToasterProps extends Props {
    autoFocus?: boolean;
    canEscapeKeyClear?: boolean;
    children?: React.ReactNode;
    usePortal?: boolean;
    position?: ToasterPosition;
    maxToasts?: number;
}
export interface IToasterState {
    toasts: IToastOptions[];
}
export declare class OverlayToaster extends AbstractPureComponent2<OverlayToasterProps, IToasterState> implements ToasterInstance {
    static displayName: string;
    static defaultProps: OverlayToasterProps;
    props: any;
    static create(props?: OverlayToasterProps, container?: HTMLElement): ToasterInstance;
    state: IToasterState;
    private toastId;
    show(props: ToastProps, key?: string): string;
    setState(arg0: (prevState: any) => {
        toasts: any[];
    }): void;
    dismiss(key: string, timeoutExpired?: boolean): void;
    clear(): void;
    getToasts(): IToastOptions[];
    render(): React.JSX.Element;
    protected validateProps({ maxToasts }: OverlayToasterProps): void;
    private isNewToastKey;
    private dismissIfAtLimit;
    private renderToast;
    private createToastOptions;
    private getPositionClasses;
    private getDismissHandler;
    private handleClose;
}
export declare const Toaster: typeof OverlayToaster;
export declare type Toaster = OverlayToaster;
export declare type IToasterProps = OverlayToasterProps;
