import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { HTMLDivProps, Props } from "../../common/props";
export declare type NavbarDividerProps = INavbarDividerProps;
export interface INavbarDividerProps extends Props, HTMLDivProps {
}
export declare class NavbarDivider extends AbstractPureComponent2<NavbarDividerProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
