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
var _a;
import * as Classes from "./classes";
import { get12HourFrom24Hour, get24HourFrom12Hour } from "./dateUtils";
/** describes a component of time. `H:MM:SS.MS` */
export var TimeUnit;
(function (TimeUnit) {
    // NOTE: string enum so we can use it in Record<> type at the end of this file, which requires string keys
    TimeUnit["HOUR_24"] = "hour24";
    TimeUnit["HOUR_12"] = "hour12";
    TimeUnit["MINUTE"] = "minute";
    TimeUnit["SECOND"] = "second";
    TimeUnit["MS"] = "ms";
})(TimeUnit || (TimeUnit = {}));
/** Gets a descriptive label representing the plural of the given time unit. */
export function getTimeUnitPrintStr(unit) {
    var _a;
    var timeUnitToPrintstr = (_a = {},
        _a[TimeUnit.HOUR_24] = "hours (24hr clock)",
        _a[TimeUnit.HOUR_12] = "hours (12hr clock)",
        _a[TimeUnit.MINUTE] = "minutes",
        _a[TimeUnit.SECOND] = "seconds",
        _a[TimeUnit.MS] = "milliseconds",
        _a);
    return timeUnitToPrintstr[unit];
}
/** Returns the given time unit component of the date. */
export function getTimeUnit(unit, date) {
    switch (unit) {
        case TimeUnit.HOUR_24:
            return date.getHours();
        case TimeUnit.HOUR_12:
            return get12HourFrom24Hour(date.getHours());
        case TimeUnit.MINUTE:
            return date.getMinutes();
        case TimeUnit.SECOND:
            return date.getSeconds();
        case TimeUnit.MS:
            return date.getMilliseconds();
        default:
            throw Error("Invalid TimeUnit");
    }
}
/** Sets the given time unit to the given time in date object. Modifies given `date` object and returns it. */
export function setTimeUnit(unit, time, date, isPm) {
    switch (unit) {
        case TimeUnit.HOUR_24:
            date.setHours(time);
            break;
        case TimeUnit.HOUR_12:
            date.setHours(get24HourFrom12Hour(time, isPm));
            break;
        case TimeUnit.MINUTE:
            date.setMinutes(time);
            break;
        case TimeUnit.SECOND:
            date.setSeconds(time);
            break;
        case TimeUnit.MS:
            date.setMilliseconds(time);
            break;
        default:
            throw Error("Invalid TimeUnit");
    }
    return date;
}
/** Returns true if `time` is a valid value */
export function isTimeUnitValid(unit, time) {
    return time != null && !isNaN(time) && getTimeUnitMin(unit) <= time && time <= getTimeUnitMax(unit);
}
/** If unit of time is greater than max, returns min. If less than min, returns max. Otherwise, returns time. */
export function wrapTimeAtUnit(unit, time) {
    var max = getTimeUnitMax(unit);
    var min = getTimeUnitMin(unit);
    if (time > max) {
        return min;
    }
    else if (time < min) {
        return max;
    }
    return time;
}
export function getTimeUnitClassName(unit) {
    return TimeUnitMetadata[unit].className;
}
export function getTimeUnitMax(unit) {
    return TimeUnitMetadata[unit].max;
}
export function getTimeUnitMin(unit) {
    return TimeUnitMetadata[unit].min;
}
export function getDefaultMinTime() {
    return new Date(0, 0, 0, DEFAULT_MIN_HOUR, DEFAULT_MIN_MINUTE, DEFAULT_MIN_SECOND, DEFAULT_MIN_MILLISECOND);
}
export function getDefaultMaxTime() {
    return new Date(0, 0, 0, DEFAULT_MAX_HOUR, DEFAULT_MAX_MINUTE, DEFAULT_MAX_SECOND, DEFAULT_MAX_MILLISECOND);
}
var DEFAULT_MIN_HOUR = 0;
var MERIDIEM_MIN_HOUR = 1;
var DEFAULT_MIN_MINUTE = 0;
var DEFAULT_MIN_SECOND = 0;
var DEFAULT_MIN_MILLISECOND = 0;
var DEFAULT_MAX_HOUR = 23;
var MERIDIEM_MAX_HOUR = 12;
var DEFAULT_MAX_MINUTE = 59;
var DEFAULT_MAX_SECOND = 59;
var DEFAULT_MAX_MILLISECOND = 999;
/**
 * A datastore (internal to this file) mapping TimeUnits to useful information about them.
 * Use the `get*` methods above to access these fields.
 */
var TimeUnitMetadata = (_a = {},
    _a[TimeUnit.HOUR_24] = {
        className: Classes.TIMEPICKER_HOUR,
        max: DEFAULT_MAX_HOUR,
        min: DEFAULT_MIN_HOUR,
    },
    _a[TimeUnit.HOUR_12] = {
        className: Classes.TIMEPICKER_HOUR,
        max: MERIDIEM_MAX_HOUR,
        min: MERIDIEM_MIN_HOUR,
    },
    _a[TimeUnit.MINUTE] = {
        className: Classes.TIMEPICKER_MINUTE,
        max: DEFAULT_MAX_MINUTE,
        min: DEFAULT_MIN_MINUTE,
    },
    _a[TimeUnit.SECOND] = {
        className: Classes.TIMEPICKER_SECOND,
        max: DEFAULT_MAX_SECOND,
        min: DEFAULT_MIN_SECOND,
    },
    _a[TimeUnit.MS] = {
        className: Classes.TIMEPICKER_MILLISECOND,
        max: DEFAULT_MAX_MILLISECOND,
        min: DEFAULT_MIN_MILLISECOND,
    },
    _a);
//# sourceMappingURL=timeUnit.js.map