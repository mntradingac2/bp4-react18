"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortcuts = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var classes_1 = require("./common/classes");
var dateUtils_1 = require("./common/dateUtils");
var Shortcuts = /** @class */ (function (_super) {
    tslib_1.__extends(Shortcuts, _super);
    function Shortcuts() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getShorcutClickHandler = function (shortcut, index) { return function () {
            var onShortcutClick = _this.props.onShortcutClick;
            onShortcutClick(shortcut, index);
        }; };
        _this.isShortcutInRange = function (shortcutDateRange) {
            var _a = _this.props, minDate = _a.minDate, maxDate = _a.maxDate;
            return (0, dateUtils_1.isDayRangeInRange)(shortcutDateRange, [minDate, maxDate]);
        };
        return _this;
    }
    Shortcuts.prototype.render = function () {
        var _this = this;
        var shortcuts = this.props.shortcuts === true
            ? createDefaultShortcuts(this.props.allowSingleDayRange, this.props.timePrecision !== undefined, this.props.useSingleDateShortcuts === true)
            : this.props.shortcuts;
        var shortcutElements = shortcuts.map(function (shortcut, index) { return (
        // ok to use this here because it doesn't have a submenu
        // eslint-disable-next-line deprecation/deprecation, @blueprintjs/no-deprecated-components
        React.createElement(core_1.MenuItem, { active: _this.props.selectedShortcutIndex === index, disabled: !_this.isShortcutInRange(shortcut.dateRange), key: index, onClick: _this.getShorcutClickHandler(shortcut, index), shouldDismissPopover: false, text: shortcut.label })); });
        return (React.createElement(core_1.Menu, { "aria-label": "Date picker shortcuts", className: classes_1.DATERANGEPICKER_SHORTCUTS, tabIndex: 0 }, shortcutElements));
    };
    Shortcuts.defaultProps = {
        selectedShortcutIndex: -1,
    };
    return Shortcuts;
}(React.PureComponent));
exports.Shortcuts = Shortcuts;
function createShortcut(label, dateRange) {
    return { dateRange: dateRange, label: label };
}
function createDefaultShortcuts(allowSingleDayRange, hasTimePrecision, useSingleDateShortcuts) {
    var today = new Date();
    var makeDate = function (action) {
        var returnVal = (0, dateUtils_1.clone)(today);
        action(returnVal);
        returnVal.setDate(returnVal.getDate() + 1);
        return returnVal;
    };
    var tomorrow = makeDate(function () { return null; });
    var yesterday = makeDate(function (d) { return d.setDate(d.getDate() - 2); });
    var oneWeekAgo = makeDate(function (d) { return d.setDate(d.getDate() - 7); });
    var oneMonthAgo = makeDate(function (d) { return d.setMonth(d.getMonth() - 1); });
    var threeMonthsAgo = makeDate(function (d) { return d.setMonth(d.getMonth() - 3); });
    var sixMonthsAgo = makeDate(function (d) { return d.setMonth(d.getMonth() - 6); });
    var oneYearAgo = makeDate(function (d) { return d.setFullYear(d.getFullYear() - 1); });
    var twoYearsAgo = makeDate(function (d) { return d.setFullYear(d.getFullYear() - 2); });
    var singleDayShortcuts = allowSingleDayRange || useSingleDateShortcuts
        ? [
            createShortcut("Today", [today, hasTimePrecision ? tomorrow : today]),
            createShortcut("Yesterday", [yesterday, hasTimePrecision ? today : yesterday]),
        ]
        : [];
    return tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], singleDayShortcuts, true), [
        createShortcut(useSingleDateShortcuts ? "1 week ago" : "Past week", [oneWeekAgo, today]),
        createShortcut(useSingleDateShortcuts ? "1 month ago" : "Past month", [oneMonthAgo, today]),
        createShortcut(useSingleDateShortcuts ? "3 months ago" : "Past 3 months", [threeMonthsAgo, today])
    ], false), (useSingleDateShortcuts ? [] : [createShortcut("Past 6 months", [sixMonthsAgo, today])]), true), [
        createShortcut(useSingleDateShortcuts ? "1 year ago" : "Past year", [oneYearAgo, today])
    ], false), (useSingleDateShortcuts ? [] : [createShortcut("Past 2 years", [twoYearsAgo, today])]), true);
}
//# sourceMappingURL=shortcuts.js.map