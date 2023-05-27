"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableQuadrantStack = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("../common/classes"));
var grid_1 = require("../common/grid");
var ScrollUtils = tslib_1.__importStar(require("../common/internal/scrollUtils"));
var utils_1 = require("../common/utils");
var tableQuadrant_1 = require("./tableQuadrant");
var tableQuadrantStackCache_1 = require("./tableQuadrantStackCache");
// the debounce delay for updating the view on scroll. elements will be resized
// and rejiggered once scroll has ceased for at least this long, but not before.
var DEFAULT_VIEW_SYNC_DELAY = 500;
// if there are no frozen rows or columns, we still want the quadrant to be 1px
// bigger to reveal the header border. this border leaks into the cell grid to
// ensure that selection overlay borders (e.g.) will be perfectly flush with it.
var QUADRANT_MIN_SIZE = 1;
// a list of props that trigger layout changes. when these props change,
// quadrant views need to be explicitly resynchronized.
var SYNC_TRIGGER_PROP_KEYS = [
    "enableRowHeader",
    "loadingOptions",
    "numFrozenColumns",
    "numFrozenRows",
    "numColumns",
    "numRows",
    "enableColumnInteractionBar",
    "didHeadersMount",
    "enableColumnHeader",
];
var TableQuadrantStack = /** @class */ (function (_super) {
    tslib_1.__extends(TableQuadrantStack, _super);
    // Public
    // ======
    function TableQuadrantStack(props, context) {
        var _a, _b;
        var _this = _super.call(this, props, context) || this;
        // Instance variables
        // ==================
        _this.quadrantRefs = (_a = {},
            _a[tableQuadrant_1.QuadrantType.MAIN] = {},
            _a[tableQuadrant_1.QuadrantType.TOP] = {},
            _a[tableQuadrant_1.QuadrantType.LEFT] = {},
            _a[tableQuadrant_1.QuadrantType.TOP_LEFT] = {},
            _a);
        _this.quadrantRefHandlers = (_b = {},
            _b[tableQuadrant_1.QuadrantType.MAIN] = _this.generateQuadrantRefHandlers(tableQuadrant_1.QuadrantType.MAIN),
            _b[tableQuadrant_1.QuadrantType.TOP] = _this.generateQuadrantRefHandlers(tableQuadrant_1.QuadrantType.TOP),
            _b[tableQuadrant_1.QuadrantType.LEFT] = _this.generateQuadrantRefHandlers(tableQuadrant_1.QuadrantType.LEFT),
            _b[tableQuadrant_1.QuadrantType.TOP_LEFT] = _this.generateQuadrantRefHandlers(tableQuadrant_1.QuadrantType.TOP_LEFT),
            _b);
        // this flag helps us avoid redundant work in the MAIN quadrant's onScroll callback, if the
        // callback was triggered from a manual scrollTop/scrollLeft update within an onWheel.
        _this.wasMainQuadrantScrollTriggeredByWheelEvent = false;
        // Scrolling overlay renderer
        // ===========================
        _this.renderTableOverlay = function () {
            var _a, _b;
            var columnHeaderHeight = _this.cache.getColumnHeaderHeight();
            var mainScrollContainer = _this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].scrollContainer;
            var scrollBarWidth = ScrollUtils.measureScrollBarThickness(mainScrollContainer, "vertical");
            return (_b = (_a = _this.props).renderScrollIndicatorOverlay) === null || _b === void 0 ? void 0 : _b.call(_a, scrollBarWidth, columnHeaderHeight);
        };
        // Quadrant-specific renderers
        // ===========================
        // Menu
        _this.renderMainQuadrantMenu = function () {
            var _a, _b;
            return (_b = (_a = _this.props).menuRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.MAIN].menu);
        };
        _this.renderTopQuadrantMenu = function () {
            var _a, _b;
            return (_b = (_a = _this.props).menuRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP].menu);
        };
        _this.renderLeftQuadrantMenu = function () {
            var _a, _b;
            return (_b = (_a = _this.props).menuRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.LEFT].menu);
        };
        _this.renderTopLeftQuadrantMenu = function () {
            var _a, _b;
            return (_b = (_a = _this.props).menuRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP_LEFT].menu);
        };
        // Column header
        _this.renderMainQuadrantColumnHeader = function (showFrozenColumnsOnly) {
            var _a, _b;
            var refHandler = _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.MAIN].columnHeader;
            var resizeHandler = _this.handleColumnResizeGuideMain;
            var reorderingHandler = _this.handleColumnsReordering;
            if (refHandler === undefined) {
                return undefined;
            }
            return (_b = (_a = _this.props).columnHeaderRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, refHandler, resizeHandler, reorderingHandler, showFrozenColumnsOnly);
        };
        _this.renderTopQuadrantColumnHeader = function (showFrozenColumnsOnly) {
            var _a, _b;
            var refHandler = _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP].columnHeader;
            var resizeHandler = _this.handleColumnResizeGuideTop;
            var reorderingHandler = _this.handleColumnsReordering;
            if (refHandler === undefined) {
                return undefined;
            }
            return (_b = (_a = _this.props).columnHeaderRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, refHandler, resizeHandler, reorderingHandler, showFrozenColumnsOnly);
        };
        _this.renderLeftQuadrantColumnHeader = function (showFrozenColumnsOnly) {
            var _a, _b;
            var refHandler = _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.LEFT].columnHeader;
            var resizeHandler = _this.handleColumnResizeGuideLeft;
            var reorderingHandler = _this.handleColumnsReordering;
            if (refHandler === undefined) {
                return undefined;
            }
            return (_b = (_a = _this.props).columnHeaderRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, refHandler, resizeHandler, reorderingHandler, showFrozenColumnsOnly);
        };
        _this.renderTopLeftQuadrantColumnHeader = function (showFrozenColumnsOnly) {
            var _a, _b;
            var refHandler = _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP_LEFT].columnHeader;
            var resizeHandler = _this.handleColumnResizeGuideTopLeft;
            var reorderingHandler = _this.handleColumnsReordering;
            if (refHandler === undefined) {
                return undefined;
            }
            return (_b = (_a = _this.props).columnHeaderRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, refHandler, resizeHandler, reorderingHandler, showFrozenColumnsOnly);
        };
        // Row header
        _this.renderMainQuadrantRowHeader = function (showFrozenRowsOnly) {
            var _a, _b;
            var refHandler = _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.MAIN].rowHeader;
            if (refHandler === undefined) {
                return undefined;
            }
            return (_b = (_a = _this.props).rowHeaderRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, refHandler, _this.handleRowResizeGuideMain, _this.handleRowsReordering, showFrozenRowsOnly);
        };
        _this.renderTopQuadrantRowHeader = function (showFrozenRowsOnly) {
            var _a, _b;
            var refHandler = _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP].rowHeader;
            if (refHandler === undefined) {
                return undefined;
            }
            return (_b = (_a = _this.props).rowHeaderRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, refHandler, _this.handleRowResizeGuideTop, _this.handleRowsReordering, showFrozenRowsOnly);
        };
        _this.renderLeftQuadrantRowHeader = function (showFrozenRowsOnly) {
            var _a, _b;
            var refHandler = _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.LEFT].rowHeader;
            if (refHandler === undefined) {
                return undefined;
            }
            return (_b = (_a = _this.props).rowHeaderRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, refHandler, _this.handleRowResizeGuideLeft, _this.handleRowsReordering, showFrozenRowsOnly);
        };
        _this.renderTopLeftQuadrantRowHeader = function (showFrozenRowsOnly) {
            var _a, _b;
            var refHandler = _this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP_LEFT].rowHeader;
            if (refHandler === undefined) {
                return undefined;
            }
            return (_b = (_a = _this.props).rowHeaderRenderer) === null || _b === void 0 ? void 0 : _b.call(_a, refHandler, _this.handleRowResizeGuideTopLeft, _this.handleRowsReordering, showFrozenRowsOnly);
        };
        // Event handlers
        // ==============
        // Scrolling
        // ---------
        _this.handleMainQuadrantScroll = function (event) {
            var _a, _b;
            if (_this.wasMainQuadrantScrollTriggeredByWheelEvent) {
                _this.wasMainQuadrantScrollTriggeredByWheelEvent = false;
                return;
            }
            var mainScrollContainer = _this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].scrollContainer;
            if (mainScrollContainer == null) {
                return;
            }
            // invoke onScroll - which may read current scroll position - before
            // forcing a reflow with upcoming .scroll{Top,Left} setters.
            (_b = (_a = _this.props).onScroll) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            // batch DOM reads here. note that onScroll events don't include deltas
            // like onWheel events do, so we have to read from the DOM directly.
            var nextScrollLeft = mainScrollContainer.scrollLeft;
            var nextScrollTop = mainScrollContainer.scrollTop;
            // with the "scroll" event, scroll offsets are updated prior to the
            // event's firing, so no explicit update needed.
            _this.handleScrollOffsetChange("scrollLeft", nextScrollLeft);
            _this.handleScrollOffsetChange("scrollTop", nextScrollTop);
            // sync less important view stuff when scrolling/wheeling stops.
            _this.syncQuadrantViewsDebounced();
        };
        _this.handleWheel = function (event) {
            var _a, _b;
            // again, let the listener read the current scroll position before we
            // force a reflow by resizing or repositioning stuff.
            (_b = (_a = _this.props).onScroll) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            // this helper performs DOM reads, so do them together before the writes below.
            var nextScrollLeft = _this.getNextScrollOffset("horizontal", event.deltaX);
            var nextScrollTop = _this.getNextScrollOffset("vertical", event.deltaY);
            // update this flag before updating the main quadrant scroll offsets,
            // since we need this set before onScroll fires.
            if (nextScrollLeft != null || nextScrollTop != null) {
                _this.wasMainQuadrantScrollTriggeredByWheelEvent = true;
            }
            // manually update the affected quadrant's scroll position to make sure
            // it stays perfectly in sync with dependent quadrants in each frame.
            // note: these DOM writes are batched together after the reads above.
            if (nextScrollLeft !== undefined) {
                _this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].scrollContainer.scrollLeft = nextScrollLeft;
                _this.handleScrollOffsetChange("scrollLeft", nextScrollLeft);
            }
            if (nextScrollTop !== undefined) {
                _this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].scrollContainer.scrollTop = nextScrollTop;
                _this.handleScrollOffsetChange("scrollTop", nextScrollTop);
            }
            // sync less important view stuff when scrolling/wheeling stops.
            _this.syncQuadrantViewsDebounced();
        };
        _this.getNextScrollOffset = function (direction, delta) {
            var _a = _this.props, grid = _a.grid, isHorizontalScrollDisabled = _a.isHorizontalScrollDisabled, isVerticalScrollDisabled = _a.isVerticalScrollDisabled;
            var isHorizontal = direction === "horizontal";
            var scrollKey = isHorizontal ? "scrollLeft" : "scrollTop";
            var isScrollDisabled = isHorizontal ? isHorizontalScrollDisabled : isVerticalScrollDisabled;
            if (isScrollDisabled) {
                return undefined;
            }
            // measure client size on the first event of the current wheel gesture,
            // then grab cached values on successive events to eliminate DOM reads.
            // requires clearing the cached values in the debounced view-update at
            // the end of the wheel event.
            // ASSUMPTION: the client size won't change during the wheel event.
            var clientSize = isHorizontal
                ? _this.cache.getScrollContainerClientWidth()
                : _this.cache.getScrollContainerClientHeight();
            if (clientSize == null) {
                // should trigger only on the first scroll of the wheel gesture.
                // will save client width and height sizes in the cache.
                clientSize = _this.updateScrollContainerClientSize(isHorizontal);
            }
            // By now, the client width and height will have been saved in cache, so
            // they can't be undefined anymore. Also, events can only happen after
            // mount, so we're guaranteed to have measured the header sizes in
            // syncQuadrantViews() by now too, as it's invoked on mount.
            var containerSize = isHorizontal
                ? _this.cache.getScrollContainerClientWidth() - _this.cache.getRowHeaderWidth()
                : _this.cache.getScrollContainerClientHeight() - _this.cache.getColumnHeaderHeight();
            var gridSize = isHorizontal ? grid.getWidth() : grid.getHeight();
            var maxScrollOffset = Math.max(0, gridSize - containerSize);
            var currScrollOffset = _this.cache.getScrollOffset(scrollKey);
            var nextScrollOffset = core_1.Utils.clamp(currScrollOffset + delta, 0, maxScrollOffset);
            return nextScrollOffset;
        };
        // Resizing
        // --------
        // Columns
        _this.handleColumnResizeGuideMain = function (verticalGuides) {
            _this.invokeColumnResizeHandler(verticalGuides, tableQuadrant_1.QuadrantType.MAIN);
        };
        _this.handleColumnResizeGuideTop = function (verticalGuides) {
            _this.invokeColumnResizeHandler(verticalGuides, tableQuadrant_1.QuadrantType.TOP);
        };
        _this.handleColumnResizeGuideLeft = function (verticalGuides) {
            _this.invokeColumnResizeHandler(verticalGuides, tableQuadrant_1.QuadrantType.LEFT);
        };
        _this.handleColumnResizeGuideTopLeft = function (verticalGuides) {
            _this.invokeColumnResizeHandler(verticalGuides, tableQuadrant_1.QuadrantType.TOP_LEFT);
        };
        _this.invokeColumnResizeHandler = function (verticalGuides, quadrantType) {
            var _a, _b;
            var adjustedGuides = _this.adjustVerticalGuides(verticalGuides, quadrantType);
            (_b = (_a = _this.props).handleColumnResizeGuide) === null || _b === void 0 ? void 0 : _b.call(_a, adjustedGuides);
        };
        // Rows
        _this.handleRowResizeGuideMain = function (horizontalGuides) {
            _this.invokeRowResizeHandler(horizontalGuides, tableQuadrant_1.QuadrantType.MAIN);
        };
        _this.handleRowResizeGuideTop = function (horizontalGuides) {
            _this.invokeRowResizeHandler(horizontalGuides, tableQuadrant_1.QuadrantType.TOP);
        };
        _this.handleRowResizeGuideLeft = function (horizontalGuides) {
            _this.invokeRowResizeHandler(horizontalGuides, tableQuadrant_1.QuadrantType.LEFT);
        };
        _this.handleRowResizeGuideTopLeft = function (horizontalGuides) {
            _this.invokeRowResizeHandler(horizontalGuides, tableQuadrant_1.QuadrantType.TOP_LEFT);
        };
        _this.invokeRowResizeHandler = function (horizontalGuides, quadrantType) {
            var _a, _b;
            var adjustedGuides = _this.adjustHorizontalGuides(horizontalGuides, quadrantType);
            (_b = (_a = _this.props).handleRowResizeGuide) === null || _b === void 0 ? void 0 : _b.call(_a, adjustedGuides);
        };
        // Reordering
        // ----------
        // Columns
        _this.handleColumnsReordering = function (oldIndex, newIndex, length) {
            var _a, _b;
            var guideIndex = utils_1.Utils.reorderedIndexToGuideIndex(oldIndex, newIndex, length);
            var leftOffset = _this.props.grid.getCumulativeWidthBefore(guideIndex);
            var _c = _this.props.numFrozenColumns, numFrozenColumns = _c === void 0 ? 0 : _c;
            var quadrantType = guideIndex <= numFrozenColumns ? tableQuadrant_1.QuadrantType.TOP_LEFT : tableQuadrant_1.QuadrantType.TOP;
            var verticalGuides = _this.adjustVerticalGuides([leftOffset], quadrantType);
            (_b = (_a = _this.props).handleColumnsReordering) === null || _b === void 0 ? void 0 : _b.call(_a, verticalGuides);
        };
        // Rows
        _this.handleRowsReordering = function (oldIndex, newIndex, length) {
            var _a, _b;
            var guideIndex = utils_1.Utils.reorderedIndexToGuideIndex(oldIndex, newIndex, length);
            var topOffset = _this.props.grid.getCumulativeHeightBefore(guideIndex);
            var _c = _this.props.numFrozenRows, numFrozenRows = _c === void 0 ? 0 : _c;
            var quadrantType = guideIndex <= numFrozenRows ? tableQuadrant_1.QuadrantType.TOP_LEFT : tableQuadrant_1.QuadrantType.LEFT;
            var horizontalGuides = _this.adjustHorizontalGuides([topOffset], quadrantType);
            (_b = (_a = _this.props).handleRowsReordering) === null || _b === void 0 ? void 0 : _b.call(_a, horizontalGuides);
        };
        // Size syncing
        // ============
        _this.syncQuadrantViewsDebounced = function () {
            var _a;
            var viewSyncDelay = _this.props.viewSyncDelay;
            if (viewSyncDelay < 0) {
                // update synchronously
                _this.syncQuadrantViews();
            }
            else {
                // update asynchronously after a debounced delay
                (_a = _this.cancelPendingViewSync) === null || _a === void 0 ? void 0 : _a.call(_this);
                _this.cancelPendingViewSync = _this.setTimeout(_this.syncQuadrantViews, viewSyncDelay);
            }
        };
        _this.syncQuadrantViews = function () {
            var mainRefs = _this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN];
            var mainScrollContainer = mainRefs.scrollContainer;
            //
            // Reads (batched to avoid DOM thrashing)
            //
            var rowHeaderWidth = _this.measureDesiredRowHeaderWidth();
            var columnHeaderHeight = _this.measureDesiredColumnHeaderHeight();
            var leftQuadrantGridWidth = _this.getSecondaryQuadrantGridSize("width");
            var topQuadrantGridHeight = _this.getSecondaryQuadrantGridSize("height");
            var leftQuadrantWidth = rowHeaderWidth + leftQuadrantGridWidth;
            var topQuadrantHeight = columnHeaderHeight + topQuadrantGridHeight;
            var rightScrollBarWidth = ScrollUtils.measureScrollBarThickness(mainScrollContainer, "vertical");
            var bottomScrollBarHeight = ScrollUtils.measureScrollBarThickness(mainScrollContainer, "horizontal");
            // if columnHeader is enabled, ensure neither of these measurements confusingly clamps to zero height.
            var adjustedColumnHeaderHeight = _this.maybeIncreaseToMinColHeaderHeight(columnHeaderHeight);
            var adjustedTopQuadrantHeight = _this.maybeIncreaseToMinColHeaderHeight(topQuadrantHeight);
            // Update cache: let's read now whatever values we might need later.
            // prevents unnecessary reflows in the future.
            _this.cache.setRowHeaderWidth(rowHeaderWidth);
            _this.cache.setColumnHeaderHeight(columnHeaderHeight);
            // ...however, we also clear the cached client size, so we can read it
            // again when a new scroll begins. not safe to assume this won't change.
            // TODO: maybe use the ResizeSensor?
            _this.cache.setScrollContainerClientWidth(undefined);
            _this.cache.setScrollContainerClientHeight(undefined);
            //
            // Writes (batched to avoid DOM thrashing)
            //
            // Quadrant-size sync'ing: make the quadrants precisely as big as they
            // need to be to fit their variable-sized headers and/or frozen areas.
            _this.maybesSetQuadrantRowHeaderSizes(rowHeaderWidth);
            _this.maybeSetQuadrantMenuElementSizes(rowHeaderWidth, adjustedColumnHeaderHeight);
            _this.maybeSetQuadrantSizes(leftQuadrantWidth, adjustedTopQuadrantHeight);
            // Scrollbar clearance: tweak the quadrant bottom/right offsets to
            // reveal the MAIN-quadrant scrollbars if they're visible.
            _this.maybeSetQuadrantPositionOffset(tableQuadrant_1.QuadrantType.TOP, "right", rightScrollBarWidth);
            _this.maybeSetQuadrantPositionOffset(tableQuadrant_1.QuadrantType.LEFT, "bottom", bottomScrollBarHeight);
            // Scroll syncing: sync the scroll offsets of quadrants that may or may
            // not have been around prior to this update.
            _this.maybeSetQuadrantScrollOffset(tableQuadrant_1.QuadrantType.LEFT, "scrollTop");
            _this.maybeSetQuadrantScrollOffset(tableQuadrant_1.QuadrantType.TOP, "scrollLeft");
        };
        _this.maybeSetQuadrantSizes = function (width, height) {
            var leftWidth = utils_1.Utils.clamp(width, _this.props.enableRowHeader ? grid_1.Grid.MIN_ROW_HEADER_WIDTH : 0);
            var topHeight = utils_1.Utils.clamp(height, _this.props.enableColumnHeader ? grid_1.Grid.MIN_COLUMN_HEADER_HEIGHT : 0);
            _this.maybesSetQuadrantSize(tableQuadrant_1.QuadrantType.LEFT, "width", leftWidth);
            _this.maybesSetQuadrantSize(tableQuadrant_1.QuadrantType.TOP, "height", topHeight);
            _this.maybesSetQuadrantSize(tableQuadrant_1.QuadrantType.TOP_LEFT, "width", leftWidth);
            _this.maybesSetQuadrantSize(tableQuadrant_1.QuadrantType.TOP_LEFT, "height", topHeight);
        };
        _this.maybesSetQuadrantSize = function (quadrantType, dimension, value) {
            var quadrant = _this.quadrantRefs[quadrantType].quadrant;
            if (quadrant != null) {
                quadrant.style[dimension] = "".concat(value, "px");
            }
        };
        _this.maybeSetQuadrantPositionOffset = function (quadrantType, side, value) {
            var quadrant = _this.quadrantRefs[quadrantType].quadrant;
            if (quadrant != null) {
                quadrant.style[side] = "".concat(value, "px");
            }
        };
        _this.maybesSetQuadrantRowHeaderSizes = function (width) {
            var rowHeaderWidth = utils_1.Utils.clamp(width, _this.props.enableRowHeader ? grid_1.Grid.MIN_ROW_HEADER_WIDTH : 0);
            _this.maybeSetQuadrantRowHeaderSize(tableQuadrant_1.QuadrantType.MAIN, rowHeaderWidth);
            _this.maybeSetQuadrantRowHeaderSize(tableQuadrant_1.QuadrantType.TOP, rowHeaderWidth);
            _this.maybeSetQuadrantRowHeaderSize(tableQuadrant_1.QuadrantType.LEFT, rowHeaderWidth);
            _this.maybeSetQuadrantRowHeaderSize(tableQuadrant_1.QuadrantType.TOP_LEFT, rowHeaderWidth);
        };
        _this.maybeSetQuadrantRowHeaderSize = function (quadrantType, width) {
            var rowHeader = _this.quadrantRefs[quadrantType].rowHeader;
            if (rowHeader != null) {
                rowHeader.style.width = "".concat(width, "px");
            }
        };
        _this.maybeSetQuadrantMenuElementSizes = function (width, height) {
            var rowHeaderWidth = utils_1.Utils.clamp(width, _this.props.enableRowHeader ? grid_1.Grid.MIN_ROW_HEADER_WIDTH : 0);
            _this.maybeSetQuadrantMenuElementSize(tableQuadrant_1.QuadrantType.MAIN, rowHeaderWidth, height);
            _this.maybeSetQuadrantMenuElementSize(tableQuadrant_1.QuadrantType.TOP, rowHeaderWidth, height);
            _this.maybeSetQuadrantMenuElementSize(tableQuadrant_1.QuadrantType.LEFT, rowHeaderWidth, height);
            _this.maybeSetQuadrantMenuElementSize(tableQuadrant_1.QuadrantType.TOP_LEFT, rowHeaderWidth, height);
        };
        _this.maybeSetQuadrantMenuElementSize = function (quadrantType, width, height) {
            var menu = _this.quadrantRefs[quadrantType].menu;
            if (menu != null) {
                menu.style.width = "".concat(width, "px");
                menu.style.height = "".concat(height, "px");
            }
        };
        _this.maybeSetQuadrantScrollOffset = function (quadrantType, scrollKey, newOffset) {
            var scrollContainer = _this.quadrantRefs[quadrantType].scrollContainer;
            var scrollOffset = newOffset != null ? newOffset : _this.cache.getScrollOffset(scrollKey);
            if (scrollContainer != null) {
                scrollContainer[scrollKey] = scrollOffset;
            }
        };
        _this.handleScrollOffsetChange = function (scrollKey, offset) {
            _this.cache.setScrollOffset(scrollKey, offset);
            var dependentQuadrantType = scrollKey === "scrollLeft" ? tableQuadrant_1.QuadrantType.TOP : tableQuadrant_1.QuadrantType.LEFT;
            _this.maybeSetQuadrantScrollOffset(dependentQuadrantType, scrollKey);
        };
        // callbacks trigger too frequently unless we throttle scroll and wheel
        // events. declare these functions on the component instance since
        // they're stateful.
        _this.throttledHandleMainQuadrantScroll = core_1.Utils.throttleReactEventCallback(_this.handleMainQuadrantScroll);
        _this.throttledHandleWheel = core_1.Utils.throttleReactEventCallback(_this.handleWheel);
        _this.cache = new tableQuadrantStackCache_1.TableQuadrantStackCache();
        return _this;
    }
    /**
     * Scroll the main quadrant to the specified scroll offset, keeping all other quadrants in sync.
     */
    TableQuadrantStack.prototype.scrollToPosition = function (scrollLeft, scrollTop) {
        var scrollContainer = this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].scrollContainer;
        if (scrollContainer == null) {
            return;
        }
        this.wasMainQuadrantScrollTriggeredByWheelEvent = false;
        // this will trigger the main quadrant's scroll callback below
        scrollContainer.scrollLeft = scrollLeft;
        scrollContainer.scrollTop = scrollTop;
        this.syncQuadrantViews();
    };
    /**
     * Synchronizes quadrant sizes and scroll offsets based on the current
     * column, row, and header sizes. Useful for correcting quadrant sizes after
     * explicitly resizing columns and rows, for instance.
     *
     * Invoking this method imperatively is cheaper than providing columnWidths
     * or rowHeights array props to TableQuadrantStack and forcing it to run
     * expensive array diffs upon every update.
     */
    TableQuadrantStack.prototype.synchronizeQuadrantViews = function () {
        this.syncQuadrantViews();
    };
    TableQuadrantStack.prototype.componentDidMount = function () {
        this.emitRefs();
        this.syncQuadrantViews();
    };
    TableQuadrantStack.prototype.componentDidUpdate = function (prevProps) {
        if (
        // sync'ing quadrant views triggers expensive reflows, so we only call
        // it when layout-affecting props change.
        !core_1.Utils.shallowCompareKeys(this.props, prevProps, {
            include: SYNC_TRIGGER_PROP_KEYS,
        }) ||
            // in addition to those props, we also care about frozen parts of the grid
            // which may cause the top / left quadrants to change height / width
            this.didFrozenColumnWidthsChange(prevProps) ||
            this.didFrozenRowHeightsChange(prevProps)) {
            this.emitRefs();
            this.syncQuadrantViews();
        }
    };
    TableQuadrantStack.prototype.render = function () {
        var _a = this.props, grid = _a.grid, enableRowHeader = _a.enableRowHeader, bodyRenderer = _a.bodyRenderer, throttleScrolling = _a.throttleScrolling, enableColumnHeader = _a.enableColumnHeader;
        // use the more generic "scroll" event for the main quadrant to capture
        // *both* scrollbar interactions and trackpad/mousewheel gestures.
        var onMainQuadrantScroll = throttleScrolling
            ? this.throttledHandleMainQuadrantScroll
            : this.handleMainQuadrantScroll;
        var onWheel = throttleScrolling ? this.throttledHandleWheel : this.handleWheel;
        var baseProps = {
            bodyRenderer: bodyRenderer,
            enableColumnHeader: enableColumnHeader,
            enableRowHeader: enableRowHeader,
            grid: grid,
            onWheel: onWheel,
        };
        var shouldRenderLeftQuadrants = this.shouldRenderLeftQuadrants();
        var maybeLeftQuadrant = shouldRenderLeftQuadrants ? (React.createElement(tableQuadrant_1.TableQuadrant, tslib_1.__assign({}, baseProps, { quadrantRef: this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.LEFT].quadrant, quadrantType: tableQuadrant_1.QuadrantType.LEFT, columnHeaderCellRenderer: this.renderLeftQuadrantColumnHeader, menuRenderer: this.renderLeftQuadrantMenu, rowHeaderCellRenderer: this.renderLeftQuadrantRowHeader, scrollContainerRef: this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.LEFT].scrollContainer }))) : undefined;
        var maybeTopLeftQuadrant = shouldRenderLeftQuadrants ? (React.createElement(tableQuadrant_1.TableQuadrant, tslib_1.__assign({}, baseProps, { quadrantRef: this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP_LEFT].quadrant, quadrantType: tableQuadrant_1.QuadrantType.TOP_LEFT, columnHeaderCellRenderer: this.renderTopLeftQuadrantColumnHeader, menuRenderer: this.renderTopLeftQuadrantMenu, rowHeaderCellRenderer: this.renderTopLeftQuadrantRowHeader, scrollContainerRef: this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP_LEFT].scrollContainer }))) : undefined;
        return (React.createElement("div", { className: Classes.TABLE_QUADRANT_STACK },
            this.renderTableOverlay(),
            React.createElement(tableQuadrant_1.TableQuadrant, tslib_1.__assign({}, baseProps, { bodyRef: this.props.bodyRef, onScroll: onMainQuadrantScroll, quadrantRef: this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.MAIN].quadrant, quadrantType: tableQuadrant_1.QuadrantType.MAIN, columnHeaderCellRenderer: this.renderMainQuadrantColumnHeader, menuRenderer: this.renderMainQuadrantMenu, rowHeaderCellRenderer: this.renderMainQuadrantRowHeader, scrollContainerRef: this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.MAIN].scrollContainer })),
            React.createElement(tableQuadrant_1.TableQuadrant, tslib_1.__assign({}, baseProps, { quadrantRef: this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP].quadrant, quadrantType: tableQuadrant_1.QuadrantType.TOP, columnHeaderCellRenderer: this.renderTopQuadrantColumnHeader, menuRenderer: this.renderTopQuadrantMenu, rowHeaderCellRenderer: this.renderTopQuadrantRowHeader, scrollContainerRef: this.quadrantRefHandlers[tableQuadrant_1.QuadrantType.TOP].scrollContainer })),
            maybeLeftQuadrant,
            maybeTopLeftQuadrant));
    };
    // Ref handlers
    // ============
    TableQuadrantStack.prototype.generateQuadrantRefHandlers = function (quadrantType) {
        var _this = this;
        var reducer = function (agg, key) {
            agg[key] = function (ref) { return (_this.quadrantRefs[quadrantType][key] = ref); };
            return agg;
        };
        var refHandlers = [
            "columnHeader",
            "menu",
            "quadrant",
            "rowHeader",
            "scrollContainer",
        ];
        return refHandlers.reduce(reducer, {});
    };
    // Emitters
    // ========
    TableQuadrantStack.prototype.emitRefs = function () {
        (0, core_1.setRef)(this.props.quadrantRef, this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].quadrant);
        (0, core_1.setRef)(this.props.rowHeaderRef, this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].rowHeader);
        (0, core_1.setRef)(this.props.columnHeaderRef, this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].columnHeader);
        (0, core_1.setRef)(this.props.scrollContainerRef, this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].scrollContainer);
    };
    // this function is named 'update' instead of 'set', because a 'set'
    // function typically takes the new value as a parameter. we avoid that to
    // keep the isHorizontal logic tree contained within this function.
    TableQuadrantStack.prototype.updateScrollContainerClientSize = function (isHorizontal) {
        var mainScrollContainer = this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].scrollContainer;
        if (isHorizontal) {
            this.cache.setScrollContainerClientWidth(mainScrollContainer === null || mainScrollContainer === void 0 ? void 0 : mainScrollContainer.clientWidth);
            return this.cache.getScrollContainerClientWidth();
        }
        else {
            this.cache.setScrollContainerClientHeight(mainScrollContainer === null || mainScrollContainer === void 0 ? void 0 : mainScrollContainer.clientHeight);
            return this.cache.getScrollContainerClientHeight();
        }
    };
    TableQuadrantStack.prototype.maybeIncreaseToMinColHeaderHeight = function (height) {
        if (this.props.enableColumnHeader) {
            return height <= QUADRANT_MIN_SIZE ? grid_1.Grid.MIN_COLUMN_HEADER_HEIGHT : height;
        }
        else {
            return height;
        }
    };
    // Helpers
    // =======
    /** Returns true the cumulative width of all frozen columns in the grid changed. */
    TableQuadrantStack.prototype.didFrozenColumnWidthsChange = function (prevProps) {
        return (this.props.numFrozenColumns > 0 &&
            this.props.grid !== prevProps.grid &&
            this.props.grid.getCumulativeWidthAt(this.props.numFrozenColumns - 1) !==
                prevProps.grid.getCumulativeWidthAt(prevProps.numFrozenColumns - 1));
    };
    /** Returns true the cumulative height of all frozen rows in the grid changed. */
    TableQuadrantStack.prototype.didFrozenRowHeightsChange = function (prevProps) {
        return (this.props.numFrozenRows > 0 &&
            this.props.grid !== prevProps.grid &&
            this.props.grid.getCumulativeHeightAt(this.props.numFrozenRows - 1) !==
                prevProps.grid.getCumulativeHeightAt(prevProps.numFrozenRows - 1));
    };
    /**
     * Returns the width or height of *only the grid* in the secondary quadrants
     * (TOP, LEFT, TOP_LEFT), based on the number of frozen rows and columns.
     */
    TableQuadrantStack.prototype.getSecondaryQuadrantGridSize = function (dimension) {
        var _a;
        var _b = this.props, grid = _b.grid, numFrozenColumns = _b.numFrozenColumns, numFrozenRows = _b.numFrozenRows;
        var numFrozen = (_a = (dimension === "width" ? numFrozenColumns : numFrozenRows)) !== null && _a !== void 0 ? _a : 0;
        var getterFn = dimension === "width" ? grid.getCumulativeWidthAt : grid.getCumulativeHeightAt;
        // both getter functions do O(1) lookups.
        return numFrozen > 0 ? getterFn(numFrozen - 1) : QUADRANT_MIN_SIZE;
    };
    /**
     * Measures the desired width of the row header based on its tallest
     * contents.
     */
    TableQuadrantStack.prototype.measureDesiredRowHeaderWidth = function () {
        // the MAIN row header serves as the source of truth
        var mainRowHeader = this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].rowHeader;
        if (mainRowHeader == null) {
            return 0;
        }
        else {
            // (alas, we must force a reflow to measure the row header's "desired" width)
            mainRowHeader.style.width = "auto";
            return utils_1.Utils.clamp(mainRowHeader.clientWidth, grid_1.Grid.MIN_ROW_HEADER_WIDTH);
        }
    };
    /**
     * Measures the desired height of the column header based on its tallest
     * contents.
     */
    TableQuadrantStack.prototype.measureDesiredColumnHeaderHeight = function () {
        // unlike the row headers, the column headers are in a display-flex
        // layout and are not actually bound by any fixed `height` that we set,
        // so they'll grow freely to their necessary size. makes measuring easy!
        var mainColumnHeader = this.quadrantRefs[tableQuadrant_1.QuadrantType.MAIN].columnHeader;
        return mainColumnHeader == null ? 0 : utils_1.Utils.clamp(mainColumnHeader.clientHeight, grid_1.Grid.MIN_COLUMN_HEADER_HEIGHT);
    };
    TableQuadrantStack.prototype.shouldRenderLeftQuadrants = function (props) {
        if (props === void 0) { props = this.props; }
        var enableRowHeader = props.enableRowHeader, numFrozenColumns = props.numFrozenColumns;
        return enableRowHeader || (numFrozenColumns != null && numFrozenColumns > 0);
    };
    // Resizing
    // should return empty array [] if we just finished resizing
    TableQuadrantStack.prototype.adjustVerticalGuides = function (verticalGuides, quadrantType) {
        var _a;
        var isFrozenQuadrant = quadrantType === tableQuadrant_1.QuadrantType.LEFT || quadrantType === tableQuadrant_1.QuadrantType.TOP_LEFT;
        var scrollAmount = isFrozenQuadrant ? 0 : this.cache.getScrollOffset("scrollLeft");
        var rowHeaderWidth = this.cache.getRowHeaderWidth();
        return (_a = verticalGuides === null || verticalGuides === void 0 ? void 0 : verticalGuides.map(function (verticalGuide) { return verticalGuide - scrollAmount + rowHeaderWidth; })) !== null && _a !== void 0 ? _a : [];
    };
    // should return empty array [] if we just finished resizing
    TableQuadrantStack.prototype.adjustHorizontalGuides = function (horizontalGuides, quadrantType) {
        var _a;
        var isFrozenQuadrant = quadrantType === tableQuadrant_1.QuadrantType.TOP || quadrantType === tableQuadrant_1.QuadrantType.TOP_LEFT;
        var scrollAmount = isFrozenQuadrant ? 0 : this.cache.getScrollOffset("scrollTop");
        var columnHeaderHeight = this.cache.getColumnHeaderHeight();
        return (_a = horizontalGuides === null || horizontalGuides === void 0 ? void 0 : horizontalGuides.map(function (horizontalGuide) { return horizontalGuide - scrollAmount + columnHeaderHeight; })) !== null && _a !== void 0 ? _a : [];
    };
    // we want the user to explicitly pass a quadrantType. define defaultProps as a Partial to avoid
    // declaring that and other required props here.
    TableQuadrantStack.defaultProps = {
        enableColumnHeader: true,
        enableColumnInteractionBar: undefined,
        enableRowHeader: true,
        isHorizontalScrollDisabled: false,
        isVerticalScrollDisabled: false,
        throttleScrolling: true,
        viewSyncDelay: DEFAULT_VIEW_SYNC_DELAY,
    };
    return TableQuadrantStack;
}(core_1.AbstractComponent2));
exports.TableQuadrantStack = TableQuadrantStack;
//# sourceMappingURL=tableQuadrantStack.js.map