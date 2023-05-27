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
var Table_1;
import { __decorate } from "tslib";
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to Table2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import innerText from "react-innertext";
import { AbstractComponent2, Utils as CoreUtils, DISPLAYNAME_PREFIX, Hotkey, Hotkeys, HotkeysTarget, } from "@blueprintjs/core";
import { Column } from "./column";
import * as Classes from "./common/classes";
import { columnInteractionBarContextTypes } from "./common/context";
import * as Errors from "./common/errors";
import { Grid } from "./common/grid";
import * as FocusedCellUtils from "./common/internal/focusedCellUtils";
import * as ScrollUtils from "./common/internal/scrollUtils";
import { Rect } from "./common/rect";
import { RenderMode } from "./common/renderMode";
import { Utils } from "./common/utils";
import { ColumnHeader } from "./headers/columnHeader";
import { ColumnHeaderCell } from "./headers/columnHeaderCell";
import { renderDefaultRowHeader, RowHeader } from "./headers/rowHeader";
import { ResizeSensor } from "./interactions/resizeSensor";
import { GuideLayer } from "./layers/guides";
import { RegionLayer } from "./layers/regions";
import { Locator } from "./locator";
import { QuadrantType } from "./quadrants/tableQuadrant";
import { TableQuadrantStack } from "./quadrants/tableQuadrantStack";
import { ColumnLoadingOption, RegionCardinality, Regions, SelectionModes, TableLoadingOption } from "./regions";
import { resizeRowsByApproximateHeight, resizeRowsByTallestCell, } from "./resizeRows";
import { TableBody } from "./tableBody";
import { TableHotkeys } from "./tableHotkeys";
import { clampNumFrozenColumns, clampNumFrozenRows, hasLoadingOption } from "./tableUtils";
/** @deprecated use Table2, which supports usage of the new hotkeys API in the same application */
let Table = Table_1 = class Table extends AbstractComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.Table`;
    static defaultProps = {
        defaultColumnWidth: 150,
        defaultRowHeight: 20,
        enableColumnHeader: true,
        enableColumnInteractionBar: false,
        enableFocusedCell: false,
        enableGhostCells: false,
        enableMultipleSelection: true,
        enableRowHeader: true,
        forceRerenderOnSelectionChange: false,
        getCellClipboardData: (row, col, cellRenderer) => innerText(cellRenderer?.(row, col)),
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
    static childContextTypes = columnInteractionBarContextTypes;
    static getDerivedStateFromProps(props, state) {
        const { children, defaultColumnWidth, defaultRowHeight, enableFocusedCell, focusedCell, numRows, selectedRegions, selectionModes, } = props;
        // assign values from state if uncontrolled
        let { columnWidths, rowHeights } = props;
        if (columnWidths == null) {
            columnWidths = state.columnWidths;
        }
        if (rowHeights == null) {
            rowHeights = state.rowHeights;
        }
        const newChildrenArray = React.Children.toArray(children);
        const didChildrenChange = newChildrenArray !== state.childrenArray;
        const numCols = newChildrenArray.length;
        let newColumnWidths = columnWidths;
        if (columnWidths !== state.columnWidths || didChildrenChange) {
            // Try to maintain widths of columns by looking up the width of the
            // column that had the same `ID` prop. If none is found, use the
            // previous width at the same index.
            const previousColumnWidths = newChildrenArray.map((child, index) => {
                const mappedIndex = child.props.id === undefined ? index : state.columnIdToIndex[String(child.props.id)];
                return state.columnWidths[mappedIndex];
            });
            // Make sure the width/height arrays have the correct length, but keep
            // as many existing widths/heights as possible. Also, apply the
            // sparse width/heights from props.
            newColumnWidths = Array(numCols).fill(defaultColumnWidth);
            newColumnWidths = Utils.assignSparseValues(newColumnWidths, previousColumnWidths);
            newColumnWidths = Utils.assignSparseValues(newColumnWidths, columnWidths);
        }
        let newRowHeights = rowHeights;
        if (rowHeights !== state.rowHeights || numRows !== state.rowHeights.length) {
            newRowHeights = Array(numRows).fill(defaultRowHeight);
            newRowHeights = Utils.assignSparseValues(newRowHeights, rowHeights);
        }
        // if we're in uncontrolled mode, filter out all selected regions that don't
        // fit in the current new table dimensions
        const newSelectedRegions = selectedRegions ??
            state.selectedRegions.filter(region => {
                const regionCardinality = Regions.getRegionCardinality(region);
                return (Table_1.isSelectionModeEnabled(props, regionCardinality, selectionModes) &&
                    Regions.isRegionValidForTable(region, numRows, numCols));
            });
        const newFocusedCell = FocusedCellUtils.getInitialFocusedCell(enableFocusedCell, focusedCell, state.focusedCell, newSelectedRegions);
        const nextState = {
            childrenArray: newChildrenArray,
            columnIdToIndex: didChildrenChange ? Table_1.createColumnIdIndex(newChildrenArray) : state.columnIdToIndex,
            columnWidths: newColumnWidths,
            focusedCell: newFocusedCell,
            numFrozenColumnsClamped: clampNumFrozenColumns(props),
            numFrozenRowsClamped: clampNumFrozenRows(props),
            rowHeights: newRowHeights,
            selectedRegions: newSelectedRegions,
        };
        if (!CoreUtils.deepCompareKeys(state, nextState, Table_1.SHALLOW_COMPARE_STATE_KEYS_DENYLIST)) {
            return nextState;
        }
        return null;
    }
    static SHALLOW_COMPARE_PROP_KEYS_DENYLIST = [
        "selectedRegions", // (intentionally omitted; can be deeply compared to save on re-renders in controlled mode)
    ];
    static SHALLOW_COMPARE_STATE_KEYS_DENYLIST = [
        "selectedRegions",
        "viewportRect",
    ];
    static createColumnIdIndex(children) {
        const columnIdToIndex = {};
        for (let i = 0; i < children.length; i++) {
            const key = children[i].props.id;
            if (key != null) {
                columnIdToIndex[String(key)] = i;
            }
        }
        return columnIdToIndex;
    }
    static isSelectionModeEnabled(props, selectionMode, selectionModes = props.selectionModes) {
        const { children, numRows } = props;
        const numColumns = React.Children.count(children);
        return selectionModes.indexOf(selectionMode) >= 0 && numRows > 0 && numColumns > 0;
    }
    hotkeysImpl;
    grid = null;
    locator;
    resizeSensorDetach;
    refHandlers = {
        cellContainer: (ref) => (this.cellContainerElement = ref),
        columnHeader: (ref) => (this.columnHeaderElement = ref),
        quadrantStack: (ref) => (this.quadrantStackInstance = ref),
        rootTable: (ref) => (this.rootTableElement = ref),
        rowHeader: (ref) => (this.rowHeaderElement = ref),
        scrollContainer: (ref) => (this.scrollContainerElement = ref),
    };
    cellContainerElement;
    columnHeaderElement;
    quadrantStackInstance;
    rootTableElement;
    rowHeaderElement;
    scrollContainerElement;
    /*
     * This value is set to `true` when all cells finish mounting for the first
     * time. It serves as a signal that we can switch to batch rendering.
     */
    didCompletelyMount = false;
    constructor(props, context) {
        super(props, context);
        const { children, columnWidths, defaultRowHeight, defaultColumnWidth, numRows, rowHeights } = props;
        const childrenArray = React.Children.toArray(children);
        const columnIdToIndex = Table_1.createColumnIdIndex(childrenArray);
        // Create height/width arrays using the lengths from props and
        // children, the default values from props, and finally any sparse
        // arrays passed into props.
        let newColumnWidths = childrenArray.map(() => defaultColumnWidth);
        if (columnWidths !== undefined) {
            newColumnWidths = Utils.assignSparseValues(newColumnWidths, columnWidths);
        }
        let newRowHeights = Utils.times(numRows, () => defaultRowHeight);
        if (rowHeights !== undefined) {
            newRowHeights = Utils.assignSparseValues(newRowHeights, rowHeights);
        }
        const selectedRegions = props.selectedRegions == null ? [] : props.selectedRegions;
        const focusedCell = FocusedCellUtils.getInitialFocusedCell(props.enableFocusedCell, props.focusedCell, undefined, selectedRegions);
        this.state = {
            childrenArray,
            columnIdToIndex,
            columnWidths: newColumnWidths,
            didHeadersMount: false,
            focusedCell,
            horizontalGuides: [],
            isLayoutLocked: false,
            isReordering: false,
            numFrozenColumnsClamped: clampNumFrozenColumns(props),
            numFrozenRowsClamped: clampNumFrozenRows(props),
            rowHeights: newRowHeights,
            selectedRegions,
            verticalGuides: [],
        };
        this.hotkeysImpl = new TableHotkeys(props, this.state, {
            getEnabledSelectionHandler: this.getEnabledSelectionHandler,
            handleFocus: this.handleFocus,
            handleSelection: this.handleSelection,
            syncViewportPosition: this.syncViewportPosition,
        });
    }
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
    resizeRowsByApproximateHeight(getCellText, options) {
        const rowHeights = resizeRowsByApproximateHeight(this.props.numRows, this.state.columnWidths, getCellText, options);
        this.invalidateGrid();
        this.setState({ rowHeights });
    }
    /**
     * Resize all rows in the table to the height of the tallest visible cell in the specified columns.
     * If no indices are provided, default to using the tallest visible cell from all columns in view.
     */
    resizeRowsByTallestCell(columnIndices) {
        if (this.grid == null || this.state.viewportRect === undefined || this.locator === undefined) {
            console.warn(Errors.TABLE_UNMOUNTED_RESIZE_WARNING);
            return;
        }
        const rowHeights = resizeRowsByTallestCell(this.grid, this.state.viewportRect, this.locator, this.state.rowHeights.length, columnIndices);
        this.invalidateGrid();
        this.setState({ rowHeights });
    }
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
    scrollToRegion(region) {
        const { numFrozenColumnsClamped: numFrozenColumns, numFrozenRowsClamped: numFrozenRows, viewportRect, } = this.state;
        if (viewportRect === undefined || this.grid === null || this.quadrantStackInstance === undefined) {
            return;
        }
        const { left: currScrollLeft, top: currScrollTop } = viewportRect;
        const { scrollLeft, scrollTop } = ScrollUtils.getScrollPositionForRegion(region, currScrollLeft, currScrollTop, this.grid.getCumulativeWidthBefore, this.grid.getCumulativeHeightBefore, numFrozenRows, numFrozenColumns);
        const correctedScrollLeft = this.shouldDisableHorizontalScroll() ? 0 : scrollLeft;
        const correctedScrollTop = this.shouldDisableVerticalScroll() ? 0 : scrollTop;
        // defer to the quadrant stack to keep all quadrant positions in sync
        this.quadrantStackInstance.scrollToPosition(correctedScrollLeft, correctedScrollTop);
    }
    // React lifecycle
    // ===============
    getChildContext() {
        return {
            enableColumnInteractionBar: this.props.enableColumnInteractionBar,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        const propKeysDenylist = { exclude: Table_1.SHALLOW_COMPARE_PROP_KEYS_DENYLIST };
        const stateKeysDenylist = { exclude: Table_1.SHALLOW_COMPARE_STATE_KEYS_DENYLIST };
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, propKeysDenylist) ||
            !CoreUtils.shallowCompareKeys(this.state, nextState, stateKeysDenylist) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, Table_1.SHALLOW_COMPARE_PROP_KEYS_DENYLIST) ||
            !CoreUtils.deepCompareKeys(this.state, nextState, Table_1.SHALLOW_COMPARE_STATE_KEYS_DENYLIST));
    }
    render() {
        const { children, className, enableRowHeader, loadingOptions, numRows, enableColumnInteractionBar, enableColumnHeader, } = this.props;
        const { horizontalGuides, numFrozenColumnsClamped, numFrozenRowsClamped, verticalGuides } = this.state;
        if (!this.gridDimensionsMatchProps()) {
            // Ensure we're rendering the correct number of rows & columns
            this.invalidateGrid();
        }
        const grid = this.validateGrid();
        const classes = classNames(Classes.TABLE_CONTAINER, {
            [Classes.TABLE_REORDERING]: this.state.isReordering,
            [Classes.TABLE_NO_VERTICAL_SCROLL]: this.shouldDisableVerticalScroll(),
            [Classes.TABLE_NO_HORIZONTAL_SCROLL]: this.shouldDisableHorizontalScroll(),
            [Classes.TABLE_SELECTION_ENABLED]: Table_1.isSelectionModeEnabled(this.props, RegionCardinality.CELLS),
            [Classes.TABLE_NO_ROWS]: numRows === 0,
        }, className);
        return (React.createElement("div", { className: classes, ref: this.refHandlers.rootTable, onScroll: this.handleRootScroll },
            React.createElement(TableQuadrantStack, { bodyRef: this.refHandlers.cellContainer, bodyRenderer: this.renderBody, columnHeaderRenderer: this.renderColumnHeader, columnHeaderRef: this.refHandlers.columnHeader, enableColumnInteractionBar: enableColumnInteractionBar, enableRowHeader: enableRowHeader, grid: grid, handleColumnResizeGuide: this.handleColumnResizeGuide, handleColumnsReordering: this.handleColumnsReordering, handleRowResizeGuide: this.handleRowResizeGuide, handleRowsReordering: this.handleRowsReordering, isHorizontalScrollDisabled: this.shouldDisableHorizontalScroll(), isVerticalScrollDisabled: this.shouldDisableVerticalScroll(), loadingOptions: loadingOptions, numColumns: React.Children.count(children), numFrozenColumns: numFrozenColumnsClamped, numFrozenRows: numFrozenRowsClamped, numRows: numRows, onScroll: this.handleBodyScroll, ref: this.refHandlers.quadrantStack, menuRenderer: this.renderMenu, rowHeaderRenderer: this.renderRowHeader, rowHeaderRef: this.refHandlers.rowHeader, scrollContainerRef: this.refHandlers.scrollContainer, enableColumnHeader: enableColumnHeader }),
            React.createElement("div", { className: classNames(Classes.TABLE_OVERLAY_LAYER, Classes.TABLE_OVERLAY_REORDERING_CURSOR) }),
            React.createElement(GuideLayer, { className: Classes.TABLE_RESIZE_GUIDES, verticalGuides: verticalGuides, horizontalGuides: horizontalGuides })));
    }
    renderHotkeys() {
        const hotkeys = [
            this.maybeRenderCopyHotkey(),
            this.maybeRenderSelectAllHotkey(),
            this.maybeRenderFocusHotkeys(),
            this.maybeRenderSelectionResizeHotkeys(),
        ];
        return React.createElement(Hotkeys, null, hotkeys.filter(element => element !== undefined));
    }
    /**
     * When the component mounts, the HTML Element refs will be available, so
     * we constructor the Locator, which queries the elements' bounding
     * ClientRects.
     */
    componentDidMount() {
        this.validateGrid();
        if (this.rootTableElement != null && this.scrollContainerElement != null && this.cellContainerElement != null) {
            this.locator = new Locator(this.rootTableElement, this.scrollContainerElement, this.cellContainerElement);
            this.updateLocator();
            this.updateViewportRect(this.locator.getViewportRect());
            this.resizeSensorDetach = ResizeSensor.attach(this.rootTableElement, () => {
                if (!this.state.isLayoutLocked) {
                    this.updateViewportRect(this.locator?.getViewportRect());
                }
            });
        }
    }
    componentWillUnmount() {
        if (this.resizeSensorDetach != null) {
            this.resizeSensorDetach();
            delete this.resizeSensorDetach;
        }
        this.didCompletelyMount = false;
    }
    getSnapshotBeforeUpdate() {
        const { viewportRect } = this.state;
        if (viewportRect === undefined) {
            return {};
        }
        const grid = this.validateGrid();
        const tableBottom = grid.getCumulativeHeightAt(grid.numRows - 1);
        const tableRight = grid.getCumulativeWidthAt(grid.numCols - 1);
        const nextScrollTop = tableBottom < viewportRect.top + viewportRect.height
            ? // scroll the last row into view
                Math.max(0, tableBottom - viewportRect.height)
            : undefined;
        const nextScrollLeft = tableRight < viewportRect.left + viewportRect.width
            ? // scroll the last column into view
                Math.max(0, tableRight - viewportRect.width)
            : undefined;
        // these will only be defined if they differ from viewportRect
        return { nextScrollLeft, nextScrollTop };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        this.hotkeysImpl.setState(this.state);
        this.hotkeysImpl.setProps(this.props);
        const didChildrenChange = React.Children.toArray(this.props.children) !==
            this.state.childrenArray;
        const shouldInvalidateGrid = didChildrenChange ||
            this.props.columnWidths !== prevState.columnWidths ||
            this.props.rowHeights !== prevState.rowHeights ||
            this.props.numRows !== prevProps.numRows ||
            (this.props.forceRerenderOnSelectionChange && this.props.selectedRegions !== prevProps.selectedRegions);
        if (shouldInvalidateGrid) {
            this.invalidateGrid();
        }
        if (this.locator != null) {
            this.validateGrid();
            this.updateLocator();
        }
        // When true, we'll need to imperatively synchronize quadrant views after
        // the update. This check lets us avoid expensively diff'ing columnWidths
        // and rowHeights in <TableQuadrantStack> on each update.
        const didUpdateColumnOrRowSizes = !CoreUtils.arraysEqual(this.state.columnWidths, prevState.columnWidths) ||
            !CoreUtils.arraysEqual(this.state.rowHeights, prevState.rowHeights);
        if (didUpdateColumnOrRowSizes) {
            this.quadrantStackInstance?.synchronizeQuadrantViews();
            this.syncViewportPosition(snapshot);
        }
    }
    validateProps(props) {
        const { children, columnWidths, numFrozenColumns, numFrozenRows, numRows, rowHeights } = props;
        const numColumns = React.Children.count(children);
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
        React.Children.forEach(children, child => {
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
    }
    gridDimensionsMatchProps() {
        const { children, numRows } = this.props;
        return (this.grid != null && this.grid.numCols === React.Children.count(children) && this.grid.numRows === numRows);
    }
    // Hotkeys
    // =======
    maybeRenderCopyHotkey() {
        const { getCellClipboardData } = this.props;
        if (getCellClipboardData != null) {
            return (React.createElement(Hotkey, { key: "copy-hotkey", label: "Copy selected table cells", group: "Table", combo: "mod+c", onKeyDown: this.hotkeysImpl.handleCopy }));
        }
        else {
            return undefined;
        }
    }
    maybeRenderSelectionResizeHotkeys() {
        const { enableMultipleSelection, selectionModes } = this.props;
        const isSomeSelectionModeEnabled = selectionModes.length > 0;
        if (enableMultipleSelection && isSomeSelectionModeEnabled) {
            return [
                React.createElement(Hotkey, { key: "resize-selection-up", label: "Resize selection upward", group: "Table", combo: "shift+up", onKeyDown: this.hotkeysImpl.handleSelectionResizeUp }),
                React.createElement(Hotkey, { key: "resize-selection-down", label: "Resize selection downward", group: "Table", combo: "shift+down", onKeyDown: this.hotkeysImpl.handleSelectionResizeDown }),
                React.createElement(Hotkey, { key: "resize-selection-left", label: "Resize selection leftward", group: "Table", combo: "shift+left", onKeyDown: this.hotkeysImpl.handleSelectionResizeLeft }),
                React.createElement(Hotkey, { key: "resize-selection-right", label: "Resize selection rightward", group: "Table", combo: "shift+right", onKeyDown: this.hotkeysImpl.handleSelectionResizeRight }),
            ];
        }
        else {
            return undefined;
        }
    }
    maybeRenderFocusHotkeys() {
        const { enableFocusedCell } = this.props;
        if (enableFocusedCell != null) {
            return [
                React.createElement(Hotkey, { key: "move left", label: "Move focus cell left", group: "Table", combo: "left", onKeyDown: this.hotkeysImpl.handleFocusMoveLeft }),
                React.createElement(Hotkey, { key: "move right", label: "Move focus cell right", group: "Table", combo: "right", onKeyDown: this.hotkeysImpl.handleFocusMoveRight }),
                React.createElement(Hotkey, { key: "move up", label: "Move focus cell up", group: "Table", combo: "up", onKeyDown: this.hotkeysImpl.handleFocusMoveUp }),
                React.createElement(Hotkey, { key: "move down", label: "Move focus cell down", group: "Table", combo: "down", onKeyDown: this.hotkeysImpl.handleFocusMoveDown }),
                React.createElement(Hotkey, { key: "move tab", label: "Move focus cell tab", group: "Table", combo: "tab", onKeyDown: this.hotkeysImpl.handleFocusMoveRightInternal, allowInInput: true }),
                React.createElement(Hotkey, { key: "move shift-tab", label: "Move focus cell shift tab", group: "Table", combo: "shift+tab", onKeyDown: this.hotkeysImpl.handleFocusMoveLeftInternal, allowInInput: true }),
                React.createElement(Hotkey, { key: "move enter", label: "Move focus cell enter", group: "Table", combo: "enter", onKeyDown: this.hotkeysImpl.handleFocusMoveDownInternal, allowInInput: true }),
                React.createElement(Hotkey, { key: "move shift-enter", label: "Move focus cell shift enter", group: "Table", combo: "shift+enter", onKeyDown: this.hotkeysImpl.handleFocusMoveUpInternal, allowInInput: true }),
            ];
        }
        else {
            return [];
        }
    }
    maybeRenderSelectAllHotkey() {
        if (Table_1.isSelectionModeEnabled(this.props, RegionCardinality.FULL_TABLE)) {
            return (React.createElement(Hotkey, { key: "select-all-hotkey", label: "Select all", group: "Table", combo: "mod+a", onKeyDown: this.hotkeysImpl.handleSelectAllHotkey }));
        }
        else {
            return undefined;
        }
    }
    // Quadrant refs
    // =============
    shouldDisableVerticalScroll() {
        const { enableColumnHeader, enableGhostCells } = this.props;
        const { viewportRect } = this.state;
        if (this.grid === null || viewportRect === undefined) {
            return false;
        }
        const columnHeaderHeight = enableColumnHeader
            ? this.columnHeaderElement?.clientHeight ?? Grid.MIN_COLUMN_HEADER_HEIGHT
            : 0;
        const rowIndices = this.grid.getRowIndicesInRect({
            columnHeaderHeight,
            includeGhostCells: enableGhostCells,
            rect: viewportRect,
        });
        const isViewportUnscrolledVertically = viewportRect != null && viewportRect.top === 0;
        const areRowHeadersLoading = hasLoadingOption(this.props.loadingOptions, TableLoadingOption.ROW_HEADERS);
        const areGhostRowsVisible = enableGhostCells && this.grid.isGhostIndex(rowIndices.rowIndexEnd, 0);
        return areGhostRowsVisible && (isViewportUnscrolledVertically || areRowHeadersLoading);
    }
    shouldDisableHorizontalScroll() {
        const { enableGhostCells } = this.props;
        const { viewportRect } = this.state;
        if (this.grid === null || viewportRect === undefined) {
            return false;
        }
        const columnIndices = this.grid.getColumnIndicesInRect(viewportRect, enableGhostCells);
        const isViewportUnscrolledHorizontally = viewportRect != null && viewportRect.left === 0;
        const areGhostColumnsVisible = enableGhostCells && this.grid.isGhostColumn(columnIndices.columnIndexEnd);
        const areColumnHeadersLoading = hasLoadingOption(this.props.loadingOptions, TableLoadingOption.COLUMN_HEADERS);
        return areGhostColumnsVisible && (isViewportUnscrolledHorizontally || areColumnHeadersLoading);
    }
    renderMenu = (refHandler) => {
        const classes = classNames(Classes.TABLE_MENU, {
            [Classes.TABLE_SELECTION_ENABLED]: Table_1.isSelectionModeEnabled(this.props, RegionCardinality.FULL_TABLE),
        });
        return (React.createElement("div", { className: classes, ref: refHandler, onMouseDown: this.handleMenuMouseDown }, this.maybeRenderRegions(this.styleMenuRegion)));
    };
    handleMenuMouseDown = (e) => {
        // the shift+click interaction expands the region from the focused cell.
        // thus, if shift is pressed we shouldn't move the focused cell.
        this.selectAll(!e.shiftKey);
    };
    selectAll = (shouldUpdateFocusedCell) => {
        const selectionHandler = this.getEnabledSelectionHandler(RegionCardinality.FULL_TABLE);
        // clicking on upper left hand corner sets selection to "all"
        // regardless of current selection state (clicking twice does not deselect table)
        selectionHandler([Regions.table()]);
        if (shouldUpdateFocusedCell) {
            const newFocusedCellCoordinates = Regions.getFocusCellCoordinatesFromRegion(Regions.table());
            this.handleFocus(FocusedCellUtils.toFullCoordinates(newFocusedCellCoordinates));
        }
    };
    getColumnProps(columnIndex) {
        const column = this.state.childrenArray[columnIndex];
        return column === undefined ? undefined : column.props;
    }
    columnHeaderCellRenderer = (columnIndex) => {
        const columnProps = this.getColumnProps(columnIndex);
        if (columnProps === undefined) {
            return null;
        }
        const { id, cellRenderer, columnHeaderCellRenderer, ...spreadableProps } = columnProps;
        const columnLoading = hasLoadingOption(columnProps.loadingOptions, ColumnLoadingOption.HEADER) ||
            hasLoadingOption(this.props.loadingOptions, TableLoadingOption.COLUMN_HEADERS);
        if (columnHeaderCellRenderer != null) {
            const columnHeaderCell = columnHeaderCellRenderer(columnIndex);
            if (columnHeaderCell != null) {
                return React.cloneElement(columnHeaderCell, {
                    loading: columnHeaderCell.props.loading ?? columnLoading,
                });
            }
        }
        const baseProps = {
            index: columnIndex,
            loading: columnLoading,
            ...spreadableProps,
        };
        if (columnProps.name != null) {
            return React.createElement(ColumnHeaderCell, { ...baseProps });
        }
        else {
            return React.createElement(ColumnHeaderCell, { ...baseProps, name: Utils.toBase26Alpha(columnIndex) });
        }
    };
    renderColumnHeader = (refHandler, resizeHandler, reorderingHandler, showFrozenColumnsOnly = false) => {
        const { focusedCell, selectedRegions, viewportRect } = this.state;
        const { defaultColumnWidth, enableMultipleSelection, enableGhostCells, enableColumnReordering, enableColumnResizing, loadingOptions, maxColumnWidth, minColumnWidth, selectedRegionTransform, } = this.props;
        if (this.grid === null || this.locator === undefined || viewportRect === undefined) {
            return undefined;
        }
        const classes = classNames(Classes.TABLE_COLUMN_HEADERS, {
            [Classes.TABLE_SELECTION_ENABLED]: Table_1.isSelectionModeEnabled(this.props, RegionCardinality.FULL_COLUMNS),
        });
        const columnIndices = this.grid.getColumnIndicesInRect(viewportRect, enableGhostCells);
        const columnIndexStart = showFrozenColumnsOnly ? 0 : columnIndices.columnIndexStart;
        const columnIndexEnd = showFrozenColumnsOnly ? this.getMaxFrozenColumnIndex() : columnIndices.columnIndexEnd;
        return (React.createElement("div", { className: classes },
            React.createElement(ColumnHeader, { defaultColumnWidth: defaultColumnWidth, enableMultipleSelection: enableMultipleSelection, cellRenderer: this.columnHeaderCellRenderer, focusedCell: focusedCell, grid: this.grid, isReorderable: enableColumnReordering, isResizable: enableColumnResizing, loading: hasLoadingOption(loadingOptions, TableLoadingOption.COLUMN_HEADERS), locator: this.locator, maxColumnWidth: maxColumnWidth, measurableElementRef: refHandler, minColumnWidth: minColumnWidth, onColumnWidthChanged: this.handleColumnWidthChanged, onFocusedCell: this.handleFocus, onLayoutLock: this.handleLayoutLock, onReordered: this.handleColumnsReordered, onReordering: reorderingHandler, onResizeGuide: resizeHandler, onSelection: this.getEnabledSelectionHandler(RegionCardinality.FULL_COLUMNS), selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, columnIndexStart: columnIndexStart, columnIndexEnd: columnIndexEnd }, this.props.children),
            this.maybeRenderRegions(this.styleColumnHeaderRegion)));
    };
    renderRowHeader = (refHandler, resizeHandler, reorderingHandler, showFrozenRowsOnly = false) => {
        const { focusedCell, selectedRegions, viewportRect } = this.state;
        const { defaultRowHeight, enableMultipleSelection, enableGhostCells, enableRowReordering, enableRowResizing, loadingOptions, maxRowHeight, minRowHeight, rowHeaderCellRenderer, selectedRegionTransform, } = this.props;
        if (this.grid === null || this.locator === undefined || viewportRect === undefined) {
            return undefined;
        }
        const classes = classNames(Classes.TABLE_ROW_HEADERS, {
            [Classes.TABLE_SELECTION_ENABLED]: Table_1.isSelectionModeEnabled(this.props, RegionCardinality.FULL_ROWS),
        });
        const rowIndices = this.grid.getRowIndicesInRect({ rect: viewportRect, includeGhostCells: enableGhostCells });
        const rowIndexStart = showFrozenRowsOnly ? 0 : rowIndices.rowIndexStart;
        const rowIndexEnd = showFrozenRowsOnly ? this.getMaxFrozenRowIndex() : rowIndices.rowIndexEnd;
        return (React.createElement("div", { className: classes, ref: refHandler },
            React.createElement(RowHeader, { defaultRowHeight: defaultRowHeight, enableMultipleSelection: enableMultipleSelection, focusedCell: focusedCell, grid: this.grid, locator: this.locator, isReorderable: enableRowReordering, isResizable: enableRowResizing, loading: hasLoadingOption(loadingOptions, TableLoadingOption.ROW_HEADERS), maxRowHeight: maxRowHeight, minRowHeight: minRowHeight, onFocusedCell: this.handleFocus, onLayoutLock: this.handleLayoutLock, onResizeGuide: resizeHandler, onReordered: this.handleRowsReordered, onReordering: reorderingHandler, onRowHeightChanged: this.handleRowHeightChanged, onSelection: this.getEnabledSelectionHandler(RegionCardinality.FULL_ROWS), rowHeaderCellRenderer: rowHeaderCellRenderer, selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, rowIndexStart: rowIndexStart, rowIndexEnd: rowIndexEnd }),
            this.maybeRenderRegions(this.styleRowHeaderRegion)));
    };
    bodyCellRenderer = (rowIndex, columnIndex) => {
        const columnProps = this.getColumnProps(columnIndex);
        if (columnProps === undefined) {
            return undefined;
        }
        const { id, loadingOptions, cellRenderer, columnHeaderCellRenderer, name, nameRenderer, ...restColumnProps } = columnProps;
        // HACKHACK: cellRenderer prop has a default value, so we can assert non-null
        const cell = cellRenderer(rowIndex, columnIndex);
        if (cell === undefined) {
            return undefined;
        }
        const inheritedIsLoading = hasLoadingOption(columnProps.loadingOptions, ColumnLoadingOption.CELLS) ||
            hasLoadingOption(this.props.loadingOptions, TableLoadingOption.CELLS);
        return React.cloneElement(cell, {
            ...restColumnProps,
            loading: cell.props.loading ?? inheritedIsLoading,
        });
    };
    renderBody = (quadrantType, showFrozenRowsOnly = false, showFrozenColumnsOnly = false) => {
        const { focusedCell, numFrozenColumnsClamped: numFrozenColumns, numFrozenRowsClamped: numFrozenRows, selectedRegions, viewportRect, } = this.state;
        const { enableMultipleSelection, enableGhostCells, loadingOptions, bodyContextMenuRenderer, selectedRegionTransform, } = this.props;
        if (this.grid === null || this.locator === undefined || viewportRect === undefined) {
            return undefined;
        }
        const rowIndices = this.grid.getRowIndicesInRect({ rect: viewportRect, includeGhostCells: enableGhostCells });
        const columnIndices = this.grid.getColumnIndicesInRect(viewportRect, enableGhostCells);
        // start beyond the frozen area if rendering unrelated quadrants, so we
        // don't render duplicate cells underneath the frozen ones.
        const columnIndexStart = showFrozenColumnsOnly ? 0 : columnIndices.columnIndexStart + numFrozenColumns;
        const rowIndexStart = showFrozenRowsOnly ? 0 : rowIndices.rowIndexStart + numFrozenRows;
        // if rendering frozen rows/columns, subtract one to convert to
        // 0-indexing. if the 1-indexed value is 0, this sets the end index
        // to -1, which avoids rendering absent frozen rows/columns at all.
        const columnIndexEnd = showFrozenColumnsOnly ? numFrozenColumns - 1 : columnIndices.columnIndexEnd;
        const rowIndexEnd = showFrozenRowsOnly ? numFrozenRows - 1 : rowIndices.rowIndexEnd;
        // the main quadrant contains all cells in the table, so listen only to that quadrant
        const onCompleteRender = quadrantType === QuadrantType.MAIN ? this.handleCompleteRender : undefined;
        return (React.createElement("div", null,
            React.createElement(TableBody, { enableMultipleSelection: enableMultipleSelection, cellRenderer: this.bodyCellRenderer, focusedCell: focusedCell, grid: this.grid, loading: hasLoadingOption(loadingOptions, TableLoadingOption.CELLS), locator: this.locator, onCompleteRender: onCompleteRender, onFocusedCell: this.handleFocus, onSelection: this.getEnabledSelectionHandler(RegionCardinality.CELLS), bodyContextMenuRenderer: bodyContextMenuRenderer, renderMode: this.getNormalizedRenderMode(), selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, viewportRect: viewportRect, columnIndexStart: columnIndexStart, columnIndexEnd: columnIndexEnd, rowIndexStart: rowIndexStart, rowIndexEnd: rowIndexEnd, numFrozenColumns: showFrozenColumnsOnly ? numFrozenColumns : undefined, numFrozenRows: showFrozenRowsOnly ? numFrozenRows : undefined }),
            this.maybeRenderRegions(this.styleBodyRegion, quadrantType)));
    };
    isGuideLayerShowing() {
        return this.state.verticalGuides.length > 0 || this.state.horizontalGuides.length > 0;
    }
    getEnabledSelectionHandler = (selectionMode) => {
        if (!Table_1.isSelectionModeEnabled(this.props, selectionMode)) {
            // If the selection mode isn't enabled, return a callback that
            // will clear the selection. For example, if row selection is
            // disabled, clicking on the row header will clear the table's
            // selection. If all selection modes are enabled, clicking on the
            // same region twice will clear the selection.
            return this.clearSelection;
        }
        else {
            return this.handleSelection;
        }
    };
    invalidateGrid() {
        this.grid = null;
    }
    validateGrid() {
        if (this.grid == null) {
            const { defaultRowHeight, defaultColumnWidth, numFrozenColumns } = this.props;
            const { rowHeights, columnWidths } = this.state;
            // gridBleed should always be >= numFrozenColumns since columnIndexStart adds numFrozenColumns
            const gridBleed = Math.max(Grid.DEFAULT_BLEED, numFrozenColumns);
            this.grid = new Grid(rowHeights, columnWidths, gridBleed, defaultRowHeight, defaultColumnWidth);
            this.invokeOnVisibleCellsChangeCallback(this.state.viewportRect);
            this.hotkeysImpl.setGrid(this.grid);
        }
        return this.grid;
    }
    /**
     * Renders a `RegionLayer`, applying styles to the regions using the
     * supplied `RegionStyler`. `RegionLayer` is a `PureRender` component, so
     * the `RegionStyler` should be a new instance on every render if we
     * intend to redraw the region layer.
     */
    maybeRenderRegions(getRegionStyle, quadrantType) {
        if (this.isGuideLayerShowing() && !this.state.isReordering) {
            // we want to show guides *and* the selection styles when reordering rows or columns
            return undefined;
        }
        const regionGroups = Regions.joinStyledRegionGroups(this.state.selectedRegions, this.props.styledRegionGroups ?? [], this.state.focusedCell);
        return regionGroups.map((regionGroup, index) => {
            const regionStyles = regionGroup.regions.map(region => getRegionStyle(region, quadrantType));
            return (React.createElement(RegionLayer, { className: classNames(regionGroup.className), key: index, regions: regionGroup.regions, regionStyles: regionStyles }));
        });
    }
    handleCompleteRender = () => {
        // the first onCompleteRender is triggered before the viewportRect is
        // defined and the second after the viewportRect has been set. the cells
        // will only actually render once the viewportRect is defined though, so
        // we defer invoking onCompleteRender until that check passes.
        if (this.state.viewportRect != null) {
            this.props.onCompleteRender?.();
            this.didCompletelyMount = true;
        }
    };
    styleBodyRegion = (region, quadrantType) => {
        const { numFrozenColumns } = this.props;
        if (this.grid == null) {
            return {};
        }
        const cardinality = Regions.getRegionCardinality(region);
        const style = this.grid.getRegionStyle(region);
        // ensure we're not showing borders at the boundary of the frozen-columns area
        const canHideRightBorder = (quadrantType === QuadrantType.TOP_LEFT || quadrantType === QuadrantType.LEFT) &&
            numFrozenColumns != null &&
            numFrozenColumns > 0;
        const fixedHeight = this.grid.getHeight();
        const fixedWidth = this.grid.getWidth();
        // include a correction in some cases to hide borders along quadrant boundaries
        const alignmentCorrection = 1;
        const alignmentCorrectionString = `-${alignmentCorrection}px`;
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
    styleMenuRegion = (region) => {
        const { viewportRect } = this.state;
        if (this.grid == null || viewportRect == null) {
            return {};
        }
        const cardinality = Regions.getRegionCardinality(region);
        const style = this.grid.getRegionStyle(region);
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
    styleColumnHeaderRegion = (region) => {
        const { viewportRect } = this.state;
        if (this.grid == null || viewportRect == null) {
            return {};
        }
        const cardinality = Regions.getRegionCardinality(region);
        const style = this.grid.getRegionStyle(region);
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
    styleRowHeaderRegion = (region) => {
        const { viewportRect } = this.state;
        if (this.grid == null || viewportRect == null) {
            return {};
        }
        const cardinality = Regions.getRegionCardinality(region);
        const style = this.grid.getRegionStyle(region);
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
    handleColumnWidthChanged = (columnIndex, width) => {
        const selectedRegions = this.state.selectedRegions;
        const columnWidths = this.state.columnWidths.slice();
        if (Regions.hasFullTable(selectedRegions)) {
            for (let col = 0; col < columnWidths.length; col++) {
                columnWidths[col] = width;
            }
        }
        if (Regions.hasFullColumn(selectedRegions, columnIndex)) {
            Regions.eachUniqueFullColumn(selectedRegions, (col) => {
                columnWidths[col] = width;
            });
        }
        else {
            columnWidths[columnIndex] = width;
        }
        this.invalidateGrid();
        this.setState({ columnWidths });
        const { onColumnWidthChanged } = this.props;
        if (onColumnWidthChanged != null) {
            onColumnWidthChanged(columnIndex, width);
        }
    };
    handleRowHeightChanged = (rowIndex, height) => {
        const selectedRegions = this.state.selectedRegions;
        const rowHeights = this.state.rowHeights.slice();
        if (Regions.hasFullTable(selectedRegions)) {
            for (let row = 0; row < rowHeights.length; row++) {
                rowHeights[row] = height;
            }
        }
        if (Regions.hasFullRow(selectedRegions, rowIndex)) {
            Regions.eachUniqueFullRow(selectedRegions, (row) => {
                rowHeights[row] = height;
            });
        }
        else {
            rowHeights[rowIndex] = height;
        }
        this.invalidateGrid();
        this.setState({ rowHeights });
        const { onRowHeightChanged } = this.props;
        if (onRowHeightChanged != null) {
            onRowHeightChanged(rowIndex, height);
        }
    };
    handleRootScroll = (_event) => {
        // Bug #211 - Native browser text selection events can cause the root
        // element to scroll even though it has a overflow:hidden style. The
        // only viable solution to this is to unscroll the element after the
        // browser scrolls it.
        if (this.rootTableElement != null) {
            this.rootTableElement.scrollLeft = 0;
            this.rootTableElement.scrollTop = 0;
        }
    };
    handleBodyScroll = (event) => {
        // Prevent the event from propagating to avoid a resize event on the
        // resize sensor.
        event.stopPropagation();
        if (this.locator != null && !this.state.isLayoutLocked) {
            const viewportRect = this.locator.getViewportRect();
            this.updateViewportRect(viewportRect);
        }
    };
    clearSelection = (_selectedRegions) => {
        this.handleSelection([]);
    };
    syncViewportPosition = ({ nextScrollLeft, nextScrollTop }) => {
        const { viewportRect } = this.state;
        if (this.scrollContainerElement == null || this.columnHeaderElement == null || viewportRect === undefined) {
            return;
        }
        if (nextScrollLeft !== undefined || nextScrollTop !== undefined) {
            // we need to modify the scroll container explicitly for the viewport to shift. in so
            // doing, we add the size of the header elements, which are not technically part of the
            // "grid" concept (the grid only consists of body cells at present).
            if (nextScrollTop !== undefined) {
                const topCorrection = this.shouldDisableVerticalScroll() ? 0 : this.columnHeaderElement.clientHeight;
                this.scrollContainerElement.scrollTop = nextScrollTop + topCorrection;
            }
            if (nextScrollLeft !== undefined) {
                const leftCorrection = this.shouldDisableHorizontalScroll() || this.rowHeaderElement == null
                    ? 0
                    : this.rowHeaderElement.clientWidth;
                this.scrollContainerElement.scrollLeft = nextScrollLeft + leftCorrection;
            }
            const nextViewportRect = new Rect(nextScrollLeft ?? 0, nextScrollTop ?? 0, viewportRect.width, viewportRect.height);
            this.updateViewportRect(nextViewportRect);
        }
    };
    handleFocus = (focusedCell) => {
        if (!this.props.enableFocusedCell) {
            // don't set focus state if focus is not allowed
            return;
        }
        // only set focused cell state if not specified in props
        if (this.props.focusedCell == null) {
            this.setState({ focusedCell });
        }
        this.props.onFocusedCell?.(focusedCell);
    };
    handleSelection = (selectedRegions) => {
        // only set selectedRegions state if not specified in props
        if (this.props.selectedRegions == null) {
            this.setState({ selectedRegions });
        }
        const { onSelection } = this.props;
        if (onSelection != null) {
            onSelection(selectedRegions);
        }
    };
    handleColumnsReordering = (verticalGuides) => {
        this.setState({ isReordering: true, verticalGuides });
    };
    handleColumnsReordered = (oldIndex, newIndex, length) => {
        this.setState({ isReordering: false, verticalGuides: [] });
        this.props.onColumnsReordered?.(oldIndex, newIndex, length);
    };
    handleRowsReordering = (horizontalGuides) => {
        this.setState({ isReordering: true, horizontalGuides });
    };
    handleRowsReordered = (oldIndex, newIndex, length) => {
        this.setState({ isReordering: false, horizontalGuides: [] });
        this.props.onRowsReordered?.(oldIndex, newIndex, length);
    };
    handleLayoutLock = (isLayoutLocked = false) => {
        this.setState({ isLayoutLocked });
    };
    updateLocator() {
        if (this.locator === undefined || this.grid == null) {
            return;
        }
        this.locator
            .setGrid(this.grid)
            .setNumFrozenRows(this.state.numFrozenRowsClamped)
            .setNumFrozenColumns(this.state.numFrozenColumnsClamped);
    }
    updateViewportRect = (nextViewportRect) => {
        if (nextViewportRect === undefined) {
            return;
        }
        const { viewportRect } = this.state;
        this.setState({ viewportRect: nextViewportRect });
        const didViewportChange = (viewportRect != null && !viewportRect.equals(nextViewportRect)) ||
            (viewportRect == null && nextViewportRect != null);
        if (didViewportChange) {
            this.invokeOnVisibleCellsChangeCallback(nextViewportRect);
        }
    };
    invokeOnVisibleCellsChangeCallback(viewportRect) {
        if (this.grid == null) {
            return;
        }
        const columnIndices = this.grid.getColumnIndicesInRect(viewportRect);
        const rowIndices = this.grid.getRowIndicesInRect({ rect: viewportRect });
        this.props.onVisibleCellsChange?.(rowIndices, columnIndices);
    }
    getMaxFrozenColumnIndex = () => {
        return this.state.numFrozenColumnsClamped - 1;
    };
    getMaxFrozenRowIndex = () => {
        return this.state.numFrozenRowsClamped - 1;
    };
    /**
     * Normalizes RenderMode.BATCH_ON_UPDATE into RenderMode.{BATCH,NONE}. We do
     * this because there are actually multiple updates required before the
     * <Table> is considered fully "mounted," and adding that knowledge to child
     * components would lead to tight coupling. Thus, keep it simple for them.
     */
    getNormalizedRenderMode() {
        const { renderMode } = this.props;
        const shouldBatchRender = renderMode === RenderMode.BATCH || (renderMode === RenderMode.BATCH_ON_UPDATE && this.didCompletelyMount);
        return shouldBatchRender ? RenderMode.BATCH : RenderMode.NONE;
    }
    handleColumnResizeGuide = (verticalGuides) => {
        this.setState({ verticalGuides });
    };
    handleRowResizeGuide = (horizontalGuides) => {
        this.setState({ horizontalGuides });
    };
};
Table = Table_1 = __decorate([
    HotkeysTarget
], Table);
export { Table };
//# sourceMappingURL=table.js.map