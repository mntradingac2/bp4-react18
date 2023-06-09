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
import { __assign, __extends, __rest } from "tslib";
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
var MultiSelect = /** @class */ (function (_super) {
    __extends(MultiSelect, _super);
    function MultiSelect() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: (_this.props.popoverProps && _this.props.popoverProps.isOpen) || false,
        };
        _this.input = null;
        _this.queryList = null;
        _this.refHandlers = {
            input: refHandler(_this, "input", (_a = _this.props.tagInputProps) === null || _a === void 0 ? void 0 : _a.inputRef),
            queryList: function (ref) { return (_this.queryList = ref); },
        };
        _this.renderQueryList = function (listProps) {
            var _a;
            var _b = _this.props, fill = _b.fill, _c = _b.tagInputProps, tagInputProps = _c === void 0 ? {} : _c, _d = _b.popoverProps, popoverProps = _d === void 0 ? {} : _d, _e = _b.selectedItems, selectedItems = _e === void 0 ? [] : _e, placeholder = _b.placeholder;
            var handlePaste = listProps.handlePaste, handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
            if (fill) {
                popoverProps.fill = true;
                tagInputProps.fill = true;
            }
            // add our own inputProps.className so that we can reference it in event handlers
            var inputProps = __assign(__assign({}, tagInputProps.inputProps), { className: classNames((_a = tagInputProps.inputProps) === null || _a === void 0 ? void 0 : _a.className, Classes.MULTISELECT_TAG_INPUT_INPUT) });
            var handleTagInputAdd = function (values, method) {
                if (method === "paste") {
                    handlePaste(values);
                }
            };
            return (React.createElement(Popover, __assign({ autoFocus: false, canEscapeKeyClose: true, enforceFocus: false, isOpen: _this.state.isOpen, position: Position.BOTTOM_LEFT }, popoverProps, { className: classNames(listProps.className, popoverProps.className), interactionKind: PopoverInteractionKind.CLICK, onInteraction: _this.handlePopoverInteraction, popoverClassName: classNames(Classes.MULTISELECT_POPOVER, popoverProps.popoverClassName), onOpened: _this.handlePopoverOpened }),
                React.createElement("div", { onKeyDown: _this.getTagInputKeyDownHandler(handleKeyDown), onKeyUp: _this.getTagInputKeyUpHandler(handleKeyUp) },
                    React.createElement(TagInput, __assign({ placeholder: placeholder }, tagInputProps, { className: classNames(Classes.MULTISELECT, tagInputProps.className), inputRef: _this.refHandlers.input, inputProps: inputProps, inputValue: listProps.query, 
                        /* eslint-disable-next-line react/jsx-no-bind */
                        onAdd: handleTagInputAdd, onInputChange: listProps.handleQueryChange, onRemove: _this.handleTagRemove, values: selectedItems.map(_this.props.tagRenderer) }))),
                React.createElement("div", { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }, listProps.itemList)));
        };
        _this.handleItemSelect = function (item, evt) {
            var _a, _b;
            if (_this.input != null) {
                _this.input.focus();
            }
            (_b = (_a = _this.props).onItemSelect) === null || _b === void 0 ? void 0 : _b.call(_a, item, evt);
        };
        _this.handleQueryChange = function (query, evt) {
            var _a, _b;
            _this.setState({ isOpen: query.length > 0 || !_this.props.openOnKeyDown });
            (_b = (_a = _this.props).onQueryChange) === null || _b === void 0 ? void 0 : _b.call(_a, query, evt);
        };
        // Popover interaction kind is CLICK, so this only handles click events.
        // Note that we defer to the next animation frame in order to get the latest document.activeElement
        _this.handlePopoverInteraction = function (nextOpenState, evt) {
            return _this.requestAnimationFrame(function () {
                var _a, _b;
                var isInputFocused = _this.input === document.activeElement;
                if (_this.input != null && !isInputFocused) {
                    // input is no longer focused, we should close the popover
                    _this.setState({ isOpen: false });
                }
                else if (!_this.props.openOnKeyDown) {
                    // we should open immediately on click focus events
                    _this.setState({ isOpen: true });
                }
                (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onInteraction) === null || _b === void 0 ? void 0 : _b.call(_a, nextOpenState, evt);
            });
        };
        _this.handlePopoverOpened = function (node) {
            var _a, _b;
            if (_this.queryList != null) {
                // scroll active item into view after popover transition completes and all dimensions are stable.
                _this.queryList.scrollActiveItemIntoView();
            }
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onOpened) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        };
        _this.handleTagRemove = function (tag, index) {
            var _a;
            var _b = _this.props, _c = _b.selectedItems, selectedItems = _c === void 0 ? [] : _c, onRemove = _b.onRemove, tagInputProps = _b.tagInputProps;
            onRemove === null || onRemove === void 0 ? void 0 : onRemove(selectedItems[index], index);
            (_a = tagInputProps === null || tagInputProps === void 0 ? void 0 : tagInputProps.onRemove) === null || _a === void 0 ? void 0 : _a.call(tagInputProps, tag, index);
        };
        _this.getTagInputKeyDownHandler = function (handleQueryListKeyDown) {
            return function (e) {
                // HACKHACK: https://github.com/palantir/blueprint/issues/4165
                var which = e.which;
                if (which === Keys.ESCAPE || which === Keys.TAB) {
                    // By default the escape key will not trigger a blur on the
                    // input element. It must be done explicitly.
                    if (_this.input != null) {
                        _this.input.blur();
                    }
                    _this.setState({ isOpen: false });
                }
                else if (!(which === Keys.BACKSPACE || which === Keys.ARROW_LEFT || which === Keys.ARROW_RIGHT)) {
                    _this.setState({ isOpen: true });
                }
                var isTargetingTagRemoveButton = e.target.closest(".".concat(CoreClasses.TAG_REMOVE)) != null;
                if (_this.state.isOpen && !isTargetingTagRemoveButton) {
                    handleQueryListKeyDown === null || handleQueryListKeyDown === void 0 ? void 0 : handleQueryListKeyDown(e);
                }
            };
        };
        _this.getTagInputKeyUpHandler = function (handleQueryListKeyUp) {
            return function (e) {
                var isTargetingInput = e.target.classList.contains(Classes.MULTISELECT_TAG_INPUT_INPUT);
                // only handle events when the focus is on the actual <input> inside the TagInput, as that's
                // what QueryList is designed to do
                if (_this.state.isOpen && isTargetingInput) {
                    handleQueryListKeyUp === null || handleQueryListKeyUp === void 0 ? void 0 : handleQueryListKeyUp(e);
                }
            };
        };
        return _this;
    }
    MultiSelect.ofType = function () {
        return MultiSelect;
    };
    MultiSelect.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b, _c, _d, _e;
        if (((_a = prevProps.tagInputProps) === null || _a === void 0 ? void 0 : _a.inputRef) !== ((_b = this.props.tagInputProps) === null || _b === void 0 ? void 0 : _b.inputRef)) {
            setRef((_c = prevProps.tagInputProps) === null || _c === void 0 ? void 0 : _c.inputRef, null);
            this.refHandlers.input = refHandler(this, "input", (_d = this.props.tagInputProps) === null || _d === void 0 ? void 0 : _d.inputRef);
            setRef((_e = this.props.tagInputProps) === null || _e === void 0 ? void 0 : _e.inputRef, this.input);
        }
    };
    MultiSelect.prototype.render = function () {
        // omit props specific to this component, spread the rest.
        var _a = this.props, openOnKeyDown = _a.openOnKeyDown, popoverProps = _a.popoverProps, tagInputProps = _a.tagInputProps, restProps = __rest(_a, ["openOnKeyDown", "popoverProps", "tagInputProps"]);
        return (React.createElement(QueryList, __assign({}, restProps, { onItemSelect: this.handleItemSelect, onQueryChange: this.handleQueryChange, ref: this.refHandlers.queryList, renderer: this.renderQueryList })));
    };
    MultiSelect.displayName = "".concat(DISPLAYNAME_PREFIX, ".MultiSelect");
    MultiSelect.defaultProps = {
        fill: false,
        placeholder: "Search...",
    };
    return MultiSelect;
}(AbstractPureComponent2));
export { MultiSelect };
//# sourceMappingURL=multiSelect.js.map