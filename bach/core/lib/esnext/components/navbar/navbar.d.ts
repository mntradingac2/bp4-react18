import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { HTMLDivProps, Props } from "../../common/props";
import { NavbarDivider } from "./navbarDivider";
import { NavbarGroup } from "./navbarGroup";
import { NavbarHeading } from "./navbarHeading";
export { INavbarDividerProps, NavbarDividerProps } from "./navbarDivider";
export declare type NavbarProps = INavbarProps;
export interface INavbarProps extends Props, HTMLDivProps {
    children?: React.ReactNode;
    fixedToTop?: boolean;
}
export declare class Navbar extends AbstractPureComponent2<NavbarProps> {
    static displayName: string;
    static Divider: typeof NavbarDivider;
    static Group: typeof NavbarGroup;
    static Heading: typeof NavbarHeading;
    render(): React.JSX.Element;
}
