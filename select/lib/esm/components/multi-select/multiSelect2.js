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
import { __assign, __extends, __rest } from "tslib";
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
var MultiSelect2 = /** @class */ (function (_super) {
    __extends(MultiSelect2, _super);
    function MultiSelect2() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.listboxId = Utils.uniqueId("listbox");
        _this.state = {
            isOpen: (_this.props.popoverProps && _this.props.popoverProps.isOpen) || false,
        };
        _this.input = null;
        _this.queryList = null;
        _this.refHandlers = {
            input: refHandler(_this, "input", (_a = _this.props.tagInputProps) === null || _a === void 0 ? void 0 : _a.inputRef),
            popover: React.createRef(),
            queryList: function (ref) { return (_this.queryList = ref); },
        };
        _this.renderQueryList = function (listProps) {
            var _a = _this.props, disabled = _a.disabled, _b = _a.popoverContentProps, popoverContentProps = _b === void 0 ? {} : _b, _c = _a.popoverProps, popoverProps = _c === void 0 ? {} : _c;
            var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
            var popoverRef = _this.props.popoverRef === undefined
                ? _this.refHandlers.popover
                : mergeRefs(_this.refHandlers.popover, _this.props.popoverRef);
            // N.B. no need to set `popoverProps.fill` since that is unused with the `renderTarget` API
            return (React.createElement(Popover2, __assign({ autoFocus: false, canEscapeKeyClose: true, disabled: disabled, enforceFocus: false, isOpen: _this.state.isOpen, placement: popoverProps.position || popoverProps.placement ? undefined : "bottom-start" }, popoverProps, { className: classNames(listProps.className, popoverProps.className), content: React.createElement("div", __assign({}, popoverContentProps, { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }), listProps.itemList), interactionKind: "click", onInteraction: _this.handlePopoverInteraction, onOpened: _this.handlePopoverOpened, popoverClassName: classNames(Classes.MULTISELECT_POPOVER, popoverProps.popoverClassName), popupKind: PopupKind.LISTBOX, ref: popoverRef, renderTarget: _this.getPopoverTargetRenderer(listProps, _this.state.isOpen) })));
        };
        // We use the renderTarget API to flatten the rendered DOM and make it easier to implement features like
        // the "fill" prop. Note that we must take `isOpen` as an argument to force this render function to be called
        // again after that state changes.
        _this.getPopoverTargetRenderer = function (listProps, isOpen) {
            // N.B. pull out `isOpen` so that it's not forwarded to the DOM, but remember not to use it directly
            // since it may be stale (`renderTarget` is not re-invoked on this.state changes).
            // eslint-disable-next-line react/display-name
            return function (_a) {
                var _b;
                var _c;
                var _isOpen = _a.isOpen, ref = _a.ref, targetProps = __rest(_a, ["isOpen", "ref"]);
                var _d = _this.props, disabled = _d.disabled, fill = _d.fill, onClear = _d.onClear, placeholder = _d.placeholder, _e = _d.popoverProps, popoverProps = _e === void 0 ? {} : _e, _f = _d.popoverTargetProps, popoverTargetProps = _f === void 0 ? {} : _f, selectedItems = _d.selectedItems, _g = _d.tagInputProps, tagInputProps = _g === void 0 ? {} : _g;
                var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
                if (disabled) {
                    tagInputProps.disabled = true;
                }
                if (fill) {
                    tagInputProps.fill = true;
                }
                // add our own inputProps.className so that we can reference it in event handlers
                var inputProps = __assign(__assign({}, tagInputProps.inputProps), { className: classNames((_c = tagInputProps.inputProps) === null || _c === void 0 ? void 0 : _c.className, Classes.MULTISELECT_TAG_INPUT_INPUT) });
                var maybeClearButton = onClear !== undefined && selectedItems.length > 0 ? (
                // use both aria-label and title a11y attributes here, for screen readers
                // and mouseover interactions respectively
                React.createElement(Button, { "aria-label": "Clear selected items", disabled: disabled, icon: "cross", minimal: true, onClick: _this.handleClearButtonClick, title: "Clear selected items" })) : undefined;
                var _h = popoverProps.targetTagName, targetTagName = _h === void 0 ? "div" : _h;
                return React.createElement(targetTagName, __assign(__assign(__assign({ "aria-autocomplete": "list", "aria-controls": _this.listboxId }, popoverTargetProps), targetProps), { "aria-disabled": disabled, "aria-expanded": isOpen, 
                    // Note that we must set FILL here in addition to TagInput to get the wrapper element to full width
                    className: classNames(targetProps.className, popoverTargetProps.className, (_b = {},
                        _b[CoreClasses.FILL] = fill,
                        _b)), 
                    // Normally, Popover2 would also need to attach its own `onKeyDown` handler via `targetProps`,
                    // but in our case we fully manage that interaction and listen for key events to open/close
                    // the popover, so we elide it from the DOM.
                    onKeyDown: _this.getTagInputKeyDownHandler(handleKeyDown), onKeyUp: _this.getTagInputKeyUpHandler(handleKeyUp), ref: ref, role: "combobox" }), React.createElement(TagInput, __assign({ placeholder: placeholder, rightElement: maybeClearButton }, tagInputProps, { className: classNames(Classes.MULTISELECT, tagInputProps.className), inputRef: _this.refHandlers.input, inputProps: inputProps, inputValue: listProps.query, onAdd: _this.getTagInputAddHandler(listProps), onInputChange: listProps.handleQueryChange, onRemove: _this.handleTagRemove, values: selectedItems.map(_this.props.tagRenderer) })));
            };
        };
        _this.handleItemSelect = function (item, evt) {
            var _a, _b, _c;
            if (_this.input != null) {
                _this.input.focus();
            }
            (_b = (_a = _this.props).onItemSelect) === null || _b === void 0 ? void 0 : _b.call(_a, item, evt);
            (_c = _this.refHandlers.popover.current) === null || _c === void 0 ? void 0 : _c.reposition(); // reposition when size of input changes
        };
        _this.handleQueryChange = function (query, evt) {
            var _a, _b;
            _this.setState({ isOpen: query.length > 0 || !_this.props.openOnKeyDown });
            (_b = (_a = _this.props).onQueryChange) === null || _b === void 0 ? void 0 : _b.call(_a, query, evt);
        };
        // Popover interaction kind is CLICK, so this only handles click events.
        // Note that we defer to the next animation frame in order to get the latest activeElement
        _this.handlePopoverInteraction = function (nextOpenState, evt) {
            return _this.requestAnimationFrame(function () {
                var _a, _b;
                var isInputFocused = _this.input === Utils.getActiveElement(_this.input);
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
            var _a, _b;
            var _c = _this.props, selectedItems = _c.selectedItems, onRemove = _c.onRemove, tagInputProps = _c.tagInputProps;
            onRemove === null || onRemove === void 0 ? void 0 : onRemove(selectedItems[index], index);
            (_a = tagInputProps === null || tagInputProps === void 0 ? void 0 : tagInputProps.onRemove) === null || _a === void 0 ? void 0 : _a.call(tagInputProps, tag, index);
            (_b = _this.refHandlers.popover.current) === null || _b === void 0 ? void 0 : _b.reposition(); // reposition when size of input changes
        };
        _this.getTagInputAddHandler = function (listProps) { return function (values, method) {
            if (method === "paste") {
                listProps.handlePaste(values);
            }
        }; };
        _this.getTagInputKeyDownHandler = function (handleQueryListKeyDown) {
            return function (e) {
                var _a, _b;
                // HACKHACK: https://github.com/palantir/blueprint/issues/4165
                // eslint-disable-next-line deprecation/deprecation
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
                (_b = (_a = _this.props.popoverTargetProps) === null || _a === void 0 ? void 0 : _a.onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
            };
        };
        _this.getTagInputKeyUpHandler = function (handleQueryListKeyUp) {
            return function (e) {
                var _a, _b;
                var isTargetingInput = e.target.classList.contains(Classes.MULTISELECT_TAG_INPUT_INPUT);
                // only handle events when the focus is on the actual <input> inside the TagInput, as that's
                // what QueryList is designed to do
                if (_this.state.isOpen && isTargetingInput) {
                    handleQueryListKeyUp === null || handleQueryListKeyUp === void 0 ? void 0 : handleQueryListKeyUp(e);
                }
                (_b = (_a = _this.props.popoverTargetProps) === null || _a === void 0 ? void 0 : _a.onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
            };
        };
        _this.handleClearButtonClick = function () {
            var _a, _b, _c;
            (_b = (_a = _this.props).onClear) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_c = _this.refHandlers.popover.current) === null || _c === void 0 ? void 0 : _c.reposition(); // reposition when size of input changes
        };
        return _this;
    }
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    MultiSelect2.ofType = function () {
        return MultiSelect2;
    };
    MultiSelect2.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b, _c, _d, _e;
        if (((_a = prevProps.tagInputProps) === null || _a === void 0 ? void 0 : _a.inputRef) !== ((_b = this.props.tagInputProps) === null || _b === void 0 ? void 0 : _b.inputRef)) {
            setRef((_c = prevProps.tagInputProps) === null || _c === void 0 ? void 0 : _c.inputRef, null);
            this.refHandlers.input = refHandler(this, "input", (_d = this.props.tagInputProps) === null || _d === void 0 ? void 0 : _d.inputRef);
            setRef((_e = this.props.tagInputProps) === null || _e === void 0 ? void 0 : _e.inputRef, this.input);
        }
        if ((prevProps.onClear === undefined && this.props.onClear !== undefined) ||
            (prevProps.onClear !== undefined && this.props.onClear === undefined)) {
            this.forceUpdate();
        }
    };
    MultiSelect2.prototype.render = function () {
        // omit props specific to this component, spread the rest.
        var _a = this.props, menuProps = _a.menuProps, openOnKeyDown = _a.openOnKeyDown, popoverProps = _a.popoverProps, tagInputProps = _a.tagInputProps, restProps = __rest(_a, ["menuProps", "openOnKeyDown", "popoverProps", "tagInputProps"]);
        return (React.createElement(QueryList, __assign({}, restProps, { menuProps: __assign(__assign({ "aria-label": "selectable options" }, menuProps), { "aria-multiselectable": true, id: this.listboxId }), onItemSelect: this.handleItemSelect, onQueryChange: this.handleQueryChange, ref: this.refHandlers.queryList, renderer: this.renderQueryList })));
    };
    MultiSelect2.displayName = "".concat(DISPLAYNAME_PREFIX, ".MultiSelect2");
    MultiSelect2.defaultProps = {
        disabled: false,
        fill: false,
        placeholder: "Search...",
    };
    return MultiSelect2;
}(AbstractPureComponent2));
export { MultiSelect2 };
//# sourceMappingURL=multiSelect2.js.map