/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
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
/** @fileoverview "V2" variant of Suggest which uses Popover2 instead of Popover2 */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, DISPLAYNAME_PREFIX, InputGroup, Keys, mergeRefs, refHandler, setRef, Utils, } from "@blueprintjs/core";
import { Popover2, PopupKind } from "@blueprintjs/popover2";
import { Classes } from "../../common";
import { QueryList } from "../query-list/queryList";
/**
 * Suggest (v2) component.
 *
 * @see https://blueprintjs.com/docs/#select/suggest2
 */
export class Suggest2 extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.Suggest2`;
    static defaultProps = {
        closeOnSelect: true,
        fill: false,
        openOnKeyDown: false,
        resetOnClose: false,
    };
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    static ofType() {
        return Suggest2;
    }
    state = {
        isOpen: (this.props.popoverProps != null && this.props.popoverProps.isOpen) || false,
        selectedItem: this.getInitialSelectedItem(),
    };
    inputElement = null;
    queryList = null;
    handleInputRef = refHandler(this, "inputElement", this.props.inputProps?.inputRef);
    handleQueryListRef = (ref) => (this.queryList = ref);
    listboxId = Utils.uniqueId("listbox");
    render() {
        // omit props specific to this component, spread the rest.
        const { disabled, inputProps, menuProps, popoverProps, ...restProps } = this.props;
        return (React.createElement(QueryList, { ...restProps, menuProps: { "aria-label": "selectable options", ...menuProps, id: this.listboxId }, initialActiveItem: this.props.selectedItem ?? undefined, onItemSelect: this.handleItemSelect, ref: this.handleQueryListRef, renderer: this.renderQueryList }));
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.inputProps?.inputRef !== this.props.inputProps?.inputRef) {
            setRef(prevProps.inputProps?.inputRef, null);
            this.handleInputRef = refHandler(this, "inputElement", this.props.inputProps?.inputRef);
            setRef(this.props.inputProps?.inputRef, this.inputElement);
        }
        // If the selected item prop changes, update the underlying state.
        if (this.props.selectedItem !== undefined && this.props.selectedItem !== this.state.selectedItem) {
            this.setState({ selectedItem: this.props.selectedItem });
        }
        if (this.state.isOpen === false && prevState.isOpen === true) {
            // just closed, likely by keyboard interaction
            // wait until the transition ends so there isn't a flash of content in the popover
            /* eslint-disable-next-line deprecation/deprecation */
            const timeout = this.props.popoverProps?.transitionDuration ?? Popover2.defaultProps.transitionDuration;
            setTimeout(() => this.maybeResetActiveItemToSelectedItem(), timeout);
        }
        if (this.state.isOpen && !prevState.isOpen && this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
    }
    renderQueryList = (listProps) => {
        const { popoverContentProps = {}, popoverProps = {}, popoverRef } = this.props;
        const { isOpen } = this.state;
        const { handleKeyDown, handleKeyUp } = listProps;
        // N.B. no need to set `popoverProps.fill` since that is unused with the `renderTarget` API
        return (React.createElement(Popover2, { autoFocus: false, enforceFocus: false, isOpen: isOpen, placement: popoverProps.position || popoverProps.placement ? undefined : "bottom-start", ...popoverProps, className: classNames(listProps.className, popoverProps.className), content: React.createElement("div", { ...popoverContentProps, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }, listProps.itemList), interactionKind: "click", onInteraction: this.handlePopoverInteraction, onOpened: this.handlePopoverOpened, onOpening: this.handlePopoverOpening, popoverClassName: classNames(Classes.SUGGEST_POPOVER, popoverProps.popoverClassName), popupKind: PopupKind.LISTBOX, ref: popoverRef, renderTarget: this.getPopoverTargetRenderer(listProps, isOpen) }));
    };
    // We use the renderTarget API to flatten the rendered DOM and make it easier to implement features like
    // the "fill" prop. Note that we must take `isOpen` as an argument to force this render function to be called
    // again after that state changes.
    getPopoverTargetRenderer = (listProps, isOpen) => 
    // eslint-disable-next-line react/display-name
    ({ 
    // pull out `isOpen` so that it's not forwarded to the DOM
    isOpen: _isOpen, ref, ...targetProps }) => {
        const { disabled, fill, inputProps = {}, inputValueRenderer, popoverProps = {}, resetOnClose } = this.props;
        const { selectedItem } = this.state;
        const { handleKeyDown, handleKeyUp } = listProps;
        const selectedItemText = selectedItem == null ? "" : inputValueRenderer(selectedItem);
        const { autoComplete = "off", placeholder = "Search..." } = inputProps;
        // placeholder shows selected item while open.
        const inputPlaceholder = isOpen && selectedItemText ? selectedItemText : placeholder;
        // value shows query when open, and query remains when closed if nothing is selected.
        // if resetOnClose is enabled, then hide query when not open. (see handlePopoverOpening)
        const inputValue = isOpen
            ? listProps.query
            : selectedItemText === ""
                ? resetOnClose
                    ? ""
                    : listProps.query
                : selectedItemText;
        return (React.createElement(InputGroup, { "aria-controls": this.listboxId, autoComplete: autoComplete, disabled: disabled, tagName: popoverProps.targetTagName, ...targetProps, ...inputProps, "aria-autocomplete": "list", "aria-expanded": isOpen, className: classNames(targetProps.className, inputProps.className), fill: fill, inputRef: mergeRefs(this.handleInputRef, ref), onChange: listProps.handleQueryChange, onFocus: this.handleInputFocus, onKeyDown: this.getTargetKeyDownHandler(handleKeyDown), onKeyUp: this.getTargetKeyUpHandler(handleKeyUp), placeholder: inputPlaceholder, role: "combobox", value: inputValue }));
    };
    selectText = () => {
        // wait until the input is properly focused to select the text inside of it
        this.requestAnimationFrame(() => {
            this.inputElement?.setSelectionRange(0, this.inputElement.value.length);
        });
    };
    handleInputFocus = (event) => {
        this.selectText();
        // TODO can we leverage Popover2.openOnTargetFocus for this?
        if (!this.props.openOnKeyDown) {
            this.setState({ isOpen: true });
        }
        this.props.inputProps?.onFocus?.(event);
    };
    handleItemSelect = (item, event) => {
        let nextOpenState;
        if (!this.props.closeOnSelect) {
            this.inputElement?.focus();
            this.selectText();
            nextOpenState = true;
        }
        else {
            this.inputElement?.blur();
            nextOpenState = false;
        }
        // the internal state should only change when uncontrolled.
        if (this.props.selectedItem === undefined) {
            this.setState({
                isOpen: nextOpenState,
                selectedItem: item,
            });
        }
        else {
            // otherwise just set the next open state.
            this.setState({ isOpen: nextOpenState });
        }
        this.props.onItemSelect?.(item, event);
    };
    getInitialSelectedItem() {
        // controlled > uncontrolled > default
        if (this.props.selectedItem !== undefined) {
            return this.props.selectedItem;
        }
        else if (this.props.defaultSelectedItem !== undefined) {
            return this.props.defaultSelectedItem;
        }
        else {
            return null;
        }
    }
    // Popover2 interaction kind is CLICK, so this only handles click events.
    // Note that we defer to the next animation frame in order to get the latest activeElement
    handlePopoverInteraction = (nextOpenState, event) => this.requestAnimationFrame(() => {
        const isInputFocused = this.inputElement === Utils.getActiveElement(this.inputElement);
        if (this.inputElement != null && !isInputFocused) {
            // the input is no longer focused, we should close the popover
            this.setState({ isOpen: false });
        }
        this.props.popoverProps?.onInteraction?.(nextOpenState, event);
    });
    handlePopoverOpening = (node) => {
        // reset query before opening instead of when closing to prevent flash of unfiltered items.
        // this is a limitation of the interactions between QueryList state and Popover2 transitions.
        if (this.props.resetOnClose && this.queryList) {
            this.queryList.setQuery("", true);
        }
        this.props.popoverProps?.onOpening?.(node);
    };
    handlePopoverOpened = (node) => {
        // scroll active item into view after popover transition completes and all dimensions are stable.
        if (this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
        this.props.popoverProps?.onOpened?.(node);
    };
    getTargetKeyDownHandler = (handleQueryListKeyDown) => {
        return (evt) => {
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            // eslint-disable-next-line deprecation/deprecation
            const { which } = evt;
            if (which === Keys.ESCAPE || which === Keys.TAB) {
                this.inputElement?.blur();
                this.setState({ isOpen: false });
            }
            else if (this.props.openOnKeyDown &&
                which !== Keys.BACKSPACE &&
                which !== Keys.ARROW_LEFT &&
                which !== Keys.ARROW_RIGHT) {
                this.setState({ isOpen: true });
            }
            if (this.state.isOpen) {
                handleQueryListKeyDown?.(evt);
            }
            this.props.inputProps?.onKeyDown?.(evt);
        };
    };
    getTargetKeyUpHandler = (handleQueryListKeyUp) => {
        return (evt) => {
            if (this.state.isOpen) {
                handleQueryListKeyUp?.(evt);
            }
            this.props.inputProps?.onKeyUp?.(evt);
        };
    };
    maybeResetActiveItemToSelectedItem() {
        const shouldResetActiveItemToSelectedItem = this.props.activeItem === undefined && this.state.selectedItem !== null && !this.props.resetOnSelect;
        if (this.queryList !== null && shouldResetActiveItemToSelectedItem) {
            this.queryList.setActiveItem(this.props.selectedItem ?? this.state.selectedItem);
        }
    }
}
//# sourceMappingURL=suggest2.js.map