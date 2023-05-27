import * as React from "react";
import { Props } from "../../common/props";
export declare type MenuDividerProps = IMenuDividerProps;
export interface IMenuDividerProps extends Props {
    children?: never;
    title?: React.ReactNode;
    titleId?: string;
}
export declare class MenuDivider extends React.Component<MenuDividerProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
