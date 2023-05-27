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
exports.Header = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("../common/classes"));
var utils_1 = require("../common/utils");
var dragEvents_1 = require("../interactions/dragEvents");
var reorderable_1 = require("../interactions/reorderable");
var resizable_1 = require("../interactions/resizable");
var selectable_1 = require("../interactions/selectable");
var regions_1 = require("../regions");
var SHALLOW_COMPARE_PROP_KEYS_DENYLIST = ["focusedCell", "selectedRegions"];
var Header = /** @class */ (function (_super) {
    tslib_1.__extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        _this.activationIndex = null;
        _this.convertEventToIndex = function (event) {
            var coord = _this.props.getMouseCoordinate(event);
            return _this.props.convertPointToIndex(coord);
        };
        _this.locateClick = function (event) {
            var menuContainer = event.target.closest(".".concat(Classes.TABLE_TH_MENU_CONTAINER));
            if (menuContainer && !menuContainer.classList.contains(Classes.TABLE_TH_MENU_SELECT_CELLS)) {
                return _this.props.toRegion(-1);
            }
            _this.activationIndex = _this.convertEventToIndex(event);
            return _this.props.toRegion(_this.activationIndex);
        };
        _this.locateDragForSelection = function (_event, coords, returnEndOnly) {
            if (returnEndOnly === void 0) { returnEndOnly = false; }
            var coord = _this.props.getDragCoordinate(coords.current);
            var indexEnd = _this.props.convertPointToIndex(coord);
            if (returnEndOnly) {
                return _this.props.toRegion(indexEnd);
            }
            else if (_this.activationIndex !== null) {
                return _this.props.toRegion(_this.activationIndex, indexEnd);
            }
            else {
                // invalid state, cannot end a drag before starting one
                return {};
            }
        };
        _this.locateDragForReordering = function (_event, coords) {
            var coord = _this.props.getDragCoordinate(coords.current);
            var guideIndex = _this.props.convertPointToIndex(coord, true);
            return guideIndex < 0 ? undefined : guideIndex;
        };
        _this.renderCells = function () {
            var _a = _this.props, indexStart = _a.indexStart, indexEnd = _a.indexEnd;
            var cells = [];
            for (var index = indexStart; index <= indexEnd; index++) {
                var cell = _this.renderNewCell(index);
                if (cell != null) {
                    cells.push(cell);
                }
            }
            return cells;
        };
        _this.renderNewCell = function (index) {
            var extremaClasses = _this.props.getCellExtremaClasses(index, _this.props.indexEnd);
            var renderer = _this.props.isGhostIndex(index) ? _this.props.ghostCellRenderer : _this.renderCell;
            return renderer(index, extremaClasses);
        };
        _this.renderCell = function (index, extremaClasses) {
            var _a, _b;
            var _c = _this.props, getIndexClass = _c.getIndexClass, selectedRegions = _c.selectedRegions;
            var cell = _this.props.headerCellRenderer(index);
            if (cell == null) {
                return null;
            }
            var isLoading = cell.props.loading != null ? cell.props.loading : _this.props.loading;
            var isSelected = _this.props.isCellSelected(index);
            var isEntireCellTargetReorderable = _this.isEntireCellTargetReorderable(index);
            var className = (0, classnames_1.default)(extremaClasses, (_a = {},
                _a[Classes.TABLE_HEADER_REORDERABLE] = isEntireCellTargetReorderable,
                _a), _this.props.getCellIndexClass(index), cell.props.className);
            var cellProps = (_b = {
                    className: className,
                    index: index
                },
                _b[_this.props.headerCellIsSelectedPropName] = isSelected,
                _b[_this.props.headerCellIsReorderablePropName] = isEntireCellTargetReorderable,
                _b.loading = isLoading,
                _b.reorderHandle = _this.maybeRenderReorderHandle(index),
                _b);
            var modifiedHandleSizeChanged = function (size) { return _this.props.handleSizeChanged(index, size); };
            var modifiedHandleResizeEnd = function (size) { return _this.props.handleResizeEnd(index, size); };
            var modifiedHandleResizeHandleDoubleClick = function () { var _a, _b; return (_b = (_a = _this.props).handleResizeDoubleClick) === null || _b === void 0 ? void 0 : _b.call(_a, index); };
            var baseChildren = (React.createElement(selectable_1.DragSelectable, { enableMultipleSelection: _this.props.enableMultipleSelection, disabled: _this.isDragSelectableDisabled, focusedCell: _this.props.focusedCell, ignoredSelectors: [".".concat(Classes.TABLE_REORDER_HANDLE_TARGET)], key: getIndexClass(index), locateClick: _this.locateClick, locateDrag: _this.locateDragForSelection, onFocusedCell: _this.props.onFocusedCell, onSelection: _this.handleDragSelectableSelection, onSelectionEnd: _this.handleDragSelectableSelectionEnd, selectedRegions: selectedRegions, selectedRegionTransform: _this.props.selectedRegionTransform },
                React.createElement(resizable_1.Resizable, { isResizable: _this.props.isResizable, maxSize: _this.props.maxSize, minSize: _this.props.minSize, 
                    // eslint-disable-next-line react/jsx-no-bind
                    onDoubleClick: modifiedHandleResizeHandleDoubleClick, onLayoutLock: _this.props.onLayoutLock, 
                    // eslint-disable-next-line react/jsx-no-bind
                    onResizeEnd: modifiedHandleResizeEnd, 
                    // eslint-disable-next-line react/jsx-no-bind
                    onSizeChanged: modifiedHandleSizeChanged, orientation: _this.props.resizeOrientation, size: _this.props.getCellSize(index) }, React.cloneElement(cell, cellProps))));
            return _this.isReorderHandleEnabled()
                ? baseChildren // reordering will be handled by interacting with the reorder handle
                : _this.wrapInDragReorderable(index, baseChildren, _this.isDragReorderableDisabled);
        };
        _this.handleDragSelectableSelection = function (selectedRegions) {
            _this.props.onSelection(selectedRegions);
            _this.setState({ hasValidSelection: false });
        };
        _this.handleDragSelectableSelectionEnd = function () {
            _this.activationIndex = null; // not strictly required, but good practice
            _this.setState({ hasValidSelection: true });
        };
        _this.isDragSelectableDisabled = function (event) {
            if (dragEvents_1.DragEvents.isAdditive(event)) {
                // if the meta/ctrl key was pressed, we want to forcefully ignore
                // reordering interactions and prioritize drag-selection
                // interactions (e.g. to make it possible to deselect a row).
                return false;
            }
            var cellIndex = _this.convertEventToIndex(event);
            return _this.isEntireCellTargetReorderable(cellIndex);
        };
        _this.isDragReorderableDisabled = function (event) {
            var isSelectionEnabled = !_this.isDragSelectableDisabled(event);
            if (isSelectionEnabled) {
                // if drag-selection is enabled, we don't want drag-reordering
                // interactions to compete. otherwise, a mouse-drag might both expand a
                // selection and reorder the same selection simultaneously - confusing!
                return true;
            }
            var cellIndex = _this.convertEventToIndex(event);
            return !_this.isEntireCellTargetReorderable(cellIndex);
        };
        _this.isEntireCellTargetReorderable = function (index) {
            var _a = _this.props, _b = _a.isReorderable, isReorderable = _b === void 0 ? false : _b, selectedRegions = _a.selectedRegions;
            // although reordering may be generally enabled for this row/column (via props.isReorderable), the
            // row/column shouldn't actually become reorderable from a user perspective until a few other
            // conditions are true:
            return (isReorderable &&
                // the row/column should be the only selection (or it should be part of the only selection),
                // because reordering multiple disjoint row/column selections is a UX morass with no clear best
                // behavior.
                _this.props.isCellSelected(index) &&
                _this.state.hasValidSelection &&
                regions_1.Regions.getRegionCardinality(selectedRegions[0]) === _this.props.fullRegionCardinality &&
                // selected regions can be updated during mousedown+drag and before mouseup; thus, we
                // add a final check to make sure we don't enable reordering until the selection
                // interaction is complete. this prevents one click+drag interaction from triggering
                // both selection and reordering behavior.
                selectedRegions.length === 1 &&
                // columns are reordered via a reorder handle, so drag-selection needn't be disabled
                !_this.isReorderHandleEnabled());
        };
        _this.state = { hasValidSelection: _this.isSelectedRegionsControlledAndNonEmpty(props) };
        return _this;
    }
    Header.prototype.componentDidUpdate = function (_, prevState) {
        var nextHasValidSection = this.isSelectedRegionsControlledAndNonEmpty(this.props);
        if (prevState.hasValidSelection !== nextHasValidSection) {
            this.setState({ hasValidSelection: nextHasValidSection });
        }
    };
    Header.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (!core_1.Utils.shallowCompareKeys(this.state, nextState) ||
            !core_1.Utils.shallowCompareKeys(this.props, nextProps, {
                exclude: SHALLOW_COMPARE_PROP_KEYS_DENYLIST,
            }) ||
            !core_1.Utils.deepCompareKeys(this.props, nextProps, SHALLOW_COMPARE_PROP_KEYS_DENYLIST));
    };
    Header.prototype.render = function () {
        return this.props.wrapCells(this.renderCells());
    };
    Header.prototype.isSelectedRegionsControlledAndNonEmpty = function (props) {
        if (props === void 0) { props = this.props; }
        return props.selectedRegions != null && props.selectedRegions.length > 0;
    };
    Header.prototype.isReorderHandleEnabled = function () {
        // the reorder handle can only appear in the column interaction bar
        return this.isColumnHeader() && this.props.isReorderable;
    };
    Header.prototype.maybeRenderReorderHandle = function (index) {
        return !this.isReorderHandleEnabled()
            ? undefined
            : this.wrapInDragReorderable(index, React.createElement("div", { className: Classes.TABLE_REORDER_HANDLE_TARGET },
                React.createElement("div", { className: (0, classnames_1.default)(Classes.TABLE_REORDER_HANDLE, utils_1.CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT) },
                    React.createElement(core_1.Icon, { icon: "drag-handle-vertical", title: "Press down to drag" }))), false);
    };
    Header.prototype.isColumnHeader = function () {
        return this.props.fullRegionCardinality === regions_1.RegionCardinality.FULL_COLUMNS;
    };
    Header.prototype.wrapInDragReorderable = function (index, children, disabled) {
        return (React.createElement(reorderable_1.DragReorderable, { disabled: disabled, key: this.props.getIndexClass(index), locateClick: this.locateClick, locateDrag: this.locateDragForReordering, onReordered: this.props.onReordered, onReordering: this.props.onReordering, onSelection: this.props.onSelection, onFocusedCell: this.props.onFocusedCell, selectedRegions: this.props.selectedRegions, toRegion: this.props.toRegion }, children));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=header.js.map