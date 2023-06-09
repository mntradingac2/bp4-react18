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
import { Utils } from "./common/utils";
import { Locator } from "./locator";
// these default values for `resizeRowsByApproximateHeight` have been
// fine-tuned to work well with default Table font styles.
const resizeRowsByApproximateHeightDefaults = {
    getApproximateCharWidth: 8,
    getApproximateLineHeight: 18,
    getCellHorizontalPadding: 2 * Locator.CELL_HORIZONTAL_PADDING,
    getNumBufferLines: 1,
};
/**
 * Returns an object with option keys mapped to their resolved values
 * (falling back to default values as necessary).
 */
function resolveResizeRowsByApproximateHeightOptions(options, rowIndex, columnIndex) {
    const optionKeys = Object.keys(resizeRowsByApproximateHeightDefaults);
    const optionReducer = (agg, key) => {
        const valueOrMapper = options?.[key];
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
export function resizeRowsByApproximateHeight(numRows, columnWidths, getCellText, options) {
    const numColumns = columnWidths.length;
    const rowHeights = [];
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        let maxCellHeightInRow = 0;
        // iterate through each cell in the row
        for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
            // resolve all parameters to raw values
            const { getApproximateCharWidth: approxCharWidth, getApproximateLineHeight: approxLineHeight, getCellHorizontalPadding: horizontalPadding, getNumBufferLines: numBufferLines, } = resolveResizeRowsByApproximateHeightOptions(options, rowIndex, columnIndex);
            const cellText = getCellText(rowIndex, columnIndex);
            const approxCellHeight = Utils.getApproxCellHeight(cellText, columnWidths[columnIndex], approxCharWidth, approxLineHeight, horizontalPadding, numBufferLines);
            if (approxCellHeight > maxCellHeightInRow) {
                maxCellHeightInRow = approxCellHeight;
            }
        }
        rowHeights.push(maxCellHeightInRow);
    }
    return rowHeights;
}
/**
 * Resize all rows in the table to the height of the tallest visible cell in the specified columns.
 * If no indices are provided, default to using the tallest visible cell from all columns in view.
 */
export function resizeRowsByTallestCell(grid, viewportRect, locator, numRows, columnIndices) {
    let tallest = 0;
    if (columnIndices === undefined) {
        // Consider all columns currently in viewport
        const viewportColumnIndices = grid.getColumnIndicesInRect(viewportRect);
        for (let col = viewportColumnIndices.columnIndexStart; col <= viewportColumnIndices.columnIndexEnd; col++) {
            tallest = Math.max(tallest, locator.getTallestVisibleCellInColumn(col));
        }
    }
    else {
        const columnIndicesArray = Array.isArray(columnIndices) ? columnIndices : [columnIndices];
        const tallestByColumns = columnIndicesArray.map(col => locator.getTallestVisibleCellInColumn(col));
        tallest = Math.max(...tallestByColumns);
    }
    return Array(numRows).fill(tallest);
}
//# sourceMappingURL=resizeRows.js.map