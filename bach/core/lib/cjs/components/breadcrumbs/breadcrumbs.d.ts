import * as React from "react";
import { AbstractPureComponent2, Boundary, Props } from "../../common";
import { OverflowListProps } from "../overflow-list/overflowList";
import { IPopoverProps } from "../popover/popover";
import { BreadcrumbProps } from "./breadcrumb";
export declare type BreadcrumbsProps = IBreadcrumbsProps;
export interface IBreadcrumbsProps extends Props {
    breadcrumbRenderer?: (props: BreadcrumbProps) => JSX.Element;
    collapseFrom?: Boundary;
    currentBreadcrumbRenderer?: (props: BreadcrumbProps) => JSX.Element;
    items: readonly BreadcrumbProps[];
    minVisibleItems?: number;
    overflowListProps?: Partial<OverflowListProps<BreadcrumbProps>>;
    popoverProps?: IPopoverProps;
}
export declare class Breadcrumbs extends AbstractPureComponent2<BreadcrumbsProps> {
    static defaultProps: Partial<BreadcrumbsProps>;
    render(): React.JSX.Element;
    private renderOverflow;
    private renderOverflowBreadcrumb;
    private renderBreadcrumbWrapper;
    private renderBreadcrumb;
}
