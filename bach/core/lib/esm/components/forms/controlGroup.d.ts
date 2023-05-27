import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { HTMLDivProps, IElementRefProps, Props } from "../../common/props";
export declare type ControlGroupProps = IControlGroupProps;
export interface IControlGroupProps extends Props, HTMLDivProps, IElementRefProps<HTMLDivElement> {
    children?: React.ReactNode;
    fill?: boolean;
    vertical?: boolean;
}
export declare class ControlGroup extends AbstractPureComponent2<ControlGroupProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
