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
import * as Classes from "./common/classes";
import { Utils } from "./common/utils";
/**
 * `Region`s contain sets of cells. Additionally, a distinction is drawn, for
 * example, between all cells within a column and the whole column itself.
 * The `RegionCardinality` enum represents these distinct types of `Region`s.
 */
export var RegionCardinality;
(function (RegionCardinality) {
    /**
     * A region that contains a finite rectangular group of table cells
     */
    RegionCardinality["CELLS"] = "cells";
    /**
     * A region that represents all cells within 1 or more rows.
     */
    RegionCardinality["FULL_ROWS"] = "full-rows";
    /**
     * A region that represents all cells within 1 or more columns.
     */
    RegionCardinality["FULL_COLUMNS"] = "full-columns";
    /**
     * A region that represents all cells in the table.
     */
    RegionCardinality["FULL_TABLE"] = "full-table";
})(RegionCardinality || (RegionCardinality = {}));
/**
 * A convenience object for subsets of `RegionCardinality` that are commonly
 * used as the `selectionMode` prop of the `<Table>`.
 */
export const SelectionModes = {
    ALL: [
        RegionCardinality.FULL_TABLE,
        RegionCardinality.FULL_COLUMNS,
        RegionCardinality.FULL_ROWS,
        RegionCardinality.CELLS,
    ],
    COLUMNS_AND_CELLS: [RegionCardinality.FULL_COLUMNS, RegionCardinality.CELLS],
    COLUMNS_ONLY: [RegionCardinality.FULL_COLUMNS],
    NONE: [],
    ROWS_AND_CELLS: [RegionCardinality.FULL_ROWS, RegionCardinality.CELLS],
    ROWS_ONLY: [RegionCardinality.FULL_ROWS],
};
export var ColumnLoadingOption;
(function (ColumnLoadingOption) {
    ColumnLoadingOption["CELLS"] = "cells";
    ColumnLoadingOption["HEADER"] = "column-header";
})(ColumnLoadingOption || (ColumnLoadingOption = {}));
export var RowLoadingOption;
(function (RowLoadingOption) {
    RowLoadingOption["CELLS"] = "cells";
    RowLoadingOption["HEADER"] = "row-header";
})(RowLoadingOption || (RowLoadingOption = {}));
export var TableLoadingOption;
(function (TableLoadingOption) {
    TableLoadingOption["CELLS"] = "cells";
    TableLoadingOption["COLUMN_HEADERS"] = "column-header";
    TableLoadingOption["ROW_HEADERS"] = "row-header";
})(TableLoadingOption || (TableLoadingOption = {}));
/**
 * Table Regions API.
 *
 * @see https://blueprintjs.com/docs/#table/api.region
 */
/* eslint-disable-next-line @typescript-eslint/no-extraneous-class */
export class Regions {
    /**
     * Determines the cardinality of a region. We use null values to indicate
     * an unbounded interval. Therefore, an example of a region containing the
     * second and third columns would be:
     *
     * ```js
     * { rows: null, cols: [1, 2] }
     * ```
     *
     * In this case, this method would return `RegionCardinality.FULL_COLUMNS`.
     *
     * If both rows and columns are unbounded, then the region covers the
     * entire table. Therefore, a region like this:
     *
     * ```js
     * { rows: null, cols: null }
     * ```
     *
     * will return `RegionCardinality.FULL_TABLE`.
     *
     * An example of a region containing a single cell in the table would be:
     *
     * ```js
     * { rows: [5, 5], cols: [2, 2] }
     * ```
     *
     * In this case, this method would return `RegionCardinality.CELLS`.
     */
    static getRegionCardinality(region) {
        if (region.cols != null && region.rows != null) {
            return RegionCardinality.CELLS;
        }
        else if (region.cols != null) {
            return RegionCardinality.FULL_COLUMNS;
        }
        else if (region.rows != null) {
            return RegionCardinality.FULL_ROWS;
        }
        else {
            return RegionCardinality.FULL_TABLE;
        }
    }
    static getFocusCellCoordinatesFromRegion(region) {
        const regionCardinality = Regions.getRegionCardinality(region);
        // HACKHACK: non-null assertions ahead, consider designing some type guards instead
        switch (regionCardinality) {
            case RegionCardinality.FULL_TABLE:
                return { col: 0, row: 0 };
            case RegionCardinality.FULL_COLUMNS:
                return { col: region.cols[0], row: 0 };
            case RegionCardinality.FULL_ROWS:
                return { col: 0, row: region.rows[0] };
            case RegionCardinality.CELLS:
                return { col: region.cols[0], row: region.rows[0] };
        }
    }
    /**
     * Returns a deep copy of the provided region.
     */
    static copy(region) {
        const cardinality = Regions.getRegionCardinality(region);
        // HACKHACK: non-null assertions ahead, consider designing some type guards instead
        // N.B. we need to be careful not to explicitly spell out `rows: undefined`
        // (e.g.) if the "rows" key is completely absent, otherwise
        // deep-equality checks will fail.
        if (cardinality === RegionCardinality.CELLS) {
            return Regions.cell(region.rows[0], region.cols[0], region.rows[1], region.cols[1]);
        }
        else if (cardinality === RegionCardinality.FULL_COLUMNS) {
            return Regions.column(region.cols[0], region.cols[1]);
        }
        else if (cardinality === RegionCardinality.FULL_ROWS) {
            return Regions.row(region.rows[0], region.rows[1]);
        }
        else {
            return Regions.table();
        }
    }
    /**
     * Returns a region containing one or more cells.
     */
    static cell(row, col, row2, col2) {
        return {
            cols: this.normalizeInterval(col, col2),
            rows: this.normalizeInterval(row, row2),
        };
    }
    /**
     * Returns a region containing one or more full rows.
     */
    static row(row, row2) {
        return { rows: this.normalizeInterval(row, row2) };
    }
    /**
     * Returns a region containing one or more full columns.
     */
    static column(col, col2) {
        return { cols: this.normalizeInterval(col, col2) };
    }
    /**
     * Returns a region containing the entire table.
     */
    static table() {
        return {};
    }
    /**
     * Adds the region to the end of a cloned copy of the supplied region
     * array.
     */
    static add(regions, region) {
        const copy = regions.slice();
        copy.push(region);
        return copy;
    }
    /**
     * Replaces the region at the end of a cloned copy of the supplied region
     * array, or at the specific index if one is provided.
     */
    static update(regions, region, index) {
        const copy = regions.slice();
        if (index != null) {
            copy.splice(index, 1, region);
        }
        else {
            copy.pop();
            copy.push(region);
        }
        return copy;
    }
    /**
     * Clamps the region's start and end indices between 0 and the provided
     * maximum values.
     */
    static clampRegion(region, maxRowIndex, maxColumnIndex) {
        const nextRegion = Regions.copy(region);
        if (region.rows != null) {
            nextRegion.rows[0] = Utils.clamp(region.rows[0], 0, maxRowIndex);
            nextRegion.rows[1] = Utils.clamp(region.rows[1], 0, maxRowIndex);
        }
        if (region.cols != null) {
            nextRegion.cols[0] = Utils.clamp(region.cols[0], 0, maxColumnIndex);
            nextRegion.cols[1] = Utils.clamp(region.cols[1], 0, maxColumnIndex);
        }
        return nextRegion;
    }
    /**
     * Returns true iff the specified region is equal to the last region in
     * the region list. This allows us to avoid immediate additive re-selection.
     */
    static lastRegionIsEqual(regions, region) {
        if (regions == null || regions.length === 0) {
            return false;
        }
        const lastRegion = regions[regions.length - 1];
        return Regions.regionsEqual(lastRegion, region);
    }
    /**
     * Returns the index of the region that is equal to the supplied
     * parameter. Returns -1 if no such region is found.
     */
    static findMatchingRegion(regions, region) {
        if (regions == null) {
            return -1;
        }
        for (let i = 0; i < regions.length; i++) {
            if (Regions.regionsEqual(regions[i], region)) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Returns the index of the region that wholly contains the supplied
     * parameter. Returns -1 if no such region is found.
     */
    static findContainingRegion(regions, region) {
        if (regions == null) {
            return -1;
        }
        for (let i = 0; i < regions.length; i++) {
            if (Regions.regionContains(regions[i], region)) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Returns true if the regions contain a region that has FULL_COLUMNS
     * cardinality and contains the specified column index.
     */
    static hasFullColumn(regions, col) {
        if (regions == null) {
            return false;
        }
        for (const region of regions) {
            const cardinality = Regions.getRegionCardinality(region);
            if (cardinality === RegionCardinality.FULL_TABLE) {
                return true;
            }
            if (cardinality === RegionCardinality.FULL_COLUMNS && Regions.intervalContainsIndex(region.cols, col)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns true if the regions contain a region that has FULL_ROWS
     * cardinality and contains the specified row index.
     */
    static hasFullRow(regions, row) {
        if (regions == null) {
            return false;
        }
        for (const region of regions) {
            const cardinality = Regions.getRegionCardinality(region);
            if (cardinality === RegionCardinality.FULL_TABLE) {
                return true;
            }
            if (cardinality === RegionCardinality.FULL_ROWS && Regions.intervalContainsIndex(region.rows, row)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns true if the regions contain a region that has FULL_TABLE cardinality
     */
    static hasFullTable(regions) {
        if (regions == null) {
            return false;
        }
        for (const region of regions) {
            const cardinality = Regions.getRegionCardinality(region);
            if (cardinality === RegionCardinality.FULL_TABLE) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns true if the regions fully contain the query region.
     */
    static containsRegion(regions, query) {
        return Regions.overlapsRegion(regions, query, false);
    }
    /**
     * Returns true if the regions at least partially overlap the query region.
     */
    static overlapsRegion(regions, query, allowPartialOverlap = false) {
        const intervalCompareFn = allowPartialOverlap ? Regions.intervalOverlaps : Regions.intervalContains;
        if (regions == null || query == null) {
            return false;
        }
        for (const region of regions) {
            const cardinality = Regions.getRegionCardinality(region);
            switch (cardinality) {
                case RegionCardinality.FULL_TABLE:
                    return true;
                case RegionCardinality.FULL_COLUMNS:
                    if (intervalCompareFn(region.cols, query.cols)) {
                        return true;
                    }
                    continue;
                case RegionCardinality.FULL_ROWS:
                    if (intervalCompareFn(region.rows, query.rows)) {
                        return true;
                    }
                    continue;
                case RegionCardinality.CELLS:
                    if (intervalCompareFn(region.cols, query.cols) && intervalCompareFn(region.rows, query.rows)) {
                        return true;
                    }
                    continue;
                default:
                    break;
            }
        }
        return false;
    }
    static eachUniqueFullColumn(regions, iteratee) {
        if (regions == null || regions.length === 0 || iteratee == null) {
            return;
        }
        const seen = {};
        regions.forEach((region) => {
            if (Regions.getRegionCardinality(region) === RegionCardinality.FULL_COLUMNS) {
                const [start, end] = region.cols;
                for (let col = start; col <= end; col++) {
                    if (!seen[col]) {
                        seen[col] = true;
                        iteratee(col);
                    }
                }
            }
        });
    }
    static eachUniqueFullRow(regions, iteratee) {
        if (regions == null || regions.length === 0 || iteratee == null) {
            return;
        }
        const seen = {};
        regions.forEach((region) => {
            if (Regions.getRegionCardinality(region) === RegionCardinality.FULL_ROWS) {
                const [start, end] = region.rows;
                for (let row = start; row <= end; row++) {
                    if (!seen[row]) {
                        seen[row] = true;
                        iteratee(row);
                    }
                }
            }
        });
    }
    /**
     * Using the supplied array of non-contiguous `Region`s, this method
     * returns an ordered array of every unique cell that exists in those
     * regions.
     */
    static enumerateUniqueCells(regions, numRows, numCols) {
        if (regions == null || regions.length === 0) {
            return [];
        }
        const seen = {};
        const list = [];
        for (const region of regions) {
            Regions.eachCellInRegion(region, numRows, numCols, (row, col) => {
                // add to list if not seen
                const key = `${row}-${col}`;
                if (seen[key] !== true) {
                    seen[key] = true;
                    list.push([row, col]);
                }
            });
        }
        // sort list by rows then columns
        list.sort(Regions.rowFirstComparator);
        return list;
    }
    /**
     * Using the supplied region, returns an "equivalent" region of
     * type CELLS that define the bounds of the given region
     */
    static getCellRegionFromRegion(region, numRows, numCols) {
        const regionCardinality = Regions.getRegionCardinality(region);
        switch (regionCardinality) {
            case RegionCardinality.FULL_TABLE:
                return Regions.cell(0, 0, numRows - 1, numCols - 1);
            case RegionCardinality.FULL_COLUMNS:
                return Regions.cell(0, region.cols[0], numRows - 1, region.cols[1]);
            case RegionCardinality.FULL_ROWS:
                return Regions.cell(region.rows[0], 0, region.rows[1], numCols - 1);
            case RegionCardinality.CELLS:
                return Regions.cell(region.rows[0], region.cols[0], region.rows[1], region.cols[1]);
        }
    }
    /**
     * Maps a dense array of cell coordinates to a sparse 2-dimensional array
     * of cell values.
     *
     * We create a new 2-dimensional array representing the smallest single
     * contiguous `Region` that contains all cells in the supplied array. We
     * invoke the mapper callback only on the cells in the supplied coordinate
     * array and store the result. Returns the resulting 2-dimensional array.
     *
     * If there is no contiguous `Region` which contains all the cells, we
     * return `undefined`.
     */
    static sparseMapCells(cells, mapper) {
        const bounds = Regions.getBoundingRegion(cells);
        if (bounds === undefined) {
            return undefined;
        }
        const numRows = bounds.rows[1] + 1 - bounds.rows[0];
        const numCols = bounds.cols[1] + 1 - bounds.cols[0];
        const result = Utils.times(numRows, () => new Array(numCols));
        cells.forEach(([row, col]) => {
            result[row - bounds.rows[0]][col - bounds.cols[0]] = mapper(row, col);
        });
        return result;
    }
    /**
     * Returns the smallest single contiguous `Region` that contains all cells in the
     * supplied array.
     */
    static getBoundingRegion(cells) {
        let minRow;
        let maxRow;
        let minCol;
        let maxCol;
        for (const [row, col] of cells) {
            minRow = minRow === undefined || row < minRow ? row : minRow;
            maxRow = maxRow === undefined || row > maxRow ? row : maxRow;
            minCol = minCol === undefined || col < minCol ? col : minCol;
            maxCol = maxCol === undefined || col > maxCol ? col : maxCol;
        }
        if (minRow === undefined || maxRow === undefined || minCol === undefined || maxCol === undefined) {
            return undefined;
        }
        return {
            cols: [minCol, maxCol],
            rows: [minRow, maxRow],
        };
    }
    static isValid(region) {
        if (region == null) {
            return false;
        }
        if (region.rows != null && (region.rows[0] < 0 || region.rows[1] < 0)) {
            return false;
        }
        if (region.cols != null && (region.cols[0] < 0 || region.cols[1] < 0)) {
            return false;
        }
        return true;
    }
    static isRegionValidForTable(region, numRows, numCols) {
        if (numRows === 0 || numCols === 0) {
            return false;
        }
        else if (region.rows != null && !intervalInRangeInclusive(region.rows, 0, numRows - 1)) {
            return false;
        }
        else if (region.cols != null && !intervalInRangeInclusive(region.cols, 0, numCols - 1)) {
            return false;
        }
        return true;
    }
    static joinStyledRegionGroups(selectedRegions, otherRegions, focusedCell) {
        let regionGroups = [];
        if (otherRegions != null) {
            regionGroups = regionGroups.concat(otherRegions);
        }
        if (selectedRegions != null && selectedRegions.length > 0) {
            regionGroups.push({
                className: Classes.TABLE_SELECTION_REGION,
                regions: selectedRegions,
            });
        }
        if (focusedCell !== undefined) {
            regionGroups.push({
                className: Classes.TABLE_FOCUS_REGION,
                regions: [Regions.cell(focusedCell.row, focusedCell.col)],
            });
        }
        return regionGroups;
    }
    static regionsEqual(regionA, regionB) {
        return Regions.intervalsEqual(regionA.rows, regionB.rows) && Regions.intervalsEqual(regionA.cols, regionB.cols);
    }
    /**
     * Expands an old region to the minimal bounding region that also contains
     * the new region. If the regions have different cardinalities, then the new
     * region is returned. Useful for expanding a selected region on
     * shift+click, for instance.
     */
    static expandRegion(oldRegion, newRegion) {
        const oldRegionCardinality = Regions.getRegionCardinality(oldRegion);
        const newRegionCardinality = Regions.getRegionCardinality(newRegion);
        if (newRegionCardinality !== oldRegionCardinality) {
            return newRegion;
        }
        switch (newRegionCardinality) {
            case RegionCardinality.FULL_ROWS: {
                const rowStart = Math.min(oldRegion.rows[0], newRegion.rows[0]);
                const rowEnd = Math.max(oldRegion.rows[1], newRegion.rows[1]);
                return Regions.row(rowStart, rowEnd);
            }
            case RegionCardinality.FULL_COLUMNS: {
                const colStart = Math.min(oldRegion.cols[0], newRegion.cols[0]);
                const colEnd = Math.max(oldRegion.cols[1], newRegion.cols[1]);
                return Regions.column(colStart, colEnd);
            }
            case RegionCardinality.CELLS: {
                const rowStart = Math.min(oldRegion.rows[0], newRegion.rows[0]);
                const colStart = Math.min(oldRegion.cols[0], newRegion.cols[0]);
                const rowEnd = Math.max(oldRegion.rows[1], newRegion.rows[1]);
                const colEnd = Math.max(oldRegion.cols[1], newRegion.cols[1]);
                return Regions.cell(rowStart, colStart, rowEnd, colEnd);
            }
            default:
                return Regions.table();
        }
    }
    /**
     * Iterates over the cells within an `Region`, invoking the callback with
     * each cell's coordinates.
     */
    static eachCellInRegion(region, numRows, numCols, iteratee) {
        const cardinality = Regions.getRegionCardinality(region);
        switch (cardinality) {
            case RegionCardinality.FULL_TABLE:
                for (let row = 0; row < numRows; row++) {
                    for (let col = 0; col < numCols; col++) {
                        iteratee(row, col);
                    }
                }
                break;
            case RegionCardinality.FULL_COLUMNS:
                for (let row = 0; row < numRows; row++) {
                    for (let col = region.cols[0]; col <= region.cols[1]; col++) {
                        iteratee(row, col);
                    }
                }
                break;
            case RegionCardinality.FULL_ROWS:
                for (let row = region.rows[0]; row <= region.rows[1]; row++) {
                    for (let col = 0; col < numCols; col++) {
                        iteratee(row, col);
                    }
                }
                break;
            case RegionCardinality.CELLS:
                for (let row = region.rows[0]; row <= region.rows[1]; row++) {
                    for (let col = region.cols[0]; col <= region.cols[1]; col++) {
                        iteratee(row, col);
                    }
                }
                break;
            default:
                break;
        }
    }
    static regionContains(regionA, regionB) {
        // containsRegion expects an array of regions as the first param
        return Regions.overlapsRegion([regionA], regionB, false);
    }
    static intervalsEqual(ivalA, ivalB) {
        if (ivalA == null) {
            return ivalB == null;
        }
        else if (ivalB == null) {
            return false;
        }
        else {
            return ivalA[0] === ivalB[0] && ivalA[1] === ivalB[1];
        }
    }
    static intervalContainsIndex(interval, index) {
        if (interval == null) {
            return false;
        }
        return interval[0] <= index && interval[1] >= index;
    }
    static intervalContains(ivalA, ivalB) {
        if (ivalA == null || ivalB == null) {
            return false;
        }
        return ivalA[0] <= ivalB[0] && ivalB[1] <= ivalA[1];
    }
    static intervalOverlaps(ivalA, ivalB) {
        if (ivalA == null || ivalB == null) {
            return false;
        }
        if (ivalA[1] < ivalB[0] || ivalA[0] > ivalB[1]) {
            return false;
        }
        return true;
    }
    static rowFirstComparator(a, b) {
        const rowDiff = a[0] - b[0];
        return rowDiff === 0 ? a[1] - b[1] : rowDiff;
    }
    static numericalComparator(a, b) {
        return a - b;
    }
    static normalizeInterval(coord, coord2) {
        if (coord2 == null) {
            coord2 = coord;
        }
        const interval = [coord, coord2];
        interval.sort(Regions.numericalComparator);
        return interval;
    }
}
function intervalInRangeInclusive(interval, minInclusive, maxInclusive) {
    return (inRangeInclusive(interval[0], minInclusive, maxInclusive) &&
        inRangeInclusive(interval[1], minInclusive, maxInclusive));
}
function inRangeInclusive(value, minInclusive, maxInclusive) {
    return value >= minInclusive && value <= maxInclusive;
}
//# sourceMappingURL=regions.js.map