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
import { __assign, __extends } from "tslib";
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to TableBody2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import { AbstractComponent2, Utils as CoreUtils } from "@blueprintjs/core";
import * as Classes from "./common/classes";
import { ContextMenuTargetWrapper } from "./common/contextMenuTargetWrapper";
import { RenderMode } from "./common/renderMode";
import { MenuContext } from "./interactions/menus";
import { DragSelectable } from "./interactions/selectable";
import { Regions } from "./regions";
import { cellClassNames, TableBodyCells } from "./tableBodyCells";
var DEEP_COMPARE_KEYS = ["selectedRegions"];
/** @deprecated use TableBody2 instead */
var TableBody = /** @class */ (function (_super) {
    __extends(TableBody, _super);
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
            var foundIndex = Regions.findContainingRegion(selectedRegions, targetRegion);
            if (foundIndex < 0) {
                nextSelectedRegions = [targetRegion];
                onSelection(nextSelectedRegions);
                // move the focused cell to the new region.
                var nextFocusedCell = __assign(__assign({}, Regions.getFocusCellCoordinatesFromRegion(targetRegion)), { focusSelectionIndex: 0 });
                onFocusedCell(nextFocusedCell);
            }
            var menuContext = new MenuContext(targetRegion, nextSelectedRegions, numRows, numCols);
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
            return Regions.cell(_this.activationCell.row, _this.activationCell.col);
        };
        _this.locateDrag = function (_event, coords, returnEndOnly) {
            if (returnEndOnly === void 0) { returnEndOnly = false; }
            if (_this.activationCell === null) {
                return undefined;
            }
            var start = _this.activationCell;
            var end = _this.props.locator.convertPointToCell(coords.current[0], coords.current[1]);
            return returnEndOnly ? Regions.cell(end.row, end.col) : Regions.cell(start.row, start.col, end.row, end.col);
        };
        return _this;
    }
    /**
     * @deprecated, will be removed from public API in the next major version
     */
    TableBody.cellClassNames = function (rowIndex, columnIndex) {
        return cellClassNames(rowIndex, columnIndex);
    };
    TableBody.prototype.shouldComponentUpdate = function (nextProps) {
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: DEEP_COMPARE_KEYS }) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, DEEP_COMPARE_KEYS));
    };
    TableBody.prototype.render = function () {
        var _a = this.props, grid = _a.grid, numFrozenColumns = _a.numFrozenColumns, numFrozenRows = _a.numFrozenRows;
        var defaultStyle = grid.getRect().sizeStyle();
        var style = {
            height: numFrozenRows != null ? grid.getCumulativeHeightAt(numFrozenRows - 1) : defaultStyle.height,
            width: numFrozenColumns != null ? grid.getCumulativeWidthAt(numFrozenColumns - 1) : defaultStyle.width,
        };
        return (React.createElement(DragSelectable, { enableMultipleSelection: this.props.enableMultipleSelection, focusedCell: this.props.focusedCell, locateClick: this.locateClick, locateDrag: this.locateDrag, onFocusedCell: this.props.onFocusedCell, onSelection: this.props.onSelection, onSelectionEnd: this.handleSelectionEnd, selectedRegions: this.props.selectedRegions, selectedRegionTransform: this.props.selectedRegionTransform },
            React.createElement(ContextMenuTargetWrapper, { className: classNames(Classes.TABLE_BODY_VIRTUAL_CLIENT, Classes.TABLE_CELL_CLIENT), renderContextMenu: this.renderContextMenu, style: style },
                React.createElement(TableBodyCells, { cellRenderer: this.props.cellRenderer, focusedCell: this.props.focusedCell, grid: grid, loading: this.props.loading, onCompleteRender: this.props.onCompleteRender, renderMode: this.props.renderMode, columnIndexStart: this.props.columnIndexStart, columnIndexEnd: this.props.columnIndexEnd, rowIndexStart: this.props.rowIndexStart, rowIndexEnd: this.props.rowIndexEnd, viewportRect: this.props.viewportRect }))));
    };
    TableBody.defaultProps = {
        loading: false,
        renderMode: RenderMode.BATCH,
    };
    return TableBody;
}(AbstractComponent2));
export { TableBody };
//# sourceMappingURL=tableBody.js.map