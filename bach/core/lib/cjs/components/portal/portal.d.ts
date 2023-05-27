import * as React from "react";
import { ValidationMap } from "../../common/context";
import { Props } from "../../common/props";
export declare type PortalProps = IPortalProps;
export interface IPortalProps extends Props {
    children: React.ReactNode;
    onChildrenMount?: () => void;
    container?: HTMLElement;
    stopPropagationEvents?: Array<keyof HTMLElementEventMap>;
}
export interface IPortalState {
    hasMounted: boolean;
}
export declare type IPortalContext = PortalLegacyContext;
export interface PortalLegacyContext {
    blueprintPortalClassName?: string;
}
export declare class Portal extends React.Component<PortalProps, IPortalState> {
    static displayName: string;
    static contextTypes: ValidationMap<PortalLegacyContext>;
    static defaultProps: Partial<PortalProps>;
    context: PortalLegacyContext;
    state: IPortalState;
    private portalElement;
    render(): React.ReactPortal | null;
    componentDidMount(): void;
    componentDidUpdate(prevProps: PortalProps): void;
    componentWillUnmount(): void;
    private createContainerElement;
    private addStopPropagationListeners;
    private removeStopPropagationListeners;
}
