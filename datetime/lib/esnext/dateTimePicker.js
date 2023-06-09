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
export class DateTimePicker extends AbstractPureComponent2 {
    static defaultProps = {
        canClearSelection: true,
        defaultValue: new Date(),
    };
    static displayName = `${DISPLAYNAME_PREFIX}.DateTimePicker`;
    constructor(props, context) {
        super(props, context);
        const initialValue = this.props.value !== undefined ? this.props.value : this.props.defaultValue;
        this.state = {
            dateValue: initialValue,
            timeValue: initialValue,
        };
    }
    render() {
        const value = DateUtils.getDateTime(this.state.dateValue, this.state.timeValue);
        return (React.createElement("div", { className: classNames(Classes.DATETIMEPICKER, this.props.className) },
            React.createElement(DatePicker, { ...this.props.datePickerProps, canClearSelection: this.props.canClearSelection, onChange: this.handleDateChange, value: value }),
            React.createElement(TimePicker, { ...this.props.timePickerProps, onChange: this.handleTimeChange, value: this.state.timeValue })));
    }
    componentDidUpdate(prevProps) {
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
    }
    handleDateChange = (dateValue, isUserChange) => {
        if (this.props.value === undefined) {
            this.setState({ dateValue });
        }
        const value = DateUtils.getDateTime(dateValue, this.state.timeValue);
        this.props.onChange?.(value, isUserChange);
    };
    handleTimeChange = (timeValue) => {
        if (this.props.value === undefined) {
            this.setState({ timeValue });
        }
        const value = DateUtils.getDateTime(this.state.dateValue, timeValue);
        this.props.onChange?.(value, true);
    };
}
//# sourceMappingURL=dateTimePicker.js.map