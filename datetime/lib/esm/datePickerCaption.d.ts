/// <reference types="react" />
import { CaptionElementProps } from "react-day-picker";
import { AbstractPureComponent2 } from "@blueprintjs/core";
export interface IDatePickerCaptionProps extends CaptionElementProps {
    maxDate: Date;
    minDate: Date;
    onMonthChange?: (month: number) => void;
    onYearChange?: (year: number) => void;
    /** Callback invoked when the month or year `<select>` is changed. */
    onDateChange?: (date: Date) => void;
    reverseMonthAndYearMenus?: boolean;
}
export interface IDatePickerCaptionState {
    monthRightOffset: number;
}
export declare class DatePickerCaption extends AbstractPureComponent2<IDatePickerCaptionProps, IDatePickerCaptionState> {
    state: IDatePickerCaptionState;
    private containerElement;
    private displayedMonthText;
    private handleMonthSelectChange;
    private handleYearSelectChange;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private positionArrows;
    private dateChangeHandler;
}
