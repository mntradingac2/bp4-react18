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
import classNames from "classnames";
import * as React from "react";
import { Utils as CoreUtils, Icon } from "@blueprintjs/core";
import * as Classes from "../common/classes";
import { CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT } from "../common/utils";
import { DragEvents } from "../interactions/dragEvents";
import { DragReorderable } from "../interactions/reorderable";
import { Resizable } from "../interactions/resizable";
import { DragSelectable } from "../interactions/selectable";
import { RegionCardinality, Regions } from "../regions";
const SHALLOW_COMPARE_PROP_KEYS_DENYLIST = ["focusedCell", "selectedRegions"];
export class Header extends React.Component {
    activationIndex = null;
    constructor(props) {
        super(props);
        this.state = { hasValidSelection: this.isSelectedRegionsControlledAndNonEmpty(props) };
    }
    componentDidUpdate(_, prevState) {
        const nextHasValidSection = this.isSelectedRegionsControlledAndNonEmpty(this.props);
        if (prevState.hasValidSelection !== nextHasValidSection) {
            this.setState({ hasValidSelection: nextHasValidSection });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (!CoreUtils.shallowCompareKeys(this.state, nextState) ||
            !CoreUtils.shallowCompareKeys(this.props, nextProps, {
                exclude: SHALLOW_COMPARE_PROP_KEYS_DENYLIST,
            }) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, SHALLOW_COMPARE_PROP_KEYS_DENYLIST));
    }
    render() {
        return this.props.wrapCells(this.renderCells());
    }
    isSelectedRegionsControlledAndNonEmpty(props = this.props) {
        return props.selectedRegions != null && props.selectedRegions.length > 0;
    }
    convertEventToIndex = (event) => {
        const coord = this.props.getMouseCoordinate(event);
        return this.props.convertPointToIndex(coord);
    };
    locateClick = (event) => {
        const menuContainer = event.target.closest(`.${Classes.TABLE_TH_MENU_CONTAINER}`);
        if (menuContainer && !menuContainer.classList.contains(Classes.TABLE_TH_MENU_SELECT_CELLS)) {
            return this.props.toRegion(-1);
        }
        this.activationIndex = this.convertEventToIndex(event);
        return this.props.toRegion(this.activationIndex);
    };
    locateDragForSelection = (_event, coords, returnEndOnly = false) => {
        const coord = this.props.getDragCoordinate(coords.current);
        const indexEnd = this.props.convertPointToIndex(coord);
        if (returnEndOnly) {
            return this.props.toRegion(indexEnd);
        }
        else if (this.activationIndex !== null) {
            return this.props.toRegion(this.activationIndex, indexEnd);
        }
        else {
            // invalid state, cannot end a drag before starting one
            return {};
        }
    };
    locateDragForReordering = (_event, coords) => {
        const coord = this.props.getDragCoordinate(coords.current);
        const guideIndex = this.props.convertPointToIndex(coord, true);
        return guideIndex < 0 ? undefined : guideIndex;
    };
    renderCells = () => {
        const { indexStart, indexEnd } = this.props;
        const cells = [];
        for (let index = indexStart; index <= indexEnd; index++) {
            const cell = this.renderNewCell(index);
            if (cell != null) {
                cells.push(cell);
            }
        }
        return cells;
    };
    renderNewCell = (index) => {
        const extremaClasses = this.props.getCellExtremaClasses(index, this.props.indexEnd);
        const renderer = this.props.isGhostIndex(index) ? this.props.ghostCellRenderer : this.renderCell;
        return renderer(index, extremaClasses);
    };
    renderCell = (index, extremaClasses) => {
        const { getIndexClass, selectedRegions } = this.props;
        const cell = this.props.headerCellRenderer(index);
        if (cell == null) {
            return null;
        }
        const isLoading = cell.props.loading != null ? cell.props.loading : this.props.loading;
        const isSelected = this.props.isCellSelected(index);
        const isEntireCellTargetReorderable = this.isEntireCellTargetReorderable(index);
        const className = classNames(extremaClasses, {
            [Classes.TABLE_HEADER_REORDERABLE]: isEntireCellTargetReorderable,
        }, this.props.getCellIndexClass(index), cell.props.className);
        const cellProps = {
            className,
            index,
            [this.props.headerCellIsSelectedPropName]: isSelected,
            [this.props.headerCellIsReorderablePropName]: isEntireCellTargetReorderable,
            loading: isLoading,
            reorderHandle: this.maybeRenderReorderHandle(index),
        };
        const modifiedHandleSizeChanged = (size) => this.props.handleSizeChanged(index, size);
        const modifiedHandleResizeEnd = (size) => this.props.handleResizeEnd(index, size);
        const modifiedHandleResizeHandleDoubleClick = () => this.props.handleResizeDoubleClick?.(index);
        const baseChildren = (React.createElement(DragSelectable, { enableMultipleSelection: this.props.enableMultipleSelection, disabled: this.isDragSelectableDisabled, focusedCell: this.props.focusedCell, ignoredSelectors: [`.${Classes.TABLE_REORDER_HANDLE_TARGET}`], key: getIndexClass(index), locateClick: this.locateClick, locateDrag: this.locateDragForSelection, onFocusedCell: this.props.onFocusedCell, onSelection: this.handleDragSelectableSelection, onSelectionEnd: this.handleDragSelectableSelectionEnd, selectedRegions: selectedRegions, selectedRegionTransform: this.props.selectedRegionTransform },
            React.createElement(Resizable, { isResizable: this.props.isResizable, maxSize: this.props.maxSize, minSize: this.props.minSize, 
                // eslint-disable-next-line react/jsx-no-bind
                onDoubleClick: modifiedHandleResizeHandleDoubleClick, onLayoutLock: this.props.onLayoutLock, 
                // eslint-disable-next-line react/jsx-no-bind
                onResizeEnd: modifiedHandleResizeEnd, 
                // eslint-disable-next-line react/jsx-no-bind
                onSizeChanged: modifiedHandleSizeChanged, orientation: this.props.resizeOrientation, size: this.props.getCellSize(index) }, React.cloneElement(cell, cellProps))));
        return this.isReorderHandleEnabled()
            ? baseChildren // reordering will be handled by interacting with the reorder handle
            : this.wrapInDragReorderable(index, baseChildren, this.isDragReorderableDisabled);
    };
    isReorderHandleEnabled() {
        // the reorder handle can only appear in the column interaction bar
        return this.isColumnHeader() && this.props.isReorderable;
    }
    maybeRenderReorderHandle(index) {
        return !this.isReorderHandleEnabled()
            ? undefined
            : this.wrapInDragReorderable(index, React.createElement("div", { className: Classes.TABLE_REORDER_HANDLE_TARGET },
                React.createElement("div", { className: classNames(Classes.TABLE_REORDER_HANDLE, CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT) },
                    React.createElement(Icon, { icon: "drag-handle-vertical", title: "Press down to drag" }))), false);
    }
    isColumnHeader() {
        return this.props.fullRegionCardinality === RegionCardinality.FULL_COLUMNS;
    }
    wrapInDragReorderable(index, children, disabled) {
        return (React.createElement(DragReorderable, { disabled: disabled, key: this.props.getIndexClass(index), locateClick: this.locateClick, locateDrag: this.locateDragForReordering, onReordered: this.props.onReordered, onReordering: this.props.onReordering, onSelection: this.props.onSelection, onFocusedCell: this.props.onFocusedCell, selectedRegions: this.props.selectedRegions, toRegion: this.props.toRegion }, children));
    }
    handleDragSelectableSelection = (selectedRegions) => {
        this.props.onSelection(selectedRegions);
        this.setState({ hasValidSelection: false });
    };
    handleDragSelectableSelectionEnd = () => {
        this.activationIndex = null; // not strictly required, but good practice
        this.setState({ hasValidSelection: true });
    };
    isDragSelectableDisabled = (event) => {
        if (DragEvents.isAdditive(event)) {
            // if the meta/ctrl key was pressed, we want to forcefully ignore
            // reordering interactions and prioritize drag-selection
            // interactions (e.g. to make it possible to deselect a row).
            return false;
        }
        const cellIndex = this.convertEventToIndex(event);
        return this.isEntireCellTargetReorderable(cellIndex);
    };
    isDragReorderableDisabled = (event) => {
        const isSelectionEnabled = !this.isDragSelectableDisabled(event);
        if (isSelectionEnabled) {
            // if drag-selection is enabled, we don't want drag-reordering
            // interactions to compete. otherwise, a mouse-drag might both expand a
            // selection and reorder the same selection simultaneously - confusing!
            return true;
        }
        const cellIndex = this.convertEventToIndex(event);
        return !this.isEntireCellTargetReorderable(cellIndex);
    };
    isEntireCellTargetReorderable = (index) => {
        const { isReorderable = false, selectedRegions } = this.props;
        // although reordering may be generally enabled for this row/column (via props.isReorderable), the
        // row/column shouldn't actually become reorderable from a user perspective until a few other
        // conditions are true:
        return (isReorderable &&
            // the row/column should be the only selection (or it should be part of the only selection),
            // because reordering multiple disjoint row/column selections is a UX morass with no clear best
            // behavior.
            this.props.isCellSelected(index) &&
            this.state.hasValidSelection &&
            Regions.getRegionCardinality(selectedRegions[0]) === this.props.fullRegionCardinality &&
            // selected regions can be updated during mousedown+drag and before mouseup; thus, we
            // add a final check to make sure we don't enable reordering until the selection
            // interaction is complete. this prevents one click+drag interaction from triggering
            // both selection and reordering behavior.
            selectedRegions.length === 1 &&
            // columns are reordered via a reorder handle, so drag-selection needn't be disabled
            !this.isReorderHandleEnabled());
    };
}
//# sourceMappingURL=header.js.map