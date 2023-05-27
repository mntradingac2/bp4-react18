import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Position } from "../../common/position";
import { MaybeElement, Props } from "../../common/props";
import { IconName } from "../icon/icon";
import { IBackdropProps, OverlayableProps } from "../overlay/overlay";
export declare enum DrawerSize {
    SMALL = "360px",
    STANDARD = "50%",
    LARGE = "90%"
}
export declare type DrawerProps = IDrawerProps;
export interface IDrawerProps extends OverlayableProps, IBackdropProps, Props {
    children?: React.ReactNode;
    icon?: IconName | MaybeElement;
    isCloseButtonShown?: boolean;
    isOpen: boolean;
    position?: Position;
    size?: number | string;
    style?: React.CSSProperties;
    title?: React.ReactNode;
    transitionName?: string;
}
export declare class Drawer extends AbstractPureComponent2<DrawerProps> {
    static displayName: string;
    static defaultProps: DrawerProps;
    render(): React.JSX.Element;
    protected validateProps(props: DrawerProps): void;
    private maybeRenderCloseButton;
    private maybeRenderHeader;
}
