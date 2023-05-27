"use strict";
/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
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
exports.resizeRowsByTallestCell = exports.resizeRowsByApproximateHeight = void 0;
var utils_1 = require("./common/utils");
var locator_1 = require("./locator");
// these default values for `resizeRowsByApproximateHeight` have been
// fine-tuned to work well with default Table font styles.
var resizeRowsByApproximateHeightDefaults = {
    getApproximateCharWidth: 8,
    getApproximateLineHeight: 18,
    getCellHorizontalPadding: 2 * locator_1.Locator.CELL_HORIZONTAL_PADDING,
    getNumBufferLines: 1,
};
/**
 * Returns an object with option keys mapped to their resolved values
 * (falling back to default values as necessary).
 */
function resolveResizeRowsByApproximateHeightOptions(options, rowIndex, columnIndex) {
    var optionKeys = Object.keys(resizeRowsByApproximateHeightDefaults);
    var optionReducer = function (agg, key) {
        var valueOrMapper = options === null || options === void 0 ? void 0 : options[key];
        if (typeof valueOrMapper === "function") {
            agg[key] = valueOrMapper(rowIndex, columnIndex);
        }
        else if (valueOrMapper != null) {
            agg[key] = valueOrMapper;
        }
        else {
            agg[key] = resizeRowsByApproximateHeightDefaults[key];
        }
        return agg;
    };
    return optionKeys.reduce(optionReducer, {});
}
/**
 * Resizes all rows in the table to the approximate
 * maximum height of wrapped cell content in each row. Works best when each
 * cell contains plain text of a consistent font style (though font style
 * may vary between cells). Since this function uses approximate
 * measurements, results may not be perfect.
 */
function resizeRowsByApproximateHeight(numRows, columnWidths, getCellText, options) {
    var numColumns = columnWidths.length;
    var rowHeights = [];
    for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
        var maxCellHeightInRow = 0;
        // iterate through each cell in the row
        for (var columnIndex = 0; columnIndex < numColumns; columnIndex++) {
            // resolve all parameters to raw values
            var _a = resolveResizeRowsByApproximateHeightOptions(options, rowIndex, columnIndex), approxCharWidth = _a.getApproximateCharWidth, approxLineHeight = _a.getApproximateLineHeight, horizontalPadding = _a.getCellHorizontalPadding, numBufferLines = _a.getNumBufferLines;
            var cellText = getCellText(rowIndex, columnIndex);
            var approxCellHeight = utils_1.Utils.getApproxCellHeight(cellText, columnWidths[columnIndex], approxCharWidth, approxLineHeight, horizontalPadding, numBufferLines);
            if (approxCellHeight > maxCellHeightInRow) {
                maxCellHeightInRow = approxCellHeight;
            }
        }
        rowHeights.push(maxCellHeightInRow);
    }
    return rowHeights;
}
exports.resizeRowsByApproximateHeight = resizeRowsByApproximateHeight;
/**
 * Resize all rows in the table to the height of the tallest visible cell in the specified columns.
 * If no indices are provided, default to using the tallest visible cell from all columns in view.
 */
function resizeRowsByTallestCell(grid, viewportRect, locator, numRows, columnIndices) {
    var tallest = 0;
    if (columnIndices === undefined) {
        // Consider all columns currently in viewport
        var viewportColumnIndices = grid.getColumnIndicesInRect(viewportRect);
        for (var col = viewportColumnIndices.columnIndexStart; col <= viewportColumnIndices.columnIndexEnd; col++) {
            tallest = Math.max(tallest, locator.getTallestVisibleCellInColumn(col));
        }
    }
    else {
        var columnIndicesArray = Array.isArray(columnIndices) ? columnIndices : [columnIndices];
        var tallestByColumns = columnIndicesArray.map(function (col) { return locator.getTallestVisibleCellInColumn(col); });
        tallest = Math.max.apply(Math, tallestByColumns);
    }
    return Array(numRows).fill(tallest);
}
exports.resizeRowsByTallestCell = resizeRowsByTallestCell;
//# sourceMappingURL=resizeRows.js.map