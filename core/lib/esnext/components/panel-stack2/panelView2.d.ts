import { Panel } from "./panelTypes";
export interface PanelView2Props<T extends Panel<object>> {
    onClose: (removedPanel: T) => void;
    onOpen: (addedPanel: T) => void;
    panel: T;
    previousPanel?: T;
    showHeader: boolean;
}
interface PanelView2Component {
    <T extends Panel<object>>(props: PanelView2Props<T>): JSX.Element | null;
    displayName: string;
}
export declare const PanelView2: PanelView2Component;
export {};
