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
import { __assign, __extends, __rest } from "tslib";
import * as React from "react";
import { AbstractComponent2, DISPLAYNAME_PREFIX, Keys, Menu, Utils } from "@blueprintjs/core";
import { executeItemsEqual, getActiveItem, getCreateNewItem, isCreateNewItem, renderFilteredItems, } from "../../common";
/**
 * Query list component.
 *
 * @see https://blueprintjs.com/docs/#select/query-list
 */
var QueryList = /** @class */ (function (_super) {
    __extends(QueryList, _super);
    function QueryList(props, context) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, props, context) || this;
        _this.itemRefs = new Map();
        _this.refHandlers = {
            itemsParent: function (ref) { return (_this.itemsParentRef = ref); },
        };
        /**
         * Flag indicating that we should check whether selected item is in viewport
         * after rendering, typically because of keyboard change. Set to `true` when
         * manipulating state in a way that may cause active item to scroll away.
         */
        _this.shouldCheckActiveItemInViewport = false;
        /**
         * The item that we expect to be the next selected active item (based on click
         * or key interactions). When scrollToActiveItem = false, used to detect if
         * an unexpected external change to the active item has been made.
         */
        _this.expectedNextActiveItem = null;
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
        _this.isEnterKeyPressed = false;
        /** default `itemListRenderer` implementation */
        _this.renderItemList = function (listProps) {
            var _a = _this.props, initialContent = _a.initialContent, noResults = _a.noResults;
            // omit noResults if createNewItemFromQuery and createNewItemRenderer are both supplied, and query is not empty
            var createItemView = listProps.renderCreateItem();
            var maybeNoResults = createItemView != null ? null : noResults;
            var menuContent = renderFilteredItems(listProps, maybeNoResults, initialContent);
            if (menuContent == null && createItemView == null) {
                return null;
            }
            var createFirst = _this.isCreateItemFirst();
            return (React.createElement(Menu, __assign({ role: "listbox" }, listProps.menuProps, { ulRef: listProps.itemsParentRef }),
                createFirst && createItemView,
                menuContent,
                !createFirst && createItemView));
        };
        /** wrapper around `itemRenderer` to inject props */
        _this.renderItem = function (item, index) {
            if (_this.props.disabled !== true) {
                var _a = _this.state, activeItem = _a.activeItem, query = _a.query, filteredItems = _a.filteredItems;
                var modifiers = {
                    active: executeItemsEqual(_this.props.itemsEqual, getActiveItem(activeItem), item),
                    disabled: isItemDisabled(item, index, _this.props.itemDisabled),
                    matchesPredicate: filteredItems.indexOf(item) >= 0,
                };
                return _this.props.itemRenderer(item, {
                    handleClick: function (e) { return _this.handleItemSelect(item, e); },
                    handleFocus: function () { return _this.setActiveItem(item); },
                    index: index,
                    modifiers: modifiers,
                    query: query,
                    ref: function (node) {
                        if (node) {
                            _this.itemRefs.set(index, node);
                        }
                        else {
                            _this.itemRefs.delete(index);
                        }
                    },
                });
            }
            return null;
        };
        _this.renderCreateItemMenuItem = function () {
            if (_this.isCreateItemRendered(_this.state.createNewItem)) {
                var _a = _this.state, activeItem = _a.activeItem, query = _a.query;
                var trimmedQuery_1 = query.trim();
                var handleClick = function (evt) {
                    _this.handleItemCreate(trimmedQuery_1, evt);
                };
                var isActive = isCreateNewItem(activeItem);
                return _this.props.createNewItemRenderer(trimmedQuery_1, isActive, handleClick);
            }
            return null;
        };
        _this.handleItemCreate = function (query, evt) {
            var _a, _b, _c, _d;
            // we keep a cached createNewItem in state, but might as well recompute
            // the result just to be sure it's perfectly in sync with the query.
            var value = (_b = (_a = _this.props).createNewItemFromQuery) === null || _b === void 0 ? void 0 : _b.call(_a, query);
            if (value != null) {
                var newItems = Array.isArray(value) ? value : [value];
                for (var _i = 0, newItems_1 = newItems; _i < newItems_1.length; _i++) {
                    var item = newItems_1[_i];
                    (_d = (_c = _this.props).onItemSelect) === null || _d === void 0 ? void 0 : _d.call(_c, item, evt);
                }
                _this.maybeResetQuery();
            }
        };
        _this.handleItemSelect = function (item, event) {
            var _a, _b;
            _this.setActiveItem(item);
            (_b = (_a = _this.props).onItemSelect) === null || _b === void 0 ? void 0 : _b.call(_a, item, event);
            _this.maybeResetQuery();
        };
        _this.handlePaste = function (queries) {
            var _a = _this.props, createNewItemFromQuery = _a.createNewItemFromQuery, onItemsPaste = _a.onItemsPaste;
            var nextActiveItem;
            var nextQueries = [];
            // Find an exising item that exactly matches each pasted value, or
            // create a new item if possible. Ignore unmatched values if creating
            // items is disabled.
            var pastedItemsToEmit = [];
            for (var _i = 0, queries_1 = queries; _i < queries_1.length; _i++) {
                var query = queries_1[_i];
                var equalItem = getMatchingItem(query, _this.props);
                if (equalItem !== undefined) {
                    nextActiveItem = equalItem;
                    pastedItemsToEmit.push(equalItem);
                }
                else if (_this.canCreateItems()) {
                    var value = createNewItemFromQuery === null || createNewItemFromQuery === void 0 ? void 0 : createNewItemFromQuery(query);
                    if (value !== undefined) {
                        var newItems = Array.isArray(value) ? value : [value];
                        pastedItemsToEmit.push.apply(pastedItemsToEmit, newItems);
                    }
                }
                else {
                    nextQueries.push(query);
                }
            }
            // UX nicety: combine all unmatched queries into a single
            // comma-separated query in the input, so we don't lose any information.
            // And don't reset the active item; we'll do that ourselves below.
            _this.setQuery(nextQueries.join(", "), false);
            // UX nicety: update the active item if we matched with at least one
            // existing item.
            if (nextActiveItem !== undefined) {
                _this.setActiveItem(nextActiveItem);
            }
            onItemsPaste === null || onItemsPaste === void 0 ? void 0 : onItemsPaste(pastedItemsToEmit);
        };
        _this.handleKeyDown = function (event) {
            var _a, _b;
            // eslint-disable-next-line deprecation/deprecation
            var keyCode = event.keyCode;
            if (keyCode === Keys.ARROW_UP || keyCode === Keys.ARROW_DOWN) {
                event.preventDefault();
                var nextActiveItem = _this.getNextActiveItem(keyCode === Keys.ARROW_UP ? -1 : 1);
                if (nextActiveItem != null) {
                    _this.setActiveItem(nextActiveItem);
                }
            }
            else if (keyCode === Keys.ENTER) {
                _this.isEnterKeyPressed = true;
            }
            (_b = (_a = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        _this.handleKeyUp = function (event) {
            var onKeyUp = _this.props.onKeyUp;
            var activeItem = _this.state.activeItem;
            // eslint-disable-next-line deprecation/deprecation
            if (event.keyCode === Keys.ENTER && _this.isEnterKeyPressed) {
                // We handle ENTER in keyup here to play nice with the Button component's keyboard
                // clicking. Button is commonly used as the only child of Select. If we were to
                // instead process ENTER on keydown, then Button would click itself on keyup and
                // the Select popover would re-open.
                event.preventDefault();
                if (activeItem == null || isCreateNewItem(activeItem)) {
                    _this.handleItemCreate(_this.state.query, event);
                }
                else {
                    _this.handleItemSelect(activeItem, event);
                }
                _this.isEnterKeyPressed = false;
            }
            onKeyUp === null || onKeyUp === void 0 ? void 0 : onKeyUp(event);
        };
        _this.handleInputQueryChange = function (event) {
            var _a, _b;
            var query = event == null ? "" : event.target.value;
            _this.setQuery(query);
            (_b = (_a = _this.props).onQueryChange) === null || _b === void 0 ? void 0 : _b.call(_a, query, event);
        };
        var _c = props.query, query = _c === void 0 ? "" : _c;
        var createNewItem = (_a = props.createNewItemFromQuery) === null || _a === void 0 ? void 0 : _a.call(props, query);
        var filteredItems = getFilteredItems(query, props);
        _this.state = {
            activeItem: props.activeItem !== undefined
                ? props.activeItem
                : (_b = props.initialActiveItem) !== null && _b !== void 0 ? _b : getFirstEnabledItem(filteredItems, props.itemDisabled),
            createNewItem: createNewItem,
            filteredItems: filteredItems,
            query: query,
        };
        return _this;
    }
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    QueryList.ofType = function () {
        return QueryList;
    };
    QueryList.prototype.render = function () {
        var _a = this.props, className = _a.className, items = _a.items, renderer = _a.renderer, _b = _a.itemListRenderer, itemListRenderer = _b === void 0 ? this.renderItemList : _b, menuProps = _a.menuProps;
        var _c = this.state, createNewItem = _c.createNewItem, spreadableState = __rest(_c, ["createNewItem"]);
        return renderer(__assign(__assign({}, spreadableState), { className: className, handleItemSelect: this.handleItemSelect, handleKeyDown: this.handleKeyDown, handleKeyUp: this.handleKeyUp, handlePaste: this.handlePaste, handleQueryChange: this.handleInputQueryChange, itemList: itemListRenderer(__assign(__assign({}, spreadableState), { items: items, itemsParentRef: this.refHandlers.itemsParent, menuProps: menuProps, renderCreateItem: this.renderCreateItemMenuItem, renderItem: this.renderItem })) }));
    };
    QueryList.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
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
            this.requestAnimationFrame(function () { return _this.scrollActiveItemIntoView(); });
            // reset the flag
            this.shouldCheckActiveItemInViewport = false;
        }
    };
    QueryList.prototype.scrollActiveItemIntoView = function () {
        var scrollToActiveItem = this.props.scrollToActiveItem !== false;
        var externalChangeToActiveItem = !executeItemsEqual(this.props.itemsEqual, getActiveItem(this.expectedNextActiveItem), getActiveItem(this.props.activeItem));
        this.expectedNextActiveItem = null;
        if (!scrollToActiveItem && externalChangeToActiveItem) {
            return;
        }
        var activeElement = this.getActiveElement();
        if (this.itemsParentRef != null && activeElement != null) {
            var activeTop = activeElement.offsetTop, activeHeight = activeElement.offsetHeight;
            var _a = this.itemsParentRef, parentOffsetTop = _a.offsetTop, parentScrollTop = _a.scrollTop, parentHeight = _a.clientHeight;
            // compute padding on parent element to ensure we always leave space
            var _b = this.getItemsParentPadding(), paddingTop = _b.paddingTop, paddingBottom = _b.paddingBottom;
            // compute the two edges of the active item for comparison, including parent padding
            var activeBottomEdge = activeTop + activeHeight + paddingBottom - parentOffsetTop;
            var activeTopEdge = activeTop - paddingTop - parentOffsetTop;
            if (activeBottomEdge >= parentScrollTop + parentHeight) {
                // offscreen bottom: align bottom of item with bottom of viewport
                this.itemsParentRef.scrollTop = activeBottomEdge + activeHeight - parentHeight;
            }
            else if (activeTopEdge <= parentScrollTop) {
                // offscreen top: align top of item with top of viewport
                this.itemsParentRef.scrollTop = activeTopEdge - activeHeight;
            }
        }
    };
    QueryList.prototype.setQuery = function (query, resetActiveItem, props) {
        var _a;
        if (resetActiveItem === void 0) { resetActiveItem = this.props.resetOnQuery; }
        if (props === void 0) { props = this.props; }
        var createNewItemFromQuery = props.createNewItemFromQuery;
        this.shouldCheckActiveItemInViewport = true;
        var hasQueryChanged = query !== this.state.query;
        if (hasQueryChanged) {
            (_a = props.onQueryChange) === null || _a === void 0 ? void 0 : _a.call(props, query);
        }
        // Leading and trailing whitespace can be confusing to display, so we remove it when passing it
        // to functions dealing with data, like createNewItemFromQuery. But we need the unaltered user-typed
        // query to remain in state to be able to render controlled text inputs properly.
        var trimmedQuery = query.trim();
        var filteredItems = getFilteredItems(trimmedQuery, props);
        var createNewItem = createNewItemFromQuery != null && trimmedQuery !== "" ? createNewItemFromQuery(trimmedQuery) : undefined;
        this.setState({ createNewItem: createNewItem, filteredItems: filteredItems, query: query });
        // always reset active item if it's now filtered or disabled
        var activeIndex = this.getActiveIndex(filteredItems);
        var shouldUpdateActiveItem = resetActiveItem ||
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
    };
    QueryList.prototype.setActiveItem = function (activeItem) {
        var _a, _b, _c, _d;
        this.expectedNextActiveItem = activeItem;
        if (this.props.activeItem === undefined) {
            // indicate that the active item may need to be scrolled into view after update.
            this.shouldCheckActiveItemInViewport = true;
            this.setState({ activeItem: activeItem });
        }
        if (isCreateNewItem(activeItem)) {
            (_b = (_a = this.props).onActiveItemChange) === null || _b === void 0 ? void 0 : _b.call(_a, null, true);
        }
        else {
            (_d = (_c = this.props).onActiveItemChange) === null || _d === void 0 ? void 0 : _d.call(_c, activeItem, false);
        }
    };
    QueryList.prototype.getActiveElement = function () {
        var _a;
        var activeItem = this.state.activeItem;
        if (this.itemsParentRef != null) {
            if (isCreateNewItem(activeItem)) {
                var index = this.isCreateItemFirst() ? 0 : this.state.filteredItems.length;
                return this.itemsParentRef.children.item(index);
            }
            else {
                var activeIndex = this.getActiveIndex();
                return ((_a = this.itemRefs.get(activeIndex)) !== null && _a !== void 0 ? _a : this.itemsParentRef.children.item(activeIndex));
            }
        }
        return undefined;
    };
    QueryList.prototype.getActiveIndex = function (items) {
        if (items === void 0) { items = this.state.filteredItems; }
        var activeItem = this.state.activeItem;
        if (activeItem == null || isCreateNewItem(activeItem)) {
            return -1;
        }
        // NOTE: this operation is O(n) so it should be avoided in render(). safe for events though.
        for (var i = 0; i < items.length; ++i) {
            if (executeItemsEqual(this.props.itemsEqual, items[i], activeItem)) {
                return i;
            }
        }
        return -1;
    };
    QueryList.prototype.getItemsParentPadding = function () {
        // assert ref exists because it was checked before calling
        var _a = getComputedStyle(this.itemsParentRef), paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom;
        return {
            paddingBottom: pxToNumber(paddingBottom),
            paddingTop: pxToNumber(paddingTop),
        };
    };
    /**
     * Get the next enabled item, moving in the given direction from the start
     * index. A `null` return value means no suitable item was found.
     *
     * @param direction amount to move in each iteration, typically +/-1
     * @param startIndex item to start iteration
     */
    QueryList.prototype.getNextActiveItem = function (direction, startIndex) {
        if (startIndex === void 0) { startIndex = this.getActiveIndex(); }
        if (this.isCreateItemRendered(this.state.createNewItem)) {
            var reachedCreate = (startIndex === 0 && direction === -1) ||
                (startIndex === this.state.filteredItems.length - 1 && direction === 1);
            if (reachedCreate) {
                return getCreateNewItem();
            }
        }
        return getFirstEnabledItem(this.state.filteredItems, this.props.itemDisabled, direction, startIndex);
    };
    /**
     * @param createNewItem Checks if this item would match the current query. Cannot check this.state.createNewItem
     *  every time since state may not have been updated yet.
     */
    QueryList.prototype.isCreateItemRendered = function (createNewItem) {
        return (this.canCreateItems() &&
            this.state.query !== "" &&
            // this check is unfortunately O(N) on the number of items, but
            // alas, hiding the "Create Item" option when it exactly matches an
            // existing item is much clearer.
            !this.wouldCreatedItemMatchSomeExistingItem(createNewItem));
    };
    QueryList.prototype.isCreateItemFirst = function () {
        return this.props.createNewItemPosition === "first";
    };
    QueryList.prototype.canCreateItems = function () {
        return this.props.createNewItemFromQuery != null && this.props.createNewItemRenderer != null;
    };
    QueryList.prototype.wouldCreatedItemMatchSomeExistingItem = function (createNewItem) {
        var _this = this;
        // search only the filtered items, not the full items list, because we
        // only need to check items that match the current query.
        return this.state.filteredItems.some(function (item) {
            var newItems = Array.isArray(createNewItem) ? createNewItem : [createNewItem];
            return newItems.some(function (newItem) { return executeItemsEqual(_this.props.itemsEqual, item, newItem); });
        });
    };
    QueryList.prototype.maybeResetQuery = function () {
        if (this.props.resetOnSelect) {
            this.setQuery("", true);
        }
    };
    QueryList.displayName = "".concat(DISPLAYNAME_PREFIX, ".QueryList");
    QueryList.defaultProps = {
        disabled: false,
        resetOnQuery: true,
    };
    return QueryList;
}(AbstractComponent2));
export { QueryList };
function pxToNumber(value) {
    return value == null ? 0 : parseInt(value.slice(0, -2), 10);
}
function getMatchingItem(query, _a) {
    var items = _a.items, itemPredicate = _a.itemPredicate;
    if (Utils.isFunction(itemPredicate)) {
        // .find() doesn't exist in ES5. Alternative: use a for loop instead of
        // .filter() so that we can return as soon as we find the first match.
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (itemPredicate(query, item, i, true)) {
                return item;
            }
        }
    }
    return undefined;
}
function getFilteredItems(query, _a) {
    var items = _a.items, itemPredicate = _a.itemPredicate, itemListPredicate = _a.itemListPredicate;
    if (Utils.isFunction(itemListPredicate)) {
        // note that implementations can reorder the items here
        return itemListPredicate(query, items);
    }
    else if (Utils.isFunction(itemPredicate)) {
        return items.filter(function (item, index) { return itemPredicate(query, item, index); });
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
export function getFirstEnabledItem(items, itemDisabled, direction, startIndex) {
    if (direction === void 0) { direction = 1; }
    if (startIndex === void 0) { startIndex = items.length - 1; }
    if (items.length === 0) {
        return null;
    }
    // remember where we started to prevent an infinite loop
    var index = startIndex;
    var maxIndex = items.length - 1;
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