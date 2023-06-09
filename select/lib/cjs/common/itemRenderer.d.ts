import * as React from "react";
/** @deprecated use ItemModifiers */
export declare type IItemModifiers = ItemModifiers;
export interface ItemModifiers {
    /** Whether this is the "active" (focused) item, meaning keyboard interactions will act upon it. */
    active: boolean;
    /** Whether this item is disabled and should ignore interactions. */
    disabled: boolean;
    /** Whether this item matches the predicate. A typical renderer could hide `false` values. */
    matchesPredicate: boolean;
}
/** @deprecated use ItemRendererProps */
export declare type IItemRendererProps = ItemRendererProps;
/**
 * An object describing how to render a particular item.
 * An `itemRenderer` receives the item as its first argument, and this object as its second argument.
 *
 * Make sure to forward the provided `ref` to the rendered element (usually via the `elementRef` prop on `MenuItem`/`MenuItem2`)
 * to ensure that scrolling to active items works correctly.
 *
 * @template T type of the DOM element rendered for this item to which we can attach a ref (defaults to MenuItem's HTMLLIElement)
 */
export interface ItemRendererProps<T extends HTMLElement = HTMLLIElement> {
    /**
     * A ref attached the native HTML element rendered by this item.
     *
     * N.B. this is optional to preserve backwards-compatibilty with @blueprintjs/select version < 4.9.0
     */
    ref?: React.Ref<T>;
    /** Click event handler to select this item. */
    handleClick: React.MouseEventHandler<HTMLElement>;
    /**
     * Focus event handler to set this as the "active" item.
     *
     * N.B. this is optional to preserve backwards-compatibility with @blueprintjs/select version < 4.2.0
     */
    handleFocus?: () => void;
    index?: number;
    /** Modifiers that describe how to render this item, such as `active` or `disabled`. */
    modifiers: ItemModifiers;
    /** The current query string used to filter the items. */
    query: string;
}
/**
 * Type alias for a function that receives an item and props and renders a JSX element (or `null`).
 *
 * @template T list item data type
 */
export declare type ItemRenderer<T> = (item: T, itemProps: ItemRendererProps) => JSX.Element | null;
