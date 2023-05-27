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
import { __assign, __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { AbstractComponent2, Utils as CoreUtils } from "@blueprintjs/core";
import { emptyCellRenderer } from "./cell/cell";
import { Batcher } from "./common/batcher";
import * as Classes from "./common/classes";
import { Rect } from "./common/rect";
import { RenderMode } from "./common/renderMode";
var SHALLOW_COMPARE_DENYLIST = ["viewportRect"];
/**
 * We don't want to reset the batcher when this set of keys changes. Any other
 * changes should reset the batcher's internal cache.
 */
var BATCHER_RESET_PROP_KEYS_DENYLIST = [
    "columnIndexEnd",
    "columnIndexStart",
    "rowIndexEnd",
    "rowIndexStart",
];
var TableBodyCells = /** @class */ (function (_super) {
    __extends(TableBodyCells, _super);
    function TableBodyCells() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.batcher = new Batcher();
        /**
         * Set this flag to true in componentDidUpdate() when we call forceUpdate() to avoid an extra
         * unnecessary update cycle.
         */
        _this.didForceUpdate = false;
        // Cell renderers
        // ==============
        _this.renderNewCell = function (rowIndex, columnIndex) {
            var _a = _this.props, columnIndexEnd = _a.columnIndexEnd, grid = _a.grid, rowIndexEnd = _a.rowIndexEnd;
            var extremaClasses = grid.getExtremaClasses(rowIndex, columnIndex, rowIndexEnd, columnIndexEnd);
            var isGhost = grid.isGhostIndex(rowIndex, columnIndex);
            return _this.renderCell(rowIndex, columnIndex, extremaClasses, isGhost);
        };
        _this.renderCell = function (rowIndex, columnIndex, extremaClasses, isGhost) {
            var _a;
            var _b = _this.props, cellRenderer = _b.cellRenderer, focusedCell = _b.focusedCell, loading = _b.loading, grid = _b.grid;
            var baseCell = isGhost ? emptyCellRenderer() : cellRenderer(rowIndex, columnIndex);
            // cellRenderer still may return null
            baseCell = baseCell == null ? emptyCellRenderer() : baseCell;
            var className = classNames(cellClassNames(rowIndex, columnIndex), extremaClasses, (_a = {},
                _a[Classes.TABLE_CELL_GHOST] = isGhost,
                _a[Classes.TABLE_CELL_LEDGER_ODD] = rowIndex % 2 === 1,
                _a[Classes.TABLE_CELL_LEDGER_EVEN] = rowIndex % 2 === 0,
                _a), baseCell.props.className);
            var key = TableBodyCells.cellReactKey(rowIndex, columnIndex);
            var rect = isGhost ? grid.getGhostCellRect(rowIndex, columnIndex) : grid.getCellRect(rowIndex, columnIndex);
            var cellLoading = baseCell.props.loading != null ? baseCell.props.loading : loading;
            var style = __assign(__assign({}, baseCell.props.style), Rect.style(rect));
            var isFocused = focusedCell != null && focusedCell.row === rowIndex && focusedCell.col === columnIndex;
            return React.cloneElement(baseCell, {
                className: className,
                isFocused: isFocused,
                key: key,
                loading: cellLoading,
                style: style,
            });
        };
        // Other
        // =====
        _this.didViewportRectChange = function (nextViewportRect, currViewportRect) {
            if (nextViewportRect == null && currViewportRect == null) {
                return false;
            }
            else if (nextViewportRect == null || currViewportRect == null) {
                return true;
            }
            else {
                return !nextViewportRect.equals(currViewportRect);
            }
        };
        return _this;
    }
    TableBodyCells.cellReactKey = function (rowIndex, columnIndex) {
        return "cell-".concat(rowIndex, "-").concat(columnIndex);
    };
    TableBodyCells.prototype.componentDidMount = function () {
        this.maybeInvokeOnCompleteRender();
    };
    TableBodyCells.prototype.shouldComponentUpdate = function (nextProps) {
        return (!CoreUtils.shallowCompareKeys(nextProps, this.props, {
            exclude: SHALLOW_COMPARE_DENYLIST,
        }) ||
            // "viewportRect" is not a plain object, so we can't just deep
            // compare; we need custom logic.
            this.didViewportRectChange(nextProps.viewportRect, this.props.viewportRect));
    };
    TableBodyCells.prototype.componentDidUpdate = function (prevProps) {
        if (this.didForceUpdate) {
            this.didForceUpdate = false;
            return;
        }
        var shouldResetBatcher = !CoreUtils.shallowCompareKeys(prevProps, this.props, {
            exclude: BATCHER_RESET_PROP_KEYS_DENYLIST,
        });
        if (shouldResetBatcher) {
            this.batcher.reset();
            // At this point, the batcher is reset, but it doesn't have a chance to re-run since render() is not called
            // by default after this lifecycle method. This causes issues like https://github.com/palantir/blueprint/issues/5193.
            // We can run forceUpdate() to re-render, but must take care to set a local flag indicating that we are doing so,
            // so that this lifecycle method doesn't get re-run as well within the same forced update cycle.
            this.didForceUpdate = true;
            this.forceUpdate();
        }
        this.maybeInvokeOnCompleteRender();
    };
    TableBodyCells.prototype.componentWillUnmount = function () {
        this.batcher.cancelOutstandingCallback();
    };
    TableBodyCells.prototype.render = function () {
        var renderMode = this.props.renderMode;
        var cells = renderMode === RenderMode.BATCH ? this.renderBatchedCells() : this.renderAllCells();
        return React.createElement("div", { className: Classes.TABLE_BODY_CELLS }, cells);
    };
    // Render modes
    // ============
    TableBodyCells.prototype.renderBatchedCells = function () {
        var _this = this;
        var _a = this.props, columnIndexEnd = _a.columnIndexEnd, columnIndexStart = _a.columnIndexStart, rowIndexEnd = _a.rowIndexEnd, rowIndexStart = _a.rowIndexStart;
        // render cells in batches
        this.batcher.startNewBatch();
        for (var rowIndex = rowIndexStart; rowIndex <= rowIndexEnd; rowIndex++) {
            for (var columnIndex = columnIndexStart; columnIndex <= columnIndexEnd; columnIndex++) {
                this.batcher.addArgsToBatch(rowIndex, columnIndex);
            }
        }
        this.batcher.removeOldAddNew(this.renderNewCell);
        if (!this.batcher.isDone()) {
            this.batcher.idleCallback(function () { return _this.forceUpdate(); });
        }
        return this.batcher.getList();
    };
    TableBodyCells.prototype.renderAllCells = function () {
        var _a = this.props, columnIndexEnd = _a.columnIndexEnd, columnIndexStart = _a.columnIndexStart, rowIndexEnd = _a.rowIndexEnd, rowIndexStart = _a.rowIndexStart;
        var cells = [];
        var cellsArgs = [];
        for (var rowIndex = rowIndexStart; rowIndex <= rowIndexEnd; rowIndex++) {
            for (var columnIndex = columnIndexStart; columnIndex <= columnIndexEnd; columnIndex++) {
                cells.push(this.renderNewCell(rowIndex, columnIndex));
                cellsArgs.push([rowIndex, columnIndex]);
            }
        }
        // pretend we did an entire rendering pass using the batcher. that way,
        // if we switch from `RenderMode.NONE` to `RenderMode.BATCH`, we don't
        // have to re-paint every cell still in view.
        this.batcher.setList(cellsArgs, cells);
        return cells;
    };
    // Callbacks
    // =========
    TableBodyCells.prototype.maybeInvokeOnCompleteRender = function () {
        var _a = this.props, onCompleteRender = _a.onCompleteRender, renderMode = _a.renderMode;
        if (renderMode === RenderMode.NONE || (renderMode === RenderMode.BATCH && this.batcher.isDone())) {
            onCompleteRender === null || onCompleteRender === void 0 ? void 0 : onCompleteRender();
        }
    };
    TableBodyCells.defaultProps = {
        renderMode: RenderMode.BATCH,
    };
    return TableBodyCells;
}(AbstractComponent2));
export { TableBodyCells };
/**
 * Returns the array of class names that must be applied to each table
 * cell so that we can locate any cell based on its coordinate.
 */
export function cellClassNames(rowIndex, columnIndex) {
    return [Classes.rowCellIndexClass(rowIndex), Classes.columnCellIndexClass(columnIndex)];
}
//# sourceMappingURL=tableBodyCells.js.map