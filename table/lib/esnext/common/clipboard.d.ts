export declare const Clipboard: {
    /**
     * Overrides the inherited CSS of the element to make sure it is
     * selectable. This method also makes the element pseudo-invisible.
     *
     * @deprecated will be removed in v4.0
     */
    applySelectableStyles(elem: HTMLElement): HTMLElement;
    /**
     * Copies table cells to the clipboard. The parameter is a row-major
     * 2-dimensional `Array` of strings and can contain nulls. We assume all
     * rows are the same length. If not, the cells will still be copied, but
     * the columns may not align.
     *
     * @returns a Promise which resolves or rejects if the copy succeeds.
     *
     * See `Clipboard.copy`
     */
    copyCells(cells: string[][]): Promise<void>;
    /**
     * Copies the text to the clipboard.
     *
     * @returns a Promise which resolves or rejects if the copy succeeds.
     */
    copyString(value: string): Promise<void>;
};
