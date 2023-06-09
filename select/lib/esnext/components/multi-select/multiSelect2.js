/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
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
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Button, Classes as CoreClasses, DISPLAYNAME_PREFIX, Keys, mergeRefs, refHandler, setRef, TagInput, Utils, } from "@blueprintjs/core";
import { Popover2, PopupKind } from "@blueprintjs/popover2";
import { Classes } from "../../common";
import { QueryList } from "../query-list/queryList";
/**
 * Multi select (v2) component.
 *
 * @see https://blueprintjs.com/docs/#select/multi-select2
 */
export class MultiSelect2 extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.MultiSelect2`;
    listboxId = Utils.uniqueId("listbox");
    static defaultProps = {
        disabled: false,
        fill: false,
        placeholder: "Search...",
    };
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    static ofType() {
        return MultiSelect2;
    }
    state = {
        isOpen: (this.props.popoverProps && this.props.popoverProps.isOpen) || false,
    };
    input = null;
    queryList = null;
    refHandlers = {
        input: refHandler(this, "input", this.props.tagInputProps?.inputRef),
        popover: React.createRef(),
        queryList: (ref) => (this.queryList = ref),
    };
    componentDidUpdate(prevProps) {
        if (prevProps.tagInputProps?.inputRef !== this.props.tagInputProps?.inputRef) {
            setRef(prevProps.tagInputProps?.inputRef, null);
            this.refHandlers.input = refHandler(this, "input", this.props.tagInputProps?.inputRef);
            setRef(this.props.tagInputProps?.inputRef, this.input);
        }
        if ((prevProps.onClear === undefined && this.props.onClear !== undefined) ||
            (prevProps.onClear !== undefined && this.props.onClear === undefined)) {
            this.forceUpdate();
        }
    }
    render() {
        // omit props specific to this component, spread the rest.
        const { menuProps, openOnKeyDown, popoverProps, tagInputProps, ...restProps } = this.props;
        return (React.createElement(QueryList, { ...restProps, menuProps: {
                "aria-label": "selectable options",
                ...menuProps,
                "aria-multiselectable": true,
                id: this.listboxId,
            }, onItemSelect: this.handleItemSelect, onQueryChange: this.handleQueryChange, ref: this.refHandlers.queryList, renderer: this.renderQueryList }));
    }
    renderQueryList = (listProps) => {
        const { disabled, popoverContentProps = {}, popoverProps = {} } = this.props;
        const { handleKeyDown, handleKeyUp } = listProps;
        const popoverRef = this.props.popoverRef === undefined
            ? this.refHandlers.popover
            : mergeRefs(this.refHandlers.popover, this.props.popoverRef);
        // N.B. no need to set `popoverProps.fill` since that is unused with the `renderTarget` API
        return (React.createElement(Popover2, { autoFocus: false, canEscapeKeyClose: true, disabled: disabled, enforceFocus: false, isOpen: this.state.isOpen, placement: popoverProps.position || popoverProps.placement ? undefined : "bottom-start", ...popoverProps, className: classNames(listProps.className, popoverProps.className), content: React.createElement("div", { ...popoverContentProps, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }, listProps.itemList), interactionKind: "click", onInteraction: this.handlePopoverInteraction, onOpened: this.handlePopoverOpened, popoverClassName: classNames(Classes.MULTISELECT_POPOVER, popoverProps.popoverClassName), popupKind: PopupKind.LISTBOX, ref: popoverRef, renderTarget: this.getPopoverTargetRenderer(listProps, this.state.isOpen) }));
    };
    // We use the renderTarget API to flatten the rendered DOM and make it easier to implement features like
    // the "fill" prop. Note that we must take `isOpen` as an argument to force this render function to be called
    // again after that state changes.
    getPopoverTargetRenderer = (listProps, isOpen) => 
    // N.B. pull out `isOpen` so that it's not forwarded to the DOM, but remember not to use it directly
    // since it may be stale (`renderTarget` is not re-invoked on this.state changes).
    // eslint-disable-next-line react/display-name
    ({ isOpen: _isOpen, ref, ...targetProps }) => {
        const { disabled, fill, onClear, placeholder, popoverProps = {}, popoverTargetProps = {}, selectedItems, tagInputProps = {}, } = this.props;
        const { handleKeyDown, handleKeyUp } = listProps;
        if (disabled) {
            tagInputProps.disabled = true;
        }
        if (fill) {
            tagInputProps.fill = true;
        }
        // add our own inputProps.className so that we can reference it in event handlers
        const inputProps = {
            ...tagInputProps.inputProps,
            className: classNames(tagInputProps.inputProps?.className, Classes.MULTISELECT_TAG_INPUT_INPUT),
        };
        const maybeClearButton = onClear !== undefined && selectedItems.length > 0 ? (
        // use both aria-label and title a11y attributes here, for screen readers
        // and mouseover interactions respectively
        React.createElement(Button, { "aria-label": "Clear selected items", disabled: disabled, icon: "cross", minimal: true, onClick: this.handleClearButtonClick, title: "Clear selected items" })) : undefined;
        const { targetTagName = "div" } = popoverProps;
        return React.createElement(targetTagName, {
            "aria-autocomplete": "list",
            "aria-controls": this.listboxId,
            ...popoverTargetProps,
            ...targetProps,
            "aria-disabled": disabled,
            "aria-expanded": isOpen,
            // Note that we must set FILL here in addition to TagInput to get the wrapper element to full width
            className: classNames(targetProps.className, popoverTargetProps.className, {
                [CoreClasses.FILL]: fill,
            }),
            // Normally, Popover2 would also need to attach its own `onKeyDown` handler via `targetProps`,
            // but in our case we fully manage that interaction and listen for key events to open/close
            // the popover, so we elide it from the DOM.
            onKeyDown: this.getTagInputKeyDownHandler(handleKeyDown),
            onKeyUp: this.getTagInputKeyUpHandler(handleKeyUp),
            ref,
            role: "combobox",
        }, React.createElement(TagInput, { placeholder: placeholder, rightElement: maybeClearButton, ...tagInputProps, className: classNames(Classes.MULTISELECT, tagInputProps.className), inputRef: this.refHandlers.input, inputProps: inputProps, inputValue: listProps.query, onAdd: this.getTagInputAddHandler(listProps), onInputChange: listProps.handleQueryChange, onRemove: this.handleTagRemove, values: selectedItems.map(this.props.tagRenderer) }));
    };
    handleItemSelect = (item, evt) => {
        if (this.input != null) {
            this.input.focus();
        }
        this.props.onItemSelect?.(item, evt);
        this.refHandlers.popover.current?.reposition(); // reposition when size of input changes
    };
    handleQueryChange = (query, evt) => {
        this.setState({ isOpen: query.length > 0 || !this.props.openOnKeyDown });
        this.props.onQueryChange?.(query, evt);
    };
    // Popover interaction kind is CLICK, so this only handles click events.
    // Note that we defer to the next animation frame in order to get the latest activeElement
    handlePopoverInteraction = (nextOpenState, evt) => this.requestAnimationFrame(() => {
        const isInputFocused = this.input === Utils.getActiveElement(this.input);
        if (this.input != null && !isInputFocused) {
            // input is no longer focused, we should close the popover
            this.setState({ isOpen: false });
        }
        else if (!this.props.openOnKeyDown) {
            // we should open immediately on click focus events
            this.setState({ isOpen: true });
        }
        this.props.popoverProps?.onInteraction?.(nextOpenState, evt);
    });
    handlePopoverOpened = (node) => {
        if (this.queryList != null) {
            // scroll active item into view after popover transition completes and all dimensions are stable.
            this.queryList.scrollActiveItemIntoView();
        }
        this.props.popoverProps?.onOpened?.(node);
    };
    handleTagRemove = (tag, index) => {
        const { selectedItems, onRemove, tagInputProps } = this.props;
        onRemove?.(selectedItems[index], index);
        tagInputProps?.onRemove?.(tag, index);
        this.refHandlers.popover.current?.reposition(); // reposition when size of input changes
    };
    getTagInputAddHandler = (listProps) => (values, method) => {
        if (method === "paste") {
            listProps.handlePaste(values);
        }
    };
    getTagInputKeyDownHandler = (handleQueryListKeyDown) => {
        return (e) => {
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            // eslint-disable-next-line deprecation/deprecation
            const { which } = e;
            if (which === Keys.ESCAPE || which === Keys.TAB) {
                // By default the escape key will not trigger a blur on the
                // input element. It must be done explicitly.
                if (this.input != null) {
                    this.input.blur();
                }
                this.setState({ isOpen: false });
            }
            else if (!(which === Keys.BACKSPACE || which === Keys.ARROW_LEFT || which === Keys.ARROW_RIGHT)) {
                this.setState({ isOpen: true });
            }
            const isTargetingTagRemoveButton = e.target.closest(`.${CoreClasses.TAG_REMOVE}`) != null;
            if (this.state.isOpen && !isTargetingTagRemoveButton) {
                handleQueryListKeyDown?.(e);
            }
            this.props.popoverTargetProps?.onKeyDown?.(e);
        };
    };
    getTagInputKeyUpHandler = (handleQueryListKeyUp) => {
        return (e) => {
            const isTargetingInput = e.target.classList.contains(Classes.MULTISELECT_TAG_INPUT_INPUT);
            // only handle events when the focus is on the actual <input> inside the TagInput, as that's
            // what QueryList is designed to do
            if (this.state.isOpen && isTargetingInput) {
                handleQueryListKeyUp?.(e);
            }
            this.props.popoverTargetProps?.onKeyDown?.(e);
        };
    };
    handleClearButtonClick = () => {
        this.props.onClear?.();
        this.refHandlers.popover.current?.reposition(); // reposition when size of input changes
    };
}
//# sourceMappingURL=multiSelect2.js.map