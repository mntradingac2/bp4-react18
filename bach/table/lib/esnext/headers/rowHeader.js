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
import classNames from "classnames";
import * as React from "react";
import * as Classes from "../common/classes";
import { Orientation } from "../interactions/resizeHandle";
import { RegionCardinality, Regions } from "../regions";
import { Header } from "./header";
import { RowHeaderCell2 } from "./rowHeaderCell2";
export class RowHeader extends React.Component {
    static defaultProps = {
        rowHeaderCellRenderer: renderDefaultRowHeader,
    };
    componentDidMount() {
        this.props.onMount?.("row");
    }
    render() {
        const { 
        // from IRowHeaderProps
        onRowHeightChanged, rowHeaderCellRenderer, 
        // from IRowHeights
        minRowHeight: minSize, maxRowHeight: maxSize, defaultRowHeight, 
        // from IRowIndices
        rowIndexStart: indexStart, rowIndexEnd: indexEnd, 
        // from IHeaderProps
        ...spreadableProps } = this.props;
        return (React.createElement(Header, { convertPointToIndex: this.convertPointToRow, fullRegionCardinality: RegionCardinality.FULL_ROWS, getCellExtremaClasses: this.getCellExtremaClasses, getCellIndexClass: Classes.rowCellIndexClass, getCellSize: this.getRowHeight, getDragCoordinate: this.getDragCoordinate, getIndexClass: Classes.rowIndexClass, getMouseCoordinate: this.getMouseCoordinate, ghostCellRenderer: this.renderGhostCell, handleResizeEnd: this.handleResizeEnd, handleSizeChanged: this.handleSizeChanged, headerCellIsReorderablePropName: "enableRowReordering", headerCellIsSelectedPropName: "isRowSelected", headerCellRenderer: rowHeaderCellRenderer, indexEnd: indexEnd, indexStart: indexStart, isCellSelected: this.isCellSelected, isGhostIndex: this.isGhostIndex, maxSize: maxSize, minSize: minSize, resizeOrientation: Orientation.HORIZONTAL, selectedRegions: [], toRegion: this.toRegion, wrapCells: this.wrapCells, ...spreadableProps }));
    }
    wrapCells = (cells) => {
        const { rowIndexStart, grid } = this.props;
        const tableHeight = grid.getRect().height;
        const scrollTopCorrection = this.props.grid.getCumulativeHeightBefore(rowIndexStart);
        const style = {
            // reduce the height to clamp the sliding window as we approach the final headers; otherwise,
            // we'll have tons of useless whitespace at the end.
            height: tableHeight - scrollTopCorrection,
            // only header cells in view will render, but we need to reposition them to stay in view
            // as we scroll vertically.
            transform: `translateY(${scrollTopCorrection || 0}px)`,
        };
        // add a wrapper set to the full-table height to ensure container styles stretch from the first
        // cell all the way to the last
        return (React.createElement("div", { style: { height: tableHeight } },
            React.createElement("div", { className: Classes.TABLE_ROW_HEADERS_CELLS_CONTAINER, style: style }, cells)));
    };
    convertPointToRow = (clientXOrY, useMidpoint) => {
        return this.props.locator?.convertPointToRow(clientXOrY, useMidpoint);
    };
    getCellExtremaClasses = (index, indexEnd) => {
        return this.props.grid.getExtremaClasses(index, 0, indexEnd, 1);
    };
    getRowHeight = (index) => {
        return this.props.grid.getRowRect(index).height;
    };
    getDragCoordinate = (clientCoords) => {
        return clientCoords[1]; // y-coordinate
    };
    getMouseCoordinate = (event) => {
        return event.clientY;
    };
    handleResizeEnd = (index, size) => {
        this.props.onResizeGuide(null);
        this.props.onRowHeightChanged(index, size);
    };
    handleSizeChanged = (index, size) => {
        const rect = this.props.grid.getRowRect(index);
        this.props.onResizeGuide([rect.top + size]);
    };
    isCellSelected = (index) => {
        return Regions.hasFullRow(this.props.selectedRegions, index);
    };
    isGhostIndex = (index) => {
        return this.props.grid.isGhostIndex(index, -1);
    };
    renderGhostCell = (index, extremaClasses) => {
        const rect = this.props.grid.getGhostCellRect(index, 0);
        return (React.createElement(RowHeaderCell2, { className: classNames(extremaClasses), index: index, key: Classes.rowIndexClass(index), loading: this.props.loading, style: { height: `${rect.height}px` } }));
    };
    toRegion = (index1, index2) => {
        // the `this` value is messed up for Regions.row, so we have to have a wrapper function here
        return Regions.row(index1, index2);
    };
}
/**
 * A default implementation of `RowHeaderRenderer` that displays 1-indexed
 * numbers for each row.
 */
export function renderDefaultRowHeader(rowIndex) {
    return React.createElement(RowHeaderCell2, { index: rowIndex, name: `${rowIndex + 1}` });
}
//# sourceMappingURL=rowHeader.js.map