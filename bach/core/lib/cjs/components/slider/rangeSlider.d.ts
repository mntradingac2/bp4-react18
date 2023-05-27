import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { HandleHtmlProps } from "./handleProps";
import { ISliderBaseProps } from "./multiSlider";
export declare type NumberRange = [number, number];
export declare type RangeSliderProps = IRangeSliderProps;
export interface IRangeSliderProps extends ISliderBaseProps {
    value?: NumberRange;
    onChange?(value: NumberRange): void;
    onRelease?(value: NumberRange): void;
    handleHtmlProps?: {
        start?: HandleHtmlProps;
        end?: HandleHtmlProps;
    };
}
export declare class RangeSlider extends AbstractPureComponent2<RangeSliderProps> {
    static defaultProps: RangeSliderProps;
    static displayName: string;
    render(): React.JSX.Element;
    protected validateProps(props: RangeSliderProps): void;
}
