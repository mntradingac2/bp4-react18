import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
import { Tab, TabId } from "./tab";
export declare const Expander: React.FC;
export declare type TabsProps = ITabsProps;
export interface ITabsProps extends Props {
    animate?: boolean;
    children?: React.ReactNode;
    defaultSelectedTabId?: TabId;
    id: TabId;
    large?: boolean;
    renderActiveTabPanelOnly?: boolean;
    selectedTabId?: TabId;
    vertical?: boolean;
    fill?: boolean;
    onChange?(newTabId: TabId, prevTabId: TabId | undefined, event: React.MouseEvent<HTMLElement>): void;
}
export interface ITabsState {
    indicatorWrapperStyle?: React.CSSProperties;
    selectedTabId?: TabId;
}
export declare class Tabs extends AbstractPureComponent2<TabsProps, ITabsState> {
    static Expander: React.FC<{}>;
    static Tab: typeof Tab;
    static defaultProps: Partial<TabsProps>;
    static displayName: string;
    static getDerivedStateFromProps({ selectedTabId }: TabsProps): {
        selectedTabId: TabId;
    } | null;
    private tablistElement;
    private refHandlers;
    constructor(props: TabsProps);
    render(): React.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TabsProps, prevState: ITabsState): void;
    private getInitialSelectedTabId;
    private getKeyCodeDirection;
    private getTabChildrenProps;
    private getTabChildren;
    private getTabElements;
    private handleKeyDown;
    private handleKeyPress;
    private handleTabClick;
    private moveSelectionIndicator;
    private renderTabPanel;
    private renderTabTitle;
}
