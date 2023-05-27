"use strict";
/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
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
exports.TableHotkeys = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var clipboard_1 = require("./common/clipboard");
var direction_1 = require("./common/direction");
var errors_1 = require("./common/errors");
var FocusedCellUtils = tslib_1.__importStar(require("./common/internal/focusedCellUtils"));
var SelectionUtils = tslib_1.__importStar(require("./common/internal/selectionUtils"));
var regions_1 = require("./regions");
var TableHotkeys = /** @class */ (function () {
    function TableHotkeys(props, state, tableHandlers) {
        var _this = this;
        this.props = props;
        this.state = state;
        this.tableHandlers = tableHandlers;
        // Selection
        // =========
        this.selectAll = function (shouldUpdateFocusedCell) {
            var selectionHandler = _this.tableHandlers.getEnabledSelectionHandler(regions_1.RegionCardinality.FULL_TABLE);
            // clicking on upper left hand corner sets selection to "all"
            // regardless of current selection state (clicking twice does not deselect table)
            selectionHandler([regions_1.Regions.table()]);
            if (shouldUpdateFocusedCell) {
                var newFocusedCellCoordinates = regions_1.Regions.getFocusCellCoordinatesFromRegion(regions_1.Regions.table());
                _this.tableHandlers.handleFocus(FocusedCellUtils.toFullCoordinates(newFocusedCellCoordinates));
            }
        };
        this.handleSelectAllHotkey = function (e) {
            // prevent "real" select all from happening as well
            e.preventDefault();
            e.stopPropagation();
            // selecting-all via the keyboard should not move the focused cell.
            _this.selectAll(false);
        };
        this.handleSelectionResizeUp = function (e) { return _this.handleSelectionResize(e, direction_1.Direction.UP); };
        this.handleSelectionResizeDown = function (e) { return _this.handleSelectionResize(e, direction_1.Direction.DOWN); };
        this.handleSelectionResizeLeft = function (e) { return _this.handleSelectionResize(e, direction_1.Direction.LEFT); };
        this.handleSelectionResizeRight = function (e) { return _this.handleSelectionResize(e, direction_1.Direction.RIGHT); };
        this.handleSelectionResize = function (e, direction) {
            e.preventDefault();
            e.stopPropagation();
            var _a = _this.state, focusedCell = _a.focusedCell, selectedRegions = _a.selectedRegions;
            var index = FocusedCellUtils.getFocusedOrLastSelectedIndex(selectedRegions, focusedCell);
            if (index === undefined) {
                return;
            }
            var region = selectedRegions[index];
            var nextRegion = SelectionUtils.resizeRegion(region, direction, focusedCell);
            _this.updateSelectedRegionAtIndex(nextRegion, index);
        };
        // Focus
        // =====
        this.handleFocusMoveLeft = function (e) { return _this.handleFocusMove(e, "left"); };
        this.handleFocusMoveLeftInternal = function (e) { return _this.handleFocusMoveInternal(e, "left"); };
        this.handleFocusMoveRight = function (e) { return _this.handleFocusMove(e, "right"); };
        this.handleFocusMoveRightInternal = function (e) { return _this.handleFocusMoveInternal(e, "right"); };
        this.handleFocusMoveUp = function (e) { return _this.handleFocusMove(e, "up"); };
        this.handleFocusMoveUpInternal = function (e) { return _this.handleFocusMoveInternal(e, "up"); };
        this.handleFocusMoveDown = function (e) { return _this.handleFocusMove(e, "down"); };
        this.handleFocusMoveDownInternal = function (e) { return _this.handleFocusMoveInternal(e, "down"); };
        // no good way to call arrow-key keyboard events from tests
        /* istanbul ignore next */
        this.handleFocusMove = function (e, direction) {
            e.preventDefault();
            e.stopPropagation();
            var focusedCell = _this.state.focusedCell;
            if (focusedCell == null) {
                // halt early if we have a selectedRegionTransform or something else in play that nixes
                // the focused cell.
                return;
            }
            var newFocusedCell = {
                col: focusedCell.col,
                focusSelectionIndex: 0,
                row: focusedCell.row,
            };
            switch (direction) {
                case "up":
                    newFocusedCell.row -= 1;
                    break;
                case "down":
                    newFocusedCell.row += 1;
                    break;
                case "left":
                    newFocusedCell.col -= 1;
                    break;
                case "right":
                    newFocusedCell.col += 1;
                    break;
                default:
                    break;
            }
            if (newFocusedCell.row < 0 ||
                newFocusedCell.row >= _this.grid.numRows ||
                newFocusedCell.col < 0 ||
                newFocusedCell.col >= _this.grid.numCols) {
                return;
            }
            // change selection to match new focus cell location
            var newSelectionRegions = [regions_1.Regions.cell(newFocusedCell.row, newFocusedCell.col)];
            var selectedRegionTransform = _this.props.selectedRegionTransform;
            var transformedSelectionRegions = selectedRegionTransform != null
                ? newSelectionRegions.map(function (region) { return selectedRegionTransform(region, e); })
                : newSelectionRegions;
            _this.tableHandlers.handleSelection(transformedSelectionRegions);
            _this.tableHandlers.handleFocus(newFocusedCell);
            // keep the focused cell in view
            _this.scrollBodyToFocusedCell(newFocusedCell);
        };
        // no good way to call arrow-key keyboard events from tests
        /* istanbul ignore next */
        this.handleFocusMoveInternal = function (e, direction) {
            e.preventDefault();
            e.stopPropagation();
            var _a = _this.state, focusedCell = _a.focusedCell, selectedRegions = _a.selectedRegions;
            if (focusedCell == null) {
                // halt early if we have a selectedRegionTransform or something else in play that nixes
                // the focused cell.
                return;
            }
            var newFocusedCell = {
                col: focusedCell.col,
                focusSelectionIndex: focusedCell.focusSelectionIndex,
                row: focusedCell.row,
            };
            // if we're not in any particular focus cell region, and one exists, go to the first cell of the first one
            if (focusedCell.focusSelectionIndex == null && selectedRegions.length > 0) {
                var focusCellRegion = regions_1.Regions.getCellRegionFromRegion(selectedRegions[0], _this.grid.numRows, _this.grid.numCols);
                newFocusedCell = {
                    col: focusCellRegion.cols[0],
                    focusSelectionIndex: 0,
                    row: focusCellRegion.rows[0],
                };
            }
            else {
                if (selectedRegions.length === 0) {
                    _this.handleFocusMove(e, direction);
                    return;
                }
                var focusCellRegion = regions_1.Regions.getCellRegionFromRegion(selectedRegions[focusedCell.focusSelectionIndex], _this.grid.numRows, _this.grid.numCols);
                if (focusCellRegion.cols[0] === focusCellRegion.cols[1] &&
                    focusCellRegion.rows[0] === focusCellRegion.rows[1] &&
                    selectedRegions.length === 1) {
                    _this.handleFocusMove(e, direction);
                    return;
                }
                switch (direction) {
                    case "up":
                        newFocusedCell = _this.moveFocusCell("row", "col", true, newFocusedCell, focusCellRegion);
                        break;
                    case "left":
                        newFocusedCell = _this.moveFocusCell("col", "row", true, newFocusedCell, focusCellRegion);
                        break;
                    case "down":
                        newFocusedCell = _this.moveFocusCell("row", "col", false, newFocusedCell, focusCellRegion);
                        break;
                    case "right":
                        newFocusedCell = _this.moveFocusCell("col", "row", false, newFocusedCell, focusCellRegion);
                        break;
                    default:
                        break;
                }
            }
            if (newFocusedCell.row < 0 ||
                newFocusedCell.row >= _this.grid.numRows ||
                newFocusedCell.col < 0 ||
                newFocusedCell.col >= _this.grid.numCols) {
                return;
            }
            _this.tableHandlers.handleFocus(newFocusedCell);
            // keep the focused cell in view
            _this.scrollBodyToFocusedCell(newFocusedCell);
        };
        this.scrollBodyToFocusedCell = function (focusedCell) {
            var row = focusedCell.row, col = focusedCell.col;
            var viewportRect = _this.state.viewportRect;
            if (viewportRect === undefined || _this.grid === undefined) {
                return;
            }
            // sort keys in normal CSS position order (per the trusty TRBL/"trouble" acronym)
            // tslint:disable:object-literal-sort-keys
            var viewportBounds = {
                top: viewportRect.top,
                right: viewportRect.left + viewportRect.width,
                bottom: viewportRect.top + viewportRect.height,
                left: viewportRect.left,
            };
            var focusedCellBounds = {
                top: _this.grid.getCumulativeHeightBefore(row),
                right: _this.grid.getCumulativeWidthAt(col),
                bottom: _this.grid.getCumulativeHeightAt(row),
                left: _this.grid.getCumulativeWidthBefore(col),
            };
            // tslint:enable:object-literal-sort-keys
            var focusedCellWidth = focusedCellBounds.right - focusedCellBounds.left;
            var focusedCellHeight = focusedCellBounds.bottom - focusedCellBounds.top;
            var isFocusedCellWiderThanViewport = focusedCellWidth > viewportRect.width;
            var isFocusedCellTallerThanViewport = focusedCellHeight > viewportRect.height;
            var ss = {};
            // keep the top end of an overly tall focused cell in view when moving left and right
            // (without this OR check, the body seesaws to fit the top end, then the bottom end, etc.)
            if (focusedCellBounds.top < viewportBounds.top || isFocusedCellTallerThanViewport) {
                // scroll up (minus one pixel to avoid clipping the focused-cell border)
                ss.nextScrollTop = Math.max(0, focusedCellBounds.top - 1);
            }
            else if (focusedCellBounds.bottom > viewportBounds.bottom) {
                // scroll down
                var scrollDelta = focusedCellBounds.bottom - viewportBounds.bottom;
                ss.nextScrollTop = viewportBounds.top + scrollDelta;
            }
            // keep the left end of an overly wide focused cell in view when moving up and down
            if (focusedCellBounds.left < viewportBounds.left || isFocusedCellWiderThanViewport) {
                // scroll left (again minus one additional pixel)
                ss.nextScrollLeft = Math.max(0, focusedCellBounds.left - 1);
            }
            else if (focusedCellBounds.right > viewportBounds.right) {
                // scroll right
                var scrollDelta = focusedCellBounds.right - viewportBounds.right;
                ss.nextScrollLeft = viewportBounds.left + scrollDelta;
            }
            _this.tableHandlers.syncViewportPosition(ss);
        };
        this.handleCopy = function (e) {
            var _a = _this.props, getCellClipboardData = _a.getCellClipboardData, onCopy = _a.onCopy;
            var selectedRegions = _this.state.selectedRegions;
            if (getCellClipboardData == null || _this.grid === undefined) {
                return;
            }
            // prevent "real" copy from being called
            e.preventDefault();
            e.stopPropagation();
            var cells = regions_1.Regions.enumerateUniqueCells(selectedRegions, _this.grid.numRows, _this.grid.numCols);
            // non-null assertion because Column.defaultProps.cellRenderer is defined
            var sparse = regions_1.Regions.sparseMapCells(cells, function (row, col) {
                return getCellClipboardData(row, col, _this.state.childrenArray[col].props.cellRenderer);
            });
            if (sparse != null) {
                clipboard_1.Clipboard.copyCells(sparse)
                    .then(function () { return onCopy === null || onCopy === void 0 ? void 0 : onCopy(true); })
                    .catch(function (reason) {
                    console.error(errors_1.TABLE_COPY_FAILED, reason);
                    onCopy === null || onCopy === void 0 ? void 0 : onCopy(false);
                });
            }
        };
        // no-op
    }
    TableHotkeys.prototype.setGrid = function (grid) {
        this.grid = grid;
    };
    TableHotkeys.prototype.setProps = function (props) {
        this.props = props;
    };
    TableHotkeys.prototype.setState = function (state) {
        this.state = state;
    };
    /**
     * Replaces the selected region at the specified array index, with the
     * region provided.
     */
    TableHotkeys.prototype.updateSelectedRegionAtIndex = function (region, index) {
        var _a = this.props, children = _a.children, numRows = _a.numRows;
        var selectedRegions = this.state.selectedRegions;
        var numColumns = React.Children.count(children);
        var maxRowIndex = Math.max(0, numRows - 1);
        var maxColumnIndex = Math.max(0, numColumns - 1);
        var clampedNextRegion = regions_1.Regions.clampRegion(region, maxRowIndex, maxColumnIndex);
        var nextSelectedRegions = regions_1.Regions.update(selectedRegions, clampedNextRegion, index);
        this.tableHandlers.handleSelection(nextSelectedRegions);
    };
    // Quadrant refs
    // =============
    TableHotkeys.prototype.moveFocusCell = function (primaryAxis, secondaryAxis, isUpOrLeft, newFocusedCell, focusCellRegion) {
        var selectedRegions = this.state.selectedRegions;
        var primaryAxisPlural = primaryAxis === "row" ? "rows" : "cols";
        var secondaryAxisPlural = secondaryAxis === "row" ? "rows" : "cols";
        var movementDirection = isUpOrLeft ? -1 : +1;
        var regionIntervalIndex = isUpOrLeft ? 1 : 0;
        // try moving the cell in the direction along the primary axis
        newFocusedCell[primaryAxis] += movementDirection;
        var isPrimaryIndexOutOfBounds = isUpOrLeft
            ? newFocusedCell[primaryAxis] < focusCellRegion[primaryAxisPlural][0]
            : newFocusedCell[primaryAxis] > focusCellRegion[primaryAxisPlural][1];
        if (isPrimaryIndexOutOfBounds) {
            // if we moved outside the bounds of selection region,
            // move to the start (or end) of the primary axis, and move one along the secondary
            newFocusedCell[primaryAxis] = focusCellRegion[primaryAxisPlural][regionIntervalIndex];
            newFocusedCell[secondaryAxis] += movementDirection;
            var isSecondaryIndexOutOfBounds = isUpOrLeft
                ? newFocusedCell[secondaryAxis] < focusCellRegion[secondaryAxisPlural][0]
                : newFocusedCell[secondaryAxis] > focusCellRegion[secondaryAxisPlural][1];
            if (isSecondaryIndexOutOfBounds) {
                // if moving along the secondary also moves us outside
                // go to the start (or end) of the next (or previous region)
                // (note that if there's only one region you'll be moving to the opposite corner, which is fine)
                var newFocusCellSelectionIndex = newFocusedCell.focusSelectionIndex + movementDirection;
                // newFocusCellSelectionIndex should be one more (or less), unless we need to wrap around
                if (isUpOrLeft ? newFocusCellSelectionIndex < 0 : newFocusCellSelectionIndex >= selectedRegions.length) {
                    newFocusCellSelectionIndex = isUpOrLeft ? selectedRegions.length - 1 : 0;
                }
                var newFocusCellRegion = regions_1.Regions.getCellRegionFromRegion(selectedRegions[newFocusCellSelectionIndex], this.grid.numRows, this.grid.numCols);
                newFocusedCell = {
                    col: newFocusCellRegion.cols[regionIntervalIndex],
                    focusSelectionIndex: newFocusCellSelectionIndex,
                    row: newFocusCellRegion.rows[regionIntervalIndex],
                };
            }
        }
        return newFocusedCell;
    };
    return TableHotkeys;
}());
exports.TableHotkeys = TableHotkeys;
//# sourceMappingURL=tableHotkeys.js.map