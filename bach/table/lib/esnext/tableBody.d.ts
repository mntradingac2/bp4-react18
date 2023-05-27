import * as React from "react";
import { AbstractComponent2 } from "@blueprintjs/core";
import { RenderMode } from "./common/renderMode";
import { IContextMenuRenderer } from "./interactions/menus";
import { ISelectableProps } from "./interactions/selectable";
import { ILocator } from "./locator";
import { ITableBodyCellsProps } from "./tableBodyCells";
export declare type TableBodyProps = ITableBodyProps;
/** @deprecated use TableBodyProps */
export interface ITableBodyProps extends ISelectableProps, ITableBodyCellsProps {
    /**
     * An optional callback for displaying a context menu when right-clicking
     * on the table body. The callback is supplied with an `IMenuContext`
     * containing the `Region`s of interest.
     */
    bodyContextMenuRenderer?: IContextMenuRenderer;
    /**
     * Locates the row/column/cell given a mouse event.
     */
    locator: ILocator;
    /**
     * The number of columns to freeze to the left side of the table, counting from the leftmost column.
     */
    numFrozenColumns?: number;
    /**
     * The number of rows to freeze to the top of the table, counting from the topmost row.
     */
    numFrozenRows?: number;
}
/** @deprecated use TableBody2 instead */
export declare class TableBody extends AbstractComponent2<TableBodyProps> {
    static defaultProps: {
        loading: boolean;
        renderMode: RenderMode;
    };
    /**
     * @deprecated, will be removed from public API in the next major version
     */
    static cellClassNames(rowIndex: number, columnIndex: number): string[];
    private activationCell;
    shouldComponentUpdate(nextProps: ITableBodyProps): boolean;
    render(): JSX.Element;
    renderContextMenu: (e: React.MouseEvent<HTMLElement>) => JSX.Element | undefined;
    private handleSelectionEnd;
    private locateClick;
    private locateDrag;
}
