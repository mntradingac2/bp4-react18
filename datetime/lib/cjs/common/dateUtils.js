"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isToday = exports.get24HourFrom12Hour = exports.get12HourFrom24Hour = exports.getIsPmFrom24Hour = exports.convert24HourMeridiem = exports.getDateNextMonth = exports.getDatePreviousMonth = exports.getDateOnlyWithTime = exports.getDateTime = exports.getDateBetween = exports.isTimeSameOrAfter = exports.getTimeInRange = exports.isTimeInRange = exports.isTimeEqualOrSmallerThan = exports.isTimeEqualOrGreaterThan = exports.isMonthInRange = exports.isDayRangeInRange = exports.isDayInRange = exports.clone = exports.areSameTime = exports.areSameMonth = exports.areSameDay = exports.areRangesEqual = exports.areEqual = exports.isDateValid = void 0;
var months_1 = require("./months");
function isDateValid(date) {
    return date instanceof Date && !isNaN(date.valueOf());
}
exports.isDateValid = isDateValid;
function areEqual(date1, date2) {
    if (date1 == null && date2 == null) {
        return true;
    }
    else if (date1 == null || date2 == null) {
        return false;
    }
    else {
        return date1.getTime() === date2.getTime();
    }
}
exports.areEqual = areEqual;
function areRangesEqual(dateRange1, dateRange2) {
    if (dateRange1 == null && dateRange2 == null) {
        return true;
    }
    else if (dateRange1 == null || dateRange2 == null) {
        return false;
    }
    else {
        var start1 = dateRange1[0], end1 = dateRange1[1];
        var start2 = dateRange2[0], end2 = dateRange2[1];
        var areStartsEqual = (start1 == null && start2 == null) || areSameDay(start1, start2);
        var areEndsEqual = (end1 == null && end2 == null) || areSameDay(end1, end2);
        return areStartsEqual && areEndsEqual;
    }
}
exports.areRangesEqual = areRangesEqual;
function areSameDay(date1, date2) {
    return areSameMonth(date1, date2) && date1.getDate() === date2.getDate();
}
exports.areSameDay = areSameDay;
function areSameMonth(date1, date2) {
    return (date1 != null &&
        date2 != null &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear());
}
exports.areSameMonth = areSameMonth;
function areSameTime(date1, date2) {
    return (date1 != null &&
        date2 != null &&
        date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes() &&
        date1.getSeconds() === date2.getSeconds() &&
        date1.getMilliseconds() === date2.getMilliseconds());
}
exports.areSameTime = areSameTime;
function clone(d) {
    return new Date(d.getTime());
}
exports.clone = clone;
function isDayInRange(date, dateRange, exclusive) {
    if (exclusive === void 0) { exclusive = false; }
    if (date == null) {
        return false;
    }
    var day = clone(date);
    var start = clone(dateRange[0]);
    var end = clone(dateRange[1]);
    day.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return start <= day && day <= end && (!exclusive || (!areSameDay(start, day) && !areSameDay(day, end)));
}
exports.isDayInRange = isDayInRange;
function isDayRangeInRange(innerRange, outerRange) {
    return ((innerRange[0] == null || isDayInRange(innerRange[0], outerRange)) &&
        (innerRange[1] == null || isDayInRange(innerRange[1], outerRange)));
}
exports.isDayRangeInRange = isDayRangeInRange;
function isMonthInRange(date, dateRange) {
    if (date == null) {
        return false;
    }
    var day = clone(date);
    var start = clone(dateRange[0]);
    var end = clone(dateRange[1]);
    day.setDate(1);
    start.setDate(1);
    end.setDate(1);
    day.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return start <= day && day <= end;
}
exports.isMonthInRange = isMonthInRange;
var isTimeEqualOrGreaterThan = function (time, timeToCompare) { return time.getTime() >= timeToCompare.getTime(); };
exports.isTimeEqualOrGreaterThan = isTimeEqualOrGreaterThan;
var isTimeEqualOrSmallerThan = function (time, timeToCompare) { return time.getTime() <= timeToCompare.getTime(); };
exports.isTimeEqualOrSmallerThan = isTimeEqualOrSmallerThan;
function isTimeInRange(date, minDate, maxDate) {
    var time = getDateOnlyWithTime(date);
    var minTime = getDateOnlyWithTime(minDate);
    var maxTime = getDateOnlyWithTime(maxDate);
    var isTimeGreaterThanMinTime = (0, exports.isTimeEqualOrGreaterThan)(time, minTime);
    var isTimeSmallerThanMaxTime = (0, exports.isTimeEqualOrSmallerThan)(time, maxTime);
    if ((0, exports.isTimeEqualOrSmallerThan)(maxTime, minTime)) {
        return isTimeGreaterThanMinTime || isTimeSmallerThanMaxTime;
    }
    return isTimeGreaterThanMinTime && isTimeSmallerThanMaxTime;
}
exports.isTimeInRange = isTimeInRange;
function getTimeInRange(time, minTime, maxTime) {
    if (areSameTime(minTime, maxTime)) {
        return maxTime;
    }
    else if (isTimeInRange(time, minTime, maxTime)) {
        return time;
    }
    else if (isTimeSameOrAfter(time, maxTime)) {
        return maxTime;
    }
    return minTime;
}
exports.getTimeInRange = getTimeInRange;
/**
 * Returns true if the time part of `date` is later than or equal to the time
 * part of `dateToCompare`. The day, month, and year parts will not be compared.
 */
function isTimeSameOrAfter(date, dateToCompare) {
    var time = getDateOnlyWithTime(date);
    var timeToCompare = getDateOnlyWithTime(dateToCompare);
    return (0, exports.isTimeEqualOrGreaterThan)(time, timeToCompare);
}
exports.isTimeSameOrAfter = isTimeSameOrAfter;
/**
 * @returns a Date at the exact time-wise midpoint between startDate and endDate
 */
function getDateBetween(dateRange) {
    var start = dateRange[0].getTime();
    var end = dateRange[1].getTime();
    var middle = start + (end - start) * 0.5;
    return new Date(middle);
}
exports.getDateBetween = getDateBetween;
function getDateTime(date, time) {
    if (date == null) {
        return null;
    }
    else if (time == null) {
        // cannot use default argument because `null` is a common value in this package.
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    }
    else {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
    }
}
exports.getDateTime = getDateTime;
function getDateOnlyWithTime(date) {
    return new Date(0, 0, 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
exports.getDateOnlyWithTime = getDateOnlyWithTime;
function getDatePreviousMonth(date) {
    if (date.getMonth() === months_1.Months.JANUARY) {
        return new Date(date.getFullYear() - 1, months_1.Months.DECEMBER);
    }
    else {
        return new Date(date.getFullYear(), date.getMonth() - 1);
    }
}
exports.getDatePreviousMonth = getDatePreviousMonth;
function getDateNextMonth(date) {
    if (date.getMonth() === months_1.Months.DECEMBER) {
        return new Date(date.getFullYear() + 1, months_1.Months.JANUARY);
    }
    else {
        return new Date(date.getFullYear(), date.getMonth() + 1);
    }
}
exports.getDateNextMonth = getDateNextMonth;
function convert24HourMeridiem(hour, toPm) {
    if (hour < 0 || hour > 23) {
        throw new Error("hour must be between [0,23] inclusive: got ".concat(hour));
    }
    return toPm ? (hour % 12) + 12 : hour % 12;
}
exports.convert24HourMeridiem = convert24HourMeridiem;
function getIsPmFrom24Hour(hour) {
    if (hour < 0 || hour > 23) {
        throw new Error("hour must be between [0,23] inclusive: got ".concat(hour));
    }
    return hour >= 12;
}
exports.getIsPmFrom24Hour = getIsPmFrom24Hour;
function get12HourFrom24Hour(hour) {
    if (hour < 0 || hour > 23) {
        throw new Error("hour must be between [0,23] inclusive: got ".concat(hour));
    }
    var newHour = hour % 12;
    return newHour === 0 ? 12 : newHour;
}
exports.get12HourFrom24Hour = get12HourFrom24Hour;
function get24HourFrom12Hour(hour, isPm) {
    if (hour < 1 || hour > 12) {
        throw new Error("hour must be between [1,12] inclusive: got ".concat(hour));
    }
    var newHour = hour === 12 ? 0 : hour;
    return isPm ? newHour + 12 : newHour;
}
exports.get24HourFrom12Hour = get24HourFrom12Hour;
function isToday(date) {
    return areSameDay(date, new Date());
}
exports.isToday = isToday;
//# sourceMappingURL=dateUtils.js.map