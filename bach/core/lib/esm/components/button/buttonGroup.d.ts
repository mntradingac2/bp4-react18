import * as React from "react";
import { AbstractPureComponent2, Alignment } from "../../common";
import { HTMLDivProps, IElementRefProps, Props } from "../../common/props";
export declare type ButtonGroupProps = IButtonGroupProps;
export interface IButtonGroupProps extends Props, HTMLDivProps, IElementRefProps<HTMLDivElement> {
    alignText?: Alignment;
    children: React.ReactNode;
    fill?: boolean;
    minimal?: boolean;
    large?: boolean;
    vertical?: boolean;
}
export declare class ButtonGroup extends AbstractPureComponent2<ButtonGroupProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
