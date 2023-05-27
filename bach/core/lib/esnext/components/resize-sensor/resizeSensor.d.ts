import { ResizeObserverEntry } from "@juggle/resize-observer";
import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
export declare type ResizeSensorProps = IResizeSensorProps;
export interface IResizeSensorProps {
    children: React.ReactNode;
    onResize: (entries: ResizeObserverEntry[]) => void;
    observeParents?: boolean;
}
export declare class ResizeSensor extends AbstractPureComponent2<ResizeSensorProps> {
    static displayName: string;
    private element;
    private observer;
    render(): React.ReactNode;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ResizeSensorProps): void;
    componentWillUnmount(): void;
    private observeElement;
    private getElement;
}
