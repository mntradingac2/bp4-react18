/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
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
import { Menu, MenuItem } from "@blueprintjs/core";
import { DATERANGEPICKER_SHORTCUTS } from "./common/classes";
import { clone, isDayRangeInRange } from "./common/dateUtils";
export class Shortcuts extends React.PureComponent {
    static defaultProps = {
        selectedShortcutIndex: -1,
    };
    render() {
        const shortcuts = this.props.shortcuts === true
            ? createDefaultShortcuts(this.props.allowSingleDayRange, this.props.timePrecision !== undefined, this.props.useSingleDateShortcuts === true)
            : this.props.shortcuts;
        const shortcutElements = shortcuts.map((shortcut, index) => (
        // ok to use this here because it doesn't have a submenu
        // eslint-disable-next-line deprecation/deprecation, @blueprintjs/no-deprecated-components
        React.createElement(MenuItem, { active: this.props.selectedShortcutIndex === index, disabled: !this.isShortcutInRange(shortcut.dateRange), key: index, onClick: this.getShorcutClickHandler(shortcut, index), shouldDismissPopover: false, text: shortcut.label })));
        return (React.createElement(Menu, { "aria-label": "Date picker shortcuts", className: DATERANGEPICKER_SHORTCUTS, tabIndex: 0 }, shortcutElements));
    }
    getShorcutClickHandler = (shortcut, index) => () => {
        const { onShortcutClick } = this.props;
        onShortcutClick(shortcut, index);
    };
    isShortcutInRange = (shortcutDateRange) => {
        const { minDate, maxDate } = this.props;
        return isDayRangeInRange(shortcutDateRange, [minDate, maxDate]);
    };
}
function createShortcut(label, dateRange) {
    return { dateRange, label };
}
function createDefaultShortcuts(allowSingleDayRange, hasTimePrecision, useSingleDateShortcuts) {
    const today = new Date();
    const makeDate = (action) => {
        const returnVal = clone(today);
        action(returnVal);
        returnVal.setDate(returnVal.getDate() + 1);
        return returnVal;
    };
    const tomorrow = makeDate(() => null);
    const yesterday = makeDate(d => d.setDate(d.getDate() - 2));
    const oneWeekAgo = makeDate(d => d.setDate(d.getDate() - 7));
    const oneMonthAgo = makeDate(d => d.setMonth(d.getMonth() - 1));
    const threeMonthsAgo = makeDate(d => d.setMonth(d.getMonth() - 3));
    const sixMonthsAgo = makeDate(d => d.setMonth(d.getMonth() - 6));
    const oneYearAgo = makeDate(d => d.setFullYear(d.getFullYear() - 1));
    const twoYearsAgo = makeDate(d => d.setFullYear(d.getFullYear() - 2));
    const singleDayShortcuts = allowSingleDayRange || useSingleDateShortcuts
        ? [
            createShortcut("Today", [today, hasTimePrecision ? tomorrow : today]),
            createShortcut("Yesterday", [yesterday, hasTimePrecision ? today : yesterday]),
        ]
        : [];
    return [
        ...singleDayShortcuts,
        createShortcut(useSingleDateShortcuts ? "1 week ago" : "Past week", [oneWeekAgo, today]),
        createShortcut(useSingleDateShortcuts ? "1 month ago" : "Past month", [oneMonthAgo, today]),
        createShortcut(useSingleDateShortcuts ? "3 months ago" : "Past 3 months", [threeMonthsAgo, today]),
        // Don't include a couple of these for the single date shortcut
        ...(useSingleDateShortcuts ? [] : [createShortcut("Past 6 months", [sixMonthsAgo, today])]),
        createShortcut(useSingleDateShortcuts ? "1 year ago" : "Past year", [oneYearAgo, today]),
        ...(useSingleDateShortcuts ? [] : [createShortcut("Past 2 years", [twoYearsAgo, today])]),
    ];
}
//# sourceMappingURL=shortcuts.js.map