import * as React from "react";
import { AbstractPureComponent2, InputGroupProps2 } from "@blueprintjs/core";
import { ListItemsProps, SelectPopoverProps } from "../../common";
export interface Select2Props<T> extends ListItemsProps<T>, SelectPopoverProps {
    /**
     * Element which triggers the select popover. In most cases, you should display
     * the name or label of the curently selected item here.
     */
    children?: React.ReactNode;
    /**
     * Whether the component is non-interactive.
     * If true, the list's item renderer will not be called.
     * Note that you'll also need to disable the component's children, if appropriate.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the component should take up the full width of its container.
     * You also have to ensure that the child component has `fill` set to `true` or is styled appropriately.
     */
    fill?: boolean;
    /**
     * Whether the dropdown list can be filtered.
     * Disabling this option will remove the `InputGroup` and ignore `inputProps`.
     *
     * @default true
     */
    filterable?: boolean;
    /**
     * Props to pass to the query [InputGroup component](#core/components/text-inputs.input-group).
     *
     * Some properties are unavailable:
     * - `inputProps.value`: use `query` instead
     * - `inputProps.onChange`: use `onQueryChange` instead
     */
    inputProps?: Partial<Omit<InputGroupProps2, "value" | "onChange">>;
    /**
     * HTML attributes to add to the `Menu` listbox containing the selectable options.
     */
    menuProps?: React.HTMLAttributes<HTMLUListElement>;
    /**
     * Whether the active item should be reset to the first matching item _when
     * the popover closes_. The query will also be reset to the empty string.
     *
     * @default false
     */
    resetOnClose?: boolean;
}
export interface Select2State {
    isOpen: boolean;
}
/**
 * Select (v2) component.
 *
 * @see https://blueprintjs.com/docs/#select/select2
 */
export declare class Select2<T> extends AbstractPureComponent2<Select2Props<T>, Select2State> {
    static displayName: string;
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    static ofType<U>(): new (props: Select2Props<U>) => Select2<U>;
    state: Select2State;
    inputElement: HTMLInputElement | null;
    private queryList;
    private previousFocusedElement;
    private handleInputRef;
    private handleQueryListRef;
    private listboxId;
    render(): JSX.Element;
    componentDidUpdate(prevProps: Select2Props<T>, prevState: Select2State): void;
    private renderQueryList;
    private getPopoverTargetRenderer;
    private maybeRenderClearButton;
    private withPopoverTargetPropsHandler;
    /**
     * Target wrapper element "keydown" handler while the popover is closed.
     */
    private handleTargetKeyDown;
    private handleItemSelect;
    private handlePopoverInteraction;
    private handlePopoverOpening;
    private handlePopoverOpened;
    private handlePopoverClosing;
    private resetQuery;
}
