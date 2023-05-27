/// <reference types="react" />
import { AbstractComponent2 } from "@blueprintjs/core";
import { ContextMenu2ContentProps } from "@blueprintjs/popover2";
import { RenderMode } from "./common/renderMode";
import type { TableBodyProps } from "./tableBody";
export declare class TableBody2 extends AbstractComponent2<TableBodyProps> {
    static defaultProps: {
        loading: boolean;
        renderMode: RenderMode;
    };
    /**
     * @deprecated, will be removed from public API in the next major version
     */
    static cellClassNames(rowIndex: number, columnIndex: number): string[];
    private activationCell;
    shouldComponentUpdate(nextProps: TableBodyProps): boolean;
    render(): JSX.Element;
    renderContextMenu: ({ mouseEvent }: ContextMenu2ContentProps) => JSX.Element | undefined;
    private handleContextMenu;
    private handleSelectionEnd;
    private locateClick;
    private locateDrag;
}
