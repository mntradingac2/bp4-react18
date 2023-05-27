import * as React from "react";
import { AbstractPureComponent2, Alignment } from "../../common";
import { HTMLDivProps, Props } from "../../common/props";
export declare type NavbarGroupProps = INavbarGroupProps;
export interface INavbarGroupProps extends Props, HTMLDivProps {
    align?: Alignment;
    children?: React.ReactNode;
}
export declare class NavbarGroup extends AbstractPureComponent2<NavbarGroupProps> {
    static displayName: string;
    static defaultProps: NavbarGroupProps;
    render(): React.JSX.Element;
}
