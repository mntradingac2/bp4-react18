import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
export declare type MenuProps = IMenuProps;
export interface IMenuProps extends Props, React.HTMLAttributes<HTMLUListElement> {
    children?: React.ReactNode;
    large?: boolean;
    ulRef?: React.Ref<HTMLUListElement>;
}
export declare class Menu extends AbstractPureComponent2<MenuProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
