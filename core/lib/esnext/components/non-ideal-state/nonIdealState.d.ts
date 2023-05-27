import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { MaybeElement, Props } from "../../common/props";
import { IconName } from "../icon/icon";
export declare enum NonIdealStateIconSize {
    STANDARD = 48,
    SMALL = 32,
    EXTRA_SMALL = 20
}
export declare type NonIdealStateProps = INonIdealStateProps;
export interface INonIdealStateProps extends Props {
    action?: JSX.Element;
    children?: React.ReactNode;
    description?: React.ReactChild;
    icon?: IconName | MaybeElement;
    iconSize?: NonIdealStateIconSize;
    layout?: "vertical" | "horizontal";
    title?: React.ReactNode;
}
export declare class NonIdealState extends AbstractPureComponent2<NonIdealStateProps> {
    static displayName: string;
    static defaultProps: Partial<NonIdealStateProps>;
    render(): React.JSX.Element;
    private maybeRenderVisual;
    private maybeRenderText;
}
