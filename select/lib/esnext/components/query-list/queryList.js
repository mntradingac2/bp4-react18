/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react";
import { AbstractComponent2, DISPLAYNAME_PREFIX, Keys, Menu, Utils } from "@blueprintjs/core";
import { executeItemsEqual, getActiveItem, getCreateNewItem, isCreateNewItem, renderFilteredItems, } from "../../common";
/**
 * Query list component.
 *
 * @see https://blueprintjs.com/docs/#select/query-list
 */
export class QueryList extends AbstractComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.QueryList`;
    static defaultProps = {
        disabled: false,
        resetOnQuery: true,
    };
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    static ofType() {
        return QueryList;
    }
    itemsParentRef;
    itemRefs = new Map();
    refHandlers = {
        itemsParent: (ref) => (this.itemsParentRef = ref),
    };
    /**
     * Flag indicating that we should check whether selected item is in viewport
     * after rendering, typically because of keyboard change. Set to `true` when
     * manipulating state in a way that may cause active item to scroll away.
     */
    shouldCheckActiveItemInViewport = false;
    /**
     * The item that we expect to be the next selected active item (based on click
     * or key interactions). When scrollToActiveItem = false, used to detect if
     * an unexpected external change to the active item has been made.
     */
    expectedNextActiveItem = null;
    /**
     * Flag which is set to true while in between an ENTER "keydown" event and its
     * corresponding "keyup" event.
     *
     * When entering text via an IME (https://en.wikipedia.org/wiki/Input_method),
     * the ENTER key is pressed to confirm the character(s) to be input from a list
     * of options. The operating system intercepts the ENTER "keydown" event and
     * prevents it from propagating to the application, but "keyup" is still
     * fired, triggering a spurious event which this component does not expect.
     *
     * To work around this quirk, we keep track of "real" key presses by setting
     * this flag in handleKeyDown.
     */
    isEnterKeyPressed = false;
    constructor(props, context) {
        super(props, context);
        const { query = "" } = props;
        const createNewItem = props.createNewItemFromQuery?.(query);
        const filteredItems = getFilteredItems(query, props);
        this.state = {
            activeItem: props.activeItem !== undefined
                ? props.activeItem
                : props.initialActiveItem ?? getFirstEnabledItem(filteredItems, props.itemDisabled),
            createNewItem,
            filteredItems,
            query,
        };
    }
    render() {
        const { className, items, renderer, itemListRenderer = this.renderItemList, menuProps } = this.props;
        const { createNewItem, ...spreadableState } = this.state;
        return renderer({
            ...spreadableState,
            className,
            handleItemSelect: this.handleItemSelect,
            handleKeyDown: this.handleKeyDown,
            handleKeyUp: this.handleKeyUp,
            handlePaste: this.handlePaste,
            handleQueryChange: this.handleInputQueryChange,
            itemList: itemListRenderer({
                ...spreadableState,
                items,
                itemsParentRef: this.refHandlers.itemsParent,
                menuProps,
                renderCreateItem: this.renderCreateItemMenuItem,
                renderItem: this.renderItem,
            }),
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.activeItem !== undefined && this.props.activeItem !== this.state.activeItem) {
            this.shouldCheckActiveItemInViewport = true;
            this.setState({ activeItem: this.props.activeItem });
        }
        if (this.props.query != null && this.props.query !== prevProps.query) {
            // new query
            this.setQuery(this.props.query, this.props.resetOnQuery, this.props);
        }
        else if (
        // same query (or uncontrolled query), but items in the list changed
        !Utils.shallowCompareKeys(this.props, prevProps, {
            include: ["items", "itemListPredicate", "itemPredicate"],
        })) {
            this.setQuery(this.state.query);
        }
        if (this.shouldCheckActiveItemInViewport) {
            // update scroll position immediately before repaint so DOM is accurate
            // (latest filteredItems) and to avoid flicker.
            this.requestAnimationFrame(() => this.scrollActiveItemIntoView());
            // reset the flag
            this.shouldCheckActiveItemInViewport = false;
        }
    }
    scrollActiveItemIntoView() {
        const scrollToActiveItem = this.props.scrollToActiveItem !== false;
        const externalChangeToActiveItem = !executeItemsEqual(this.props.itemsEqual, getActiveItem(this.expectedNextActiveItem), getActiveItem(this.props.activeItem));
        this.expectedNextActiveItem = null;
        if (!scrollToActiveItem && externalChangeToActiveItem) {
            return;
        }
        const activeElement = this.getActiveElement();
        if (this.itemsParentRef != null && activeElement != null) {
            const { offsetTop: activeTop, offsetHeight: activeHeight } = activeElement;
            const { offsetTop: parentOffsetTop, scrollTop: parentScrollTop, clientHeight: parentHeight, } = this.itemsParentRef;
            // compute padding on parent element to ensure we always leave space
            const { paddingTop, paddingBottom } = this.getItemsParentPadding();
            // compute the two edges of the active item for comparison, including parent padding
            const activeBottomEdge = activeTop + activeHeight + paddingBottom - parentOffsetTop;
            const activeTopEdge = activeTop - paddingTop - parentOffsetTop;
            if (activeBottomEdge >= parentScrollTop + parentHeight) {
                // offscreen bottom: align bottom of item with bottom of viewport
                this.itemsParentRef.scrollTop = activeBottomEdge + activeHeight - parentHeight;
            }
            else if (activeTopEdge <= parentScrollTop) {
                // offscreen top: align top of item with top of viewport
                this.itemsParentRef.scrollTop = activeTopEdge - activeHeight;
            }
        }
    }
    setQuery(query, resetActiveItem = this.props.resetOnQuery, props = this.props) {
        const { createNewItemFromQuery } = props;
        this.shouldCheckActiveItemInViewport = true;
        const hasQueryChanged = query !== this.state.query;
        if (hasQueryChanged) {
            props.onQueryChange?.(query);
        }
        // Leading and trailing whitespace can be confusing to display, so we remove it when passing it
        // to functions dealing with data, like createNewItemFromQuery. But we need the unaltered user-typed
        // query to remain in state to be able to render controlled text inputs properly.
        const trimmedQuery = query.trim();
        const filteredItems = getFilteredItems(trimmedQuery, props);
        const createNewItem = createNewItemFromQuery != null && trimmedQuery !== "" ? createNewItemFromQuery(trimmedQuery) : undefined;
        this.setState({ createNewItem, filteredItems, query });
        // always reset active item if it's now filtered or disabled
        const activeIndex = this.getActiveIndex(filteredItems);
        const shouldUpdateActiveItem = resetActiveItem ||
            activeIndex < 0 ||
            isItemDisabled(getActiveItem(this.state.activeItem), activeIndex, props.itemDisabled);
        if (shouldUpdateActiveItem) {
            // if the `createNewItem` is first, that should be the first active item.
            if (this.isCreateItemRendered(createNewItem) && this.isCreateItemFirst()) {
                this.setActiveItem(getCreateNewItem());
            }
            else {
                this.setActiveItem(getFirstEnabledItem(filteredItems, props.itemDisabled));
            }
        }
    }
    setActiveItem(activeItem) {
        this.expectedNextActiveItem = activeItem;
        if (this.props.activeItem === undefined) {
            // indicate that the active item may need to be scrolled into view after update.
            this.shouldCheckActiveItemInViewport = true;
            this.setState({ activeItem });
        }
        if (isCreateNewItem(activeItem)) {
            this.props.onActiveItemChange?.(null, true);
        }
        else {
            this.props.onActiveItemChange?.(activeItem, false);
        }
    }
    /** default `itemListRenderer` implementation */
    renderItemList = (listProps) => {
        const { initialContent, noResults } = this.props;
        // omit noResults if createNewItemFromQuery and createNewItemRenderer are both supplied, and query is not empty
        const createItemView = listProps.renderCreateItem();
        const maybeNoResults = createItemView != null ? null : noResults;
        const menuContent = renderFilteredItems(listProps, maybeNoResults, initialContent);
        if (menuContent == null && createItemView == null) {
            return null;
        }
        const createFirst = this.isCreateItemFirst();
        return (React.createElement(Menu, { role: "listbox", ...listProps.menuProps, ulRef: listProps.itemsParentRef },
            createFirst && createItemView,
            menuContent,
            !createFirst && createItemView));
    };
    /** wrapper around `itemRenderer` to inject props */
    renderItem = (item, index) => {
        if (this.props.disabled !== true) {
            const { activeItem, query, filteredItems } = this.state;
            const modifiers = {
                active: executeItemsEqual(this.props.itemsEqual, getActiveItem(activeItem), item),
                disabled: isItemDisabled(item, index, this.props.itemDisabled),
                matchesPredicate: filteredItems.indexOf(item) >= 0,
            };
            return this.props.itemRenderer(item, {
                handleClick: e => this.handleItemSelect(item, e),
                handleFocus: () => this.setActiveItem(item),
                index,
                modifiers,
                query,
                ref: node => {
                    if (node) {
                        this.itemRefs.set(index, node);
                    }
                    else {
                        this.itemRefs.delete(index);
                    }
                },
            });
        }
        return null;
    };
    renderCreateItemMenuItem = () => {
        if (this.isCreateItemRendered(this.state.createNewItem)) {
            const { activeItem, query } = this.state;
            const trimmedQuery = query.trim();
            const handleClick = evt => {
                this.handleItemCreate(trimmedQuery, evt);
            };
            const isActive = isCreateNewItem(activeItem);
            return this.props.createNewItemRenderer(trimmedQuery, isActive, handleClick);
        }
        return null;
    };
    getActiveElement() {
        const { activeItem } = this.state;
        if (this.itemsParentRef != null) {
            if (isCreateNewItem(activeItem)) {
                const index = this.isCreateItemFirst() ? 0 : this.state.filteredItems.length;
                return this.itemsParentRef.children.item(index);
            }
            else {
                const activeIndex = this.getActiveIndex();
                return (this.itemRefs.get(activeIndex) ?? this.itemsParentRef.children.item(activeIndex));
            }
        }
        return undefined;
    }
    getActiveIndex(items = this.state.filteredItems) {
        const { activeItem } = this.state;
        if (activeItem == null || isCreateNewItem(activeItem)) {
            return -1;
        }
        // NOTE: this operation is O(n) so it should be avoided in render(). safe for events though.
        for (let i = 0; i < items.length; ++i) {
            if (executeItemsEqual(this.props.itemsEqual, items[i], activeItem)) {
                return i;
            }
        }
        return -1;
    }
    getItemsParentPadding() {
        // assert ref exists because it was checked before calling
        const { paddingTop, paddingBottom } = getComputedStyle(this.itemsParentRef);
        return {
            paddingBottom: pxToNumber(paddingBottom),
            paddingTop: pxToNumber(paddingTop),
        };
    }
    handleItemCreate = (query, evt) => {
        // we keep a cached createNewItem in state, but might as well recompute
        // the result just to be sure it's perfectly in sync with the query.
        const value = this.props.createNewItemFromQuery?.(query);
        if (value != null) {
            const newItems = Array.isArray(value) ? value : [value];
            for (const item of newItems) {
                this.props.onItemSelect?.(item, evt);
            }
            this.maybeResetQuery();
        }
    };
    handleItemSelect = (item, event) => {
        this.setActiveItem(item);
        this.props.onItemSelect?.(item, event);
        this.maybeResetQuery();
    };
    handlePaste = (queries) => {
        const { createNewItemFromQuery, onItemsPaste } = this.props;
        let nextActiveItem;
        const nextQueries = [];
        // Find an exising item that exactly matches each pasted value, or
        // create a new item if possible. Ignore unmatched values if creating
        // items is disabled.
        const pastedItemsToEmit = [];
        for (const query of queries) {
            const equalItem = getMatchingItem(query, this.props);
            if (equalItem !== undefined) {
                nextActiveItem = equalItem;
                pastedItemsToEmit.push(equalItem);
            }
            else if (this.canCreateItems()) {
                const value = createNewItemFromQuery?.(query);
                if (value !== undefined) {
                    const newItems = Array.isArray(value) ? value : [value];
                    pastedItemsToEmit.push(...newItems);
                }
            }
            else {
                nextQueries.push(query);
            }
        }
        // UX nicety: combine all unmatched queries into a single
        // comma-separated query in the input, so we don't lose any information.
        // And don't reset the active item; we'll do that ourselves below.
        this.setQuery(nextQueries.join(", "), false);
        // UX nicety: update the active item if we matched with at least one
        // existing item.
        if (nextActiveItem !== undefined) {
            this.setActiveItem(nextActiveItem);
        }
        onItemsPaste?.(pastedItemsToEmit);
    };
    handleKeyDown = (event) => {
        // eslint-disable-next-line deprecation/deprecation
        const { keyCode } = event;
        if (keyCode === Keys.ARROW_UP || keyCode === Keys.ARROW_DOWN) {
            event.preventDefault();
            const nextActiveItem = this.getNextActiveItem(keyCode === Keys.ARROW_UP ? -1 : 1);
            if (nextActiveItem != null) {
                this.setActiveItem(nextActiveItem);
            }
        }
        else if (keyCode === Keys.ENTER) {
            this.isEnterKeyPressed = true;
        }
        this.props.onKeyDown?.(event);
    };
    handleKeyUp = (event) => {
        const { onKeyUp } = this.props;
        const { activeItem } = this.state;
        // eslint-disable-next-line deprecation/deprecation
        if (event.keyCode === Keys.ENTER && this.isEnterKeyPressed) {
            // We handle ENTER in keyup here to play nice with the Button component's keyboard
            // clicking. Button is commonly used as the only child of Select. If we were to
            // instead process ENTER on keydown, then Button would click itself on keyup and
            // the Select popover would re-open.
            event.preventDefault();
            if (activeItem == null || isCreateNewItem(activeItem)) {
                this.handleItemCreate(this.state.query, event);
            }
            else {
                this.handleItemSelect(activeItem, event);
            }
            this.isEnterKeyPressed = false;
        }
        onKeyUp?.(event);
    };
    handleInputQueryChange = (event) => {
        const query = event == null ? "" : event.target.value;
        this.setQuery(query);
        this.props.onQueryChange?.(query, event);
    };
    /**
     * Get the next enabled item, moving in the given direction from the start
     * index. A `null` return value means no suitable item was found.
     *
     * @param direction amount to move in each iteration, typically +/-1
     * @param startIndex item to start iteration
     */
    getNextActiveItem(direction, startIndex = this.getActiveIndex()) {
        if (this.isCreateItemRendered(this.state.createNewItem)) {
            const reachedCreate = (startIndex === 0 && direction === -1) ||
                (startIndex === this.state.filteredItems.length - 1 && direction === 1);
            if (reachedCreate) {
                return getCreateNewItem();
            }
        }
        return getFirstEnabledItem(this.state.filteredItems, this.props.itemDisabled, direction, startIndex);
    }
    /**
     * @param createNewItem Checks if this item would match the current query. Cannot check this.state.createNewItem
     *  every time since state may not have been updated yet.
     */
    isCreateItemRendered(createNewItem) {
        return (this.canCreateItems() &&
            this.state.query !== "" &&
            // this check is unfortunately O(N) on the number of items, but
            // alas, hiding the "Create Item" option when it exactly matches an
            // existing item is much clearer.
            !this.wouldCreatedItemMatchSomeExistingItem(createNewItem));
    }
    isCreateItemFirst() {
        return this.props.createNewItemPosition === "first";
    }
    canCreateItems() {
        return this.props.createNewItemFromQuery != null && this.props.createNewItemRenderer != null;
    }
    wouldCreatedItemMatchSomeExistingItem(createNewItem) {
        // search only the filtered items, not the full items list, because we
        // only need to check items that match the current query.
        return this.state.filteredItems.some(item => {
            const newItems = Array.isArray(createNewItem) ? createNewItem : [createNewItem];
            return newItems.some(newItem => executeItemsEqual(this.props.itemsEqual, item, newItem));
        });
    }
    maybeResetQuery() {
        if (this.props.resetOnSelect) {
            this.setQuery("", true);
        }
    }
}
function pxToNumber(value) {
    return value == null ? 0 : parseInt(value.slice(0, -2), 10);
}
function getMatchingItem(query, { items, itemPredicate }) {
    if (Utils.isFunction(itemPredicate)) {
        // .find() doesn't exist in ES5. Alternative: use a for loop instead of
        // .filter() so that we can return as soon as we find the first match.
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (itemPredicate(query, item, i, true)) {
                return item;
            }
        }
    }
    return undefined;
}
function getFilteredItems(query, { items, itemPredicate, itemListPredicate }) {
    if (Utils.isFunction(itemListPredicate)) {
        // note that implementations can reorder the items here
        return itemListPredicate(query, items);
    }
    else if (Utils.isFunction(itemPredicate)) {
        return items.filter((item, index) => itemPredicate(query, item, index));
    }
    return items;
}
/** Wrap number around min/max values: if it exceeds one bound, return the other. */
function wrapNumber(value, min, max) {
    if (value < min) {
        return max;
    }
    else if (value > max) {
        return min;
    }
    return value;
}
function isItemDisabled(item, index, itemDisabled) {
    if (itemDisabled == null || item == null) {
        return false;
    }
    else if (Utils.isFunction(itemDisabled)) {
        return itemDisabled(item, index);
    }
    return !!item[itemDisabled];
}
/**
 * Get the next enabled item, moving in the given direction from the start
 * index. A `null` return value means no suitable item was found.
 *
 * @param items the list of items
 * @param itemDisabled callback to determine if a given item is disabled
 * @param direction amount to move in each iteration, typically +/-1
 * @param startIndex which index to begin moving from
 */
export function getFirstEnabledItem(items, itemDisabled, direction = 1, startIndex = items.length - 1) {
    if (items.length === 0) {
        return null;
    }
    // remember where we started to prevent an infinite loop
    let index = startIndex;
    const maxIndex = items.length - 1;
    do {
        // find first non-disabled item
        index = wrapNumber(index + direction, 0, maxIndex);
        if (!isItemDisabled(items[index], index, itemDisabled)) {
            return items[index];
        }
    } while (index !== startIndex && startIndex !== -1);
    return null;
}
//# sourceMappingURL=queryList.js.map