import * as React from "react";
import { ColumnIndices } from "../common/grid";
import { IIndexedResizeCallback } from "../interactions/resizable";
import { ColumnHeaderCell2Props } from "./columnHeaderCell2";
import { IHeaderProps } from "./header";
/** @deprecated use ColumnHeaderRenderer */
export declare type IColumnHeaderRenderer = (columnIndex: number) => React.ReactElement<ColumnHeaderCell2Props> | null;
export declare type ColumnHeaderRenderer = IColumnHeaderRenderer;
export interface IColumnWidths {
    minColumnWidth: number;
    maxColumnWidth: number;
    defaultColumnWidth: number;
}
export interface IColumnHeaderProps extends IHeaderProps, IColumnWidths, ColumnIndices {
    /**
     * A ColumnHeaderRenderer that, for each `<Column>`, will delegate to:
     * 1. The `columnHeaderCellRenderer` method from the `<Column>`
     * 2. A `<ColumnHeaderCell2>` using the `name` prop from the `<Column>`
     * 3. A `<ColumnHeaderCell2>` with a `name` generated from `Utils.toBase26Alpha`
     */
    cellRenderer: ColumnHeaderRenderer;
    /**
     * Ref handler that receives the HTML element that should be measured to
     * indicate the fluid height of the column header.
     */
    measurableElementRef?: React.Ref<HTMLDivElement>;
    /**
     * A callback invoked when user is done resizing the column
     */
    onColumnWidthChanged: IIndexedResizeCallback;
    /**
     * Called on component mount.
     */
    onMount?: (whichHeader: "column" | "row") => void;
}
export declare class ColumnHeader extends React.Component<IColumnHeaderProps> {
    static defaultProps: {
        isReorderable: boolean;
        isResizable: boolean;
        loading: boolean;
    };
    componentDidMount(): void;
    render(): JSX.Element;
    private wrapCells;
    private convertPointToColumn;
    private getCellExtremaClasses;
    private getColumnWidth;
    private getDragCoordinate;
    private getMouseCoordinate;
    private handleResizeEnd;
    private handleResizeDoubleClick;
    private handleSizeChanged;
    private isCellSelected;
    private isGhostIndex;
    private renderGhostCell;
    private toRegion;
}
