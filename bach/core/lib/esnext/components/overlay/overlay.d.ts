import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
export declare type OverlayableProps = IOverlayableProps;
export interface IOverlayableProps extends IOverlayLifecycleProps {
    autoFocus?: boolean;
    canEscapeKeyClose?: boolean;
    enforceFocus?: boolean;
    lazy?: boolean;
    shouldReturnFocusOnClose?: boolean;
    transitionDuration?: number;
    usePortal?: boolean;
    portalClassName?: string;
    portalContainer?: HTMLElement;
    portalStopPropagationEvents?: Array<keyof HTMLElementEventMap>;
    onClose?: (event: React.SyntheticEvent<HTMLElement>) => void;
}
export declare type OverlayLifecycleProps = IOverlayLifecycleProps;
export interface IOverlayLifecycleProps {
    onClosing?: (node: HTMLElement) => void;
    onClosed?: (node: HTMLElement) => void;
    onOpening?: (node: HTMLElement) => void;
    onOpened?: (node: HTMLElement) => void;
}
export declare type BackdropProps = IBackdropProps;
export interface IBackdropProps {
    backdropClassName?: string;
    backdropProps?: React.HTMLProps<HTMLDivElement>;
    canOutsideClickClose?: boolean;
    hasBackdrop?: boolean;
}
export declare type OverlayProps = IOverlayProps;
export interface IOverlayProps extends OverlayableProps, IBackdropProps, Props {
    children?: React.ReactNode;
    isOpen: boolean;
    transitionName?: string;
}
export interface IOverlayState {
    hasEverOpened?: boolean;
}
export declare class Overlay extends AbstractPureComponent2<OverlayProps, IOverlayState> {
    static displayName: string;
    static defaultProps: OverlayProps;
    static getDerivedStateFromProps({ isOpen: hasEverOpened }: OverlayProps): {
        hasEverOpened: true;
    } | null;
    private static openStack;
    private static getLastOpened;
    private isAutoFocusing;
    private lastActiveElementBeforeOpened;
    state: IOverlayState;
    containerElement: HTMLElement | null;
    private startFocusTrapElement;
    private endFocusTrapElement;
    private refHandlers;
    render(): React.JSX.Element | null;
    componentDidMount(): void;
    componentDidUpdate(prevProps: OverlayProps): void;
    componentWillUnmount(): void;
    private maybeRenderChild;
    private maybeRenderBackdrop;
    private renderDummyElement;
    private handleStartFocusTrapElementFocus;
    private handleStartFocusTrapElementKeyDown;
    private handleEndFocusTrapElementFocus;
    private getKeyboardFocusableElements;
    private overlayWillClose;
    private overlayWillOpen;
    private handleTransitionExited;
    private handleBackdropMouseDown;
    private handleDocumentClick;
    private handleDocumentFocus;
    private handleKeyDown;
    private handleTransitionAddEnd;
}
