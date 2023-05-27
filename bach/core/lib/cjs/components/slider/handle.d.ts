import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { HandleProps } from "./handleProps";
export interface IInternalHandleProps extends HandleProps {
    disabled?: boolean;
    label: JSX.Element | string | undefined;
    max: number;
    min: number;
    stepSize: number;
    tickSize: number;
    tickSizeRatio: number;
    vertical: boolean;
}
export interface IHandleState {
    isMoving?: boolean;
}
export declare class Handle extends AbstractPureComponent2<IInternalHandleProps, IHandleState> {
    static displayName: string;
    state: {
        isMoving: boolean;
    };
    private handleElement;
    private refHandlers;
    componentDidMount(): void;
    render(): React.JSX.Element;
    componentWillUnmount(): void;
    clientToValue(clientPixel: number): number;
    mouseEventClientOffset(event: MouseEvent | React.MouseEvent<HTMLElement>): number;
    touchEventClientOffset(event: TouchEvent | React.TouchEvent<HTMLElement>): number;
    beginHandleMovement: (event: MouseEvent | React.MouseEvent<HTMLElement>) => void;
    beginHandleTouchMovement: (event: TouchEvent | React.TouchEvent<HTMLElement>) => void;
    protected validateProps(props: IInternalHandleProps): void;
    private getStyleProperties;
    private endHandleMovement;
    private endHandleTouchMovement;
    private handleMoveEndedAt;
    private handleHandleMovement;
    private handleHandleTouchMovement;
    private handleMovedTo;
    private handleKeyDown;
    private handleKeyUp;
    private changeValue;
    private clamp;
    private getHandleElementCenterPixel;
    private getHandleMidpointAndOffset;
    private removeDocumentEventListeners;
}
