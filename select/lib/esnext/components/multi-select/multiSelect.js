/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
 * All changes & bugfixes should be made to MultiSelect2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Classes as CoreClasses, DISPLAYNAME_PREFIX, Keys, Popover, PopoverInteractionKind, Position, refHandler, setRef, TagInput, } from "@blueprintjs/core";
import { Classes } from "../../common";
import { QueryList } from "../query-list/queryList";
/**
 * Multi select component.
 *
 * @see https://blueprintjs.com/docs/#select/multi-select
 * @deprecated use { MultiSelect2 } from "@blueprintjs/select"
 */
export class MultiSelect extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.MultiSelect`;
    static defaultProps = {
        fill: false,
        placeholder: "Search...",
    };
    static ofType() {
        return MultiSelect;
    }
    state = {
        isOpen: (this.props.popoverProps && this.props.popoverProps.isOpen) || false,
    };
    input = null;
    queryList = null;
    refHandlers = {
        input: refHandler(this, "input", this.props.tagInputProps?.inputRef),
        queryList: (ref) => (this.queryList = ref),
    };
    componentDidUpdate(prevProps) {
        if (prevProps.tagInputProps?.inputRef !== this.props.tagInputProps?.inputRef) {
            setRef(prevProps.tagInputProps?.inputRef, null);
            this.refHandlers.input = refHandler(this, "input", this.props.tagInputProps?.inputRef);
            setRef(this.props.tagInputProps?.inputRef, this.input);
        }
    }
    render() {
        // omit props specific to this component, spread the rest.
        const { openOnKeyDown, popoverProps, tagInputProps, ...restProps } = this.props;
        return (React.createElement(QueryList, { ...restProps, onItemSelect: this.handleItemSelect, onQueryChange: this.handleQueryChange, ref: this.refHandlers.queryList, renderer: this.renderQueryList }));
    }
    renderQueryList = (listProps) => {
        const { fill, tagInputProps = {}, popoverProps = {}, selectedItems = [], placeholder } = this.props;
        const { handlePaste, handleKeyDown, handleKeyUp } = listProps;
        if (fill) {
            popoverProps.fill = true;
            tagInputProps.fill = true;
        }
        // add our own inputProps.className so that we can reference it in event handlers
        const inputProps = {
            ...tagInputProps.inputProps,
            className: classNames(tagInputProps.inputProps?.className, Classes.MULTISELECT_TAG_INPUT_INPUT),
        };
        const handleTagInputAdd = (values, method) => {
            if (method === "paste") {
                handlePaste(values);
            }
        };
        return (React.createElement(Popover, { autoFocus: false, canEscapeKeyClose: true, enforceFocus: false, isOpen: this.state.isOpen, position: Position.BOTTOM_LEFT, ...popoverProps, className: classNames(listProps.className, popoverProps.className), interactionKind: PopoverInteractionKind.CLICK, onInteraction: this.handlePopoverInteraction, popoverClassName: classNames(Classes.MULTISELECT_POPOVER, popoverProps.popoverClassName), onOpened: this.handlePopoverOpened },
            React.createElement("div", { onKeyDown: this.getTagInputKeyDownHandler(handleKeyDown), onKeyUp: this.getTagInputKeyUpHandler(handleKeyUp) },
                React.createElement(TagInput, { placeholder: placeholder, ...tagInputProps, className: classNames(Classes.MULTISELECT, tagInputProps.className), inputRef: this.refHandlers.input, inputProps: inputProps, inputValue: listProps.query, 
                    /* eslint-disable-next-line react/jsx-no-bind */
                    onAdd: handleTagInputAdd, onInputChange: listProps.handleQueryChange, onRemove: this.handleTagRemove, values: selectedItems.map(this.props.tagRenderer) })),
            React.createElement("div", { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }, listProps.itemList)));
    };
    handleItemSelect = (item, evt) => {
        if (this.input != null) {
            this.input.focus();
        }
        this.props.onItemSelect?.(item, evt);
    };
    handleQueryChange = (query, evt) => {
        this.setState({ isOpen: query.length > 0 || !this.props.openOnKeyDown });
        this.props.onQueryChange?.(query, evt);
    };
    // Popover interaction kind is CLICK, so this only handles click events.
    // Note that we defer to the next animation frame in order to get the latest document.activeElement
    handlePopoverInteraction = (nextOpenState, evt) => this.requestAnimationFrame(() => {
        const isInputFocused = this.input === document.activeElement;
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
        const { selectedItems = [], onRemove, tagInputProps } = this.props;
        onRemove?.(selectedItems[index], index);
        tagInputProps?.onRemove?.(tag, index);
    };
    getTagInputKeyDownHandler = (handleQueryListKeyDown) => {
        return (e) => {
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
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
        };
    };
}
//# sourceMappingURL=multiSelect.js.map