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
exports.TABLE_POPOVER_WHITESPACE_NORMAL = exports.TABLE_OVERLAY_REORDERING_CURSOR = exports.TABLE_OVERLAY_LAYER = exports.TABLE_OVERLAY = exports.TABLE_NULL = exports.TABLE_NO_WRAP_TEXT = exports.TABLE_NO_VERTICAL_SCROLL = exports.TABLE_NO_ROWS = exports.TABLE_NO_LAYOUT = exports.TABLE_NO_HORIZONTAL_SCROLL = exports.TABLE_MENU = exports.TABLE_LAST_IN_ROW = exports.TABLE_LAST_IN_COLUMN = exports.TABLE_INTERACTION_BAR = exports.TABLE_HORIZONTAL_GUIDE = exports.TABLE_HORIZONTAL_CELL_DIVIDER = exports.TABLE_HEADER_SELECTED = exports.TABLE_HEADER_REORDERABLE = exports.TABLE_HEADER_CONTENT = exports.TABLE_HEADER_ACTIVE = exports.TABLE_HEADER = exports.TABLE_HAS_REORDER_HANDLE = exports.TABLE_HAS_INTERACTION_BAR = exports.TABLE_FOCUS_REGION = exports.TABLE_CELL_TEXT_PLACEHOLDER = exports.TABLE_EDITABLE_TEXT = exports.TABLE_EDITABLE_NAME = exports.TABLE_DRAGGING = exports.TABLE_CONTAINER = exports.TABLE_COLUMN_NAME_TEXT = exports.TABLE_COLUMN_NAME = exports.TABLE_COLUMN_HEADER_CELL = exports.TABLE_COLUMN_HEADERS = exports.TABLE_COLUMN_HEADER_TR = exports.TABLE_CELL_LEDGER_ODD = exports.TABLE_CELL_LEDGER_EVEN = exports.TABLE_CELL_INTERACTIVE = exports.TABLE_CELL_GHOST = exports.TABLE_CELL_CLIENT = exports.TABLE_CELL = exports.TABLE_BOTTOM_CONTAINER = exports.TABLE_BODY_VIRTUAL_CLIENT = exports.TABLE_BODY_SCROLL_CLIENT = exports.TABLE_BODY_IS_SCROLLING_LEFT = exports.TABLE_BODY_IS_SCROLLING_RIGHT = exports.TABLE_BODY_IS_SCROLLING_BOTTOM = exports.TABLE_BODY_IS_SCROLLING_TOP = exports.TABLE_BODY_SCROLLING_INDICATOR_OVERLAY = exports.TABLE_BODY_CELLS = exports.TABLE_BODY = void 0;
exports.rowCellIndexClass = exports.columnCellIndexClass = exports.rowIndexClass = exports.columnIndexClass = exports.TABLE_VERTICAL_GUIDE = exports.TABLE_TRUNCATED_VALUE = exports.TABLE_TRUNCATED_TEXT = exports.TABLE_TRUNCATED_POPOVER_TARGET = exports.TABLE_TRUNCATED_POPOVER = exports.TABLE_TRUNCATED_FORMAT_TEXT = exports.TABLE_TRUNCATED_FORMAT = exports.TABLE_TRUNCATED_CELL = exports.TABLE_TOP_CONTAINER = exports.TABLE_THEAD = exports.TABLE_TH_MENU_SELECT_CELLS = exports.TABLE_TH_MENU_OPEN = exports.TABLE_TH_MENU_CONTAINER_BACKGROUND = exports.TABLE_TH_MENU_CONTAINER = exports.TABLE_TH_MENU = exports.TABLE_SELECTION_REGION = exports.TABLE_SELECTION_ENABLED = exports.TABLE_ROW_NAME_TEXT = exports.TABLE_ROW_NAME = exports.TABLE_ROW_HEADERS_CELLS_CONTAINER = exports.TABLE_ROW_HEADERS = exports.TABLE_ROUNDED_LAYOUT = exports.TABLE_RESIZE_VERTICAL = exports.TABLE_RESIZE_SENSOR_SHRINK = exports.TABLE_RESIZE_SENSOR_EXPAND = exports.TABLE_RESIZE_SENSOR = exports.TABLE_RESIZE_HORIZONTAL = exports.TABLE_RESIZE_HANDLE_TARGET = exports.TABLE_RESIZE_HANDLE = exports.TABLE_RESIZE_GUIDES = exports.TABLE_REORDERING = exports.TABLE_REORDER_HANDLE_TARGET = exports.TABLE_REORDER_HANDLE = exports.TABLE_REGION = exports.TABLE_QUADRANT_TOP_LEFT = exports.TABLE_QUADRANT_TOP = exports.TABLE_QUADRANT_STACK = exports.TABLE_QUADRANT_SCROLL_CONTAINER = exports.TABLE_QUADRANT_MAIN = exports.TABLE_QUADRANT_LEFT = exports.TABLE_QUADRANT_BODY_CONTAINER = exports.TABLE_QUADRANT = exports.TABLE_POPOVER_WHITESPACE_PRE = void 0;
var core_1 = require("@blueprintjs/core");
var NS = core_1.Classes.getClassNamespace();
exports.TABLE_BODY = "".concat(NS, "-table-body");
exports.TABLE_BODY_CELLS = "".concat(NS, "-table-body-cells");
exports.TABLE_BODY_SCROLLING_INDICATOR_OVERLAY = "".concat(NS, "-table-body-scrolling-indicator-overlay");
exports.TABLE_BODY_IS_SCROLLING_TOP = "".concat(NS, "-table-body-is-scrolling-top");
exports.TABLE_BODY_IS_SCROLLING_BOTTOM = "".concat(NS, "-table-body-is-scrolling-bottom");
exports.TABLE_BODY_IS_SCROLLING_RIGHT = "".concat(NS, "-table-body-is-scrolling-right");
exports.TABLE_BODY_IS_SCROLLING_LEFT = "".concat(NS, "-table-body-is-scrolling-left");
exports.TABLE_BODY_SCROLL_CLIENT = "".concat(NS, "-table-body-scroll-client");
exports.TABLE_BODY_VIRTUAL_CLIENT = "".concat(NS, "-table-body-virtual-client");
exports.TABLE_BOTTOM_CONTAINER = "".concat(NS, "-table-bottom-container");
exports.TABLE_CELL = "".concat(NS, "-table-cell");
exports.TABLE_CELL_CLIENT = "".concat(NS, "-table-cell-client");
exports.TABLE_CELL_GHOST = "".concat(NS, "-table-cell-ghost");
exports.TABLE_CELL_INTERACTIVE = "".concat(NS, "-table-cell-interactive");
exports.TABLE_CELL_LEDGER_EVEN = "".concat(NS, "-table-cell-ledger-even");
exports.TABLE_CELL_LEDGER_ODD = "".concat(NS, "-table-cell-ledger-odd");
exports.TABLE_COLUMN_HEADER_TR = "".concat(NS, "-table-column-header-tr");
exports.TABLE_COLUMN_HEADERS = "".concat(NS, "-table-column-headers");
exports.TABLE_COLUMN_HEADER_CELL = "".concat(NS, "-table-column-header-cell");
exports.TABLE_COLUMN_NAME = "".concat(NS, "-table-column-name");
exports.TABLE_COLUMN_NAME_TEXT = "".concat(NS, "-table-column-name-text");
exports.TABLE_CONTAINER = "".concat(NS, "-table-container");
exports.TABLE_DRAGGING = "".concat(NS, "-table-dragging");
exports.TABLE_EDITABLE_NAME = "".concat(NS, "-table-editable-name");
exports.TABLE_EDITABLE_TEXT = "".concat(NS, "-table-editable-text");
exports.TABLE_CELL_TEXT_PLACEHOLDER = "".concat(NS, "-table-cell-text-placeholder");
exports.TABLE_FOCUS_REGION = "".concat(NS, "-table-focus-region");
exports.TABLE_HAS_INTERACTION_BAR = "".concat(NS, "-table-has-interaction-bar");
exports.TABLE_HAS_REORDER_HANDLE = "".concat(NS, "-table-has-reorder-handle");
exports.TABLE_HEADER = "".concat(NS, "-table-header");
exports.TABLE_HEADER_ACTIVE = "".concat(NS, "-table-header-active");
exports.TABLE_HEADER_CONTENT = "".concat(NS, "-table-header-content");
exports.TABLE_HEADER_REORDERABLE = "".concat(NS, "-table-header-reorderable");
exports.TABLE_HEADER_SELECTED = "".concat(NS, "-table-header-selected");
exports.TABLE_HORIZONTAL_CELL_DIVIDER = "".concat(NS, "-table-horizontal-cell-divider");
exports.TABLE_HORIZONTAL_GUIDE = "".concat(NS, "-table-horizontal-guide");
exports.TABLE_INTERACTION_BAR = "".concat(NS, "-table-interaction-bar");
exports.TABLE_LAST_IN_COLUMN = "".concat(NS, "-table-last-in-column");
exports.TABLE_LAST_IN_ROW = "".concat(NS, "-table-last-in-row");
exports.TABLE_MENU = "".concat(NS, "-table-menu");
exports.TABLE_NO_HORIZONTAL_SCROLL = "".concat(NS, "-table-no-horizontal-scroll");
exports.TABLE_NO_LAYOUT = "".concat(NS, "-table-no-layout");
exports.TABLE_NO_ROWS = "".concat(NS, "-table-no-rows");
exports.TABLE_NO_VERTICAL_SCROLL = "".concat(NS, "-table-no-vertical-scroll");
exports.TABLE_NO_WRAP_TEXT = "".concat(NS, "-table-no-wrap-text");
exports.TABLE_NULL = "".concat(NS, "-table-null");
exports.TABLE_OVERLAY = "".concat(NS, "-table-overlay");
exports.TABLE_OVERLAY_LAYER = "".concat(NS, "-table-overlay-layer");
exports.TABLE_OVERLAY_REORDERING_CURSOR = "".concat(NS, "-table-reordering-cursor-overlay");
exports.TABLE_POPOVER_WHITESPACE_NORMAL = "".concat(NS, "-table-popover-whitespace-normal");
exports.TABLE_POPOVER_WHITESPACE_PRE = "".concat(NS, "-table-popover-whitespace-pre");
exports.TABLE_QUADRANT = "".concat(NS, "-table-quadrant");
exports.TABLE_QUADRANT_BODY_CONTAINER = "".concat(NS, "-table-quadrant-body-container");
exports.TABLE_QUADRANT_LEFT = "".concat(NS, "-table-quadrant-left");
exports.TABLE_QUADRANT_MAIN = "".concat(NS, "-table-quadrant-main");
exports.TABLE_QUADRANT_SCROLL_CONTAINER = "".concat(NS, "-table-quadrant-scroll-container");
exports.TABLE_QUADRANT_STACK = "".concat(NS, "-table-quadrant-stack");
exports.TABLE_QUADRANT_TOP = "".concat(NS, "-table-quadrant-top");
exports.TABLE_QUADRANT_TOP_LEFT = "".concat(NS, "-table-quadrant-top-left");
exports.TABLE_REGION = "".concat(NS, "-table-region");
exports.TABLE_REORDER_HANDLE = "".concat(NS, "-table-reorder-handle");
exports.TABLE_REORDER_HANDLE_TARGET = "".concat(NS, "-table-reorder-handle-target");
exports.TABLE_REORDERING = "".concat(NS, "-table-reordering");
exports.TABLE_RESIZE_GUIDES = "".concat(NS, "-table-resize-guides");
exports.TABLE_RESIZE_HANDLE = "".concat(NS, "-table-resize-handle");
exports.TABLE_RESIZE_HANDLE_TARGET = "".concat(NS, "-table-resize-handle-target");
exports.TABLE_RESIZE_HORIZONTAL = "".concat(NS, "-table-resize-horizontal");
exports.TABLE_RESIZE_SENSOR = "".concat(NS, "-table-resize-sensor");
exports.TABLE_RESIZE_SENSOR_EXPAND = "".concat(NS, "-table-resize-sensor-expand");
exports.TABLE_RESIZE_SENSOR_SHRINK = "".concat(NS, "-table-resize-sensor-shrink");
exports.TABLE_RESIZE_VERTICAL = "".concat(NS, "-table-resize-vertical");
exports.TABLE_ROUNDED_LAYOUT = "".concat(NS, "-table-rounded-layout");
exports.TABLE_ROW_HEADERS = "".concat(NS, "-table-row-headers");
exports.TABLE_ROW_HEADERS_CELLS_CONTAINER = "".concat(NS, "-table-row-headers-cells-container");
exports.TABLE_ROW_NAME = "".concat(NS, "-table-row-name");
exports.TABLE_ROW_NAME_TEXT = "".concat(NS, "-table-row-name-text");
exports.TABLE_SELECTION_ENABLED = "".concat(NS, "-table-selection-enabled");
exports.TABLE_SELECTION_REGION = "".concat(NS, "-table-selection-region");
exports.TABLE_TH_MENU = "".concat(NS, "-table-th-menu");
exports.TABLE_TH_MENU_CONTAINER = "".concat(NS, "-table-th-menu-container");
exports.TABLE_TH_MENU_CONTAINER_BACKGROUND = "".concat(NS, "-table-th-menu-container-background");
exports.TABLE_TH_MENU_OPEN = "".concat(NS, "-table-th-menu-open");
exports.TABLE_TH_MENU_SELECT_CELLS = "".concat(NS, "-table-th-menu-select-cells");
exports.TABLE_THEAD = "".concat(NS, "-table-thead");
exports.TABLE_TOP_CONTAINER = "".concat(NS, "-table-top-container");
exports.TABLE_TRUNCATED_CELL = "".concat(NS, "-table-truncated-cell");
exports.TABLE_TRUNCATED_FORMAT = "".concat(NS, "-table-truncated-format");
exports.TABLE_TRUNCATED_FORMAT_TEXT = "".concat(NS, "-table-truncated-format-text");
exports.TABLE_TRUNCATED_POPOVER = "".concat(NS, "-table-truncated-popover");
exports.TABLE_TRUNCATED_POPOVER_TARGET = "".concat(NS, "-table-truncated-popover-target");
exports.TABLE_TRUNCATED_TEXT = "".concat(NS, "-table-truncated-text");
exports.TABLE_TRUNCATED_VALUE = "".concat(NS, "-table-truncated-value");
exports.TABLE_VERTICAL_GUIDE = "".concat(NS, "-table-vertical-guide");
/** Common code for row and column index class generator functions, since they're essentially the same. */
function dimensionIndexClass(classPrefix, index) {
    if (typeof index === "number") {
        return "".concat(classPrefix).concat(index);
    }
    return index.indexOf(classPrefix) === 0 ? index : "".concat(classPrefix).concat(index);
}
/** Return CSS class for table colummn index, whether or not 'pt-table-col-' prefix is included. */
function columnIndexClass(columnIndex) {
    return dimensionIndexClass("".concat(NS, "-table-col-"), columnIndex);
}
exports.columnIndexClass = columnIndexClass;
/** Return CSS class for table row index, whether or not 'pt-table-row-' prefix is included. */
function rowIndexClass(rowIndex) {
    return dimensionIndexClass("".concat(NS, "-table-row-"), rowIndex);
}
exports.rowIndexClass = rowIndexClass;
/** Return CSS class for table colummn cell index, whether or not 'pt-table-cell-col-' prefix is included. */
function columnCellIndexClass(columnIndex) {
    return dimensionIndexClass("".concat(NS, "-table-cell-col-"), columnIndex);
}
exports.columnCellIndexClass = columnCellIndexClass;
/** Return CSS class for table row cell index, whether or not 'pt-table-cell-row-' prefix is included. */
function rowCellIndexClass(rowIndex) {
    return dimensionIndexClass("".concat(NS, "-table-cell-row-"), rowIndex);
}
exports.rowCellIndexClass = rowCellIndexClass;
//# sourceMappingURL=classes.js.map