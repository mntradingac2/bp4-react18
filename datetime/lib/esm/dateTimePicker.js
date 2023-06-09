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
import { AbstractPureComponent2, DISPLAYNAME_PREFIX } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import * as DateUtils from "./common/dateUtils";
import { DatePicker } from "./datePicker";
import { TimePicker } from "./timePicker";
/**
 * Date time picker component.
 *
 * @see https://blueprintjs.com/docs/#datetime/datetimepicker
 * @deprecated since 3.4.0. Prefer `<DatePicker>` with `timePrecision` and `timePickerProps`.
 */
var DateTimePicker = /** @class */ (function (_super) {
    __extends(DateTimePicker, _super);
    function DateTimePicker(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleDateChange = function (dateValue, isUserChange) {
            var _a, _b;
            if (_this.props.value === undefined) {
                _this.setState({ dateValue: dateValue });
            }
            var value = DateUtils.getDateTime(dateValue, _this.state.timeValue);
            (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value, isUserChange);
        };
        _this.handleTimeChange = function (timeValue) {
            var _a, _b;
            if (_this.props.value === undefined) {
                _this.setState({ timeValue: timeValue });
            }
            var value = DateUtils.getDateTime(_this.state.dateValue, timeValue);
            (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value, true);
        };
        var initialValue = _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue;
        _this.state = {
            dateValue: initialValue,
            timeValue: initialValue,
        };
        return _this;
    }
    DateTimePicker.prototype.render = function () {
        var value = DateUtils.getDateTime(this.state.dateValue, this.state.timeValue);
        return (React.createElement("div", { className: classNames(Classes.DATETIMEPICKER, this.props.className) },
            React.createElement(DatePicker, __assign({}, this.props.datePickerProps, { canClearSelection: this.props.canClearSelection, onChange: this.handleDateChange, value: value })),
            React.createElement(TimePicker, __assign({}, this.props.timePickerProps, { onChange: this.handleTimeChange, value: this.state.timeValue }))));
    };
    DateTimePicker.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.value === prevProps.value) {
            return;
        }
        else if (this.props.value != null) {
            this.setState({
                dateValue: this.props.value,
                timeValue: this.props.value,
            });
        }
        else {
            // clear only the date to remove the selected-date style in the calendar
            this.setState({ dateValue: null });
        }
    };
    DateTimePicker.defaultProps = {
        canClearSelection: true,
        defaultValue: new Date(),
    };
    DateTimePicker.displayName = "".concat(DISPLAYNAME_PREFIX, ".DateTimePicker");
    return DateTimePicker;
}(AbstractPureComponent2));
export { DateTimePicker };
//# sourceMappingURL=dateTimePicker.js.map