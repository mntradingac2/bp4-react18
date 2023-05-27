import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IProps } from "../../common/props";
import { IPanel } from "./panelProps";
export interface IPanelStackProps extends IProps {
    initialPanel?: IPanel<any>;
    onClose?: (removedPanel: IPanel) => void;
    onOpen?: (addedPanel: IPanel) => void;
    renderActivePanelOnly?: boolean;
    showPanelHeader?: boolean;
    stack?: Array<IPanel<any>>;
}
export interface IPanelStackState {
    direction: "push" | "pop";
    stack: IPanel[];
}
export declare class PanelStack extends AbstractPureComponent2<IPanelStackProps, IPanelStackState> {
    state: IPanelStackState;
    componentDidUpdate(prevProps: IPanelStackProps, prevState: IPanelStackState): void;
    render(): React.JSX.Element;
    protected validateProps(props: IPanelStackProps): void;
    private renderPanels;
    private renderPanel;
    private handlePanelClose;
    private handlePanelOpen;
}
