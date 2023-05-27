import * as React from "react";
import { RowIndices } from "../common/grid";
import { IIndexedResizeCallback } from "../interactions/resizable";
import { IHeaderProps } from "./header";
import type { RowHeaderCellProps } from "./rowHeaderCell";
/** @deprecated use RowHeaderRenderer */
export declare type IRowHeaderRenderer = (rowIndex: number) => React.ReactElement<RowHeaderCellProps>;
export declare type RowHeaderRenderer = IRowHeaderRenderer;
export interface IRowHeights {
    minRowHeight: number;
    maxRowHeight: number;
    defaultRowHeight: number;
}
export interface IRowHeaderProps extends IHeaderProps, IRowHeights, RowIndices {
    /**
     * A callback invoked when user is done resizing the column
     */
    onRowHeightChanged: IIndexedResizeCallback;
    /**
     * Renders the cell for each row header
     */
    rowHeaderCellRenderer?: RowHeaderRenderer;
    /**
     * Called on component mount.
     */
    onMount?: (whichHeader: "column" | "row") => void;
}
export declare class RowHeader extends React.Component<IRowHeaderProps> {
    static defaultProps: {
        rowHeaderCellRenderer: typeof renderDefaultRowHeader;
    };
    componentDidMount(): void;
    render(): JSX.Element;
    private wrapCells;
    private convertPointToRow;
    private getCellExtremaClasses;
    private getRowHeight;
    private getDragCoordinate;
    private getMouseCoordinate;
    private handleResizeEnd;
    private handleSizeChanged;
    private isCellSelected;
    private isGhostIndex;
    private renderGhostCell;
    private toRegion;
}
/**
 * A default implementation of `RowHeaderRenderer` that displays 1-indexed
 * numbers for each row.
 */
export declare function renderDefaultRowHeader(rowIndex: number): JSX.Element;
