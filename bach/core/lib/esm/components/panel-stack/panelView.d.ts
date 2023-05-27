import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IPanel } from "./panelProps";
export interface IPanelViewProps {
    onClose: (removedPanel: IPanel<any>) => void;
    onOpen: (addedPanel: IPanel<any>) => void;
    panel: IPanel;
    previousPanel?: IPanel;
    showHeader: boolean;
}
export declare class PanelView extends AbstractPureComponent2<IPanelViewProps> {
    render(): React.JSX.Element;
    private maybeRenderHeader;
    private maybeRenderBack;
    private handleClose;
}
