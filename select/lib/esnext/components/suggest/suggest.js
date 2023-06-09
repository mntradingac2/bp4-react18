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
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to Suggest2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, DISPLAYNAME_PREFIX, InputGroup, Keys, Popover, PopoverInteractionKind, Position, refHandler, setRef, } from "@blueprintjs/core";
import { Classes } from "../../common";
import { QueryList } from "../query-list/queryList";
/**
 * Suggest component.
 *
 * @see https://blueprintjs.com/docs/#select/suggest
 * @deprecated use { Suggest2 } from "@blueprintjs/select"
 */
export class Suggest extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.Suggest`;
    static defaultProps = {
        closeOnSelect: true,
        fill: false,
        openOnKeyDown: false,
        resetOnClose: false,
    };
    static ofType() {
        return Suggest;
    }
    state = {
        isOpen: (this.props.popoverProps != null && this.props.popoverProps.isOpen) || false,
        selectedItem: this.getInitialSelectedItem(),
    };
    inputElement = null;
    queryList = null;
    handleInputRef = refHandler(this, "inputElement", this.props.inputProps?.inputRef);
    handleQueryListRef = (ref) => (this.queryList = ref);
    render() {
        // omit props specific to this component, spread the rest.
        const { disabled, inputProps, popoverProps, ...restProps } = this.props;
        return (React.createElement(QueryList, { ...restProps, initialActiveItem: this.props.selectedItem ?? undefined, onItemSelect: this.handleItemSelect, ref: this.handleQueryListRef, renderer: this.renderQueryList }));
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
            const timeout = this.props.popoverProps?.transitionDuration ?? Popover.defaultProps.transitionDuration;
            setTimeout(() => this.maybeResetActiveItemToSelectedItem(), timeout);
        }
        if (this.state.isOpen && !prevState.isOpen && this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
    }
    renderQueryList = (listProps) => {
        const { fill, inputProps = {}, popoverProps = {} } = this.props;
        const { isOpen, selectedItem } = this.state;
        const { handleKeyDown, handleKeyUp } = listProps;
        const { autoComplete = "off", placeholder = "Search..." } = inputProps;
        const selectedItemText = selectedItem ? this.props.inputValueRenderer(selectedItem) : "";
        // placeholder shows selected item while open.
        const inputPlaceholder = isOpen && selectedItemText ? selectedItemText : placeholder;
        // value shows query when open, and query remains when closed if nothing is selected.
        // if resetOnClose is enabled, then hide query when not open. (see handlePopoverOpening)
        const inputValue = isOpen
            ? listProps.query
            : selectedItemText || (this.props.resetOnClose ? "" : listProps.query);
        if (fill) {
            popoverProps.fill = true;
            inputProps.fill = true;
        }
        return (React.createElement(Popover, { autoFocus: false, enforceFocus: false, isOpen: isOpen, position: Position.BOTTOM_LEFT, ...popoverProps, className: classNames(listProps.className, popoverProps.className), interactionKind: PopoverInteractionKind.CLICK, onInteraction: this.handlePopoverInteraction, popoverClassName: classNames(Classes.SELECT_POPOVER, popoverProps.popoverClassName), onOpening: this.handlePopoverOpening, onOpened: this.handlePopoverOpened },
            React.createElement(InputGroup, { autoComplete: autoComplete, disabled: this.props.disabled, ...inputProps, inputRef: this.handleInputRef, onChange: listProps.handleQueryChange, onFocus: this.handleInputFocus, onKeyDown: this.getTargetKeyDownHandler(handleKeyDown), onKeyUp: this.getTargetKeyUpHandler(handleKeyUp), placeholder: inputPlaceholder, value: inputValue }),
            React.createElement("div", { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }, listProps.itemList)));
    };
    selectText = () => {
        // wait until the input is properly focused to select the text inside of it
        this.requestAnimationFrame(() => {
            this.inputElement?.setSelectionRange(0, this.inputElement.value.length);
        });
    };
    handleInputFocus = (event) => {
        this.selectText();
        // TODO can we leverage Popover.openOnTargetFocus for this?
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
    // Popover interaction kind is CLICK, so this only handles click events.
    // Note that we defer to the next animation frame in order to get the latest document.activeElement
    handlePopoverInteraction = (nextOpenState, event) => this.requestAnimationFrame(() => {
        const isInputFocused = this.inputElement === document.activeElement;
        if (this.inputElement != null && !isInputFocused) {
            // the input is no longer focused, we should close the popover
            this.setState({ isOpen: false });
        }
        this.props.popoverProps?.onInteraction?.(nextOpenState, event);
    });
    handlePopoverOpening = (node) => {
        // reset query before opening instead of when closing to prevent flash of unfiltered items.
        // this is a limitation of the interactions between QueryList state and Popover transitions.
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
//# sourceMappingURL=suggest.js.map