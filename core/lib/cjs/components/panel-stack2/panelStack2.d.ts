import { Props } from "../../common";
import { Panel } from "./panelTypes";
export interface PanelStack2Props<T extends Panel<object>> extends Props {
    initialPanel?: T;
    onClose?: (removedPanel: T) => void;
    onOpen?: (addedPanel: T) => void;
    renderActivePanelOnly?: boolean;
    showPanelHeader?: boolean;
    stack?: readonly T[];
}
interface PanelStack2Component {
    <T extends Panel<object>>(props: PanelStack2Props<T>): JSX.Element | null;
    displayName: string;
}
export declare const PanelStack2: PanelStack2Component;
export {};
