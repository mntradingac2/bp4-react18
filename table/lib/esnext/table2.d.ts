import * as React from "react";
import { AbstractComponent2 } from "@blueprintjs/core";
import { Grid, ICellMapper } from "./common/grid";
import { Locator } from "./locator";
import { Region } from "./regions";
import { IResizeRowsByApproximateHeightOptions } from "./resizeRows";
import type { TableProps, TablePropsDefaults, TablePropsWithDefaults } from "./tableProps";
import type { TableSnapshot, TableState } from "./tableState";
export interface Table2Props extends TableProps {
    /**
     * This dependency list may be used to trigger a re-render of all cells when one of its elements changes
     * (compared using shallow equality checks). This is done by invalidating the grid, which forces
     * TableQuadrantStack to re-render.
     */
    cellRendererDependencies?: React.DependencyList;
}
/**
 * Table (v2) component.
 *
 * @see https://blueprintjs.com/docs/#table/table2
 */
export declare class Table2 extends AbstractComponent2<Table2Props, TableState, TableSnapshot> {
    static displayName: string;
    static defaultProps: TablePropsDefaults;
    static getDerivedStateFromProps(props: TablePropsWithDefaults, state: TableState): {
        childrenArray: React.ReactElement<import("./column").IColumnProps, string | React.JSXElementConstructor<any>>[];
        columnIdToIndex: {
            [key: string]: number;
        };
        columnWidths: (number | null | undefined)[];
        focusedCell: import("./common/cellTypes").IFocusedCellCoordinates | undefined;
        numFrozenColumnsClamped: number;
        numFrozenRowsClamped: number;
        rowHeights: (number | null | undefined)[];
        selectedRegions: import("./regions").IRegion[];
    } | null;
    private static SHALLOW_COMPARE_PROP_KEYS_DENYLIST;
    private static SHALLOW_COMPARE_STATE_KEYS_DENYLIST;
    private static createColumnIdIndex;
    private hotkeys;
    private hotkeysImpl;
    grid: Grid | null;
    locator?: Locator;
    private resizeSensorDetach?;
    private refHandlers;
    private cellContainerElement?;
    private columnHeaderElement?;
    private columnHeaderHeight;
    private quadrantStackInstance?;
    private rootTableElement?;
    private rowHeaderElement?;
    private rowHeaderWidth;
    private scrollContainerElement?;
    private didColumnHeaderMount;
    private didRowHeaderMount;
    private didCompletelyMount;
    constructor(props: TablePropsWithDefaults, context?: any);
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
    resizeRowsByApproximateHeight(getCellText: ICellMapper<string>, options?: IResizeRowsByApproximateHeightOptions): void;
    /**
     * Resize all rows in the table to the height of the tallest visible cell in the specified columns.
     * If no indices are provided, default to using the tallest visible cell from all columns in view.
     */
    resizeRowsByTallestCell(columnIndices?: number | number[]): void;
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
    scrollToRegion(region: Region): void;
    /**
     * Scrolls the table by a specified number of offset pixels in either the horizontal or vertical dimension.
     * Will set a scroll indicator gradient which can be cleared by calling scrollByOffset(null);
     *
     * @param relativeOffset - How much to scroll the table body in pixels relative to the current scroll offset
     */
    scrollByOffset(relativeOffset: {
        left: number;
        top: number;
    } | null): void;
    shouldComponentUpdate(nextProps: Table2Props, nextState: TableState): boolean;
    render(): JSX.Element;
    private renderTableContents;
    /**
     * When the component mounts, the HTML Element refs will be available, so
     * we constructor the Locator, which queries the elements' bounding
     * ClientRects.
     */
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Table2Props, prevState: TableState): void;
    protected validateProps(props: TableProps): void;
    private gridDimensionsMatchProps;
    private shouldDisableVerticalScroll;
    private shouldDisableHorizontalScroll;
    private shouldRenderScrollDirection;
    private renderMenu;
    private handleMenuMouseDown;
    private selectAll;
    private getColumnProps;
    private columnHeaderCellRenderer;
    private renderColumnHeader;
    private renderRowHeader;
    private bodyCellRenderer;
    private renderBody;
    private isGuideLayerShowing;
    private getEnabledSelectionHandler;
    private invalidateGrid;
    /**
     * This method's arguments allow us to support the following use case:
     * In some cases, we want to update the grid _before_ this.setState() is called with updated
     * `columnWidths` or `rowHeights` so that when that setState update _does_ flush through the React render
     * tree, our TableQuadrantStack has the correct updated grid measurements.
     */
    private validateGrid;
    /**
     * Renders a scroll indicator overlay on top of the table body inside the quadrant stack.
     * This component is offset by the headers and scrollbar, and it provides the overlay which
     * we use to render automatic scrolling indicator linear gradients.
     *
     * @param scrollBarWidth the calculated scroll bar width to be passed in by the quadrant stack
     * @param columnHeaderHeight the calculated column header height to be passed in by the quadrant stack
     * @returns A jsx element which will render a linear gradient with smooth transitions based on
     *          state of the scroll (will not render if we are already at the top/left/right/bottom)
     *           and the state of "scroll direction"
     */
    private renderScrollIndicatorOverlay;
    /**
     * Renders a `RegionLayer`, applying styles to the regions using the
     * supplied `RegionStyler`. `RegionLayer` is a pure component, so
     * the `RegionStyler` should be a new instance on every render if we
     * intend to redraw the region layer.
     */
    private maybeRenderRegions;
    private handleHeaderMounted;
    private handleCompleteRender;
    private styleBodyRegion;
    private styleMenuRegion;
    private styleColumnHeaderRegion;
    private styleRowHeaderRegion;
    private handleColumnWidthChanged;
    private handleRowHeightChanged;
    private handleRootScroll;
    private handleBodyScroll;
    private clearSelection;
    private syncViewportPosition;
    private handleFocus;
    private handleSelection;
    private handleColumnsReordering;
    private handleColumnsReordered;
    private handleRowsReordering;
    private handleRowsReordered;
    private handleLayoutLock;
    private updateLocator;
    private updateViewportRect;
    private invokeOnVisibleCellsChangeCallback;
    private getMaxFrozenColumnIndex;
    private getMaxFrozenRowIndex;
    /**
     * Normalizes RenderMode.BATCH_ON_UPDATE into RenderMode.{BATCH,NONE}. We do
     * this because there are actually multiple updates required before the
     * <Table> is considered fully "mounted," and adding that knowledge to child
     * components would lead to tight coupling. Thus, keep it simple for them.
     */
    private getNormalizedRenderMode;
    private handleColumnResizeGuide;
    private handleRowResizeGuide;
}
