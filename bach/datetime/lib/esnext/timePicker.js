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
import { Classes as CoreClasses, Utils as CoreUtils, DISPLAYNAME_PREFIX, HTMLSelect, Icon, Intent, Keys, } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import * as DateUtils from "./common/dateUtils";
import { getDefaultMaxTime, getDefaultMinTime, getTimeUnit, getTimeUnitClassName, getTimeUnitMax, getTimeUnitPrintStr, isTimeUnitValid, setTimeUnit, TimeUnit, wrapTimeAtUnit, } from "./common/timeUnit";
import * as Utils from "./common/utils";
export const TimePrecision = {
    MILLISECOND: "millisecond",
    MINUTE: "minute",
    SECOND: "second",
};
/**
 * Time picker component.
 *
 * @see https://blueprintjs.com/docs/#datetime/timepicker
 */
export class TimePicker extends React.Component {
    static defaultProps = {
        autoFocus: false,
        disabled: false,
        maxTime: getDefaultMaxTime(),
        minTime: getDefaultMinTime(),
        precision: TimePrecision.MINUTE,
        selectAllOnFocus: false,
        showArrowButtons: false,
        useAmPm: false,
    };
    static displayName = `${DISPLAYNAME_PREFIX}.TimePicker`;
    constructor(props, context) {
        super(props, context);
        this.state = this.getFullStateFromValue(this.getInitialValue(), props.useAmPm);
    }
    timeInputIds = {
        [TimeUnit.HOUR_24]: CoreUtils.uniqueId(TimeUnit.HOUR_24 + "-input"),
        [TimeUnit.HOUR_12]: CoreUtils.uniqueId(TimeUnit.HOUR_12 + "-input"),
        [TimeUnit.MINUTE]: CoreUtils.uniqueId(TimeUnit.MINUTE + "-input"),
        [TimeUnit.SECOND]: CoreUtils.uniqueId(TimeUnit.SECOND + "-input"),
        [TimeUnit.MS]: CoreUtils.uniqueId(TimeUnit.MS + "-input"),
    };
    render() {
        const shouldRenderMilliseconds = this.props.precision === TimePrecision.MILLISECOND;
        const shouldRenderSeconds = shouldRenderMilliseconds || this.props.precision === TimePrecision.SECOND;
        const hourUnit = this.props.useAmPm ? TimeUnit.HOUR_12 : TimeUnit.HOUR_24;
        const classes = classNames(Classes.TIMEPICKER, this.props.className, {
            [CoreClasses.DISABLED]: this.props.disabled,
        });
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: Classes.TIMEPICKER_ARROW_ROW },
                this.maybeRenderArrowButton(true, hourUnit),
                this.maybeRenderArrowButton(true, TimeUnit.MINUTE),
                shouldRenderSeconds && this.maybeRenderArrowButton(true, TimeUnit.SECOND),
                shouldRenderMilliseconds && this.maybeRenderArrowButton(true, TimeUnit.MS)),
            React.createElement("div", { className: Classes.TIMEPICKER_INPUT_ROW },
                this.renderInput(Classes.TIMEPICKER_HOUR, hourUnit, this.state.hourText),
                this.renderDivider(),
                this.renderInput(Classes.TIMEPICKER_MINUTE, TimeUnit.MINUTE, this.state.minuteText),
                shouldRenderSeconds && this.renderDivider(),
                shouldRenderSeconds &&
                    this.renderInput(Classes.TIMEPICKER_SECOND, TimeUnit.SECOND, this.state.secondText),
                shouldRenderMilliseconds && this.renderDivider("."),
                shouldRenderMilliseconds &&
                    this.renderInput(Classes.TIMEPICKER_MILLISECOND, TimeUnit.MS, this.state.millisecondText)),
            this.maybeRenderAmPm(),
            React.createElement("div", { className: Classes.TIMEPICKER_ARROW_ROW },
                this.maybeRenderArrowButton(false, hourUnit),
                this.maybeRenderArrowButton(false, TimeUnit.MINUTE),
                shouldRenderSeconds && this.maybeRenderArrowButton(false, TimeUnit.SECOND),
                shouldRenderMilliseconds && this.maybeRenderArrowButton(false, TimeUnit.MS))));
    }
    componentDidUpdate(prevProps) {
        const didMinTimeChange = prevProps.minTime !== this.props.minTime;
        const didMaxTimeChange = prevProps.maxTime !== this.props.maxTime;
        const didBoundsChange = didMinTimeChange || didMaxTimeChange;
        const didPropValueChange = prevProps.value !== this.props.value;
        const shouldStateUpdate = didBoundsChange || didPropValueChange;
        let value = this.state.value;
        if (this.props.value == null) {
            value = this.getInitialValue();
        }
        if (didBoundsChange) {
            value = DateUtils.getTimeInRange(this.state.value, this.props.minTime, this.props.maxTime);
        }
        if (this.props.value != null && !DateUtils.areSameTime(this.props.value, prevProps.value)) {
            value = this.props.value;
        }
        if (shouldStateUpdate) {
            this.setState(this.getFullStateFromValue(value, this.props.useAmPm));
        }
    }
    // begin method definitions: rendering
    maybeRenderArrowButton(isDirectionUp, timeUnit) {
        if (!this.props.showArrowButtons) {
            return null;
        }
        const classes = classNames(Classes.TIMEPICKER_ARROW_BUTTON, getTimeUnitClassName(timeUnit));
        const onClick = () => (isDirectionUp ? this.incrementTime : this.decrementTime)(timeUnit);
        const label = `${isDirectionUp ? "Increase" : "Decrease"} ${getTimeUnitPrintStr(timeUnit)}`;
        // set tabIndex=-1 to ensure a valid FocusEvent relatedTarget when focused
        return (React.createElement("span", { "aria-controls": this.timeInputIds[timeUnit], "aria-label": label, tabIndex: -1, className: classes, onClick: onClick },
            React.createElement(Icon, { icon: isDirectionUp ? "chevron-up" : "chevron-down", title: label })));
    }
    renderDivider(text = ":") {
        return React.createElement("span", { className: Classes.TIMEPICKER_DIVIDER_TEXT }, text);
    }
    renderInput(className, unit, value) {
        const valueNumber = parseInt(value, 10);
        const isValid = isTimeUnitValid(unit, valueNumber);
        const isHour = unit === TimeUnit.HOUR_12 || unit === TimeUnit.HOUR_24;
        return (React.createElement("input", { "aria-label": getTimeUnitPrintStr(unit), "aria-valuemin": 0, "aria-valuenow": valueNumber, "aria-valuemax": getTimeUnitMax(unit), className: classNames(Classes.TIMEPICKER_INPUT, { [CoreClasses.intentClass(Intent.DANGER)]: !isValid }, className), id: this.timeInputIds[unit], onBlur: this.getInputBlurHandler(unit), onChange: this.getInputChangeHandler(unit), onFocus: this.getInputFocusHandler(unit), onKeyDown: this.getInputKeyDownHandler(unit), onKeyUp: this.getInputKeyUpHandler(unit), role: this.props.showArrowButtons ? "spinbutton" : undefined, value: value, disabled: this.props.disabled, autoFocus: isHour && this.props.autoFocus }));
    }
    maybeRenderAmPm() {
        if (!this.props.useAmPm) {
            return null;
        }
        return (React.createElement(HTMLSelect, { className: Classes.TIMEPICKER_AMPM_SELECT, disabled: this.props.disabled, onChange: this.handleAmPmChange, value: this.state.isPm ? "pm" : "am" },
            React.createElement("option", { value: "am" }, "AM"),
            React.createElement("option", { value: "pm" }, "PM")));
    }
    // begin method definitions: event handlers
    getInputChangeHandler = (unit) => (e) => {
        const text = getStringValueFromInputEvent(e);
        switch (unit) {
            case TimeUnit.HOUR_12:
            case TimeUnit.HOUR_24:
                this.setState({ hourText: text });
                break;
            case TimeUnit.MINUTE:
                this.setState({ minuteText: text });
                break;
            case TimeUnit.SECOND:
                this.setState({ secondText: text });
                break;
            case TimeUnit.MS:
                this.setState({ millisecondText: text });
                break;
        }
    };
    getInputBlurHandler = (unit) => (e) => {
        const text = getStringValueFromInputEvent(e);
        this.updateTime(parseInt(text, 10), unit);
        this.props.onBlur?.(e, unit);
    };
    getInputFocusHandler = (unit) => (e) => {
        if (this.props.selectAllOnFocus) {
            e.currentTarget.select();
        }
        this.props.onFocus?.(e, unit);
    };
    getInputKeyDownHandler = (unit) => (e) => {
        handleKeyEvent(e, {
            [Keys.ARROW_UP]: () => this.incrementTime(unit),
            [Keys.ARROW_DOWN]: () => this.decrementTime(unit),
            [Keys.ENTER]: () => {
                e.currentTarget.blur();
            },
        });
        this.props.onKeyDown?.(e, unit);
    };
    getInputKeyUpHandler = (unit) => (e) => {
        this.props.onKeyUp?.(e, unit);
    };
    handleAmPmChange = (e) => {
        const isNextPm = e.currentTarget.value === "pm";
        if (isNextPm !== this.state.isPm) {
            const hour = DateUtils.convert24HourMeridiem(this.state.value.getHours(), isNextPm);
            this.setState({ isPm: isNextPm }, () => this.updateTime(hour, TimeUnit.HOUR_24));
        }
    };
    // begin method definitions: state modification
    /**
     * Generates a full ITimePickerState object with all text fields set to formatted strings based on value
     */
    getFullStateFromValue(value, useAmPm) {
        const timeInRange = DateUtils.getTimeInRange(value, this.props.minTime, this.props.maxTime);
        const hourUnit = useAmPm ? TimeUnit.HOUR_12 : TimeUnit.HOUR_24;
        /* tslint:disable:object-literal-sort-keys */
        return {
            hourText: formatTime(timeInRange.getHours(), hourUnit),
            minuteText: formatTime(timeInRange.getMinutes(), TimeUnit.MINUTE),
            secondText: formatTime(timeInRange.getSeconds(), TimeUnit.SECOND),
            millisecondText: formatTime(timeInRange.getMilliseconds(), TimeUnit.MS),
            value: timeInRange,
            isPm: DateUtils.getIsPmFrom24Hour(timeInRange.getHours()),
        };
        /* tslint:enable:object-literal-sort-keys */
    }
    incrementTime = (unit) => this.shiftTime(unit, 1);
    decrementTime = (unit) => this.shiftTime(unit, -1);
    shiftTime(unit, amount) {
        if (this.props.disabled) {
            return;
        }
        const newTime = getTimeUnit(unit, this.state.value) + amount;
        this.updateTime(wrapTimeAtUnit(unit, newTime), unit);
    }
    updateTime(time, unit) {
        const newValue = DateUtils.clone(this.state.value);
        if (isTimeUnitValid(unit, time)) {
            setTimeUnit(unit, time, newValue, this.state.isPm);
            if (DateUtils.isTimeInRange(newValue, this.props.minTime, this.props.maxTime)) {
                this.updateState({ value: newValue });
            }
            else {
                this.updateState(this.getFullStateFromValue(this.state.value, this.props.useAmPm));
            }
        }
        else {
            this.updateState(this.getFullStateFromValue(this.state.value, this.props.useAmPm));
        }
    }
    updateState(state) {
        let newState = state;
        const hasNewValue = newState.value != null && !DateUtils.areSameTime(newState.value, this.state.value);
        if (this.props.value == null) {
            // component is uncontrolled
            if (hasNewValue) {
                newState = this.getFullStateFromValue(newState.value, this.props.useAmPm);
            }
            this.setState(newState);
        }
        else {
            // component is controlled, and there's a new value
            // so set inputs' text based off of _old_ value and later fire onChange with new value
            if (hasNewValue) {
                this.setState(this.getFullStateFromValue(this.state.value, this.props.useAmPm));
            }
            else {
                // no new value, this means only text has changed (from user typing)
                // we want inputs to change, so update state with new text for the inputs
                // but don't change actual value
                this.setState({ ...newState, value: DateUtils.clone(this.state.value) });
            }
        }
        if (hasNewValue) {
            this.props.onChange?.(newState.value);
        }
    }
    getInitialValue() {
        let value = this.props.minTime;
        if (this.props.value != null) {
            value = this.props.value;
        }
        else if (this.props.defaultValue != null) {
            value = this.props.defaultValue;
        }
        return value;
    }
}
function formatTime(time, unit) {
    switch (unit) {
        case TimeUnit.HOUR_24:
            return time.toString();
        case TimeUnit.HOUR_12:
            return DateUtils.get12HourFrom24Hour(time).toString();
        case TimeUnit.MINUTE:
        case TimeUnit.SECOND:
            return Utils.padWithZeroes(time.toString(), 2);
        case TimeUnit.MS:
            return Utils.padWithZeroes(time.toString(), 3);
        default:
            throw Error("Invalid TimeUnit");
    }
}
function getStringValueFromInputEvent(e) {
    return e.target.value;
}
function handleKeyEvent(e, actions, preventDefault = true) {
    for (const k of Object.keys(actions)) {
        const key = Number(k);
        // HACKHACK: https://github.com/palantir/blueprint/issues/4165
        // eslint-disable-next-line deprecation/deprecation
        if (e.which === key) {
            if (preventDefault) {
                e.preventDefault();
            }
            actions[key]();
        }
    }
}
//# sourceMappingURL=timePicker.js.map