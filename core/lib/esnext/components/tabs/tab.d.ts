import * as React from "react";
import { IconName } from "@blueprintjs/icons";
import { AbstractPureComponent2 } from "../../common";
import { HTMLDivProps, MaybeElement, Props } from "../../common/props";
import { TagProps } from "../tag/tag";
export declare type TabId = string | number;
export declare type TabProps = ITabProps;
export interface ITabProps extends Props, Omit<HTMLDivProps, "id" | "title" | "onClick"> {
    children?: React.ReactNode;
    disabled?: boolean;
    id: TabId;
    panel?: JSX.Element;
    panelClassName?: string;
    title?: React.ReactNode;
    icon?: IconName | MaybeElement;
    tagContent?: TagProps["children"];
    tagProps?: Omit<TagProps, "children">;
}
export declare class Tab extends AbstractPureComponent2<TabProps> {
    static defaultProps: Partial<TabProps>;
    static displayName: string;
    render(): React.JSX.Element;
}
