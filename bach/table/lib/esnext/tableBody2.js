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
import classNames from "classnames";
import * as React from "react";
import { AbstractComponent2, Utils as CoreUtils } from "@blueprintjs/core";
import { ContextMenu2 } from "@blueprintjs/popover2";
import * as Classes from "./common/classes";
import { RenderMode } from "./common/renderMode";
import { MenuContext } from "./interactions/menus";
import { DragSelectable } from "./interactions/selectable";
import { Regions } from "./regions";
import { cellClassNames, TableBodyCells } from "./tableBodyCells";
const DEEP_COMPARE_KEYS = ["selectedRegions"];
export class TableBody2 extends AbstractComponent2 {
    static defaultProps = {
        loading: false,
        renderMode: RenderMode.BATCH,
    };
    /**
     * @deprecated, will be removed from public API in the next major version
     */
    static cellClassNames(rowIndex, columnIndex) {
        return cellClassNames(rowIndex, columnIndex);
    }
    activationCell = null;
    shouldComponentUpdate(nextProps) {
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: DEEP_COMPARE_KEYS }) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, DEEP_COMPARE_KEYS));
    }
    render() {
        const { grid, numFrozenColumns, numFrozenRows } = this.props;
        const defaultStyle = grid.getRect().sizeStyle();
        const style = {
            height: numFrozenRows != null ? grid.getCumulativeHeightAt(numFrozenRows - 1) : defaultStyle.height,
            width: numFrozenColumns != null ? grid.getCumulativeWidthAt(numFrozenColumns - 1) : defaultStyle.width,
        };
        return (React.createElement(DragSelectable, { enableMultipleSelection: this.props.enableMultipleSelection, focusedCell: this.props.focusedCell, locateClick: this.locateClick, locateDrag: this.locateDrag, onFocusedCell: this.props.onFocusedCell, onSelection: this.props.onSelection, onSelectionEnd: this.handleSelectionEnd, selectedRegions: this.props.selectedRegions, selectedRegionTransform: this.props.selectedRegionTransform },
            React.createElement(ContextMenu2, { className: classNames(Classes.TABLE_BODY_VIRTUAL_CLIENT, Classes.TABLE_CELL_CLIENT), content: this.renderContextMenu, disabled: this.props.bodyContextMenuRenderer === undefined, onContextMenu: this.handleContextMenu, style: style },
                React.createElement(TableBodyCells, { cellRenderer: this.props.cellRenderer, focusedCell: this.props.focusedCell, grid: grid, loading: this.props.loading, onCompleteRender: this.props.onCompleteRender, renderMode: this.props.renderMode, columnIndexStart: this.props.columnIndexStart, columnIndexEnd: this.props.columnIndexEnd, rowIndexStart: this.props.rowIndexStart, rowIndexEnd: this.props.rowIndexEnd, viewportRect: this.props.viewportRect }))));
    }
    renderContextMenu = ({ mouseEvent }) => {
        const { grid, bodyContextMenuRenderer, selectedRegions = [] } = this.props;
        const { numRows, numCols } = grid;
        if (bodyContextMenuRenderer === undefined || mouseEvent === undefined) {
            return undefined;
        }
        const targetRegion = this.locateClick(mouseEvent.nativeEvent);
        let nextSelectedRegions = selectedRegions;
        // if the event did not happen within a selected region, clear all
        // selections and select the right-clicked cell.
        const foundIndex = Regions.findContainingRegion(selectedRegions, targetRegion);
        if (foundIndex < 0) {
            nextSelectedRegions = [targetRegion];
        }
        const menuContext = new MenuContext(targetRegion, nextSelectedRegions, numRows, numCols);
        const contextMenu = bodyContextMenuRenderer(menuContext);
        return contextMenu == null ? undefined : contextMenu;
    };
    // Callbacks
    // =========
    // state updates cannot happen in renderContextMenu() during the render phase, so we must handle them separately
    handleContextMenu = (e) => {
        const { onFocusedCell, onSelection, selectedRegions = [] } = this.props;
        const targetRegion = this.locateClick(e.nativeEvent);
        let nextSelectedRegions = selectedRegions;
        // if the event did not happen within a selected region, clear all
        // selections and select the right-clicked cell.
        const foundIndex = Regions.findContainingRegion(selectedRegions, targetRegion);
        if (foundIndex < 0) {
            nextSelectedRegions = [targetRegion];
            onSelection(nextSelectedRegions);
            // move the focused cell to the new region.
            const nextFocusedCell = {
                ...Regions.getFocusCellCoordinatesFromRegion(targetRegion),
                focusSelectionIndex: 0,
            };
            onFocusedCell(nextFocusedCell);
        }
    };
    handleSelectionEnd = () => {
        this.activationCell = null; // not strictly required, but good practice
    };
    locateClick = (event) => {
        this.activationCell = this.props.locator.convertPointToCell(event.clientX, event.clientY);
        return Regions.cell(this.activationCell.row, this.activationCell.col);
    };
    locateDrag = (_event, coords, returnEndOnly = false) => {
        if (this.activationCell === null) {
            return undefined;
        }
        const start = this.activationCell;
        const end = this.props.locator.convertPointToCell(coords.current[0], coords.current[1]);
        return returnEndOnly ? Regions.cell(end.row, end.col) : Regions.cell(start.row, start.col, end.row, end.col);
    };
}
//# sourceMappingURL=tableBody2.js.map