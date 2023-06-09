"use strict";
/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
exports.DateRangeSelectionStrategy = void 0;
var core_1 = require("@blueprintjs/core");
var dateUtils_1 = require("./common/dateUtils");
/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
var DateRangeSelectionStrategy = /** @class */ (function () {
    function DateRangeSelectionStrategy() {
    }
    /**
     * Returns the new date-range and the boundary that would be affected if `day` were clicked. The
     * affected boundary may be different from the provided `boundary` in some cases. For example,
     * clicking a particular boundary's selected date will always deselect it regardless of which
     * `boundary` you provide to this function (because it's simply a more intuitive interaction).
     */
    DateRangeSelectionStrategy.getNextState = function (currentRange, day, allowSingleDayRange, boundary) {
        if (boundary != null) {
            return this.getNextStateForBoundary(currentRange, day, allowSingleDayRange, boundary);
        }
        else {
            return this.getDefaultNextState(currentRange, day, allowSingleDayRange);
        }
    };
    DateRangeSelectionStrategy.getNextStateForBoundary = function (currentRange, day, allowSingleDayRange, boundary) {
        var boundaryDate = this.getBoundaryDate(boundary, currentRange);
        var otherBoundary = this.getOtherBoundary(boundary);
        var otherBoundaryDate = this.getBoundaryDate(otherBoundary, currentRange);
        var nextBoundary;
        var nextDateRange;
        if (boundaryDate == null && otherBoundaryDate == null) {
            nextBoundary = boundary;
            nextDateRange = this.createRangeForBoundary(boundary, day, null);
        }
        else if (boundaryDate != null && otherBoundaryDate == null) {
            var nextBoundaryDate = (0, dateUtils_1.areSameDay)(boundaryDate, day) ? null : day;
            nextBoundary = boundary;
            nextDateRange = this.createRangeForBoundary(boundary, nextBoundaryDate, null);
        }
        else if (boundaryDate == null && otherBoundaryDate != null) {
            if ((0, dateUtils_1.areSameDay)(day, otherBoundaryDate)) {
                var nextDate = void 0;
                if (allowSingleDayRange) {
                    nextBoundary = boundary;
                    nextDate = otherBoundaryDate;
                }
                else {
                    nextBoundary = otherBoundary;
                    nextDate = null;
                }
                nextDateRange = this.createRangeForBoundary(boundary, nextDate, nextDate);
            }
            else if (this.isOverlappingOtherBoundary(boundary, day, otherBoundaryDate)) {
                nextBoundary = otherBoundary;
                nextDateRange = this.createRangeForBoundary(boundary, otherBoundaryDate, day);
            }
            else {
                nextBoundary = boundary;
                nextDateRange = this.createRangeForBoundary(boundary, day, otherBoundaryDate);
            }
        }
        else {
            // both boundaryDate and otherBoundaryDate are already defined
            if ((0, dateUtils_1.areSameDay)(boundaryDate, day)) {
                var isSingleDayRangeSelected = (0, dateUtils_1.areSameDay)(boundaryDate, otherBoundaryDate);
                var nextOtherBoundaryDate = isSingleDayRangeSelected ? null : otherBoundaryDate;
                nextBoundary = boundary;
                nextDateRange = this.createRangeForBoundary(boundary, null, nextOtherBoundaryDate);
            }
            else if ((0, dateUtils_1.areSameDay)(day, otherBoundaryDate)) {
                var _a = allowSingleDayRange
                    ? [otherBoundaryDate, otherBoundaryDate]
                    : [boundaryDate, null], nextBoundaryDate = _a[0], nextOtherBoundaryDate = _a[1];
                nextBoundary = allowSingleDayRange ? boundary : otherBoundary;
                nextDateRange = this.createRangeForBoundary(boundary, nextBoundaryDate, nextOtherBoundaryDate);
            }
            else if (this.isOverlappingOtherBoundary(boundary, day, otherBoundaryDate)) {
                nextBoundary = boundary;
                nextDateRange = this.createRangeForBoundary(boundary, day, null);
            }
            else {
                // extend the date range with an earlier boundaryDate date
                nextBoundary = boundary;
                nextDateRange = this.createRangeForBoundary(boundary, day, otherBoundaryDate);
            }
        }
        return { dateRange: nextDateRange, boundary: nextBoundary };
    };
    DateRangeSelectionStrategy.getDefaultNextState = function (selectedRange, day, allowSingleDayRange) {
        var start = selectedRange[0], end = selectedRange[1];
        var nextDateRange;
        if (start == null && end == null) {
            nextDateRange = [day, null];
        }
        else if (start != null && end == null) {
            nextDateRange = this.createRange(day, start, allowSingleDayRange);
        }
        else if (start == null && end != null) {
            nextDateRange = this.createRange(day, end, allowSingleDayRange);
        }
        else {
            var isStart = (0, dateUtils_1.areSameDay)(start, day);
            var isEnd = (0, dateUtils_1.areSameDay)(end, day);
            if (isStart && isEnd) {
                nextDateRange = [null, null];
            }
            else if (isStart) {
                nextDateRange = [null, end];
            }
            else if (isEnd) {
                nextDateRange = [start, null];
            }
            else {
                nextDateRange = [day, null];
            }
        }
        return { dateRange: nextDateRange };
    };
    DateRangeSelectionStrategy.getOtherBoundary = function (boundary) {
        return boundary === core_1.Boundary.START ? core_1.Boundary.END : core_1.Boundary.START;
    };
    DateRangeSelectionStrategy.getBoundaryDate = function (boundary, dateRange) {
        return boundary === core_1.Boundary.START ? dateRange[0] : dateRange[1];
    };
    DateRangeSelectionStrategy.isOverlappingOtherBoundary = function (boundary, boundaryDate, otherBoundaryDate) {
        return boundary === core_1.Boundary.START ? boundaryDate > otherBoundaryDate : boundaryDate < otherBoundaryDate;
    };
    DateRangeSelectionStrategy.createRangeForBoundary = function (boundary, boundaryDate, otherBoundaryDate) {
        return boundary === core_1.Boundary.START
            ? [boundaryDate, otherBoundaryDate]
            : [otherBoundaryDate, boundaryDate];
    };
    DateRangeSelectionStrategy.createRange = function (a, b, allowSingleDayRange) {
        // clicking the same date again will clear it
        if (!allowSingleDayRange && (0, dateUtils_1.areSameDay)(a, b)) {
            return [null, null];
        }
        return a < b ? [a, b] : [b, a];
    };
    return DateRangeSelectionStrategy;
}());
exports.DateRangeSelectionStrategy = DateRangeSelectionStrategy;
//# sourceMappingURL=dateRangeSelectionStrategy.js.map