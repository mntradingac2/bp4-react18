/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to DateInput2 in the datetime2
 * package instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, DISPLAYNAME_PREFIX, InputGroup, Intent, Keys, Popover, refHandler, setRef, } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import { isDateValid, isDayInRange } from "./common/dateUtils";
import { getFormattedDateString } from "./dateFormat";
import { DatePicker } from "./datePicker";
import { getDefaultMaxDate, getDefaultMinDate } from "./datePickerCore";
/**
 * Date input component.
 *
 * @see https://blueprintjs.com/docs/#datetime/dateinput
 * @deprecated use { DateInput2 } from "@blueprintjs/datetime2"
 */
export class DateInput extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.DateInput`;
    static defaultProps = {
        closeOnSelection: true,
        dayPickerProps: {},
        disabled: false,
        invalidDateMessage: "Invalid date",
        maxDate: getDefaultMaxDate(),
        minDate: getDefaultMinDate(),
        outOfRangeMessage: "Out of range",
        reverseMonthAndYearMenus: false,
    };
    state = {
        isInputFocused: false,
        isOpen: false,
        value: this.props.value !== undefined ? this.props.value : this.props.defaultValue,
        valueString: null,
    };
    inputElement = null;
    popoverContentElement = null;
    handleInputRef = refHandler(this, "inputElement", this.props.inputProps?.inputRef);
    handlePopoverContentRef = refHandler(this, "popoverContentElement");
    render() {
        const { value, valueString } = this.state;
        const dateString = this.state.isInputFocused ? valueString : getFormattedDateString(value, this.props);
        const dateValue = isDateValid(value) ? value : null;
        const dayPickerProps = {
            ...this.props.dayPickerProps,
            onDayKeyDown: (day, modifiers, e) => {
                this.props.dayPickerProps.onDayKeyDown?.(day, modifiers, e);
            },
            onMonthChange: (month) => {
                this.props.dayPickerProps.onMonthChange?.(month);
            },
        };
        // React's onFocus prop listens to the focusin browser event under the hood, so it's safe to
        // provide it the focusIn event handlers instead of using a ref and manually adding the
        // event listeners ourselves.
        const wrappedPopoverContent = (React.createElement("div", { ref: this.handlePopoverContentRef },
            React.createElement("div", { onFocus: this.handleStartFocusBoundaryFocusIn, tabIndex: 0 }),
            React.createElement(DatePicker, { ...this.props, dayPickerProps: dayPickerProps, onChange: this.handleDateChange, value: dateValue, onShortcutChange: this.handleShortcutChange, selectedShortcutIndex: this.state.selectedShortcutIndex }),
            React.createElement("div", { onFocus: this.handleEndFocusBoundaryFocusIn, tabIndex: 0 })));
        // assign default empty object here to prevent mutation
        const { inputProps = {}, popoverProps = {} } = this.props;
        const isErrorState = value != null && (!isDateValid(value) || !this.isDateInRange(value));
        return (React.createElement(Popover, { isOpen: this.state.isOpen && !this.props.disabled, fill: this.props.fill, ...popoverProps, autoFocus: false, className: classNames(popoverProps.className, this.props.className), content: wrappedPopoverContent, enforceFocus: false, onClose: this.handleClosePopover, popoverClassName: classNames(Classes.DATEINPUT_POPOVER, popoverProps.popoverClassName) },
            React.createElement(InputGroup, { autoComplete: "off", intent: isErrorState ? Intent.DANGER : Intent.NONE, placeholder: this.props.placeholder, rightElement: this.props.rightElement, type: "text", ...inputProps, disabled: this.props.disabled, inputRef: this.handleInputRef, onBlur: this.handleInputBlur, onChange: this.handleInputChange, onClick: this.handleInputClick, onFocus: this.handleInputFocus, onKeyDown: this.handleInputKeyDown, value: dateString })));
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        if (prevProps.inputProps?.inputRef !== this.props.inputProps?.inputRef) {
            setRef(prevProps.inputProps?.inputRef, null);
            this.handleInputRef = refHandler(this, "inputElement", this.props.inputProps?.inputRef);
            setRef(this.props.inputProps?.inputRef, this.inputElement);
        }
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    }
    isDateInRange(value) {
        return isDayInRange(value, [this.props.minDate, this.props.maxDate]);
    }
    handleClosePopover = (e) => {
        const { popoverProps = {} } = this.props;
        popoverProps.onClose?.(e);
        this.setState({ isOpen: false });
    };
    handleDateChange = (newDate, isUserChange, didSubmitWithEnter = false) => {
        const prevDate = this.state.value;
        // this change handler was triggered by a change in month, day, or (if
        // enabled) time. for UX purposes, we want to close the popover only if
        // the user explicitly clicked a day within the current month.
        const isOpen = !isUserChange ||
            !this.props.closeOnSelection ||
            (prevDate != null && (this.hasMonthChanged(prevDate, newDate) || this.hasTimeChanged(prevDate, newDate)));
        // if selecting a date via click or Tab, the input will already be
        // blurred by now, so sync isInputFocused to false. if selecting via
        // Enter, setting isInputFocused to false won't do anything by itself,
        // plus we want the field to retain focus anyway.
        // (note: spelling out the ternary explicitly reads more clearly.)
        const isInputFocused = didSubmitWithEnter ? true : false;
        if (this.props.value === undefined) {
            const valueString = getFormattedDateString(newDate, this.props);
            this.setState({ isInputFocused, isOpen, value: newDate, valueString });
        }
        else {
            this.setState({ isInputFocused, isOpen });
        }
        this.props.onChange?.(newDate, isUserChange);
    };
    hasMonthChanged(prevDate, nextDate) {
        return (prevDate == null) !== (nextDate == null) || nextDate.getMonth() !== prevDate.getMonth();
    }
    hasTimeChanged(prevDate, nextDate) {
        if (this.props.timePrecision == null) {
            return false;
        }
        return ((prevDate == null) !== (nextDate == null) ||
            nextDate.getHours() !== prevDate.getHours() ||
            nextDate.getMinutes() !== prevDate.getMinutes() ||
            nextDate.getSeconds() !== prevDate.getSeconds() ||
            nextDate.getMilliseconds() !== prevDate.getMilliseconds());
    }
    handleInputFocus = (e) => {
        const valueString = this.state.value == null ? "" : this.formatDate(this.state.value);
        this.setState({ isInputFocused: true, isOpen: true, valueString });
        this.safeInvokeInputProp("onFocus", e);
    };
    handleInputClick = (e) => {
        // stop propagation to the Popover's internal handleTargetClick handler;
        // otherwise, the popover will flicker closed as soon as it opens.
        e.stopPropagation();
        this.safeInvokeInputProp("onClick", e);
    };
    handleInputChange = (e) => {
        const valueString = e.target.value;
        const value = this.parseDate(valueString);
        if (isDateValid(value) && this.isDateInRange(value)) {
            if (this.props.value === undefined) {
                this.setState({ value, valueString });
            }
            else {
                this.setState({ valueString });
            }
            this.props.onChange?.(value, true);
        }
        else {
            if (valueString.length === 0) {
                this.props.onChange?.(null, true);
            }
            this.setState({ valueString });
        }
        this.safeInvokeInputProp("onChange", e);
    };
    handleInputBlur = (e) => {
        const { valueString } = this.state;
        const date = this.parseDate(valueString);
        if (valueString.length > 0 &&
            valueString !== getFormattedDateString(this.state.value, this.props) &&
            (!isDateValid(date) || !this.isDateInRange(date))) {
            if (this.props.value === undefined) {
                this.setState({ isInputFocused: false, value: date, valueString: null });
            }
            else {
                this.setState({ isInputFocused: false });
            }
            if (isNaN(date.valueOf())) {
                this.props.onError?.(new Date(undefined));
            }
            else if (!this.isDateInRange(date)) {
                this.props.onError?.(date);
            }
            else {
                this.props.onChange?.(date, true);
            }
        }
        else {
            if (valueString.length === 0) {
                this.setState({ isInputFocused: false, value: null, valueString: null });
            }
            else {
                this.setState({ isInputFocused: false });
            }
        }
        this.safeInvokeInputProp("onBlur", e);
    };
    handleInputKeyDown = (e) => {
        // HACKHACK: https://github.com/palantir/blueprint/issues/4165
        if (e.which === Keys.ENTER) {
            const nextDate = this.parseDate(this.state.valueString);
            this.handleDateChange(nextDate, true, true);
        }
        else if (e.which === Keys.TAB && e.shiftKey) {
            // close popover on SHIFT+TAB key press
            this.handleClosePopover();
        }
        else if (e.which === Keys.TAB && this.state.isOpen) {
            this.getKeyboardFocusableElements().shift()?.focus();
            // necessary to prevent focusing the second focusable element
            e.preventDefault();
        }
        else if (e.which === Keys.ESCAPE) {
            this.setState({ isOpen: false });
            this.inputElement?.blur();
        }
        this.safeInvokeInputProp("onKeyDown", e);
    };
    getKeyboardFocusableElements = () => {
        const elements = Array.from(this.popoverContentElement?.querySelectorAll("button:not([disabled]),input,[tabindex]:not([tabindex='-1'])"));
        // Remove focus boundary div elements
        elements.pop();
        elements.shift();
        return elements;
    };
    handleStartFocusBoundaryFocusIn = (e) => {
        if (this.popoverContentElement.contains(this.getRelatedTarget(e))) {
            // Not closing Popover to allow user to freely switch between manually entering a date
            // string in the input and selecting one via the Popover
            this.inputElement?.focus();
        }
        else {
            this.getKeyboardFocusableElements().shift()?.focus();
        }
    };
    handleEndFocusBoundaryFocusIn = (e) => {
        if (this.popoverContentElement.contains(this.getRelatedTarget(e))) {
            this.inputElement?.focus();
            this.handleClosePopover();
        }
        else {
            this.getKeyboardFocusableElements().pop()?.focus();
        }
    };
    getRelatedTarget(e) {
        // Support IE11 (#2924)
        return (e.relatedTarget ?? document.activeElement);
    }
    handleShortcutChange = (_, selectedShortcutIndex) => {
        this.setState({ selectedShortcutIndex });
    };
    /** safe wrapper around invoking input props event handler (prop defaults to undefined) */
    safeInvokeInputProp(name, e) {
        const { inputProps = {} } = this.props;
        inputProps[name]?.(e);
    }
    parseDate(dateString) {
        if (dateString === this.props.outOfRangeMessage || dateString === this.props.invalidDateMessage) {
            return null;
        }
        const { locale, parseDate } = this.props;
        const newDate = parseDate(dateString, locale);
        return newDate === false ? new Date(undefined) : newDate;
    }
    formatDate(date) {
        if (!isDateValid(date) || !this.isDateInRange(date)) {
            return "";
        }
        const { locale, formatDate } = this.props;
        return formatDate(date, locale);
    }
}
//# sourceMappingURL=dateInput.js.map