/// <reference types="react" />
import { AbstractPureComponent2, OverlayLifecycleProps } from "@blueprintjs/core";
import { Popover2Props } from "@blueprintjs/popover2";
import { ColumnHeaderCellProps, IColumnHeaderCellState } from "./columnHeaderCell";
export interface ColumnHeaderCell2Props extends ColumnHeaderCellProps {
    /**
     * If `true`, adds an interaction bar on top of all column header cells, and
     * moves interaction triggers into it.
     *
     * @default false
     */
    enableColumnInteractionBar?: boolean;
    /**
     * Optional props to forward to the dropdown menu popover.
     * This has no effect if `menuRenderer` is undefined.
     */
    menuPopoverProps?: Omit<Popover2Props, "content" | keyof OverlayLifecycleProps>;
    /**
     * If `true`, clicks on the header menu target element will cause the column's
     * cells to be selected.
     *
     * @default true
     */
    selectCellsOnMenuClick?: boolean;
}
/**
 * Column header cell (v2) component.
 *
 * @see https://blueprintjs.com/docs/#table/api.columnheadercell2
 */
export declare class ColumnHeaderCell2 extends AbstractPureComponent2<ColumnHeaderCell2Props, IColumnHeaderCellState> {
    static displayName: string;
    static defaultProps: ColumnHeaderCell2Props;
    /**
     * This method determines if a `MouseEvent` was triggered on a target that
     * should be used as the header click/drag target. This enables users of
     * this component to render fully interactive components in their header
     * cells without worry of selection or resize operations from capturing
     * their mouse events.
     */
    static isHeaderMouseTarget(target: HTMLElement): boolean;
    state: {
        isActive: boolean;
    };
    render(): JSX.Element;
    private renderName;
    private maybeRenderContent;
    private maybeRenderDropdownMenu;
    private handlePopoverOpened;
    private handlePopoverClosing;
}
