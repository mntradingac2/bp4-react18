import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { HandleHtmlProps } from "./handleProps";
import { ISliderBaseProps } from "./multiSlider";
export declare type SliderProps = ISliderProps;
export interface ISliderProps extends ISliderBaseProps {
    initialValue?: number;
    value?: number;
    onChange?(value: number): void;
    onRelease?(value: number): void;
    handleHtmlProps?: HandleHtmlProps;
}
export declare class Slider extends AbstractPureComponent2<SliderProps> {
    static defaultProps: SliderProps;
    static displayName: string;
    render(): React.JSX.Element;
}
