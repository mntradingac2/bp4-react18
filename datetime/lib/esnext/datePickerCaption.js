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
import * as React from "react";
import { AbstractPureComponent2, Divider, HTMLSelect, IconSize } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import { clone } from "./common/dateUtils";
import { measureTextWidth } from "./common/utils";
export class DatePickerCaption extends AbstractPureComponent2 {
    state = { monthRightOffset: 0 };
    containerElement;
    displayedMonthText;
    handleMonthSelectChange = this.dateChangeHandler((d, month) => d.setMonth(month), this.props.onMonthChange);
    handleYearSelectChange = this.dateChangeHandler((d, year) => d.setFullYear(year), this.props.onYearChange);
    render() {
        const { date, locale, localeUtils, minDate, maxDate, months = localeUtils.getMonths(locale) } = this.props;
        const minYear = minDate.getFullYear();
        const maxYear = maxDate.getFullYear();
        const displayMonth = date.getMonth();
        const displayYear = date.getFullYear();
        // build the list of available months, limiting based on minDate and maxDate as necessary
        const startMonth = displayYear === minYear ? minDate.getMonth() : 0;
        const endMonth = displayYear === maxYear ? maxDate.getMonth() + 1 : undefined;
        const monthOptionElements = months
            .map((month, i) => ({ label: month, value: i }))
            .slice(startMonth, endMonth);
        const years = [minYear];
        for (let year = minYear + 1; year <= maxYear; ++year) {
            years.push(year);
        }
        // allow out-of-bounds years but disable the option. this handles the Dec 2016 case in #391.
        if (displayYear > maxYear) {
            years.push({ value: displayYear, disabled: true });
        }
        this.displayedMonthText = months[displayMonth];
        const monthSelect = (React.createElement(HTMLSelect, { "aria-label": "Month", iconProps: { style: { right: this.state.monthRightOffset } }, className: Classes.DATEPICKER_MONTH_SELECT, key: "month", minimal: true, onChange: this.handleMonthSelectChange, value: displayMonth, options: monthOptionElements }));
        const yearSelect = (React.createElement(HTMLSelect, { "aria-label": "Year", className: Classes.DATEPICKER_YEAR_SELECT, key: "year", minimal: true, onChange: this.handleYearSelectChange, value: displayYear, options: years }));
        const orderedSelects = this.props.reverseMonthAndYearMenus
            ? [yearSelect, monthSelect]
            : [monthSelect, yearSelect];
        return (React.createElement("div", { className: this.props.classNames.caption },
            React.createElement("div", { className: Classes.DATEPICKER_CAPTION, ref: ref => (this.containerElement = ref) }, orderedSelects),
            React.createElement(Divider, null)));
    }
    componentDidMount() {
        this.requestAnimationFrame(() => this.positionArrows());
    }
    componentDidUpdate() {
        this.positionArrows();
    }
    positionArrows() {
        // measure width of text as rendered inside our container element.
        const monthTextWidth = measureTextWidth(this.displayedMonthText, Classes.DATEPICKER_CAPTION_MEASURE, this.containerElement);
        const monthSelectWidth = this.containerElement == null ? 0 : this.containerElement.firstElementChild.clientWidth;
        const rightOffset = Math.max(2, monthSelectWidth - monthTextWidth - IconSize.STANDARD - 2);
        this.setState({ monthRightOffset: rightOffset });
    }
    dateChangeHandler(updater, handler) {
        return (e) => {
            const value = parseInt(e.target.value, 10);
            // ignore change events with invalid values to prevent crash on iOS Safari (#4178)
            if (isNaN(value)) {
                return;
            }
            const newDate = clone(this.props.date);
            updater(newDate, value);
            this.props.onDateChange?.(newDate);
            handler?.(value);
        };
    }
}
//# sourceMappingURL=datePickerCaption.js.map