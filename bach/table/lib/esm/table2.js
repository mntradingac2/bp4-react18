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
import { __assign, __extends, __rest } from "tslib";
import classNames from "classnames";
import * as React from "react";
import innerText from "react-innertext";
import { AbstractComponent2, Utils as CoreUtils, DISPLAYNAME_PREFIX, HotkeysTarget2, } from "@blueprintjs/core";
import { Column } from "./column";
import * as Classes from "./common/classes";
import * as Errors from "./common/errors";
import { Grid } from "./common/grid";
import * as FocusedCellUtils from "./common/internal/focusedCellUtils";
import * as ScrollUtils from "./common/internal/scrollUtils";
import { Rect } from "./common/rect";
import { RenderMode } from "./common/renderMode";
import { ScrollDirection } from "./common/scrollDirection";
import { Utils } from "./common/utils";
import { ColumnHeader } from "./headers/columnHeader";
import { ColumnHeaderCell2 } from "./headers/columnHeaderCell2";
import { renderDefaultRowHeader, RowHeader } from "./headers/rowHeader";
import { ResizeSensor } from "./interactions/resizeSensor";
import { GuideLayer } from "./layers/guides";
import { RegionLayer } from "./layers/regions";
import { Locator } from "./locator";
import { QuadrantType } from "./quadrants/tableQuadrant";
import { TableQuadrantStack } from "./quadrants/tableQuadrantStack";
import { ColumnLoadingOption, RegionCardinality, Regions, SelectionModes, TableLoadingOption } from "./regions";
import { resizeRowsByApproximateHeight, resizeRowsByTallestCell, } from "./resizeRows";
import { compareChildren, getHotkeysFromProps, isSelectionModeEnabled } from "./table2Utils";
import { TableBody2 } from "./tableBody2";
import { TableHotkeys } from "./tableHotkeys";
import { clampNumFrozenColumns, clampNumFrozenRows, hasLoadingOption } from "./tableUtils";
/**
 * Table (v2) component.
 *
 * @see https://blueprintjs.com/docs/#table/table2
 */
var Table2 = /** @class */ (function (_super) {
    __extends(Table2, _super);
    function Table2(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.hotkeys = [];
        _this.grid = null;
        _this.refHandlers = {
            cellContainer: function (ref) { return (_this.cellContainerElement = ref); },
            columnHeader: function (ref) {
                _this.columnHeaderElement = ref;
                if (ref != null) {
                    _this.columnHeaderHeight = Math.max(ref.clientHeight, Grid.MIN_COLUMN_HEADER_HEIGHT);
                }
            },
            quadrantStack: function (ref) { return (_this.quadrantStackInstance = ref); },
            rootTable: function (ref) { return (_this.rootTableElement = ref); },
            rowHeader: function (ref) {
                _this.rowHeaderElement = ref;
                if (ref != null) {
                    _this.rowHeaderWidth = ref.clientWidth;
                }
            },
            scrollContainer: function (ref) { return (_this.scrollContainerElement = ref); },
        };
        _this.columnHeaderHeight = Grid.MIN_COLUMN_HEADER_HEIGHT;
        _this.rowHeaderWidth = Grid.MIN_ROW_HEADER_WIDTH;
        _this.didColumnHeaderMount = false;
        _this.didRowHeaderMount = false;
        /*
         * This value is set to `true` when all cells finish mounting for the first
         * time. It serves as a signal that we can switch to batch rendering.
         */
        _this.didCompletelyMount = false;
        _this.renderTableContents = function (_a) {
            var _b;
            var handleKeyDown = _a.handleKeyDown, handleKeyUp = _a.handleKeyUp;
            var _c = _this.props, children = _c.children, className = _c.className, enableRowHeader = _c.enableRowHeader, loadingOptions = _c.loadingOptions, numRows = _c.numRows, enableColumnInteractionBar = _c.enableColumnInteractionBar, enableColumnHeader = _c.enableColumnHeader;
            var _d = _this.state, horizontalGuides = _d.horizontalGuides, numFrozenColumnsClamped = _d.numFrozenColumnsClamped, numFrozenRowsClamped = _d.numFrozenRowsClamped, verticalGuides = _d.verticalGuides;
            if (!_this.gridDimensionsMatchProps()) {
                // Ensure we're rendering the correct number of rows & columns
                _this.invalidateGrid();
            }
            var grid = _this.validateGrid();
            var classes = classNames(Classes.TABLE_CONTAINER, (_b = {},
                _b[Classes.TABLE_REORDERING] = _this.state.isReordering,
                _b[Classes.TABLE_NO_VERTICAL_SCROLL] = _this.shouldDisableVerticalScroll(),
                _b[Classes.TABLE_NO_HORIZONTAL_SCROLL] = _this.shouldDisableHorizontalScroll(),
                _b[Classes.TABLE_SELECTION_ENABLED] = isSelectionModeEnabled(_this.props, RegionCardinality.CELLS),
                _b[Classes.TABLE_NO_ROWS] = numRows === 0,
                _b), className);
            return (React.createElement("div", { className: classes, ref: _this.refHandlers.rootTable, onScroll: _this.handleRootScroll, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp, tabIndex: 0 },
                React.createElement(TableQuadrantStack, { bodyRef: _this.refHandlers.cellContainer, bodyRenderer: _this.renderBody, columnHeaderRenderer: _this.renderColumnHeader, columnHeaderRef: _this.refHandlers.columnHeader, didHeadersMount: _this.state.didHeadersMount, enableColumnInteractionBar: enableColumnInteractionBar, enableRowHeader: enableRowHeader, grid: grid, handleColumnResizeGuide: _this.handleColumnResizeGuide, handleColumnsReordering: _this.handleColumnsReordering, handleRowResizeGuide: _this.handleRowResizeGuide, handleRowsReordering: _this.handleRowsReordering, isHorizontalScrollDisabled: _this.shouldDisableHorizontalScroll(), isVerticalScrollDisabled: _this.shouldDisableVerticalScroll(), loadingOptions: loadingOptions, numColumns: React.Children.count(children), numFrozenColumns: numFrozenColumnsClamped, numFrozenRows: numFrozenRowsClamped, numRows: numRows, onScroll: _this.handleBodyScroll, ref: _this.refHandlers.quadrantStack, menuRenderer: _this.renderMenu, rowHeaderRenderer: _this.renderRowHeader, rowHeaderRef: _this.refHandlers.rowHeader, scrollContainerRef: _this.refHandlers.scrollContainer, enableColumnHeader: enableColumnHeader, renderScrollIndicatorOverlay: _this.renderScrollIndicatorOverlay }),
                React.createElement("div", { className: classNames(Classes.TABLE_OVERLAY_LAYER, Classes.TABLE_OVERLAY_REORDERING_CURSOR) }),
                React.createElement(GuideLayer, { className: Classes.TABLE_RESIZE_GUIDES, verticalGuides: verticalGuides, horizontalGuides: horizontalGuides })));
        };
        _this.renderMenu = function (refHandler) {
            var _a;
            var classes = classNames(Classes.TABLE_MENU, (_a = {},
                _a[Classes.TABLE_SELECTION_ENABLED] = isSelectionModeEnabled(_this.props, RegionCardinality.FULL_TABLE),
                _a));
            return (React.createElement("div", { className: classes, ref: refHandler, onMouseDown: _this.handleMenuMouseDown }, _this.maybeRenderRegions(_this.styleMenuRegion)));
        };
        _this.handleMenuMouseDown = function (e) {
            // the shift+click interaction expands the region from the focused cell.
            // thus, if shift is pressed we shouldn't move the focused cell.
            _this.selectAll(!e.shiftKey);
        };
        _this.selectAll = function (shouldUpdateFocusedCell) {
            var selectionHandler = _this.getEnabledSelectionHandler(RegionCardinality.FULL_TABLE);
            // clicking on upper left hand corner sets selection to "all"
            // regardless of current selection state (clicking twice does not deselect table)
            selectionHandler([Regions.table()]);
            if (shouldUpdateFocusedCell) {
                var newFocusedCellCoordinates = Regions.getFocusCellCoordinatesFromRegion(Regions.table());
                _this.handleFocus(FocusedCellUtils.toFullCoordinates(newFocusedCellCoordinates));
            }
        };
        _this.columnHeaderCellRenderer = function (columnIndex) {
            var _a;
            var columnProps = _this.getColumnProps(columnIndex);
            if (columnProps === undefined) {
                return null;
            }
            var id = columnProps.id, cellRenderer = columnProps.cellRenderer, columnHeaderCellRenderer = columnProps.columnHeaderCellRenderer, spreadableProps = __rest(columnProps, ["id", "cellRenderer", "columnHeaderCellRenderer"]);
            var columnLoading = hasLoadingOption(columnProps.loadingOptions, ColumnLoadingOption.HEADER) ||
                hasLoadingOption(_this.props.loadingOptions, TableLoadingOption.COLUMN_HEADERS);
            if (columnHeaderCellRenderer != null) {
                var columnHeaderCell = columnHeaderCellRenderer(columnIndex);
                if (columnHeaderCell != null) {
                    return React.cloneElement(columnHeaderCell, {
                        enableColumnInteractionBar: _this.props.enableColumnInteractionBar,
                        loading: (_a = columnHeaderCell.props.loading) !== null && _a !== void 0 ? _a : columnLoading,
                    });
                }
            }
            var baseProps = __assign({ enableColumnInteractionBar: _this.props.enableColumnInteractionBar, index: columnIndex, loading: columnLoading }, spreadableProps);
            if (columnProps.name != null) {
                return React.createElement(ColumnHeaderCell2, __assign({}, baseProps));
            }
            else {
                return React.createElement(ColumnHeaderCell2, __assign({}, baseProps, { name: Utils.toBase26Alpha(columnIndex) }));
            }
        };
        _this.renderColumnHeader = function (refHandler, resizeHandler, reorderingHandler, showFrozenColumnsOnly) {
            var _a;
            if (showFrozenColumnsOnly === void 0) { showFrozenColumnsOnly = false; }
            var _b = _this.state, focusedCell = _b.focusedCell, selectedRegions = _b.selectedRegions, viewportRect = _b.viewportRect;
            var _c = _this.props, defaultColumnWidth = _c.defaultColumnWidth, enableMultipleSelection = _c.enableMultipleSelection, enableGhostCells = _c.enableGhostCells, enableColumnReordering = _c.enableColumnReordering, enableColumnResizing = _c.enableColumnResizing, enableRowHeader = _c.enableRowHeader, loadingOptions = _c.loadingOptions, maxColumnWidth = _c.maxColumnWidth, minColumnWidth = _c.minColumnWidth, selectedRegionTransform = _c.selectedRegionTransform;
            var classes = classNames(Classes.TABLE_COLUMN_HEADERS, (_a = {},
                _a[Classes.TABLE_SELECTION_ENABLED] = isSelectionModeEnabled(_this.props, RegionCardinality.FULL_COLUMNS),
                _a));
            if (_this.grid === null || _this.locator === undefined || viewportRect === undefined) {
                // if we haven't mounted yet (which we need in order for grid/viewport calculations),
                // we still want to hand a DOM ref over to TableQuadrantStack for later
                return React.createElement("div", { className: classes, ref: refHandler });
            }
            // if we have horizontal overflow or exact fit, no need to render ghost columns
            // (this avoids problems like https://github.com/palantir/blueprint/issues/5027)
            var hasHorizontalOverflowOrExactFit = _this.locator.hasHorizontalOverflowOrExactFit(enableRowHeader ? _this.rowHeaderWidth : 0, viewportRect);
            var columnIndices = _this.grid.getColumnIndicesInRect(viewportRect, hasHorizontalOverflowOrExactFit ? false : enableGhostCells);
            var columnIndexStart = showFrozenColumnsOnly ? 0 : columnIndices.columnIndexStart;
            var columnIndexEnd = showFrozenColumnsOnly ? _this.getMaxFrozenColumnIndex() : columnIndices.columnIndexEnd;
            return (React.createElement("div", { className: classes, ref: refHandler },
                React.createElement(ColumnHeader, { defaultColumnWidth: defaultColumnWidth, enableMultipleSelection: enableMultipleSelection, cellRenderer: _this.columnHeaderCellRenderer, focusedCell: focusedCell, grid: _this.grid, isReorderable: enableColumnReordering, isResizable: enableColumnResizing, loading: hasLoadingOption(loadingOptions, TableLoadingOption.COLUMN_HEADERS), locator: _this.locator, maxColumnWidth: maxColumnWidth, minColumnWidth: minColumnWidth, onColumnWidthChanged: _this.handleColumnWidthChanged, onFocusedCell: _this.handleFocus, onMount: _this.handleHeaderMounted, onLayoutLock: _this.handleLayoutLock, onReordered: _this.handleColumnsReordered, onReordering: reorderingHandler, onResizeGuide: resizeHandler, onSelection: _this.getEnabledSelectionHandler(RegionCardinality.FULL_COLUMNS), selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, columnIndexStart: columnIndexStart, columnIndexEnd: columnIndexEnd }, _this.props.children),
                _this.maybeRenderRegions(_this.styleColumnHeaderRegion)));
        };
        _this.renderRowHeader = function (refHandler, resizeHandler, reorderingHandler, showFrozenRowsOnly) {
            var _a;
            if (showFrozenRowsOnly === void 0) { showFrozenRowsOnly = false; }
            var _b = _this.state, focusedCell = _b.focusedCell, selectedRegions = _b.selectedRegions, viewportRect = _b.viewportRect;
            var _c = _this.props, defaultRowHeight = _c.defaultRowHeight, enableColumnHeader = _c.enableColumnHeader, enableMultipleSelection = _c.enableMultipleSelection, enableGhostCells = _c.enableGhostCells, enableRowReordering = _c.enableRowReordering, enableRowResizing = _c.enableRowResizing, loadingOptions = _c.loadingOptions, maxRowHeight = _c.maxRowHeight, minRowHeight = _c.minRowHeight, rowHeaderCellRenderer = _c.rowHeaderCellRenderer, selectedRegionTransform = _c.selectedRegionTransform;
            var classes = classNames(Classes.TABLE_ROW_HEADERS, (_a = {},
                _a[Classes.TABLE_SELECTION_ENABLED] = isSelectionModeEnabled(_this.props, RegionCardinality.FULL_ROWS),
                _a));
            if (_this.grid === null || _this.locator === undefined || viewportRect === undefined) {
                // if we haven't mounted yet (which we need in order for grid/viewport calculations),
                // we still want to hand a DOM ref over to TableQuadrantStack for later
                return React.createElement("div", { className: classes, ref: refHandler });
            }
            // if we have vertical overflow or exact fit, no need to render ghost rows
            // (this avoids problems like https://github.com/palantir/blueprint/issues/5027)
            var hasVerticalOverflowOrExactFit = _this.locator.hasVerticalOverflowOrExactFit(enableColumnHeader ? _this.columnHeaderHeight : 0, viewportRect);
            var rowIndices = _this.grid.getRowIndicesInRect({
                includeGhostCells: hasVerticalOverflowOrExactFit ? false : enableGhostCells,
                rect: viewportRect,
            });
            var rowIndexStart = showFrozenRowsOnly ? 0 : rowIndices.rowIndexStart;
            var rowIndexEnd = showFrozenRowsOnly ? _this.getMaxFrozenRowIndex() : rowIndices.rowIndexEnd;
            return (React.createElement("div", { className: classes, ref: refHandler },
                React.createElement(RowHeader, { defaultRowHeight: defaultRowHeight, enableMultipleSelection: enableMultipleSelection, focusedCell: focusedCell, grid: _this.grid, locator: _this.locator, isReorderable: enableRowReordering, isResizable: enableRowResizing, loading: hasLoadingOption(loadingOptions, TableLoadingOption.ROW_HEADERS), maxRowHeight: maxRowHeight, minRowHeight: minRowHeight, onFocusedCell: _this.handleFocus, onLayoutLock: _this.handleLayoutLock, onMount: _this.handleHeaderMounted, onResizeGuide: resizeHandler, onReordered: _this.handleRowsReordered, onReordering: reorderingHandler, onRowHeightChanged: _this.handleRowHeightChanged, onSelection: _this.getEnabledSelectionHandler(RegionCardinality.FULL_ROWS), rowHeaderCellRenderer: rowHeaderCellRenderer, selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, rowIndexStart: rowIndexStart, rowIndexEnd: rowIndexEnd }),
                _this.maybeRenderRegions(_this.styleRowHeaderRegion)));
        };
        _this.bodyCellRenderer = function (rowIndex, columnIndex) {
            var _a;
            var columnProps = _this.getColumnProps(columnIndex);
            if (columnProps === undefined) {
                return undefined;
            }
            var id = columnProps.id, cellRenderer = columnProps.cellRenderer, columnHeaderCellRenderer = columnProps.columnHeaderCellRenderer, name = columnProps.name, nameRenderer = columnProps.nameRenderer, restColumnProps = __rest(columnProps, ["id", "cellRenderer", "columnHeaderCellRenderer", "name", "nameRenderer"]);
            // HACKHACK: cellRenderer prop has a default value, so we can assert non-null
            var cell = cellRenderer(rowIndex, columnIndex);
            if (cell === undefined) {
                return undefined;
            }
            var inheritedIsLoading = hasLoadingOption(columnProps.loadingOptions, ColumnLoadingOption.CELLS) ||
                hasLoadingOption(_this.props.loadingOptions, TableLoadingOption.CELLS);
            return React.cloneElement(cell, __assign(__assign({}, restColumnProps), { loading: (_a = cell.props.loading) !== null && _a !== void 0 ? _a : inheritedIsLoading }));
        };
        _this.renderBody = function (quadrantType, showFrozenRowsOnly, showFrozenColumnsOnly) {
            if (showFrozenRowsOnly === void 0) { showFrozenRowsOnly = false; }
            if (showFrozenColumnsOnly === void 0) { showFrozenColumnsOnly = false; }
            var _a = _this.state, focusedCell = _a.focusedCell, numFrozenColumns = _a.numFrozenColumnsClamped, numFrozenRows = _a.numFrozenRowsClamped, selectedRegions = _a.selectedRegions, viewportRect = _a.viewportRect;
            var _b = _this.props, enableMultipleSelection = _b.enableMultipleSelection, enableColumnHeader = _b.enableColumnHeader, enableGhostCells = _b.enableGhostCells, enableRowHeader = _b.enableRowHeader, loadingOptions = _b.loadingOptions, bodyContextMenuRenderer = _b.bodyContextMenuRenderer, selectedRegionTransform = _b.selectedRegionTransform;
            if (_this.grid === null || _this.locator === undefined || viewportRect === undefined) {
                return undefined;
            }
            // if we have vertical/horizontal overflow or exact fit, no need to render ghost rows/columns (respectively)
            // (this avoids problems like https://github.com/palantir/blueprint/issues/5027)
            var hasVerticalOverflowOrExactFit = _this.locator.hasVerticalOverflowOrExactFit(enableColumnHeader ? _this.columnHeaderHeight : 0, viewportRect);
            var hasHorizontalOverflowOrExactFit = _this.locator.hasHorizontalOverflowOrExactFit(enableRowHeader ? _this.rowHeaderWidth : 0, viewportRect);
            var rowIndices = _this.grid.getRowIndicesInRect({
                includeGhostCells: hasVerticalOverflowOrExactFit ? false : enableGhostCells,
                rect: viewportRect,
            });
            var columnIndices = _this.grid.getColumnIndicesInRect(viewportRect, hasHorizontalOverflowOrExactFit ? false : enableGhostCells);
            // start beyond the frozen area if rendering unrelated quadrants, so we
            // don't render duplicate cells underneath the frozen ones.
            var columnIndexStart = showFrozenColumnsOnly ? 0 : columnIndices.columnIndexStart + numFrozenColumns;
            var rowIndexStart = showFrozenRowsOnly ? 0 : rowIndices.rowIndexStart + numFrozenRows;
            // if rendering frozen rows/columns, subtract one to convert to
            // 0-indexing. if the 1-indexed value is 0, this sets the end index
            // to -1, which avoids rendering absent frozen rows/columns at all.
            var columnIndexEnd = showFrozenColumnsOnly ? numFrozenColumns - 1 : columnIndices.columnIndexEnd;
            var rowIndexEnd = showFrozenRowsOnly ? numFrozenRows - 1 : rowIndices.rowIndexEnd;
            // the main quadrant contains all cells in the table, so listen only to that quadrant
            var onCompleteRender = quadrantType === QuadrantType.MAIN ? _this.handleCompleteRender : undefined;
            return (React.createElement("div", null,
                React.createElement(TableBody2, { enableMultipleSelection: enableMultipleSelection, cellRenderer: _this.bodyCellRenderer, focusedCell: focusedCell, grid: _this.grid, loading: hasLoadingOption(loadingOptions, TableLoadingOption.CELLS), locator: _this.locator, onCompleteRender: onCompleteRender, onFocusedCell: _this.handleFocus, onSelection: _this.getEnabledSelectionHandler(RegionCardinality.CELLS), bodyContextMenuRenderer: bodyContextMenuRenderer, renderMode: _this.getNormalizedRenderMode(), selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, viewportRect: viewportRect, columnIndexStart: columnIndexStart, columnIndexEnd: columnIndexEnd, rowIndexStart: rowIndexStart, rowIndexEnd: rowIndexEnd, numFrozenColumns: showFrozenColumnsOnly ? numFrozenColumns : undefined, numFrozenRows: showFrozenRowsOnly ? numFrozenRows : undefined }),
                _this.maybeRenderRegions(_this.styleBodyRegion, quadrantType)));
        };
        _this.getEnabledSelectionHandler = function (selectionMode) {
            if (!isSelectionModeEnabled(_this.props, selectionMode)) {
                // If the selection mode isn't enabled, return a callback that
                // will clear the selection. For example, if row selection is
                // disabled, clicking on the row header will clear the table's
                // selection. If all selection modes are enabled, clicking on the
                // same region twice will clear the selection.
                return _this.clearSelection;
            }
            else {
                return _this.handleSelection;
            }
        };
        /**
         * Renders a scroll indicator overlay on top of the table body inside the quadrant stack.
         * This component is offset by the headers and scrollbar, and it provides the overlay which
         * we use to render automatic scrolling indicator linear gradients.
         *
         * @param scrollBarWidth the calculated scroll bar width to be passed in by the quadrant stack
         * @param columnHeaderHeight the calculated column header height to be passed in by the quadrant stack
         * @returns A jsx element which will render a linear gradient with smooth transitions based on
         *          state of the scroll (will not render if we are already at the top/left/right/bottom)
         *           and the state of "scroll direction"
         */
        _this.renderScrollIndicatorOverlay = function (scrollBarWidth, columnHeaderHeight) {
            var scrollDirection = _this.state.scrollDirection;
            var getStyle = function (direction, compare) {
                return {
                    marginRight: scrollBarWidth,
                    marginTop: columnHeaderHeight,
                    opacity: direction === compare ? 1 : 0,
                };
            };
            var baseClass = Classes.TABLE_BODY_SCROLLING_INDICATOR_OVERLAY;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: classNames(baseClass, Classes.TABLE_BODY_IS_SCROLLING_TOP), style: getStyle(scrollDirection, ScrollDirection.TOP) }),
                React.createElement("div", { className: classNames(baseClass, Classes.TABLE_BODY_IS_SCROLLING_BOTTOM), style: getStyle(scrollDirection, ScrollDirection.BOTTOM) }),
                React.createElement("div", { className: classNames(baseClass, Classes.TABLE_BODY_IS_SCROLLING_RIGHT), style: getStyle(scrollDirection, ScrollDirection.RIGHT) }),
                React.createElement("div", { className: classNames(baseClass, Classes.TABLE_BODY_IS_SCROLLING_LEFT), style: getStyle(scrollDirection, ScrollDirection.LEFT) })));
        };
        _this.handleHeaderMounted = function (whichHeader) {
            var didHeadersMount = _this.state.didHeadersMount;
            if (didHeadersMount) {
                return;
            }
            if (whichHeader === "column") {
                _this.didColumnHeaderMount = true;
            }
            else {
                _this.didRowHeaderMount = true;
            }
            if (_this.didColumnHeaderMount && _this.didRowHeaderMount) {
                _this.setState({ didHeadersMount: true });
            }
        };
        _this.handleCompleteRender = function () {
            // The first onCompleteRender is triggered before the viewportRect is
            // defined and the second after the viewportRect has been set. The cells
            // will only actually render once the viewportRect is defined though, so
            // we defer invoking onCompleteRender until that check passes.
            var _a, _b;
            // Additional note: we run into an unfortunate race condition between the order of execution
            // of this callback and this.handleHeaderMounted(...). The setState() call in the latter
            // does not update this.state quickly enough for us to query for the new state here, so instead
            // we read the private member variables which are the dependent parts of that "didHeadersMount"
            // state.
            var didHeadersMount = _this.didColumnHeaderMount && _this.didRowHeaderMount;
            if (_this.state.viewportRect != null && didHeadersMount) {
                (_b = (_a = _this.props).onCompleteRender) === null || _b === void 0 ? void 0 : _b.call(_a);
                _this.didCompletelyMount = true;
            }
        };
        _this.styleBodyRegion = function (region, quadrantType) {
            var numFrozenColumns = _this.props.numFrozenColumns;
            if (_this.grid == null) {
                return {};
            }
            var cardinality = Regions.getRegionCardinality(region);
            var style = _this.grid.getRegionStyle(region);
            // ensure we're not showing borders at the boundary of the frozen-columns area
            var canHideRightBorder = (quadrantType === QuadrantType.TOP_LEFT || quadrantType === QuadrantType.LEFT) &&
                numFrozenColumns != null &&
                numFrozenColumns > 0;
            var fixedHeight = _this.grid.getHeight();
            var fixedWidth = _this.grid.getWidth();
            // include a correction in some cases to hide borders along quadrant boundaries
            var alignmentCorrection = 1;
            var alignmentCorrectionString = "-".concat(alignmentCorrection, "px");
            switch (cardinality) {
                case RegionCardinality.CELLS:
                    return style;
                case RegionCardinality.FULL_COLUMNS:
                    style.top = alignmentCorrectionString;
                    style.height = fixedHeight + alignmentCorrection;
                    return style;
                case RegionCardinality.FULL_ROWS:
                    style.left = alignmentCorrectionString;
                    style.width = fixedWidth + alignmentCorrection;
                    if (canHideRightBorder) {
                        style.right = alignmentCorrectionString;
                    }
                    return style;
                case RegionCardinality.FULL_TABLE:
                    style.left = alignmentCorrectionString;
                    style.top = alignmentCorrectionString;
                    style.width = fixedWidth + alignmentCorrection;
                    style.height = fixedHeight + alignmentCorrection;
                    if (canHideRightBorder) {
                        style.right = alignmentCorrectionString;
                    }
                    return style;
                default:
                    return { display: "none" };
            }
        };
        _this.styleMenuRegion = function (region) {
            var viewportRect = _this.state.viewportRect;
            if (_this.grid == null || viewportRect == null) {
                return {};
            }
            var cardinality = Regions.getRegionCardinality(region);
            var style = _this.grid.getRegionStyle(region);
            switch (cardinality) {
                case RegionCardinality.FULL_TABLE:
                    style.right = "0px";
                    style.bottom = "0px";
                    style.top = "0px";
                    style.left = "0px";
                    style.borderBottom = "none";
                    style.borderRight = "none";
                    return style;
                default:
                    return { display: "none" };
            }
        };
        _this.styleColumnHeaderRegion = function (region) {
            var viewportRect = _this.state.viewportRect;
            if (_this.grid == null || viewportRect == null) {
                return {};
            }
            var cardinality = Regions.getRegionCardinality(region);
            var style = _this.grid.getRegionStyle(region);
            switch (cardinality) {
                case RegionCardinality.FULL_TABLE:
                    style.left = "-1px";
                    style.borderLeft = "none";
                    style.bottom = "-1px";
                    return style;
                case RegionCardinality.FULL_COLUMNS:
                    style.bottom = "-1px";
                    return style;
                default:
                    return { display: "none" };
            }
        };
        _this.styleRowHeaderRegion = function (region) {
            var viewportRect = _this.state.viewportRect;
            if (_this.grid == null || viewportRect == null) {
                return {};
            }
            var cardinality = Regions.getRegionCardinality(region);
            var style = _this.grid.getRegionStyle(region);
            switch (cardinality) {
                case RegionCardinality.FULL_TABLE:
                    style.top = "-1px";
                    style.borderTop = "none";
                    style.right = "-1px";
                    return style;
                case RegionCardinality.FULL_ROWS:
                    style.right = "-1px";
                    return style;
                default:
                    return { display: "none" };
            }
        };
        _this.handleColumnWidthChanged = function (columnIndex, width) {
            var _a, _b;
            var selectedRegions = _this.state.selectedRegions;
            var columnWidths = _this.state.columnWidths.slice();
            if (Regions.hasFullTable(selectedRegions)) {
                for (var col = 0; col < columnWidths.length; col++) {
                    columnWidths[col] = width;
                }
            }
            if (Regions.hasFullColumn(selectedRegions, columnIndex)) {
                Regions.eachUniqueFullColumn(selectedRegions, function (col) {
                    columnWidths[col] = width;
                });
            }
            else {
                columnWidths[columnIndex] = width;
            }
            _this.validateGrid({ columnWidths: columnWidths });
            _this.setState({ columnWidths: columnWidths });
            (_b = (_a = _this.props).onColumnWidthChanged) === null || _b === void 0 ? void 0 : _b.call(_a, columnIndex, width);
        };
        _this.handleRowHeightChanged = function (rowIndex, height) {
            var _a, _b;
            var selectedRegions = _this.state.selectedRegions;
            var rowHeights = _this.state.rowHeights.slice();
            if (Regions.hasFullTable(selectedRegions)) {
                for (var row = 0; row < rowHeights.length; row++) {
                    rowHeights[row] = height;
                }
            }
            if (Regions.hasFullRow(selectedRegions, rowIndex)) {
                Regions.eachUniqueFullRow(selectedRegions, function (row) {
                    rowHeights[row] = height;
                });
            }
            else {
                rowHeights[rowIndex] = height;
            }
            _this.validateGrid({ rowHeights: rowHeights });
            _this.setState({ rowHeights: rowHeights });
            (_b = (_a = _this.props).onRowHeightChanged) === null || _b === void 0 ? void 0 : _b.call(_a, rowIndex, height);
        };
        _this.handleRootScroll = function (_event) {
            // Bug #211 - Native browser text selection events can cause the root
            // element to scroll even though it has a overflow:hidden style. The
            // only viable solution to this is to unscroll the element after the
            // browser scrolls it.
            if (_this.rootTableElement != null) {
                _this.rootTableElement.scrollLeft = 0;
                _this.rootTableElement.scrollTop = 0;
            }
        };
        _this.handleBodyScroll = function (event) {
            // Prevent the event from propagating to avoid a resize event on the resize sensor.
            event.stopPropagation();
            if (_this.locator != null && !_this.state.isLayoutLocked) {
                var newViewportRect = _this.locator.getViewportRect();
                _this.updateViewportRect(newViewportRect);
            }
        };
        _this.clearSelection = function (_selectedRegions) {
            _this.handleSelection([]);
        };
        _this.syncViewportPosition = function (_a) {
            var nextScrollLeft = _a.nextScrollLeft, nextScrollTop = _a.nextScrollTop;
            var viewportRect = _this.state.viewportRect;
            if (_this.scrollContainerElement == null || _this.columnHeaderElement == null || viewportRect === undefined) {
                return;
            }
            if (nextScrollLeft !== undefined || nextScrollTop !== undefined) {
                // we need to modify the scroll container explicitly for the viewport to shift. in so
                // doing, we add the size of the header elements, which are not technically part of the
                // "grid" concept (the grid only consists of body cells at present).
                if (nextScrollTop !== undefined) {
                    var topCorrection = _this.shouldDisableVerticalScroll() ? 0 : _this.columnHeaderElement.clientHeight;
                    _this.scrollContainerElement.scrollTop = nextScrollTop + topCorrection;
                }
                if (nextScrollLeft !== undefined) {
                    var leftCorrection = _this.shouldDisableHorizontalScroll() || _this.rowHeaderElement == null
                        ? 0
                        : _this.rowHeaderElement.clientWidth;
                    _this.scrollContainerElement.scrollLeft = nextScrollLeft + leftCorrection;
                }
                var nextViewportRect = new Rect(nextScrollLeft !== null && nextScrollLeft !== void 0 ? nextScrollLeft : 0, nextScrollTop !== null && nextScrollTop !== void 0 ? nextScrollTop : 0, viewportRect.width, viewportRect.height);
                _this.updateViewportRect(nextViewportRect);
            }
        };
        _this.handleFocus = function (focusedCell) {
            var _a, _b;
            if (!_this.props.enableFocusedCell) {
                // don't set focus state if focus is not allowed
                return;
            }
            // only set focused cell state if not specified in props
            if (_this.props.focusedCell == null) {
                _this.setState({ focusedCell: focusedCell });
            }
            (_b = (_a = _this.props).onFocusedCell) === null || _b === void 0 ? void 0 : _b.call(_a, focusedCell);
        };
        _this.handleSelection = function (selectedRegions) {
            // only set selectedRegions state if not specified in props
            if (_this.props.selectedRegions == null) {
                _this.setState({ selectedRegions: selectedRegions });
            }
            var onSelection = _this.props.onSelection;
            if (onSelection != null) {
                onSelection(selectedRegions);
            }
        };
        _this.handleColumnsReordering = function (verticalGuides) {
            _this.setState({ isReordering: true, verticalGuides: verticalGuides });
        };
        _this.handleColumnsReordered = function (oldIndex, newIndex, length) {
            var _a, _b;
            _this.setState({ isReordering: false, verticalGuides: [] });
            (_b = (_a = _this.props).onColumnsReordered) === null || _b === void 0 ? void 0 : _b.call(_a, oldIndex, newIndex, length);
        };
        _this.handleRowsReordering = function (horizontalGuides) {
            _this.setState({ isReordering: true, horizontalGuides: horizontalGuides });
        };
        _this.handleRowsReordered = function (oldIndex, newIndex, length) {
            var _a, _b;
            _this.setState({ isReordering: false, horizontalGuides: [] });
            (_b = (_a = _this.props).onRowsReordered) === null || _b === void 0 ? void 0 : _b.call(_a, oldIndex, newIndex, length);
        };
        _this.handleLayoutLock = function (isLayoutLocked) {
            if (isLayoutLocked === void 0) { isLayoutLocked = false; }
            _this.setState({ isLayoutLocked: isLayoutLocked });
        };
        _this.updateViewportRect = function (nextViewportRect) {
            if (nextViewportRect === undefined) {
                return;
            }
            var viewportRect = _this.state.viewportRect;
            _this.setState({ viewportRect: nextViewportRect });
            var didViewportChange = (viewportRect != null && !viewportRect.equals(nextViewportRect)) ||
                (viewportRect == null && nextViewportRect != null);
            if (didViewportChange) {
                _this.invokeOnVisibleCellsChangeCallback(nextViewportRect);
            }
        };
        _this.getMaxFrozenColumnIndex = function () {
            return _this.state.numFrozenColumnsClamped - 1;
        };
        _this.getMaxFrozenRowIndex = function () {
            return _this.state.numFrozenRowsClamped - 1;
        };
        _this.handleColumnResizeGuide = function (verticalGuides) {
            _this.setState({ verticalGuides: verticalGuides });
        };
        _this.handleRowResizeGuide = function (horizontalGuides) {
            _this.setState({ horizontalGuides: horizontalGuides });
        };
        var children = props.children, columnWidths = props.columnWidths, defaultRowHeight = props.defaultRowHeight, defaultColumnWidth = props.defaultColumnWidth, enableRowHeader = props.enableRowHeader, numRows = props.numRows, rowHeights = props.rowHeights, _a = props.selectedRegions, selectedRegions = _a === void 0 ? [] : _a, enableColumnHeader = props.enableColumnHeader;
        var childrenArray = React.Children.toArray(children);
        var columnIdToIndex = Table2.createColumnIdIndex(childrenArray);
        // Create height/width arrays using the lengths from props and
        // children, the default values from props, and finally any sparse
        // arrays passed into props.
        var newColumnWidths = childrenArray.map(function () { return defaultColumnWidth; });
        if (columnWidths !== undefined) {
            newColumnWidths = Utils.assignSparseValues(newColumnWidths, columnWidths);
        }
        var newRowHeights = Utils.times(numRows, function () { return defaultRowHeight; });
        if (rowHeights !== undefined) {
            newRowHeights = Utils.assignSparseValues(newRowHeights, rowHeights);
        }
        var focusedCell = FocusedCellUtils.getInitialFocusedCell(props.enableFocusedCell, props.focusedCell, undefined, selectedRegions);
        _this.state = {
            childrenArray: childrenArray,
            columnIdToIndex: columnIdToIndex,
            columnWidths: newColumnWidths,
            didHeadersMount: false,
            focusedCell: focusedCell,
            horizontalGuides: [],
            isLayoutLocked: false,
            isReordering: false,
            numFrozenColumnsClamped: clampNumFrozenColumns(props),
            numFrozenRowsClamped: clampNumFrozenRows(props),
            rowHeights: newRowHeights,
            selectedRegions: selectedRegions,
            verticalGuides: [],
        };
        _this.hotkeysImpl = new TableHotkeys(props, _this.state, {
            getEnabledSelectionHandler: _this.getEnabledSelectionHandler,
            handleFocus: _this.handleFocus,
            handleSelection: _this.handleSelection,
            syncViewportPosition: _this.syncViewportPosition,
        });
        _this.hotkeys = getHotkeysFromProps(props, _this.hotkeysImpl);
        if (enableRowHeader === false) {
            _this.didRowHeaderMount = true;
        }
        if (enableColumnHeader === false) {
            _this.didColumnHeaderMount = true;
        }
        return _this;
    }
    Table2.getDerivedStateFromProps = function (props, state) {
        var children = props.children, defaultColumnWidth = props.defaultColumnWidth, defaultRowHeight = props.defaultRowHeight, enableFocusedCell = props.enableFocusedCell, focusedCell = props.focusedCell, numRows = props.numRows, selectedRegions = props.selectedRegions, selectionModes = props.selectionModes;
        // assign values from state if uncontrolled
        var columnWidths = props.columnWidths, rowHeights = props.rowHeights;
        if (columnWidths == null) {
            columnWidths = state.columnWidths;
        }
        if (rowHeights == null) {
            rowHeights = state.rowHeights;
        }
        var newChildrenArray = React.Children.toArray(children);
        var didChildrenChange = !compareChildren(newChildrenArray, state.childrenArray);
        var numCols = newChildrenArray.length;
        var newColumnWidths = columnWidths;
        if (columnWidths !== state.columnWidths || didChildrenChange) {
            // Try to maintain widths of columns by looking up the width of the
            // column that had the same `ID` prop. If none is found, use the
            // previous width at the same index.
            var previousColumnWidths = newChildrenArray.map(function (child, index) {
                var mappedIndex = child.props.id === undefined ? undefined : state.columnIdToIndex[child.props.id];
                return state.columnWidths[mappedIndex !== null && mappedIndex !== void 0 ? mappedIndex : index];
            });
            // Make sure the width/height arrays have the correct length, but keep
            // as many existing widths/heights as possible. Also, apply the
            // sparse width/heights from props.
            newColumnWidths = Array(numCols).fill(defaultColumnWidth);
            newColumnWidths = Utils.assignSparseValues(newColumnWidths, previousColumnWidths);
            newColumnWidths = Utils.assignSparseValues(newColumnWidths, columnWidths);
        }
        var newRowHeights = rowHeights;
        if (rowHeights !== state.rowHeights || numRows !== state.rowHeights.length) {
            newRowHeights = Array(numRows).fill(defaultRowHeight);
            newRowHeights = Utils.assignSparseValues(newRowHeights, rowHeights);
        }
        var newSelectedRegions = selectedRegions !== null && selectedRegions !== void 0 ? selectedRegions : state.selectedRegions.filter(function (region) {
            // if we're in uncontrolled mode, filter out all selected regions that don't
            // fit in the current new table dimensions
            var regionCardinality = Regions.getRegionCardinality(region);
            return (isSelectionModeEnabled(props, regionCardinality, selectionModes) &&
                Regions.isRegionValidForTable(region, numRows, numCols));
        });
        var newFocusedCell = FocusedCellUtils.getInitialFocusedCell(enableFocusedCell, focusedCell, state.focusedCell, newSelectedRegions);
        var nextState = {
            childrenArray: newChildrenArray,
            columnIdToIndex: didChildrenChange ? Table2.createColumnIdIndex(newChildrenArray) : state.columnIdToIndex,
            columnWidths: newColumnWidths,
            focusedCell: newFocusedCell,
            numFrozenColumnsClamped: clampNumFrozenColumns(props),
            numFrozenRowsClamped: clampNumFrozenRows(props),
            rowHeights: newRowHeights,
            selectedRegions: newSelectedRegions,
        };
        if (!CoreUtils.deepCompareKeys(state, nextState, Table2.SHALLOW_COMPARE_STATE_KEYS_DENYLIST)) {
            return nextState;
        }
        return null;
    };
    Table2.createColumnIdIndex = function (children) {
        var columnIdToIndex = {};
        for (var i = 0; i < children.length; i++) {
            var key = children[i].props.id;
            if (key != null) {
                columnIdToIndex[String(key)] = i;
            }
        }
        return columnIdToIndex;
    };
    // Instance methods
    // ================
    /**
     * __Experimental!__ Resizes all rows in the table to the approximate
     * maximum height of wrapped cell content in each row. Works best when each
     * cell contains plain text of a consistent font style (though font style
     * may vary between cells). Since this function uses approximate
     * measurements, results may not be perfect.
     *
     * Approximation parameters can be configured for the entire table or on a
     * per-cell basis. Default values are fine-tuned to work well with default
     * Table font styles.
     */
    Table2.prototype.resizeRowsByApproximateHeight = function (getCellText, options) {
        var rowHeights = resizeRowsByApproximateHeight(this.props.numRows, this.state.columnWidths, getCellText, options);
        this.invalidateGrid();
        this.setState({ rowHeights: rowHeights });
    };
    /**
     * Resize all rows in the table to the height of the tallest visible cell in the specified columns.
     * If no indices are provided, default to using the tallest visible cell from all columns in view.
     */
    Table2.prototype.resizeRowsByTallestCell = function (columnIndices) {
        if (this.grid == null || this.state.viewportRect === undefined || this.locator === undefined) {
            console.warn(Errors.TABLE_UNMOUNTED_RESIZE_WARNING);
            return;
        }
        var rowHeights = resizeRowsByTallestCell(this.grid, this.state.viewportRect, this.locator, this.state.rowHeights.length, columnIndices);
        this.invalidateGrid();
        this.setState({ rowHeights: rowHeights });
    };
    /**
     * Scrolls the table to the target region in a fashion appropriate to the target region's
     * cardinality:
     *
     * - CELLS: Scroll the top-left cell in the target region to the top-left corner of the viewport.
     * - FULL_ROWS: Scroll the top-most row in the target region to the top of the viewport.
     * - FULL_COLUMNS: Scroll the left-most column in the target region to the left side of the viewport.
     * - FULL_TABLE: Scroll the top-left cell in the table to the top-left corner of the viewport.
     *
     * If there are active frozen rows and/or columns, the target region will be positioned in the
     * top-left corner of the non-frozen area (unless the target region itself is in the frozen
     * area).
     *
     * If the target region is close to the bottom-right corner of the table, this function will
     * simply scroll the target region as close to the top-left as possible until the bottom-right
     * corner is reached.
     */
    Table2.prototype.scrollToRegion = function (region) {
        var _a = this.state, numFrozenColumns = _a.numFrozenColumnsClamped, numFrozenRows = _a.numFrozenRowsClamped, viewportRect = _a.viewportRect;
        if (viewportRect === undefined || this.grid === null || this.quadrantStackInstance === undefined) {
            return;
        }
        var currScrollLeft = viewportRect.left, currScrollTop = viewportRect.top;
        var _b = ScrollUtils.getScrollPositionForRegion(region, currScrollLeft, currScrollTop, this.grid.getCumulativeWidthBefore, this.grid.getCumulativeHeightBefore, numFrozenRows, numFrozenColumns), scrollLeft = _b.scrollLeft, scrollTop = _b.scrollTop;
        var correctedScrollLeft = this.shouldDisableHorizontalScroll() ? 0 : scrollLeft;
        var correctedScrollTop = this.shouldDisableVerticalScroll() ? 0 : scrollTop;
        // defer to the quadrant stack to keep all quadrant positions in sync
        this.quadrantStackInstance.scrollToPosition(correctedScrollLeft, correctedScrollTop);
    };
    /**
     * Scrolls the table by a specified number of offset pixels in either the horizontal or vertical dimension.
     * Will set a scroll indicator gradient which can be cleared by calling scrollByOffset(null);
     *
     * @param relativeOffset - How much to scroll the table body in pixels relative to the current scroll offset
     */
    Table2.prototype.scrollByOffset = function (relativeOffset) {
        var scrollDirection;
        if (relativeOffset) {
            if (Math.abs(relativeOffset.left) > Math.abs(relativeOffset.top)) {
                if (relativeOffset.left < 0) {
                    scrollDirection = ScrollDirection.LEFT;
                }
                else {
                    scrollDirection = ScrollDirection.RIGHT;
                }
            }
            else {
                if (relativeOffset.top < 0) {
                    scrollDirection = ScrollDirection.TOP;
                }
                else {
                    scrollDirection = ScrollDirection.BOTTOM;
                }
            }
        }
        if (this.shouldRenderScrollDirection(scrollDirection) || scrollDirection == null) {
            this.setState({ scrollDirection: scrollDirection });
        }
        var viewportRect = this.state.viewportRect;
        if (viewportRect === undefined || this.grid === null || this.quadrantStackInstance === undefined) {
            return;
        }
        if (relativeOffset !== null) {
            var currScrollLeft = viewportRect.left, currScrollTop = viewportRect.top;
            var correctedScrollLeft = this.shouldDisableHorizontalScroll() ? 0 : currScrollLeft + relativeOffset.left;
            var correctedScrollTop = this.shouldDisableVerticalScroll() ? 0 : currScrollTop + relativeOffset.top;
            if (!this.shouldRenderScrollDirection(this.state.scrollDirection)) {
                this.setState({ scrollDirection: null });
            }
            // defer to the quadrant stack to keep all quadrant positions in sync
            this.quadrantStackInstance.scrollToPosition(correctedScrollLeft, correctedScrollTop);
        }
    };
    // React lifecycle
    // ===============
    Table2.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var propKeysDenylist = { exclude: Table2.SHALLOW_COMPARE_PROP_KEYS_DENYLIST };
        var stateKeysDenylist = { exclude: Table2.SHALLOW_COMPARE_STATE_KEYS_DENYLIST };
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, propKeysDenylist) ||
            !CoreUtils.shallowCompareKeys(this.state, nextState, stateKeysDenylist) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, Table2.SHALLOW_COMPARE_PROP_KEYS_DENYLIST) ||
            !CoreUtils.deepCompareKeys(this.state, nextState, Table2.SHALLOW_COMPARE_STATE_KEYS_DENYLIST));
    };
    Table2.prototype.render = function () {
        return React.createElement(HotkeysTarget2, { hotkeys: this.hotkeys }, this.renderTableContents);
    };
    /**
     * When the component mounts, the HTML Element refs will be available, so
     * we constructor the Locator, which queries the elements' bounding
     * ClientRects.
     */
    Table2.prototype.componentDidMount = function () {
        var _this = this;
        this.validateGrid();
        if (this.rootTableElement != null && this.scrollContainerElement != null && this.cellContainerElement != null) {
            this.locator = new Locator(this.rootTableElement, this.scrollContainerElement, this.cellContainerElement);
            this.updateLocator();
            this.updateViewportRect(this.locator.getViewportRect());
            this.resizeSensorDetach = ResizeSensor.attach(this.rootTableElement, function () {
                var _a;
                if (!_this.state.isLayoutLocked) {
                    _this.updateViewportRect((_a = _this.locator) === null || _a === void 0 ? void 0 : _a.getViewportRect());
                }
            });
            this.forceUpdate();
        }
    };
    Table2.prototype.componentWillUnmount = function () {
        if (this.resizeSensorDetach != null) {
            this.resizeSensorDetach();
            delete this.resizeSensorDetach;
        }
        this.didCompletelyMount = false;
    };
    Table2.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b;
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
        this.hotkeysImpl.setState(this.state);
        this.hotkeysImpl.setProps(this.props);
        var didChildrenChange = !compareChildren(React.Children.toArray(this.props.children), this.state.childrenArray);
        if (this.props.cellRendererDependencies !== undefined && prevProps.cellRendererDependencies === undefined) {
            console.error(Errors.TABLE_INVALID_CELL_RENDERER_DEPS);
        }
        var didCellRendererDependenciesChange = this.props.cellRendererDependencies !== undefined &&
            this.props.cellRendererDependencies.some(function (dep, index) { var _a; return dep !== ((_a = prevProps.cellRendererDependencies) !== null && _a !== void 0 ? _a : [])[index]; });
        var didColumnWidthsChange = !Utils.compareSparseArrays((_a = this.props.columnWidths) !== null && _a !== void 0 ? _a : this.state.columnWidths, prevState.columnWidths);
        var didRowHeightsChange = !Utils.compareSparseArrays((_b = this.props.rowHeights) !== null && _b !== void 0 ? _b : this.state.rowHeights, prevState.rowHeights);
        var shouldInvalidateGrid = didChildrenChange ||
            didCellRendererDependenciesChange ||
            didColumnWidthsChange ||
            didRowHeightsChange ||
            this.props.numRows !== prevProps.numRows ||
            (this.props.forceRerenderOnSelectionChange && this.props.selectedRegions !== prevProps.selectedRegions);
        if (shouldInvalidateGrid) {
            this.invalidateGrid();
        }
        if (this.locator != null) {
            this.validateGrid();
            this.updateLocator();
        }
        var shouldInvalidateHotkeys = this.props.getCellClipboardData !== prevProps.getCellClipboardData ||
            this.props.enableFocusedCell !== prevProps.enableFocusedCell ||
            this.props.enableMultipleSelection !== prevProps.enableMultipleSelection ||
            this.props.selectionModes !== prevProps.selectionModes;
        if (shouldInvalidateHotkeys) {
            this.hotkeys = getHotkeysFromProps(this.props, this.hotkeysImpl);
        }
        if (didCellRendererDependenciesChange) {
            // force an update with the new grid
            this.forceUpdate();
        }
    };
    Table2.prototype.validateProps = function (props) {
        var children = props.children, columnWidths = props.columnWidths, numFrozenColumns = props.numFrozenColumns, numFrozenRows = props.numFrozenRows, numRows = props.numRows, rowHeights = props.rowHeights;
        var numColumns = React.Children.count(children);
        // do cheap error-checking first.
        if (numRows != null && numRows < 0) {
            throw new Error(Errors.TABLE_NUM_ROWS_NEGATIVE);
        }
        if (numFrozenRows != null && numFrozenRows < 0) {
            throw new Error(Errors.TABLE_NUM_FROZEN_ROWS_NEGATIVE);
        }
        if (numFrozenColumns != null && numFrozenColumns < 0) {
            throw new Error(Errors.TABLE_NUM_FROZEN_COLUMNS_NEGATIVE);
        }
        if (numRows != null && rowHeights != null && rowHeights.length !== numRows) {
            throw new Error(Errors.TABLE_NUM_ROWS_ROW_HEIGHTS_MISMATCH);
        }
        if (numColumns != null && columnWidths != null && columnWidths.length !== numColumns) {
            throw new Error(Errors.TABLE_NUM_COLUMNS_COLUMN_WIDTHS_MISMATCH);
        }
        React.Children.forEach(children, function (child) {
            if (!CoreUtils.isElementOfType(child, Column)) {
                throw new Error(Errors.TABLE_NON_COLUMN_CHILDREN_WARNING);
            }
        });
        // these are recoverable scenarios, so just print a warning.
        if (numFrozenRows != null && numRows != null && numFrozenRows > numRows) {
            console.warn(Errors.TABLE_NUM_FROZEN_ROWS_BOUND_WARNING);
        }
        if (numFrozenColumns != null && numFrozenColumns > numColumns) {
            console.warn(Errors.TABLE_NUM_FROZEN_COLUMNS_BOUND_WARNING);
        }
    };
    Table2.prototype.gridDimensionsMatchProps = function () {
        var _a = this.props, children = _a.children, numRows = _a.numRows;
        return (this.grid != null && this.grid.numCols === React.Children.count(children) && this.grid.numRows === numRows);
    };
    // Quadrant refs
    // =============
    Table2.prototype.shouldDisableVerticalScroll = function () {
        var _a = this.props, enableColumnHeader = _a.enableColumnHeader, enableGhostCells = _a.enableGhostCells;
        var viewportRect = this.state.viewportRect;
        if (this.grid === null || viewportRect === undefined) {
            return false;
        }
        var rowIndices = this.grid.getRowIndicesInRect({
            columnHeaderHeight: enableColumnHeader ? this.columnHeaderHeight : 0,
            includeGhostCells: enableGhostCells,
            rect: viewportRect,
        });
        var isViewportUnscrolledVertically = viewportRect != null && viewportRect.top === 0;
        var areRowHeadersLoading = hasLoadingOption(this.props.loadingOptions, TableLoadingOption.ROW_HEADERS);
        var areGhostRowsVisible = enableGhostCells && this.grid.isGhostIndex(rowIndices.rowIndexEnd, 0);
        return areGhostRowsVisible && (isViewportUnscrolledVertically || areRowHeadersLoading);
    };
    Table2.prototype.shouldDisableHorizontalScroll = function () {
        var enableGhostCells = this.props.enableGhostCells;
        var viewportRect = this.state.viewportRect;
        if (this.grid === null || viewportRect === undefined) {
            return false;
        }
        var columnIndices = this.grid.getColumnIndicesInRect(viewportRect, enableGhostCells);
        var isViewportUnscrolledHorizontally = viewportRect != null && viewportRect.left === 0;
        var areColumnHeadersLoading = hasLoadingOption(this.props.loadingOptions, TableLoadingOption.COLUMN_HEADERS);
        var areGhostColumnsVisible = enableGhostCells && this.grid.isGhostColumn(columnIndices.columnIndexEnd);
        return areGhostColumnsVisible && (isViewportUnscrolledHorizontally || areColumnHeadersLoading);
    };
    Table2.prototype.shouldRenderScrollDirection = function (scrollDirection) {
        if (!this.scrollContainerElement || !this.state.viewportRect) {
            return false;
        }
        var scrollWrapper = this.scrollContainerElement;
        var _a = this.state.viewportRect, currScrollLeft = _a.left, currScrollTop = _a.top;
        switch (scrollDirection) {
            case "left":
                return currScrollLeft > 0;
            case "right":
                return scrollWrapper.scrollWidth - scrollWrapper.offsetWidth !== currScrollLeft;
            case "top":
                return currScrollTop > 0;
            case "bottom":
                return scrollWrapper.scrollHeight - scrollWrapper.offsetHeight !== currScrollTop;
            default:
                return false;
        }
    };
    Table2.prototype.getColumnProps = function (columnIndex) {
        var column = this.state.childrenArray[columnIndex];
        return column === undefined ? undefined : column.props;
    };
    Table2.prototype.isGuideLayerShowing = function () {
        return this.state.verticalGuides.length > 0 || this.state.horizontalGuides.length > 0;
    };
    Table2.prototype.invalidateGrid = function () {
        this.grid = null;
    };
    /**
     * This method's arguments allow us to support the following use case:
     * In some cases, we want to update the grid _before_ this.setState() is called with updated
     * `columnWidths` or `rowHeights` so that when that setState update _does_ flush through the React render
     * tree, our TableQuadrantStack has the correct updated grid measurements.
     */
    Table2.prototype.validateGrid = function (_a) {
        var _b = _a === void 0 ? {} : _a, columnWidths = _b.columnWidths, rowHeights = _b.rowHeights;
        if (this.grid == null || columnWidths !== undefined || rowHeights !== undefined) {
            var _c = this.props, defaultRowHeight = _c.defaultRowHeight, defaultColumnWidth = _c.defaultColumnWidth, numFrozenColumns = _c.numFrozenColumns;
            // gridBleed should always be >= numFrozenColumns since columnIndexStart adds numFrozenColumns
            var gridBleed = Math.max(Grid.DEFAULT_BLEED, numFrozenColumns);
            this.grid = new Grid(rowHeights !== null && rowHeights !== void 0 ? rowHeights : this.state.rowHeights, columnWidths !== null && columnWidths !== void 0 ? columnWidths : this.state.columnWidths, gridBleed, defaultRowHeight, defaultColumnWidth);
            this.invokeOnVisibleCellsChangeCallback(this.state.viewportRect);
            this.hotkeysImpl.setGrid(this.grid);
        }
        return this.grid;
    };
    /**
     * Renders a `RegionLayer`, applying styles to the regions using the
     * supplied `RegionStyler`. `RegionLayer` is a pure component, so
     * the `RegionStyler` should be a new instance on every render if we
     * intend to redraw the region layer.
     */
    Table2.prototype.maybeRenderRegions = function (getRegionStyle, quadrantType) {
        var _a;
        if (this.isGuideLayerShowing() && !this.state.isReordering) {
            // we want to show guides *and* the selection styles when reordering rows or columns
            return undefined;
        }
        var regionGroups = Regions.joinStyledRegionGroups(this.state.selectedRegions, (_a = this.props.styledRegionGroups) !== null && _a !== void 0 ? _a : [], this.state.focusedCell);
        return regionGroups.map(function (regionGroup, index) {
            var regionStyles = regionGroup.regions.map(function (region) { return getRegionStyle(region, quadrantType); });
            return (React.createElement(RegionLayer, { className: classNames(regionGroup.className), key: index, regions: regionGroup.regions, regionStyles: regionStyles }));
        });
    };
    Table2.prototype.updateLocator = function () {
        if (this.locator === undefined || this.grid == null) {
            return;
        }
        this.locator
            .setGrid(this.grid)
            .setNumFrozenRows(this.state.numFrozenRowsClamped)
            .setNumFrozenColumns(this.state.numFrozenColumnsClamped);
    };
    Table2.prototype.invokeOnVisibleCellsChangeCallback = function (viewportRect) {
        var _a, _b;
        if (this.grid == null) {
            return;
        }
        var columnIndices = this.grid.getColumnIndicesInRect(viewportRect);
        var rowIndices = this.grid.getRowIndicesInRect({ rect: viewportRect });
        (_b = (_a = this.props).onVisibleCellsChange) === null || _b === void 0 ? void 0 : _b.call(_a, rowIndices, columnIndices);
    };
    /**
     * Normalizes RenderMode.BATCH_ON_UPDATE into RenderMode.{BATCH,NONE}. We do
     * this because there are actually multiple updates required before the
     * <Table> is considered fully "mounted," and adding that knowledge to child
     * components would lead to tight coupling. Thus, keep it simple for them.
     */
    Table2.prototype.getNormalizedRenderMode = function () {
        var renderMode = this.props.renderMode;
        var shouldBatchRender = renderMode === RenderMode.BATCH || (renderMode === RenderMode.BATCH_ON_UPDATE && this.didCompletelyMount);
        return shouldBatchRender ? RenderMode.BATCH : RenderMode.NONE;
    };
    Table2.displayName = "".concat(DISPLAYNAME_PREFIX, ".Table2");
    Table2.defaultProps = {
        defaultColumnWidth: 150,
        defaultRowHeight: 20,
        enableColumnHeader: true,
        enableColumnInteractionBar: false,
        enableFocusedCell: false,
        enableGhostCells: false,
        enableMultipleSelection: true,
        enableRowHeader: true,
        forceRerenderOnSelectionChange: false,
        getCellClipboardData: function (row, col, cellRenderer) {
            return innerText(cellRenderer(row, col));
        },
        loadingOptions: [],
        maxColumnWidth: 9999,
        maxRowHeight: 9999,
        minColumnWidth: 50,
        minRowHeight: 20,
        numFrozenColumns: 0,
        numFrozenRows: 0,
        numRows: 0,
        renderMode: RenderMode.BATCH_ON_UPDATE,
        rowHeaderCellRenderer: renderDefaultRowHeader,
        selectionModes: SelectionModes.ALL,
    };
    Table2.SHALLOW_COMPARE_PROP_KEYS_DENYLIST = [
        "selectedRegions", // (intentionally omitted; can be deeply compared to save on re-renders in controlled mode)
    ];
    Table2.SHALLOW_COMPARE_STATE_KEYS_DENYLIST = [
        "selectedRegions",
        "viewportRect",
    ];
    return Table2;
}(AbstractComponent2));
export { Table2 };
//# sourceMappingURL=table2.js.map