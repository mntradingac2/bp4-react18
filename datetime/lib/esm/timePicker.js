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
import { __assign, __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { Classes as CoreClasses, Utils as CoreUtils, DISPLAYNAME_PREFIX, HTMLSelect, Icon, Intent, Keys, } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import * as DateUtils from "./common/dateUtils";
import { getDefaultMaxTime, getDefaultMinTime, getTimeUnit, getTimeUnitClassName, getTimeUnitMax, getTimeUnitPrintStr, isTimeUnitValid, setTimeUnit, TimeUnit, wrapTimeAtUnit, } from "./common/timeUnit";
import * as Utils from "./common/utils";
export var TimePrecision = {
    MILLISECOND: "millisecond",
    MINUTE: "minute",
    SECOND: "second",
};
/**
 * Time picker component.
 *
 * @see https://blueprintjs.com/docs/#datetime/timepicker
 */
var TimePicker = /** @class */ (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker(props, context) {
        var _a;
        var _this = _super.call(this, props, context) || this;
        _this.timeInputIds = (_a = {},
            _a[TimeUnit.HOUR_24] = CoreUtils.uniqueId(TimeUnit.HOUR_24 + "-input"),
            _a[TimeUnit.HOUR_12] = CoreUtils.uniqueId(TimeUnit.HOUR_12 + "-input"),
            _a[TimeUnit.MINUTE] = CoreUtils.uniqueId(TimeUnit.MINUTE + "-input"),
            _a[TimeUnit.SECOND] = CoreUtils.uniqueId(TimeUnit.SECOND + "-input"),
            _a[TimeUnit.MS] = CoreUtils.uniqueId(TimeUnit.MS + "-input"),
            _a);
        // begin method definitions: event handlers
        _this.getInputChangeHandler = function (unit) { return function (e) {
            var text = getStringValueFromInputEvent(e);
            switch (unit) {
                case TimeUnit.HOUR_12:
                case TimeUnit.HOUR_24:
                    _this.setState({ hourText: text });
                    break;
                case TimeUnit.MINUTE:
                    _this.setState({ minuteText: text });
                    break;
                case TimeUnit.SECOND:
                    _this.setState({ secondText: text });
                    break;
                case TimeUnit.MS:
                    _this.setState({ millisecondText: text });
                    break;
            }
        }; };
        _this.getInputBlurHandler = function (unit) { return function (e) {
            var _a, _b;
            var text = getStringValueFromInputEvent(e);
            _this.updateTime(parseInt(text, 10), unit);
            (_b = (_a = _this.props).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, e, unit);
        }; };
        _this.getInputFocusHandler = function (unit) { return function (e) {
            var _a, _b;
            if (_this.props.selectAllOnFocus) {
                e.currentTarget.select();
            }
            (_b = (_a = _this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, e, unit);
        }; };
        _this.getInputKeyDownHandler = function (unit) { return function (e) {
            var _a;
            var _b, _c;
            handleKeyEvent(e, (_a = {},
                _a[Keys.ARROW_UP] = function () { return _this.incrementTime(unit); },
                _a[Keys.ARROW_DOWN] = function () { return _this.decrementTime(unit); },
                _a[Keys.ENTER] = function () {
                    e.currentTarget.blur();
                },
                _a));
            (_c = (_b = _this.props).onKeyDown) === null || _c === void 0 ? void 0 : _c.call(_b, e, unit);
        }; };
        _this.getInputKeyUpHandler = function (unit) { return function (e) {
            var _a, _b;
            (_b = (_a = _this.props).onKeyUp) === null || _b === void 0 ? void 0 : _b.call(_a, e, unit);
        }; };
        _this.handleAmPmChange = function (e) {
            var isNextPm = e.currentTarget.value === "pm";
            if (isNextPm !== _this.state.isPm) {
                var hour_1 = DateUtils.convert24HourMeridiem(_this.state.value.getHours(), isNextPm);
                _this.setState({ isPm: isNextPm }, function () { return _this.updateTime(hour_1, TimeUnit.HOUR_24); });
            }
        };
        _this.incrementTime = function (unit) { return _this.shiftTime(unit, 1); };
        _this.decrementTime = function (unit) { return _this.shiftTime(unit, -1); };
        _this.state = _this.getFullStateFromValue(_this.getInitialValue(), props.useAmPm);
        return _this;
    }
    TimePicker.prototype.render = function () {
        var _a;
        var shouldRenderMilliseconds = this.props.precision === TimePrecision.MILLISECOND;
        var shouldRenderSeconds = shouldRenderMilliseconds || this.props.precision === TimePrecision.SECOND;
        var hourUnit = this.props.useAmPm ? TimeUnit.HOUR_12 : TimeUnit.HOUR_24;
        var classes = classNames(Classes.TIMEPICKER, this.props.className, (_a = {},
            _a[CoreClasses.DISABLED] = this.props.disabled,
            _a));
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
    };
    TimePicker.prototype.componentDidUpdate = function (prevProps) {
        var didMinTimeChange = prevProps.minTime !== this.props.minTime;
        var didMaxTimeChange = prevProps.maxTime !== this.props.maxTime;
        var didBoundsChange = didMinTimeChange || didMaxTimeChange;
        var didPropValueChange = prevProps.value !== this.props.value;
        var shouldStateUpdate = didBoundsChange || didPropValueChange;
        var value = this.state.value;
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
    };
    // begin method definitions: rendering
    TimePicker.prototype.maybeRenderArrowButton = function (isDirectionUp, timeUnit) {
        var _this = this;
        if (!this.props.showArrowButtons) {
            return null;
        }
        var classes = classNames(Classes.TIMEPICKER_ARROW_BUTTON, getTimeUnitClassName(timeUnit));
        var onClick = function () { return (isDirectionUp ? _this.incrementTime : _this.decrementTime)(timeUnit); };
        var label = "".concat(isDirectionUp ? "Increase" : "Decrease", " ").concat(getTimeUnitPrintStr(timeUnit));
        // set tabIndex=-1 to ensure a valid FocusEvent relatedTarget when focused
        return (React.createElement("span", { "aria-controls": this.timeInputIds[timeUnit], "aria-label": label, tabIndex: -1, className: classes, onClick: onClick },
            React.createElement(Icon, { icon: isDirectionUp ? "chevron-up" : "chevron-down", title: label })));
    };
    TimePicker.prototype.renderDivider = function (text) {
        if (text === void 0) { text = ":"; }
        return React.createElement("span", { className: Classes.TIMEPICKER_DIVIDER_TEXT }, text);
    };
    TimePicker.prototype.renderInput = function (className, unit, value) {
        var _a;
        var valueNumber = parseInt(value, 10);
        var isValid = isTimeUnitValid(unit, valueNumber);
        var isHour = unit === TimeUnit.HOUR_12 || unit === TimeUnit.HOUR_24;
        return (React.createElement("input", { "aria-label": getTimeUnitPrintStr(unit), "aria-valuemin": 0, "aria-valuenow": valueNumber, "aria-valuemax": getTimeUnitMax(unit), className: classNames(Classes.TIMEPICKER_INPUT, (_a = {}, _a[CoreClasses.intentClass(Intent.DANGER)] = !isValid, _a), className), id: this.timeInputIds[unit], onBlur: this.getInputBlurHandler(unit), onChange: this.getInputChangeHandler(unit), onFocus: this.getInputFocusHandler(unit), onKeyDown: this.getInputKeyDownHandler(unit), onKeyUp: this.getInputKeyUpHandler(unit), role: this.props.showArrowButtons ? "spinbutton" : undefined, value: value, disabled: this.props.disabled, autoFocus: isHour && this.props.autoFocus }));
    };
    TimePicker.prototype.maybeRenderAmPm = function () {
        if (!this.props.useAmPm) {
            return null;
        }
        return (React.createElement(HTMLSelect, { className: Classes.TIMEPICKER_AMPM_SELECT, disabled: this.props.disabled, onChange: this.handleAmPmChange, value: this.state.isPm ? "pm" : "am" },
            React.createElement("option", { value: "am" }, "AM"),
            React.createElement("option", { value: "pm" }, "PM")));
    };
    // begin method definitions: state modification
    /**
     * Generates a full ITimePickerState object with all text fields set to formatted strings based on value
     */
    TimePicker.prototype.getFullStateFromValue = function (value, useAmPm) {
        var timeInRange = DateUtils.getTimeInRange(value, this.props.minTime, this.props.maxTime);
        var hourUnit = useAmPm ? TimeUnit.HOUR_12 : TimeUnit.HOUR_24;
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
    };
    TimePicker.prototype.shiftTime = function (unit, amount) {
        if (this.props.disabled) {
            return;
        }
        var newTime = getTimeUnit(unit, this.state.value) + amount;
        this.updateTime(wrapTimeAtUnit(unit, newTime), unit);
    };
    TimePicker.prototype.updateTime = function (time, unit) {
        var newValue = DateUtils.clone(this.state.value);
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
    };
    TimePicker.prototype.updateState = function (state) {
        var _a, _b;
        var newState = state;
        var hasNewValue = newState.value != null && !DateUtils.areSameTime(newState.value, this.state.value);
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
                this.setState(__assign(__assign({}, newState), { value: DateUtils.clone(this.state.value) }));
            }
        }
        if (hasNewValue) {
            (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, newState.value);
        }
    };
    TimePicker.prototype.getInitialValue = function () {
        var value = this.props.minTime;
        if (this.props.value != null) {
            value = this.props.value;
        }
        else if (this.props.defaultValue != null) {
            value = this.props.defaultValue;
        }
        return value;
    };
    TimePicker.defaultProps = {
        autoFocus: false,
        disabled: false,
        maxTime: getDefaultMaxTime(),
        minTime: getDefaultMinTime(),
        precision: TimePrecision.MINUTE,
        selectAllOnFocus: false,
        showArrowButtons: false,
        useAmPm: false,
    };
    TimePicker.displayName = "".concat(DISPLAYNAME_PREFIX, ".TimePicker");
    return TimePicker;
}(React.Component));
export { TimePicker };
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
function handleKeyEvent(e, actions, preventDefault) {
    if (preventDefault === void 0) { preventDefault = true; }
    for (var _i = 0, _a = Object.keys(actions); _i < _a.length; _i++) {
        var k = _a[_i];
        var key = Number(k);
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