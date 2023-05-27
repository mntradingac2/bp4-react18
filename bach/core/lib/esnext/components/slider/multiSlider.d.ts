import * as React from "react";
import { AbstractPureComponent2, Intent } from "../../common";
import { IntentProps, Props } from "../../common/props";
export interface ISliderBaseProps extends Props, IntentProps {
    children?: React.ReactNode;
    disabled?: boolean;
    labelStepSize?: number;
    labelValues?: readonly number[];
    labelPrecision?: number;
    max?: number;
    min?: number;
    showTrackFill?: boolean;
    stepSize?: number;
    labelRenderer?: boolean | ((value: number, opts?: {
        isHandleTooltip: boolean;
    }) => string | JSX.Element);
    vertical?: boolean;
}
export declare type MultiSliderProps = IMultiSliderProps;
export interface IMultiSliderProps extends ISliderBaseProps {
    defaultTrackIntent?: Intent;
    onChange?(values: number[]): void;
    onRelease?(values: number[]): void;
}
export interface ISliderState {
    labelPrecision: number;
    tickSize: number;
    tickSizeRatio: number;
}
export declare class MultiSlider extends AbstractPureComponent2<MultiSliderProps, ISliderState> {
    static defaultSliderProps: ISliderBaseProps;
    static defaultProps: MultiSliderProps;
    static displayName: string;
    static Handle: React.FC<import("./handleProps").IHandleProps>;
    static getDerivedStateFromProps(props: MultiSliderProps): {
        labelPrecision: number;
    };
    private static getLabelPrecision;
    state: ISliderState;
    private handleElements;
    private trackElement;
    getSnapshotBeforeUpdate(prevProps: MultiSliderProps): null;
    render(): React.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: MultiSliderProps, prevState: ISliderState): void;
    protected validateProps(props: React.PropsWithChildren<MultiSliderProps>): void;
    private formatLabel;
    private renderLabels;
    private renderTracks;
    private renderTrackFill;
    private renderHandles;
    private addHandleRef;
    private maybeHandleTrackClick;
    private maybeHandleTrackTouch;
    private canHandleTrackEvent;
    private nearestHandleForValue;
    private getHandlerForIndex;
    private getNewHandleValues;
    private findFirstLockedHandleIndex;
    private handleChange;
    private handleRelease;
    private getLabelValues;
    private getOffsetRatio;
    private getTrackIntent;
    private updateTickSize;
}
