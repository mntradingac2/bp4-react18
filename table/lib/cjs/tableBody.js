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
exports.TableBody = void 0;
var tslib_1 = require("tslib");
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to TableBody2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("./common/classes"));
var contextMenuTargetWrapper_1 = require("./common/contextMenuTargetWrapper");
var renderMode_1 = require("./common/renderMode");
var menus_1 = require("./interactions/menus");
var selectable_1 = require("./interactions/selectable");
var regions_1 = require("./regions");
var tableBodyCells_1 = require("./tableBodyCells");
var DEEP_COMPARE_KEYS = ["selectedRegions"];
/** @deprecated use TableBody2 instead */
var TableBody = /** @class */ (function (_super) {
    tslib_1.__extends(TableBody, _super);
    function TableBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activationCell = null;
        _this.renderContextMenu = function (e) {
            var _a = _this.props, grid = _a.grid, onFocusedCell = _a.onFocusedCell, onSelection = _a.onSelection, bodyContextMenuRenderer = _a.bodyContextMenuRenderer, _b = _a.selectedRegions, selectedRegions = _b === void 0 ? [] : _b;
            var numRows = grid.numRows, numCols = grid.numCols;
            if (bodyContextMenuRenderer == null) {
                return undefined;
            }
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
            var menuContext = new menus_1.MenuContext(targetRegion, nextSelectedRegions, numRows, numCols);
            var contextMenu = bodyContextMenuRenderer(menuContext);
            return contextMenu == null ? undefined : contextMenu;
        };
        // Callbacks
        // =========
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
    TableBody.cellClassNames = function (rowIndex, columnIndex) {
        return (0, tableBodyCells_1.cellClassNames)(rowIndex, columnIndex);
    };
    TableBody.prototype.shouldComponentUpdate = function (nextProps) {
        return (!core_1.Utils.shallowCompareKeys(this.props, nextProps, { exclude: DEEP_COMPARE_KEYS }) ||
            !core_1.Utils.deepCompareKeys(this.props, nextProps, DEEP_COMPARE_KEYS));
    };
    TableBody.prototype.render = function () {
        var _a = this.props, grid = _a.grid, numFrozenColumns = _a.numFrozenColumns, numFrozenRows = _a.numFrozenRows;
        var defaultStyle = grid.getRect().sizeStyle();
        var style = {
            height: numFrozenRows != null ? grid.getCumulativeHeightAt(numFrozenRows - 1) : defaultStyle.height,
            width: numFrozenColumns != null ? grid.getCumulativeWidthAt(numFrozenColumns - 1) : defaultStyle.width,
        };
        return (React.createElement(selectable_1.DragSelectable, { enableMultipleSelection: this.props.enableMultipleSelection, focusedCell: this.props.focusedCell, locateClick: this.locateClick, locateDrag: this.locateDrag, onFocusedCell: this.props.onFocusedCell, onSelection: this.props.onSelection, onSelectionEnd: this.handleSelectionEnd, selectedRegions: this.props.selectedRegions, selectedRegionTransform: this.props.selectedRegionTransform },
            React.createElement(contextMenuTargetWrapper_1.ContextMenuTargetWrapper, { className: (0, classnames_1.default)(Classes.TABLE_BODY_VIRTUAL_CLIENT, Classes.TABLE_CELL_CLIENT), renderContextMenu: this.renderContextMenu, style: style },
                React.createElement(tableBodyCells_1.TableBodyCells, { cellRenderer: this.props.cellRenderer, focusedCell: this.props.focusedCell, grid: grid, loading: this.props.loading, onCompleteRender: this.props.onCompleteRender, renderMode: this.props.renderMode, columnIndexStart: this.props.columnIndexStart, columnIndexEnd: this.props.columnIndexEnd, rowIndexStart: this.props.rowIndexStart, rowIndexEnd: this.props.rowIndexEnd, viewportRect: this.props.viewportRect }))));
    };
    TableBody.defaultProps = {
        loading: false,
        renderMode: renderMode_1.RenderMode.BATCH,
    };
    return TableBody;
}(core_1.AbstractComponent2));
exports.TableBody = TableBody;
//# sourceMappingURL=tableBody.js.map