/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
 * All changes & bugfixes should be made to DateRangeInput2 in the datetime2
 * package instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import DayPicker from "react-day-picker";
import { AbstractPureComponent2, Boundary, Classes, DISPLAYNAME_PREFIX, InputGroup, Intent, Keys, Popover, Position, refHandler, setRef, } from "@blueprintjs/core";
import { areSameTime, isDateValid, isDayInRange } from "./common/dateUtils";
import * as Errors from "./common/errors";
import { getFormattedDateString } from "./dateFormat";
import { getDefaultMaxDate, getDefaultMinDate } from "./datePickerCore";
import { DateRangePicker } from "./dateRangePicker";
/**
 * Date range input component.
 *
 * @see https://blueprintjs.com/docs/#datetime/daterangeinput
 * @deprecated use { DateRangeInput2 } from "@blueprintjs/datetime2"
 */
export class DateRangeInput extends AbstractPureComponent2 {
    static defaultProps = {
        allowSingleDayRange: false,
        closeOnSelection: true,
        contiguousCalendarMonths: true,
        dayPickerProps: {},
        disabled: false,
        endInputProps: {},
        invalidDateMessage: "Invalid date",
        maxDate: getDefaultMaxDate(),
        minDate: getDefaultMinDate(),
        outOfRangeMessage: "Out of range",
        overlappingDatesMessage: "Overlapping dates",
        popoverProps: {},
        selectAllOnFocus: false,
        shortcuts: true,
        singleMonthOnly: false,
        startInputProps: {},
    };
    static displayName = `${DISPLAYNAME_PREFIX}.DateRangeInput`;
    startInputElement = null;
    endInputElement = null;
    handleStartInputRef = refHandler(this, "startInputElement", this.props.startInputProps?.inputRef);
    handleEndInputRef = refHandler(this, "endInputElement", this.props.endInputProps?.inputRef);
    constructor(props) {
        super(props);
        this.reset(props);
    }
    /**
     * Public method intended for unit testing only. Do not use in feature work!
     */
    reset(props = this.props) {
        const [selectedStart, selectedEnd] = this.getInitialRange();
        this.state = {
            formattedMaxDateString: this.getFormattedMinMaxDateString(props, "maxDate"),
            formattedMinDateString: this.getFormattedMinMaxDateString(props, "minDate"),
            isOpen: false,
            selectedEnd,
            selectedShortcutIndex: -1,
            selectedStart,
        };
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        const { isStartInputFocused, isEndInputFocused, shouldSelectAfterUpdate } = this.state;
        if (prevProps.startInputProps?.inputRef !== this.props.startInputProps?.inputRef) {
            setRef(prevProps.startInputProps?.inputRef, null);
            this.handleStartInputRef = refHandler(this, "startInputElement", this.props.startInputProps?.inputRef);
            setRef(this.props.startInputProps?.inputRef, this.startInputElement);
        }
        if (prevProps.endInputProps?.inputRef !== this.props.endInputProps?.inputRef) {
            setRef(prevProps.endInputProps?.inputRef, null);
            this.handleEndInputRef = refHandler(this, "endInputElement", this.props.endInputProps?.inputRef);
            setRef(this.props.endInputProps?.inputRef, this.endInputElement);
        }
        const shouldFocusStartInput = this.shouldFocusInputRef(isStartInputFocused, this.startInputElement);
        const shouldFocusEndInput = this.shouldFocusInputRef(isEndInputFocused, this.endInputElement);
        if (shouldFocusStartInput) {
            this.startInputElement?.focus();
        }
        else if (shouldFocusEndInput) {
            this.endInputElement?.focus();
        }
        if (isStartInputFocused && shouldSelectAfterUpdate) {
            this.startInputElement?.select();
        }
        else if (isEndInputFocused && shouldSelectAfterUpdate) {
            this.endInputElement?.select();
        }
        let nextState = {};
        if (this.props.value !== prevProps.value) {
            const [selectedStart, selectedEnd] = this.getInitialRange(this.props);
            nextState = { ...nextState, selectedStart, selectedEnd };
        }
        // cache the formatted date strings to avoid computing on each render.
        if (this.props.minDate !== prevProps.minDate) {
            const formattedMinDateString = this.getFormattedMinMaxDateString(this.props, "minDate");
            nextState = { ...nextState, formattedMinDateString };
        }
        if (this.props.maxDate !== prevProps.maxDate) {
            const formattedMaxDateString = this.getFormattedMinMaxDateString(this.props, "maxDate");
            nextState = { ...nextState, formattedMaxDateString };
        }
        this.setState(nextState);
    }
    render() {
        const { selectedShortcutIndex } = this.state;
        const { popoverProps = {} } = this.props;
        const popoverContent = (React.createElement(DateRangePicker, { ...this.props, selectedShortcutIndex: selectedShortcutIndex, boundaryToModify: this.state.boundaryToModify, onChange: this.handleDateRangePickerChange, onShortcutChange: this.handleShortcutChange, onHoverChange: this.handleDateRangePickerHoverChange, value: this.getSelectedRange() }));
        const popoverClassName = classNames(popoverProps.className, this.props.className);
        // allow custom props for the popover and each input group, but pass them in an order that
        // guarantees only some props are overridable.
        return (React.createElement(Popover, { isOpen: this.state.isOpen, position: Position.BOTTOM_LEFT, ...this.props.popoverProps, autoFocus: false, className: popoverClassName, content: popoverContent, enforceFocus: false, onClose: this.handlePopoverClose },
            React.createElement("div", { className: Classes.CONTROL_GROUP },
                this.renderInputGroup(Boundary.START),
                this.renderInputGroup(Boundary.END))));
    }
    validateProps(props) {
        if (props.value === null) {
            throw new Error(Errors.DATERANGEINPUT_NULL_VALUE);
        }
    }
    renderInputGroup = (boundary) => {
        const inputProps = this.getInputProps(boundary);
        const handleInputEvent = boundary === Boundary.START ? this.handleStartInputEvent : this.handleEndInputEvent;
        return (React.createElement(InputGroup, { autoComplete: "off", disabled: inputProps.disabled || this.props.disabled, ...inputProps, intent: this.isInputInErrorState(boundary) ? Intent.DANGER : inputProps.intent, inputRef: this.getInputRef(boundary), onBlur: handleInputEvent, onChange: handleInputEvent, onClick: handleInputEvent, onFocus: handleInputEvent, onKeyDown: handleInputEvent, onMouseDown: handleInputEvent, placeholder: this.getInputPlaceholderString(boundary), value: this.getInputDisplayString(boundary) }));
    };
    // Callbacks - DateRangePicker
    // ===========================
    handleDateRangePickerChange = (selectedRange, didSubmitWithEnter = false) => {
        // ignore mouse events in the date-range picker if the popover is animating closed.
        if (!this.state.isOpen) {
            return;
        }
        const [selectedStart, selectedEnd] = selectedRange;
        let isOpen = true;
        let isStartInputFocused;
        let isEndInputFocused;
        let startHoverString;
        let endHoverString;
        let boundaryToModify;
        if (selectedStart == null) {
            // focus the start field by default or if only an end date is specified
            if (this.props.timePrecision == null) {
                isStartInputFocused = true;
                isEndInputFocused = false;
            }
            else {
                isStartInputFocused = false;
                isEndInputFocused = false;
                boundaryToModify = Boundary.START;
            }
            // for clarity, hide the hover string until the mouse moves over a different date
            startHoverString = null;
        }
        else if (selectedEnd == null) {
            // focus the end field if a start date is specified
            if (this.props.timePrecision == null) {
                isStartInputFocused = false;
                isEndInputFocused = true;
            }
            else {
                isStartInputFocused = false;
                isEndInputFocused = false;
                boundaryToModify = Boundary.END;
            }
            endHoverString = null;
        }
        else if (this.props.closeOnSelection) {
            isOpen = this.getIsOpenValueWhenDateChanges(selectedStart, selectedEnd);
            isStartInputFocused = false;
            if (this.props.timePrecision == null && didSubmitWithEnter) {
                // if we submit via click or Tab, the focus will have moved already.
                // it we submit with Enter, the focus won't have moved, and setting
                // the flag to false won't have an effect anyway, so leave it true.
                isEndInputFocused = true;
            }
            else {
                isEndInputFocused = false;
                boundaryToModify = Boundary.END;
            }
        }
        else if (this.state.lastFocusedField === Boundary.START) {
            // keep the start field focused
            if (this.props.timePrecision == null) {
                isStartInputFocused = true;
                isEndInputFocused = false;
            }
            else {
                isStartInputFocused = false;
                isEndInputFocused = false;
                boundaryToModify = Boundary.START;
            }
        }
        else if (this.props.timePrecision == null) {
            // keep the end field focused
            isStartInputFocused = false;
            isEndInputFocused = true;
        }
        else {
            isStartInputFocused = false;
            isEndInputFocused = false;
            boundaryToModify = Boundary.END;
        }
        const baseStateChange = {
            boundaryToModify,
            endHoverString,
            endInputString: this.formatDate(selectedEnd),
            isEndInputFocused,
            isOpen,
            isStartInputFocused,
            startHoverString,
            startInputString: this.formatDate(selectedStart),
            wasLastFocusChangeDueToHover: false,
        };
        if (this.isControlled()) {
            this.setState(baseStateChange);
        }
        else {
            this.setState({ ...baseStateChange, selectedEnd, selectedStart });
        }
        this.props.onChange?.(selectedRange);
    };
    handleShortcutChange = (_, selectedShortcutIndex) => {
        this.setState({ selectedShortcutIndex });
    };
    handleDateRangePickerHoverChange = (hoveredRange, _hoveredDay, hoveredBoundary) => {
        // ignore mouse events in the date-range picker if the popover is animating closed.
        if (!this.state.isOpen) {
            return;
        }
        if (hoveredRange == null) {
            // undo whatever focus changes we made while hovering over various calendar dates
            const isEndInputFocused = this.state.boundaryToModify === Boundary.END;
            this.setState({
                endHoverString: null,
                isEndInputFocused,
                isStartInputFocused: !isEndInputFocused,
                lastFocusedField: this.state.boundaryToModify,
                startHoverString: null,
            });
        }
        else {
            const [hoveredStart, hoveredEnd] = hoveredRange;
            const isStartInputFocused = hoveredBoundary != null ? hoveredBoundary === Boundary.START : this.state.isStartInputFocused;
            const isEndInputFocused = hoveredBoundary != null ? hoveredBoundary === Boundary.END : this.state.isEndInputFocused;
            this.setState({
                endHoverString: this.formatDate(hoveredEnd),
                isEndInputFocused,
                isStartInputFocused,
                lastFocusedField: isStartInputFocused ? Boundary.START : Boundary.END,
                shouldSelectAfterUpdate: this.props.selectAllOnFocus,
                startHoverString: this.formatDate(hoveredStart),
                wasLastFocusChangeDueToHover: true,
            });
        }
    };
    // Callbacks - Input
    // =================
    // instantiate these two functions once so we don't have to for each callback on each render.
    handleStartInputEvent = (e) => {
        this.handleInputEvent(e, Boundary.START);
    };
    handleEndInputEvent = (e) => {
        this.handleInputEvent(e, Boundary.END);
    };
    handleInputEvent = (e, boundary) => {
        const inputProps = this.getInputProps(boundary);
        switch (e.type) {
            case "blur":
                this.handleInputBlur(e, boundary);
                inputProps.onBlur?.(e);
                break;
            case "change":
                this.handleInputChange(e, boundary);
                inputProps.onChange?.(e);
                break;
            case "click":
                e = e;
                this.handleInputClick(e);
                inputProps.onClick?.(e);
                break;
            case "focus":
                this.handleInputFocus(e, boundary);
                inputProps.onFocus?.(e);
                break;
            case "keydown":
                e = e;
                this.handleInputKeyDown(e);
                inputProps.onKeyDown?.(e);
                break;
            case "mousedown":
                e = e;
                this.handleInputMouseDown();
                inputProps.onMouseDown?.(e);
                break;
            default:
                break;
        }
    };
    // add a keydown listener to persistently change focus when tabbing:
    // - if focused in start field, Tab moves focus to end field
    // - if focused in end field, Shift+Tab moves focus to start field
    handleInputKeyDown = (e) => {
        // HACKHACK: https://github.com/palantir/blueprint/issues/4165
        const isTabPressed = e.which === Keys.TAB;
        const isEnterPressed = e.which === Keys.ENTER;
        const isShiftPressed = e.shiftKey;
        const { selectedStart, selectedEnd } = this.state;
        // order of JS events is our enemy here. when tabbing between fields,
        // this handler will fire in the middle of a focus exchange when no
        // field is currently focused. we work around this by referring to the
        // most recently focused field, rather than the currently focused field.
        const wasStartFieldFocused = this.state.lastFocusedField === Boundary.START;
        const wasEndFieldFocused = this.state.lastFocusedField === Boundary.END;
        // move focus to the other field
        if (isTabPressed) {
            let isEndInputFocused;
            let isStartInputFocused;
            let isOpen = true;
            if (wasStartFieldFocused && !isShiftPressed) {
                isStartInputFocused = false;
                isEndInputFocused = true;
                // prevent the default focus-change behavior to avoid race conditions;
                // we'll handle the focus change ourselves in componentDidUpdate.
                e.preventDefault();
            }
            else if (wasEndFieldFocused && isShiftPressed) {
                isStartInputFocused = true;
                isEndInputFocused = false;
                e.preventDefault();
            }
            else {
                // don't prevent default here, otherwise Tab won't do anything.
                isStartInputFocused = false;
                isEndInputFocused = false;
                isOpen = false;
            }
            this.setState({
                isEndInputFocused,
                isOpen,
                isStartInputFocused,
                wasLastFocusChangeDueToHover: false,
            });
        }
        else if (wasStartFieldFocused && isEnterPressed) {
            const nextStartDate = this.parseDate(this.state.startInputString);
            this.handleDateRangePickerChange([nextStartDate, selectedEnd], true);
        }
        else if (wasEndFieldFocused && isEnterPressed) {
            const nextEndDate = this.parseDate(this.state.endInputString);
            this.handleDateRangePickerChange([selectedStart, nextEndDate], true);
        }
        else {
            // let the default keystroke happen without side effects
            return;
        }
    };
    handleInputMouseDown = () => {
        // clicking in the field constitutes an explicit focus change. we update
        // the flag on "mousedown" instead of on "click", because it needs to be
        // set before onFocus is called ("click" triggers after "focus").
        this.setState({ wasLastFocusChangeDueToHover: false });
    };
    handleInputClick = (e) => {
        // unless we stop propagation on this event, a click within an input
        // will close the popover almost as soon as it opens.
        e.stopPropagation();
    };
    handleInputFocus = (_e, boundary) => {
        const { keys, values } = this.getStateKeysAndValuesForBoundary(boundary);
        const inputString = getFormattedDateString(values.selectedValue, this.props, true);
        // change the boundary only if the user explicitly focused in the field.
        // focus changes from hovering don't count; they're just temporary.
        const boundaryToModify = this.state.wasLastFocusChangeDueToHover ? this.state.boundaryToModify : boundary;
        this.setState({
            [keys.inputString]: inputString,
            [keys.isInputFocused]: true,
            boundaryToModify,
            isOpen: true,
            lastFocusedField: boundary,
            shouldSelectAfterUpdate: this.props.selectAllOnFocus,
            wasLastFocusChangeDueToHover: false,
        });
    };
    handleInputBlur = (_e, boundary) => {
        const { keys, values } = this.getStateKeysAndValuesForBoundary(boundary);
        const maybeNextDate = this.parseDate(values.inputString);
        const isValueControlled = this.isControlled();
        let nextState = {
            [keys.isInputFocused]: false,
            shouldSelectAfterUpdate: false,
        };
        if (this.isInputEmpty(values.inputString)) {
            if (isValueControlled) {
                nextState = {
                    ...nextState,
                    [keys.inputString]: getFormattedDateString(values.controlledValue, this.props),
                };
            }
            else {
                nextState = {
                    ...nextState,
                    [keys.inputString]: null,
                    [keys.selectedValue]: null,
                };
            }
        }
        else if (!this.isNextDateRangeValid(maybeNextDate, boundary)) {
            if (!isValueControlled) {
                nextState = {
                    ...nextState,
                    [keys.inputString]: null,
                    [keys.selectedValue]: maybeNextDate,
                };
            }
            this.props.onError?.(this.getDateRangeForCallback(maybeNextDate, boundary));
        }
        this.setState(nextState);
    };
    handleInputChange = (e, boundary) => {
        const inputString = e.target.value;
        const { keys } = this.getStateKeysAndValuesForBoundary(boundary);
        const maybeNextDate = this.parseDate(inputString);
        const isValueControlled = this.isControlled();
        let nextState = { shouldSelectAfterUpdate: false };
        if (inputString.length === 0) {
            // this case will be relevant when we start showing the hovered range in the input
            // fields. goal is to show an empty field for clarity until the mouse moves over a
            // different date.
            const baseState = { ...nextState, [keys.inputString]: "" };
            if (isValueControlled) {
                nextState = baseState;
            }
            else {
                nextState = { ...baseState, [keys.selectedValue]: null };
            }
            this.props.onChange?.(this.getDateRangeForCallback(null, boundary));
        }
        else if (this.isDateValidAndInRange(maybeNextDate)) {
            // note that error cases that depend on both fields (e.g. overlapping dates) should fall
            // through into this block so that the UI can update immediately, possibly with an error
            // message on the other field.
            // also, clear the hover string to ensure the most recent keystroke appears.
            const baseState = {
                ...nextState,
                [keys.hoverString]: null,
                [keys.inputString]: inputString,
            };
            if (isValueControlled) {
                nextState = baseState;
            }
            else {
                nextState = { ...baseState, [keys.selectedValue]: maybeNextDate };
            }
            if (this.isNextDateRangeValid(maybeNextDate, boundary)) {
                this.props.onChange?.(this.getDateRangeForCallback(maybeNextDate, boundary));
            }
        }
        else {
            // again, clear the hover string to ensure the most recent keystroke appears
            nextState = { ...nextState, [keys.inputString]: inputString, [keys.hoverString]: null };
        }
        this.setState(nextState);
    };
    // Callbacks - Popover
    // ===================
    handlePopoverClose = (event) => {
        this.setState({ isOpen: false });
        this.props.popoverProps.onClose?.(event);
    };
    // Helpers
    // =======
    shouldFocusInputRef(isFocused, inputRef) {
        return isFocused && inputRef !== undefined && document.activeElement !== inputRef;
    }
    getIsOpenValueWhenDateChanges = (nextSelectedStart, nextSelectedEnd) => {
        if (this.props.closeOnSelection) {
            // trivial case when TimePicker is not shown
            if (this.props.timePrecision == null) {
                return false;
            }
            const fallbackDate = new Date(new Date().setHours(0, 0, 0, 0));
            const [selectedStart, selectedEnd] = this.getSelectedRange([fallbackDate, fallbackDate]);
            // case to check if the user has changed TimePicker values
            if (areSameTime(selectedStart, nextSelectedStart) === true &&
                areSameTime(selectedEnd, nextSelectedEnd) === true) {
                return false;
            }
            return true;
        }
        return true;
    };
    getInitialRange = (props = this.props) => {
        const { defaultValue, value } = props;
        if (value != null) {
            return value;
        }
        else if (defaultValue != null) {
            return defaultValue;
        }
        else {
            return [null, null];
        }
    };
    getSelectedRange = (fallbackRange) => {
        let selectedStart;
        let selectedEnd;
        if (this.isControlled()) {
            [selectedStart, selectedEnd] = this.props.value;
        }
        else {
            selectedStart = this.state.selectedStart;
            selectedEnd = this.state.selectedEnd;
        }
        // this helper function checks if the provided boundary date *would* overlap the selected
        // other boundary date. providing the already-selected start date simply tells us if we're
        // currently in an overlapping state.
        const doBoundaryDatesOverlap = this.doBoundaryDatesOverlap(selectedStart, Boundary.START);
        const dateRange = [selectedStart, doBoundaryDatesOverlap ? undefined : selectedEnd];
        return dateRange.map((selectedBound, index) => {
            const fallbackDate = fallbackRange != null ? fallbackRange[index] : undefined;
            return this.isDateValidAndInRange(selectedBound) ? selectedBound : fallbackDate;
        });
    };
    getInputDisplayString = (boundary) => {
        const { values } = this.getStateKeysAndValuesForBoundary(boundary);
        const { isInputFocused, inputString, selectedValue, hoverString } = values;
        if (hoverString != null) {
            return hoverString;
        }
        else if (isInputFocused) {
            return inputString == null ? "" : inputString;
        }
        else if (selectedValue == null) {
            return "";
        }
        else if (this.doesEndBoundaryOverlapStartBoundary(selectedValue, boundary)) {
            return this.props.overlappingDatesMessage;
        }
        else {
            return getFormattedDateString(selectedValue, this.props);
        }
    };
    getInputPlaceholderString = (boundary) => {
        const isStartBoundary = boundary === Boundary.START;
        const isEndBoundary = boundary === Boundary.END;
        const inputProps = this.getInputProps(boundary);
        const { isInputFocused } = this.getStateKeysAndValuesForBoundary(boundary).values;
        // use the custom placeholder text for the input, if providied
        if (inputProps.placeholder != null) {
            return inputProps.placeholder;
        }
        else if (isStartBoundary) {
            return isInputFocused ? this.state.formattedMinDateString : "Start date";
        }
        else if (isEndBoundary) {
            return isInputFocused ? this.state.formattedMaxDateString : "End date";
        }
        else {
            return "";
        }
    };
    getInputProps = (boundary) => {
        return boundary === Boundary.START ? this.props.startInputProps : this.props.endInputProps;
    };
    getInputRef = (boundary) => {
        return boundary === Boundary.START ? this.handleStartInputRef : this.handleEndInputRef;
    };
    getStateKeysAndValuesForBoundary = (boundary) => {
        const controlledRange = this.props.value;
        if (boundary === Boundary.START) {
            return {
                keys: {
                    hoverString: "startHoverString",
                    inputString: "startInputString",
                    isInputFocused: "isStartInputFocused",
                    selectedValue: "selectedStart",
                },
                values: {
                    controlledValue: controlledRange != null ? controlledRange[0] : undefined,
                    hoverString: this.state.startHoverString,
                    inputString: this.state.startInputString,
                    isInputFocused: this.state.isStartInputFocused,
                    selectedValue: this.state.selectedStart,
                },
            };
        }
        else {
            return {
                keys: {
                    hoverString: "endHoverString",
                    inputString: "endInputString",
                    isInputFocused: "isEndInputFocused",
                    selectedValue: "selectedEnd",
                },
                values: {
                    controlledValue: controlledRange != null ? controlledRange[1] : undefined,
                    hoverString: this.state.endHoverString,
                    inputString: this.state.endInputString,
                    isInputFocused: this.state.isEndInputFocused,
                    selectedValue: this.state.selectedEnd,
                },
            };
        }
    };
    getDateRangeForCallback = (currDate, currBoundary) => {
        const otherBoundary = this.getOtherBoundary(currBoundary);
        const otherDate = this.getStateKeysAndValuesForBoundary(otherBoundary).values.selectedValue;
        return currBoundary === Boundary.START ? [currDate, otherDate] : [otherDate, currDate];
    };
    getOtherBoundary = (boundary) => {
        return boundary === Boundary.START ? Boundary.END : Boundary.START;
    };
    doBoundaryDatesOverlap = (date, boundary) => {
        const { allowSingleDayRange } = this.props;
        const otherBoundary = this.getOtherBoundary(boundary);
        const otherBoundaryDate = this.getStateKeysAndValuesForBoundary(otherBoundary).values.selectedValue;
        if (date == null || otherBoundaryDate == null) {
            return false;
        }
        if (boundary === Boundary.START) {
            const isAfter = date > otherBoundaryDate;
            return isAfter || (!allowSingleDayRange && DayPicker.DateUtils.isSameDay(date, otherBoundaryDate));
        }
        else {
            const isBefore = date < otherBoundaryDate;
            return isBefore || (!allowSingleDayRange && DayPicker.DateUtils.isSameDay(date, otherBoundaryDate));
        }
    };
    /**
     * Returns true if the provided boundary is an END boundary overlapping the
     * selected start date. (If the boundaries overlap, we consider the END
     * boundary to be erroneous.)
     */
    doesEndBoundaryOverlapStartBoundary = (boundaryDate, boundary) => {
        return boundary === Boundary.START ? false : this.doBoundaryDatesOverlap(boundaryDate, boundary);
    };
    isControlled = () => this.props.value !== undefined;
    isInputEmpty = (inputString) => inputString == null || inputString.length === 0;
    isInputInErrorState = (boundary) => {
        const values = this.getStateKeysAndValuesForBoundary(boundary).values;
        const { isInputFocused, hoverString, inputString, selectedValue } = values;
        if (hoverString != null || this.isInputEmpty(inputString)) {
            // don't show an error state while we're hovering over a valid date.
            return false;
        }
        const boundaryValue = isInputFocused ? this.parseDate(inputString) : selectedValue;
        return (boundaryValue != null &&
            (!this.isDateValidAndInRange(boundaryValue) ||
                this.doesEndBoundaryOverlapStartBoundary(boundaryValue, boundary)));
    };
    isDateValidAndInRange = (date) => {
        return isDateValid(date) && isDayInRange(date, [this.props.minDate, this.props.maxDate]);
    };
    isNextDateRangeValid(nextDate, boundary) {
        return this.isDateValidAndInRange(nextDate) && !this.doBoundaryDatesOverlap(nextDate, boundary);
    }
    // this is a slightly kludgy function, but it saves us a good amount of repeated code between
    // the constructor and componentDidUpdate.
    getFormattedMinMaxDateString(props, propName) {
        const date = props[propName];
        const defaultDate = DateRangeInput.defaultProps[propName];
        // default values are applied only if a prop is strictly `undefined`
        // See: https://facebook.github.io/react/docs/react-component.html#defaultprops
        return getFormattedDateString(date === undefined ? defaultDate : date, this.props);
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
        if (!this.isDateValidAndInRange(date)) {
            return "";
        }
        const { locale, formatDate } = this.props;
        return formatDate(date, locale);
    }
}
//# sourceMappingURL=dateRangeInput.js.map