import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { ActionProps, IElementRefProps, LinkProps } from "../../common/props";
import { IPopoverProps } from "../popover/popover";
import { MenuProps } from "./menu";
export declare type IMenuItemProps = MenuItemProps;
export interface MenuItemProps extends ActionProps, LinkProps, IElementRefProps<HTMLLIElement> {
    text: React.ReactNode;
    active?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;
    label?: string;
    labelClassName?: string;
    labelElement?: React.ReactNode;
    roleStructure?: "menuitem" | "listoption" | "listitem" | "none";
    multiline?: boolean;
    popoverProps?: Partial<IPopoverProps>;
    selected?: boolean;
    shouldDismissPopover?: boolean;
    submenuProps?: Partial<MenuProps>;
    tagName?: keyof JSX.IntrinsicElements;
    textClassName?: string;
    htmlTitle?: string;
}
export declare class MenuItem extends AbstractPureComponent2<MenuItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> {
    static defaultProps: MenuItemProps;
    static displayName: string;
    render(): React.JSX.Element;
    private maybeRenderLabel;
    private maybeRenderPopover;
}
