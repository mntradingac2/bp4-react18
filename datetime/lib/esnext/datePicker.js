/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import classNames from "classnames";
import * as React from "react";
import DayPicker from "react-day-picker";
import { AbstractPureComponent2, Button, DISPLAYNAME_PREFIX, Divider } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import * as DateUtils from "./common/dateUtils";
import * as Errors from "./common/errors";
import { DatePickerCaption } from "./datePickerCaption";
import { getDefaultMaxDate, getDefaultMinDate } from "./datePickerCore";
import { DatePickerNavbar } from "./datePickerNavbar";
import { Shortcuts } from "./shortcuts";
import { TimePicker } from "./timePicker";
/**
 * Date picker component.
 *
 * @see https://blueprintjs.com/docs/#datetime/datepicker
 */
export class DatePicker extends AbstractPureComponent2 {
    static defaultProps = {
        canClearSelection: true,
        clearButtonText: "Clear",
        dayPickerProps: {},
        highlightCurrentDay: false,
        maxDate: getDefaultMaxDate(),
        minDate: getDefaultMinDate(),
        reverseMonthAndYearMenus: false,
        shortcuts: false,
        showActionsBar: false,
        todayButtonText: "Today",
    };
    static displayName = `${DISPLAYNAME_PREFIX}.DatePicker`;
    ignoreNextMonthChange = false;
    constructor(props, context) {
        super(props, context);
        const value = getInitialValue(props);
        const initialMonth = getInitialMonth(props, value);
        this.state = {
            displayMonth: initialMonth.getMonth(),
            displayYear: initialMonth.getFullYear(),
            selectedDay: value == null ? null : value.getDate(),
            selectedShortcutIndex: this.props.selectedShortcutIndex !== undefined ? this.props.selectedShortcutIndex : -1,
            value,
        };
    }
    render() {
        const { className, dayPickerProps, footerElement, locale, localeUtils, maxDate, minDate, showActionsBar } = this.props;
        const { displayMonth, displayYear } = this.state;
        return (React.createElement("div", { className: classNames(Classes.DATEPICKER, className) },
            this.maybeRenderShortcuts(),
            React.createElement("div", { className: Classes.DATEPICKER_CONTENT },
                React.createElement(DayPicker, { showOutsideDays: true, locale: locale, localeUtils: localeUtils, modifiers: this.getDatePickerModifiers(), ...dayPickerProps, canChangeMonth: true, captionElement: this.renderCaption, navbarElement: this.renderNavbar, disabledDays: this.getDisabledDaysModifier(), fromMonth: minDate, month: new Date(displayYear, displayMonth), onDayClick: this.handleDayClick, onMonthChange: this.handleMonthChange, selectedDays: this.state.value, toMonth: maxDate, renderDay: dayPickerProps?.renderDay ?? this.renderDay }),
                this.maybeRenderTimePicker(),
                showActionsBar && this.renderOptionsBar(),
                footerElement)));
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        const { value } = this.props;
        if (value === prevProps.value) {
            // no action needed
            return;
        }
        else if (value == null) {
            // clear the value
            this.setState({ value });
        }
        else {
            this.setState({
                displayMonth: value.getMonth(),
                displayYear: value.getFullYear(),
                selectedDay: value.getDate(),
                value,
            });
        }
        if (this.props.selectedShortcutIndex !== prevProps.selectedShortcutIndex) {
            this.setState({ selectedShortcutIndex: this.props.selectedShortcutIndex });
        }
    }
    validateProps(props) {
        const { defaultValue, initialMonth, maxDate, minDate, value } = props;
        if (defaultValue != null && !DateUtils.isDayInRange(defaultValue, [minDate, maxDate])) {
            console.error(Errors.DATEPICKER_DEFAULT_VALUE_INVALID);
        }
        if (initialMonth != null && !DateUtils.isMonthInRange(initialMonth, [minDate, maxDate])) {
            console.error(Errors.DATEPICKER_INITIAL_MONTH_INVALID);
        }
        if (maxDate != null && minDate != null && maxDate < minDate && !DateUtils.areSameDay(maxDate, minDate)) {
            console.error(Errors.DATEPICKER_MAX_DATE_INVALID);
        }
        if (value != null && !DateUtils.isDayInRange(value, [minDate, maxDate])) {
            console.error(Errors.DATEPICKER_VALUE_INVALID);
        }
    }
    shouldHighlightCurrentDay = (date) => {
        const { highlightCurrentDay } = this.props;
        return highlightCurrentDay && DateUtils.isToday(date);
    };
    getDatePickerModifiers = () => {
        const { modifiers } = this.props;
        return {
            isToday: this.shouldHighlightCurrentDay,
            ...modifiers,
        };
    };
    renderDay = (day) => {
        const date = day.getDate();
        return React.createElement("div", { className: Classes.DATEPICKER_DAY_WRAPPER }, date);
    };
    disabledDays = (day) => !DateUtils.isDayInRange(day, [this.props.minDate, this.props.maxDate]);
    getDisabledDaysModifier = () => {
        const { dayPickerProps: { disabledDays }, } = this.props;
        return Array.isArray(disabledDays) ? [this.disabledDays, ...disabledDays] : [this.disabledDays, disabledDays];
    };
    renderCaption = (props) => (React.createElement(DatePickerCaption, { ...props, maxDate: this.props.maxDate, minDate: this.props.minDate, onDateChange: this.handleMonthChange, reverseMonthAndYearMenus: this.props.reverseMonthAndYearMenus }));
    renderNavbar = (props) => (React.createElement(DatePickerNavbar, { ...props, maxDate: this.props.maxDate, minDate: this.props.minDate }));
    renderOptionsBar() {
        const { clearButtonText, todayButtonText, minDate, maxDate, canClearSelection } = this.props;
        const todayEnabled = isTodayEnabled(minDate, maxDate);
        return [
            React.createElement(Divider, { key: "div" }),
            React.createElement("div", { className: Classes.DATEPICKER_FOOTER, key: "footer" },
                React.createElement(Button, { minimal: true, disabled: !todayEnabled, onClick: this.handleTodayClick, text: todayButtonText }),
                React.createElement(Button, { disabled: !canClearSelection, minimal: true, onClick: this.handleClearClick, text: clearButtonText })),
        ];
    }
    maybeRenderTimePicker() {
        const { timePrecision, timePickerProps, minDate, maxDate } = this.props;
        if (timePrecision == null && timePickerProps === undefined) {
            return null;
        }
        const applyMin = DateUtils.areSameDay(this.state.value, minDate);
        const applyMax = DateUtils.areSameDay(this.state.value, maxDate);
        return (React.createElement("div", { className: Classes.DATEPICKER_TIMEPICKER_WRAPPER },
            React.createElement(TimePicker, { precision: timePrecision, minTime: applyMin ? minDate : undefined, maxTime: applyMax ? maxDate : undefined, ...timePickerProps, onChange: this.handleTimeChange, value: this.state.value })));
    }
    maybeRenderShortcuts() {
        const { shortcuts } = this.props;
        if (shortcuts == null || shortcuts === false) {
            return null;
        }
        const { selectedShortcutIndex } = this.state;
        const { maxDate, minDate, timePrecision } = this.props;
        // Reuse the existing date range shortcuts and only care about start date
        const dateRangeShortcuts = shortcuts === true
            ? true
            : shortcuts.map(shortcut => ({
                ...shortcut,
                dateRange: [shortcut.date, undefined],
            }));
        return [
            React.createElement(Shortcuts, { key: "shortcuts", ...{
                    allowSingleDayRange: true,
                    maxDate,
                    minDate,
                    selectedShortcutIndex,
                    shortcuts: dateRangeShortcuts,
                    timePrecision,
                }, onShortcutClick: this.handleShortcutClick, useSingleDateShortcuts: true }),
            React.createElement(Divider, { key: "div" }),
        ];
    }
    handleDayClick = (day, modifiers, e) => {
        this.props.dayPickerProps.onDayClick?.(day, modifiers, e);
        if (modifiers.disabled) {
            return;
        }
        this.updateDay(day);
        // allow toggling selected date by clicking it again (if prop enabled)
        const newValue = this.props.canClearSelection && modifiers.selected ? null : DateUtils.getDateTime(day, this.state.value);
        this.updateValue(newValue, true);
    };
    handleShortcutClick = (shortcut, selectedShortcutIndex) => {
        const { onShortcutChange, selectedShortcutIndex: currentShortcutIndex } = this.props;
        const { dateRange, includeTime } = shortcut;
        const newDate = dateRange[0];
        const newValue = includeTime ? newDate : DateUtils.getDateTime(newDate, this.state.value);
        this.updateDay(newDate);
        this.updateValue(newValue, true);
        if (currentShortcutIndex === undefined) {
            this.setState({ selectedShortcutIndex });
        }
        const datePickerShortcut = { ...shortcut, date: shortcut.dateRange[0] };
        onShortcutChange?.(datePickerShortcut, selectedShortcutIndex);
    };
    updateDay = (day) => {
        if (this.props.value === undefined) {
            // set now if uncontrolled, otherwise they'll be updated in `componentDidUpdate`
            this.setState({
                displayMonth: day.getMonth(),
                displayYear: day.getFullYear(),
                selectedDay: day.getDate(),
            });
        }
        if (this.state.value != null && this.state.value.getMonth() !== day.getMonth()) {
            this.ignoreNextMonthChange = true;
        }
    };
    computeValidDateInSpecifiedMonthYear(displayYear, displayMonth) {
        const { minDate, maxDate } = this.props;
        const { selectedDay } = this.state;
        // month is 0-based, date is 1-based. date 0 is last day of previous month.
        const maxDaysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
        const displayDate = selectedDay == null ? 1 : Math.min(selectedDay, maxDaysInMonth);
        // 12:00 matches the underlying react-day-picker timestamp behavior
        const value = DateUtils.getDateTime(new Date(displayYear, displayMonth, displayDate, 12), this.state.value);
        // clamp between min and max dates
        if (value < minDate) {
            return minDate;
        }
        else if (value > maxDate) {
            return maxDate;
        }
        return value;
    }
    handleClearClick = () => this.updateValue(null, true);
    handleMonthChange = (newDate) => {
        const date = this.computeValidDateInSpecifiedMonthYear(newDate.getFullYear(), newDate.getMonth());
        this.setState({ displayMonth: date.getMonth(), displayYear: date.getFullYear() });
        if (this.state.value !== null) {
            // if handleDayClick just got run (so this flag is set), then the
            // user selected a date in a new month, so don't invoke onChange a
            // second time
            this.updateValue(date, false, this.ignoreNextMonthChange);
            this.ignoreNextMonthChange = false;
        }
        this.props.dayPickerProps.onMonthChange?.(date);
    };
    handleTodayClick = () => {
        const value = new Date();
        const displayMonth = value.getMonth();
        const displayYear = value.getFullYear();
        const selectedDay = value.getDate();
        this.setState({ displayMonth, displayYear, selectedDay });
        this.updateValue(value, true);
    };
    handleTimeChange = (time) => {
        this.props.timePickerProps?.onChange?.(time);
        const { value } = this.state;
        const newValue = DateUtils.getDateTime(value != null ? value : new Date(), time);
        this.updateValue(newValue, true);
    };
    /**
     * Update `value` by invoking `onChange` (always) and setting state (if uncontrolled).
     */
    updateValue(value, isUserChange, skipOnChange = false) {
        if (!skipOnChange) {
            this.props.onChange?.(value, isUserChange);
        }
        if (this.props.value === undefined) {
            this.setState({ value });
        }
    }
}
function getInitialValue(props) {
    // !== because `null` is a valid value (no date)
    if (props.value !== undefined) {
        return props.value;
    }
    if (props.defaultValue !== undefined) {
        return props.defaultValue;
    }
    return null;
}
function getInitialMonth(props, value) {
    const today = new Date();
    // != because we must have a real `Date` to begin the calendar on.
    if (props.initialMonth != null) {
        return props.initialMonth;
    }
    else if (value != null) {
        return value;
    }
    else if (DateUtils.isDayInRange(today, [props.minDate, props.maxDate])) {
        return today;
    }
    else {
        return DateUtils.getDateBetween([props.minDate, props.maxDate]);
    }
}
function isTodayEnabled(minDate, maxDate) {
    const today = new Date();
    return DateUtils.isDayInRange(today, [minDate, maxDate]);
}
//# sourceMappingURL=datePicker.js.map