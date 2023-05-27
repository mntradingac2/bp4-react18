import * as React from "react";
import { AbstractPureComponent2, TagInputProps } from "@blueprintjs/core";
import { ListItemsProps, SelectPopoverProps } from "../../common";
import { QueryList } from "../query-list/queryList";
export interface MultiSelect2Props<T> extends ListItemsProps<T>, SelectPopoverProps {
    /**
     * Whether the component is non-interactive.
     * If true, the list's item renderer will not be called.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the component should take up the full width of its container.
     */
    fill?: boolean;
    /**
     * Props to spread to the `Menu` listbox containing the selectable options.
     */
    menuProps?: React.HTMLAttributes<HTMLUListElement>;
    /**
     * If provided, this component will render a "clear" button inside its TagInput.
     * Clicking that button will invoke this callback to clear all items from the current selection.
     */
    onClear?: () => void;
    /**
     * Callback invoked when an item is removed from the selection by
     * removing its tag in the TagInput. This is generally more useful than
     * `tagInputProps.onRemove`  because it receives the removed value instead of
     * the value's rendered `ReactNode` tag.
     *
     * It is not recommended to supply _both_ this prop and `tagInputProps.onRemove`.
     */
    onRemove?: (value: T, index: number) => void;
    /**
     * If true, the component waits until a keydown event in the TagInput
     * before opening its popover.
     *
     * If false, the popover opens immediately after a mouse click focuses
     * the component's TagInput.
     *
     * N.B. the behavior of this prop differs slightly from the same one
     * in the Suggest component; see https://github.com/palantir/blueprint/issues/4152.
     *
     * @default false
     */
    openOnKeyDown?: boolean;
    /**
     * Input placeholder text. Shorthand for `tagInputProps.placeholder`.
     *
     * @default "Search..."
     */
    placeholder?: string;
    /** Controlled selected values. */
    selectedItems: T[];
    /**
     * Props to pass to the [TagInput component](##core/components/tag-input).
     *
     * Some properties are unavailable:
     * - `tagInputProps.inputValue`: use `query` instead
     * - `tagInputProps.onInputChange`: use `onQueryChange` instead
     *
     * Some properties are available, but discouraged. If you find yourself using these due to a bug in MultiSelect2
     * or some edge case which is not handled by `onItemSelect`, `onItemsPaste`, `onRemove`, and `onClear`, please
     * file a bug in the Blueprint repo:
     * - `tagInputProps.onChange`
     *
     * Notes for `tagInputProps.rightElement`:
     * - you are responsible for disabling any elements you may render here when the overall `MultiSelect2` is disabled
     * - if the `onClear` prop is defined, this element will override/replace the default rightElement,
     *   which is a "clear" button that removes all items from the current selection.
     */
    tagInputProps?: Partial<Omit<TagInputProps, "inputValue" | "onInputChange">>;
    /** Custom renderer to transform an item into tag content. */
    tagRenderer: (item: T) => React.ReactNode;
}
export interface MultiSelect2State {
    isOpen: boolean;
}
/**
 * Multi select (v2) component.
 *
 * @see https://blueprintjs.com/docs/#select/multi-select2
 */
export declare class MultiSelect2<T> extends AbstractPureComponent2<MultiSelect2Props<T>, MultiSelect2State> {
    static displayName: string;
    private listboxId;
    static defaultProps: {
        disabled: boolean;
        fill: boolean;
        placeholder: string;
    };
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    static ofType<U>(): new (props: MultiSelect2Props<U>) => MultiSelect2<U>;
    state: MultiSelect2State;
    input: HTMLInputElement | null;
    queryList: QueryList<T> | null;
    private refHandlers;
    componentDidUpdate(prevProps: MultiSelect2Props<T>): void;
    render(): JSX.Element;
    private renderQueryList;
    private getPopoverTargetRenderer;
    private handleItemSelect;
    private handleQueryChange;
    private handlePopoverInteraction;
    private handlePopoverOpened;
    private handleTagRemove;
    private getTagInputAddHandler;
    private getTagInputKeyDownHandler;
    private getTagInputKeyUpHandler;
    private handleClearButtonClick;
}
