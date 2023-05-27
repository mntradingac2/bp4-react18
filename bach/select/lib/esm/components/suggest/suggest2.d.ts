import * as React from "react";
import { AbstractPureComponent2, InputGroupProps2 } from "@blueprintjs/core";
import { ListItemsProps, SelectPopoverProps } from "../../common";
export interface Suggest2Props<T> extends ListItemsProps<T>, Omit<SelectPopoverProps, "popoverTargetProps"> {
    /**
     * Whether the popover should close after selecting an item.
     *
     * @default true
     */
    closeOnSelect?: boolean;
    /** Whether the input field should be disabled. */
    disabled?: boolean;
    /**
     * Whether the component should take up the full width of its container.
     */
    fill?: boolean;
    /**
     * Props to pass to the query [InputGroup component](#core/components/text-inputs.input-group).
     *
     * Some properties are unavailable:
     * - `inputProps.value`: use `query` instead
     * - `inputProps.onChange`: use `onQueryChange` instead
     * - `inputProps.disabled`: use `disabled` instead
     * - `inputProps.fill`: use `fill` instead
     *
     * Other notes:
     * - `inputProps.tagName` will override `popoverProps.targetTagName`
     * - `inputProps.className` will work as expected, but this is redundant with the simpler `className` prop
     */
    inputProps?: Partial<Omit<InputGroupProps2, "disabled" | "fill" | "value" | "onChange">>;
    /** Custom renderer to transform an item into a string for the input value. */
    inputValueRenderer: (item: T) => string;
    /**
     * The uncontrolled default selected item.
     * This prop is ignored if `selectedItem` is used to control the state.
     */
    defaultSelectedItem?: T;
    /**
     * The currently selected item, or `null` to indicate that no item is selected.
     * If omitted or `undefined`, this prop will be uncontrolled (managed by the component's state).
     * Use `onItemSelect` to listen for updates.
     */
    selectedItem?: T | null;
    /**
     * HTML attributes to add to the `Menu` listbox containing the selectable options.
     */
    menuProps?: React.HTMLAttributes<HTMLUListElement>;
    /**
     * If true, the component waits until a keydown event in the TagInput
     * before opening its popover.
     *
     * If false, the popover opens immediately after a mouse click or TAB key
     * interaction focuses the component's TagInput.
     *
     * @default false
     */
    openOnKeyDown?: boolean;
    /**
     * Whether the active item should be reset to the first matching item _when
     * the popover closes_. The query will also be reset to the empty string.
     *
     * @default false
     */
    resetOnClose?: boolean;
}
export interface Suggest2State<T> {
    isOpen: boolean;
    selectedItem: T | null;
}
/**
 * Suggest (v2) component.
 *
 * @see https://blueprintjs.com/docs/#select/suggest2
 */
export declare class Suggest2<T> extends AbstractPureComponent2<Suggest2Props<T>, Suggest2State<T>> {
    static displayName: string;
    static defaultProps: Partial<Suggest2Props<any>>;
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    static ofType<U>(): new (props: Suggest2Props<U>) => Suggest2<U>;
    state: Suggest2State<T>;
    inputElement: HTMLInputElement | null;
    private queryList;
    private handleInputRef;
    private handleQueryListRef;
    private listboxId;
    render(): JSX.Element;
    componentDidUpdate(prevProps: Suggest2Props<T>, prevState: Suggest2State<T>): void;
    private renderQueryList;
    private getPopoverTargetRenderer;
    private selectText;
    private handleInputFocus;
    private handleItemSelect;
    private getInitialSelectedItem;
    private handlePopoverInteraction;
    private handlePopoverOpening;
    private handlePopoverOpened;
    private getTargetKeyDownHandler;
    private getTargetKeyUpHandler;
    private maybeResetActiveItemToSelectedItem;
}
