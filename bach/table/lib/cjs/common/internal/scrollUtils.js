"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
exports.measureScrollBarThickness = exports.getScrollPositionForRegion = void 0;
var regions_1 = require("../../regions");
/**
 * Returns the scroll{Left,Top} offsets of the provided region based on its
 * cardinality.
 */
function getScrollPositionForRegion(region, currScrollLeft, currScrollTop, getLeftOffset, getTopOffset, numFrozenRows, numFrozenColumns) {
    if (numFrozenRows === void 0) { numFrozenRows = 0; }
    if (numFrozenColumns === void 0) { numFrozenColumns = 0; }
    var cardinality = regions_1.Regions.getRegionCardinality(region);
    var scrollTop = currScrollTop;
    var scrollLeft = currScrollLeft;
    // if these were max-frozen-index values, we would have added 1 before passing to the get*Offset
    // functions, but the counts are already 1-indexed, so we can just pass those.
    var frozenColumnsCumulativeWidth = getLeftOffset(numFrozenColumns);
    var frozenRowsCumulativeHeight = getTopOffset(numFrozenRows);
    switch (cardinality) {
        case regions_1.RegionCardinality.CELLS: {
            // scroll to the top-left corner of the block of cells
            var topOffset = getTopOffset(region.rows[0]);
            var leftOffset = getLeftOffset(region.cols[0]);
            scrollTop = getClampedScrollPosition(topOffset, frozenRowsCumulativeHeight);
            scrollLeft = getClampedScrollPosition(leftOffset, frozenColumnsCumulativeWidth);
            break;
        }
        case regions_1.RegionCardinality.FULL_ROWS: {
            // scroll to the top of the row block
            var topOffset = getTopOffset(region.rows[0]);
            scrollTop = getClampedScrollPosition(topOffset, frozenRowsCumulativeHeight);
            break;
        }
        case regions_1.RegionCardinality.FULL_COLUMNS: {
            // scroll to the left side of the column block
            var leftOffset = getLeftOffset(region.cols[0]);
            scrollLeft = getClampedScrollPosition(leftOffset, frozenColumnsCumulativeWidth);
            break;
        }
        default: {
            // if it's a FULL_TABLE region, scroll back to the top-left cell of the table
            scrollTop = 0;
            scrollLeft = 0;
            break;
        }
    }
    return { scrollLeft: scrollLeft, scrollTop: scrollTop };
}
exports.getScrollPositionForRegion = getScrollPositionForRegion;
/**
 * Returns the thickness of the target scroll bar in pixels.
 * If the target scroll bar is not present, 0 is returned.
 */
function measureScrollBarThickness(element, direction) {
    if (element == null) {
        return 0;
    }
    // offset size includes the scroll bar. client size does not.
    // the difference gives the thickness of the scroll bar.
    return direction === "horizontal"
        ? element.offsetHeight - element.clientHeight
        : element.offsetWidth - element.clientWidth;
}
exports.measureScrollBarThickness = measureScrollBarThickness;
/**
 * Adjust the scroll position to align content just beyond the frozen region, if necessary.
 */
function getClampedScrollPosition(scrollOffset, frozenRegionCumulativeSize) {
    // if the new scroll offset falls within the frozen region, clamp it to 0
    return Math.max(scrollOffset - frozenRegionCumulativeSize, 0);
}
//# sourceMappingURL=scrollUtils.js.map