import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { TabId, TabProps } from "./tab";
export declare type TabTitleProps = ITabTitleProps;
export interface ITabTitleProps extends TabProps {
    children?: React.ReactNode;
    onClick: (id: TabId, event: React.MouseEvent<HTMLElement>) => void;
    parentId: TabId;
    selected: boolean;
}
export declare class TabTitle extends AbstractPureComponent2<TabTitleProps> {
    static displayName: string;
    render(): React.JSX.Element;
    private handleClick;
}
export declare function generateTabPanelId(parentId: TabId, tabId: TabId): string;
export declare function generateTabTitleId(parentId: TabId, tabId: TabId): string;
