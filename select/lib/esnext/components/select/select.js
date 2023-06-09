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
 * All changes & bugfixes should be made to Select2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Button, DISPLAYNAME_PREFIX, InputGroup, Keys, Popover, Position, refHandler, setRef, } from "@blueprintjs/core";
import { Classes } from "../../common";
import { QueryList } from "../query-list/queryList";
/**
 * Select component.
 *
 * @see https://blueprintjs.com/docs/#select/select-component
 * @deprecated use { Select2 } from "@blueprintjs/select"
 */
export class Select extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.Select`;
    static ofType() {
        return Select;
    }
    state = { isOpen: false };
    inputElement = null;
    queryList = null;
    previousFocusedElement;
    handleInputRef = refHandler(this, "inputElement", this.props.inputProps?.inputRef);
    handleQueryListRef = (ref) => (this.queryList = ref);
    render() {
        // omit props specific to this component, spread the rest.
        const { filterable, inputProps, popoverProps, ...restProps } = this.props;
        return (React.createElement(QueryList, { ...restProps, onItemSelect: this.handleItemSelect, ref: this.handleQueryListRef, renderer: this.renderQueryList }));
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.inputProps?.inputRef !== this.props.inputProps?.inputRef) {
            setRef(prevProps.inputProps?.inputRef, null);
            this.handleInputRef = refHandler(this, "inputElement", this.props.inputProps?.inputRef);
            setRef(this.props.inputProps?.inputRef, this.inputElement);
        }
        if (this.state.isOpen && !prevState.isOpen && this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
    }
    renderQueryList = (listProps) => {
        // not using defaultProps cuz they're hard to type with generics (can't use <T> on static members)
        const { fill, filterable = true, disabled = false, inputProps = {}, popoverProps = {}, matchTargetWidth, } = this.props;
        if (fill) {
            popoverProps.fill = true;
        }
        if (matchTargetWidth) {
            if (popoverProps.modifiers == null) {
                popoverProps.modifiers = {};
            }
            popoverProps.modifiers.minWidth = {
                enabled: true,
                fn: data => {
                    data.styles.width = `${data.offsets.reference.width}px`;
                    return data;
                },
                order: 800,
            };
            popoverProps.usePortal = false;
            popoverProps.wrapperTagName = "div";
        }
        const input = (React.createElement(InputGroup, { leftIcon: "search", placeholder: "Filter...", rightElement: this.maybeRenderClearButton(listProps.query), ...inputProps, inputRef: this.handleInputRef, onChange: listProps.handleQueryChange, value: listProps.query }));
        const { handleKeyDown, handleKeyUp } = listProps;
        return (React.createElement(Popover, { autoFocus: false, enforceFocus: false, isOpen: this.state.isOpen, disabled: disabled, position: Position.BOTTOM_LEFT, ...popoverProps, className: classNames(listProps.className, popoverProps.className), onInteraction: this.handlePopoverInteraction, popoverClassName: classNames(Classes.SELECT_POPOVER, popoverProps.popoverClassName, {
                [Classes.SELECT_MATCH_TARGET_WIDTH]: matchTargetWidth,
            }), onOpening: this.handlePopoverOpening, onOpened: this.handlePopoverOpened, onClosing: this.handlePopoverClosing },
            React.createElement("div", { onKeyDown: this.state.isOpen ? handleKeyDown : this.handleTargetKeyDown, onKeyUp: this.state.isOpen ? handleKeyUp : undefined }, this.props.children),
            React.createElement("div", { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp },
                filterable ? input : undefined,
                listProps.itemList)));
    };
    maybeRenderClearButton(query) {
        return query.length > 0 ? React.createElement(Button, { icon: "cross", minimal: true, onClick: this.resetQuery }) : undefined;
    }
    handleTargetKeyDown = (event) => {
        // open popover when arrow key pressed on target while closed
        // HACKHACK: https://github.com/palantir/blueprint/issues/4165
        if (event.which === Keys.ARROW_UP || event.which === Keys.ARROW_DOWN) {
            event.preventDefault();
            this.setState({ isOpen: true });
        }
    };
    handleItemSelect = (item, event) => {
        this.setState({ isOpen: false });
        this.props.onItemSelect?.(item, event);
    };
    handlePopoverInteraction = (isOpen, event) => {
        this.setState({ isOpen });
        this.props.popoverProps?.onInteraction?.(isOpen, event);
    };
    handlePopoverOpening = (node) => {
        // save currently focused element before popover steals focus, so we can restore it when closing.
        this.previousFocusedElement = document.activeElement;
        if (this.props.resetOnClose) {
            this.resetQuery();
        }
        this.props.popoverProps?.onOpening?.(node);
    };
    handlePopoverOpened = (node) => {
        // scroll active item into view after popover transition completes and all dimensions are stable.
        if (this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
        this.requestAnimationFrame(() => {
            const { inputProps = {} } = this.props;
            // autofocus is enabled by default
            if (inputProps.autoFocus !== false) {
                this.inputElement?.focus();
            }
        });
        this.props.popoverProps?.onOpened?.(node);
    };
    handlePopoverClosing = (node) => {
        // restore focus to saved element.
        // timeout allows popover to begin closing and remove focus handlers beforehand.
        /* istanbul ignore next */
        this.requestAnimationFrame(() => {
            if (this.previousFocusedElement !== undefined) {
                this.previousFocusedElement.focus();
                this.previousFocusedElement = undefined;
            }
        });
        this.props.popoverProps?.onClosing?.(node);
    };
    resetQuery = () => this.queryList && this.queryList.setQuery("", true);
}
//# sourceMappingURL=select.js.map