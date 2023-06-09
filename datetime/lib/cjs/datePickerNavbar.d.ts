import * as React from "react";
import { NavbarElementProps } from "react-day-picker";
export interface IDatePickerNavbarProps extends NavbarElementProps {
    maxDate: Date;
    minDate: Date;
    hideLeftNavButton?: boolean;
    hideRightNavButton?: boolean;
}
export declare class DatePickerNavbar extends React.PureComponent<IDatePickerNavbarProps> {
    render(): JSX.Element;
    private handleNextClick;
    private handlePreviousClick;
}
