import * as React from "react";
import { Boundary } from "../../common/boundary";
import { Props } from "../../common/props";
import { MenuItemProps } from "../menu/menuItem";
import { IPopoverProps } from "../popover/popover";
export declare type CollapsibleListProps = ICollapsibleListProps;
export interface ICollapsibleListProps extends Props {
    children?: React.ReactNode;
    dropdownTarget: JSX.Element;
    dropdownProps?: IPopoverProps;
    visibleItemRenderer: (props: MenuItemProps, index: number) => JSX.Element;
    collapseFrom?: Boundary;
    visibleItemClassName?: string;
    visibleItemCount?: number;
}
export declare class CollapsibleList extends React.Component<CollapsibleListProps> {
    static displayName: string;
    static defaultProps: Partial<CollapsibleListProps>;
    render(): React.JSX.Element;
    private partitionChildren;
}
