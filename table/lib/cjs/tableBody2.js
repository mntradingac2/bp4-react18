"use strict";
/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
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
exports.TableBody2 = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var popover2_1 = require("@blueprintjs/popover2");
var Classes = tslib_1.__importStar(require("./common/classes"));
var renderMode_1 = require("./common/renderMode");
var menus_1 = require("./interactions/menus");
var selectable_1 = require("./interactions/selectable");
var regions_1 = require("./regions");
var tableBodyCells_1 = require("./tableBodyCells");
var DEEP_COMPARE_KEYS = ["selectedRegions"];
var TableBody2 = /** @class */ (function (_super) {
    tslib_1.__extends(TableBody2, _super);
    function TableBody2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activationCell = null;
        _this.renderContextMenu = function (_a) {
            var mouseEvent = _a.mouseEvent;
            var _b = _this.props, grid = _b.grid, bodyContextMenuRenderer = _b.bodyContextMenuRenderer, _c = _b.selectedRegions, selectedRegions = _c === void 0 ? [] : _c;
            var numRows = grid.numRows, numCols = grid.numCols;
            if (bodyContextMenuRenderer === undefined || mouseEvent === undefined) {
                return undefined;
            }
            var targetRegion = _this.locateClick(mouseEvent.nativeEvent);
            var nextSelectedRegions = selectedRegions;
            // if the event did not happen within a selected region, clear all
            // selections and select the right-clicked cell.
            var foundIndex = regions_1.Regions.findContainingRegion(selectedRegions, targetRegion);
            if (foundIndex < 0) {
                nextSelectedRegions = [targetRegion];
            }
            var menuContext = new menus_1.MenuContext(targetRegion, nextSelectedRegions, numRows, numCols);
            var contextMenu = bodyContextMenuRenderer(menuContext);
            return contextMenu == null ? undefined : contextMenu;
        };
        // Callbacks
        // =========
        // state updates cannot happen in renderContextMenu() during the render phase, so we must handle them separately
        _this.handleContextMenu = function (e) {
            var _a = _this.props, onFocusedCell = _a.onFocusedCell, onSelection = _a.onSelection, _b = _a.selectedRegions, selectedRegions = _b === void 0 ? [] : _b;
            var targetRegion = _this.locateClick(e.nativeEvent);
            var nextSelectedRegions = selectedRegions;
            // if the event did not happen within a selected region, clear all
            // selections and select the right-clicked cell.
            var foundIndex = regions_1.Regions.findContainingRegion(selectedRegions, targetRegion);
            if (foundIndex < 0) {
                nextSelectedRegions = [targetRegion];
                onSelection(nextSelectedRegions);
                // move the focused cell to the new region.
                var nextFocusedCell = tslib_1.__assign(tslib_1.__assign({}, regions_1.Regions.getFocusCellCoordinatesFromRegion(targetRegion)), { focusSelectionIndex: 0 });
                onFocusedCell(nextFocusedCell);
            }
        };
        _this.handleSelectionEnd = function () {
            _this.activationCell = null; // not strictly required, but good practice
        };
        _this.locateClick = function (event) {
            _this.activationCell = _this.props.locator.convertPointToCell(event.clientX, event.clientY);
            return regions_1.Regions.cell(_this.activationCell.row, _this.activationCell.col);
        };
        _this.locateDrag = function (_event, coords, returnEndOnly) {
            if (returnEndOnly === void 0) { returnEndOnly = false; }
            if (_this.activationCell === null) {
                return undefined;
            }
            var start = _this.activationCell;
            var end = _this.props.locator.convertPointToCell(coords.current[0], coords.current[1]);
            return returnEndOnly ? regions_1.Regions.cell(end.row, end.col) : regions_1.Regions.cell(start.row, start.col, end.row, end.col);
        };
        return _this;
    }
    /**
     * @deprecated, will be removed from public API in the next major version
     */
    TableBody2.cellClassNames = function (rowIndex, columnIndex) {
        return (0, tableBodyCells_1.cellClassNames)(rowIndex, columnIndex);
    };
    TableBody2.prototype.shouldComponentUpdate = function (nextProps) {
        return (!core_1.Utils.shallowCompareKeys(this.props, nextProps, { exclude: DEEP_COMPARE_KEYS }) ||
            !core_1.Utils.deepCompareKeys(this.props, nextProps, DEEP_COMPARE_KEYS));
    };
    TableBody2.prototype.render = function () {
        var _a = this.props, grid = _a.grid, numFrozenColumns = _a.numFrozenColumns, numFrozenRows = _a.numFrozenRows;
        var defaultStyle = grid.getRect().sizeStyle();
        var style = {
            height: numFrozenRows != null ? grid.getCumulativeHeightAt(numFrozenRows - 1) : defaultStyle.height,
            width: numFrozenColumns != null ? grid.getCumulativeWidthAt(numFrozenColumns - 1) : defaultStyle.width,
        };
        return (React.createElement(selectable_1.DragSelectable, { enableMultipleSelection: this.props.enableMultipleSelection, focusedCell: this.props.focusedCell, locateClick: this.locateClick, locateDrag: this.locateDrag, onFocusedCell: this.props.onFocusedCell, onSelection: this.props.onSelection, onSelectionEnd: this.handleSelectionEnd, selectedRegions: this.props.selectedRegions, selectedRegionTransform: this.props.selectedRegionTransform },
            React.createElement(popover2_1.ContextMenu2, { className: (0, classnames_1.default)(Classes.TABLE_BODY_VIRTUAL_CLIENT, Classes.TABLE_CELL_CLIENT), content: this.renderContextMenu, disabled: this.props.bodyContextMenuRenderer === undefined, onContextMenu: this.handleContextMenu, style: style },
                React.createElement(tableBodyCells_1.TableBodyCells, { cellRenderer: this.props.cellRenderer, focusedCell: this.props.focusedCell, grid: grid, loading: this.props.loading, onCompleteRender: this.props.onCompleteRender, renderMode: this.props.renderMode, columnIndexStart: this.props.columnIndexStart, columnIndexEnd: this.props.columnIndexEnd, rowIndexStart: this.props.rowIndexStart, rowIndexEnd: this.props.rowIndexEnd, viewportRect: this.props.viewportRect }))));
    };
    TableBody2.defaultProps = {
        loading: false,
        renderMode: renderMode_1.RenderMode.BATCH,
    };
    return TableBody2;
}(core_1.AbstractComponent2));
exports.TableBody2 = TableBody2;
//# sourceMappingURL=tableBody2.js.map