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
import { Months } from "./months";
export function isDateValid(date) {
    return date instanceof Date && !isNaN(date.valueOf());
}
export function areEqual(date1, date2) {
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
export function areRangesEqual(dateRange1, dateRange2) {
    if (dateRange1 == null && dateRange2 == null) {
        return true;
    }
    else if (dateRange1 == null || dateRange2 == null) {
        return false;
    }
    else {
        const [start1, end1] = dateRange1;
        const [start2, end2] = dateRange2;
        const areStartsEqual = (start1 == null && start2 == null) || areSameDay(start1, start2);
        const areEndsEqual = (end1 == null && end2 == null) || areSameDay(end1, end2);
        return areStartsEqual && areEndsEqual;
    }
}
export function areSameDay(date1, date2) {
    return areSameMonth(date1, date2) && date1.getDate() === date2.getDate();
}
export function areSameMonth(date1, date2) {
    return (date1 != null &&
        date2 != null &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear());
}
export function areSameTime(date1, date2) {
    return (date1 != null &&
        date2 != null &&
        date1.getHours() === date2.getHours() &&
        date1.getMinutes() === date2.getMinutes() &&
        date1.getSeconds() === date2.getSeconds() &&
        date1.getMilliseconds() === date2.getMilliseconds());
}
export function clone(d) {
    return new Date(d.getTime());
}
export function isDayInRange(date, dateRange, exclusive = false) {
    if (date == null) {
        return false;
    }
    const day = clone(date);
    const start = clone(dateRange[0]);
    const end = clone(dateRange[1]);
    day.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return start <= day && day <= end && (!exclusive || (!areSameDay(start, day) && !areSameDay(day, end)));
}
export function isDayRangeInRange(innerRange, outerRange) {
    return ((innerRange[0] == null || isDayInRange(innerRange[0], outerRange)) &&
        (innerRange[1] == null || isDayInRange(innerRange[1], outerRange)));
}
export function isMonthInRange(date, dateRange) {
    if (date == null) {
        return false;
    }
    const day = clone(date);
    const start = clone(dateRange[0]);
    const end = clone(dateRange[1]);
    day.setDate(1);
    start.setDate(1);
    end.setDate(1);
    day.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return start <= day && day <= end;
}
export const isTimeEqualOrGreaterThan = (time, timeToCompare) => time.getTime() >= timeToCompare.getTime();
export const isTimeEqualOrSmallerThan = (time, timeToCompare) => time.getTime() <= timeToCompare.getTime();
export function isTimeInRange(date, minDate, maxDate) {
    const time = getDateOnlyWithTime(date);
    const minTime = getDateOnlyWithTime(minDate);
    const maxTime = getDateOnlyWithTime(maxDate);
    const isTimeGreaterThanMinTime = isTimeEqualOrGreaterThan(time, minTime);
    const isTimeSmallerThanMaxTime = isTimeEqualOrSmallerThan(time, maxTime);
    if (isTimeEqualOrSmallerThan(maxTime, minTime)) {
        return isTimeGreaterThanMinTime || isTimeSmallerThanMaxTime;
    }
    return isTimeGreaterThanMinTime && isTimeSmallerThanMaxTime;
}
export function getTimeInRange(time, minTime, maxTime) {
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
/**
 * Returns true if the time part of `date` is later than or equal to the time
 * part of `dateToCompare`. The day, month, and year parts will not be compared.
 */
export function isTimeSameOrAfter(date, dateToCompare) {
    const time = getDateOnlyWithTime(date);
    const timeToCompare = getDateOnlyWithTime(dateToCompare);
    return isTimeEqualOrGreaterThan(time, timeToCompare);
}
/**
 * @returns a Date at the exact time-wise midpoint between startDate and endDate
 */
export function getDateBetween(dateRange) {
    const start = dateRange[0].getTime();
    const end = dateRange[1].getTime();
    const middle = start + (end - start) * 0.5;
    return new Date(middle);
}
export function getDateTime(date, time) {
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
export function getDateOnlyWithTime(date) {
    return new Date(0, 0, 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
export function getDatePreviousMonth(date) {
    if (date.getMonth() === Months.JANUARY) {
        return new Date(date.getFullYear() - 1, Months.DECEMBER);
    }
    else {
        return new Date(date.getFullYear(), date.getMonth() - 1);
    }
}
export function getDateNextMonth(date) {
    if (date.getMonth() === Months.DECEMBER) {
        return new Date(date.getFullYear() + 1, Months.JANUARY);
    }
    else {
        return new Date(date.getFullYear(), date.getMonth() + 1);
    }
}
export function convert24HourMeridiem(hour, toPm) {
    if (hour < 0 || hour > 23) {
        throw new Error(`hour must be between [0,23] inclusive: got ${hour}`);
    }
    return toPm ? (hour % 12) + 12 : hour % 12;
}
export function getIsPmFrom24Hour(hour) {
    if (hour < 0 || hour > 23) {
        throw new Error(`hour must be between [0,23] inclusive: got ${hour}`);
    }
    return hour >= 12;
}
export function get12HourFrom24Hour(hour) {
    if (hour < 0 || hour > 23) {
        throw new Error(`hour must be between [0,23] inclusive: got ${hour}`);
    }
    const newHour = hour % 12;
    return newHour === 0 ? 12 : newHour;
}
export function get24HourFrom12Hour(hour, isPm) {
    if (hour < 1 || hour > 12) {
        throw new Error(`hour must be between [1,12] inclusive: got ${hour}`);
    }
    const newHour = hour === 12 ? 0 : hour;
    return isPm ? newHour + 12 : newHour;
}
export function isToday(date) {
    return areSameDay(date, new Date());
}
//# sourceMappingURL=dateUtils.js.map