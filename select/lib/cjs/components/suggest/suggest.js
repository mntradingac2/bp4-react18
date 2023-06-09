"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suggest = void 0;
var tslib_1 = require("tslib");
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to Suggest2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var common_1 = require("../../common");
var queryList_1 = require("../query-list/queryList");
/**
 * Suggest component.
 *
 * @see https://blueprintjs.com/docs/#select/suggest
 * @deprecated use { Suggest2 } from "@blueprintjs/select"
 */
var Suggest = /** @class */ (function (_super) {
    tslib_1.__extends(Suggest, _super);
    function Suggest() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: (_this.props.popoverProps != null && _this.props.popoverProps.isOpen) || false,
            selectedItem: _this.getInitialSelectedItem(),
        };
        _this.inputElement = null;
        _this.queryList = null;
        _this.handleInputRef = (0, core_1.refHandler)(_this, "inputElement", (_a = _this.props.inputProps) === null || _a === void 0 ? void 0 : _a.inputRef);
        _this.handleQueryListRef = function (ref) { return (_this.queryList = ref); };
        _this.renderQueryList = function (listProps) {
            var _a = _this.props, fill = _a.fill, _b = _a.inputProps, inputProps = _b === void 0 ? {} : _b, _c = _a.popoverProps, popoverProps = _c === void 0 ? {} : _c;
            var _d = _this.state, isOpen = _d.isOpen, selectedItem = _d.selectedItem;
            var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
            var _e = inputProps.autoComplete, autoComplete = _e === void 0 ? "off" : _e, _f = inputProps.placeholder, placeholder = _f === void 0 ? "Search..." : _f;
            var selectedItemText = selectedItem ? _this.props.inputValueRenderer(selectedItem) : "";
            // placeholder shows selected item while open.
            var inputPlaceholder = isOpen && selectedItemText ? selectedItemText : placeholder;
            // value shows query when open, and query remains when closed if nothing is selected.
            // if resetOnClose is enabled, then hide query when not open. (see handlePopoverOpening)
            var inputValue = isOpen
                ? listProps.query
                : selectedItemText || (_this.props.resetOnClose ? "" : listProps.query);
            if (fill) {
                popoverProps.fill = true;
                inputProps.fill = true;
            }
            return (React.createElement(core_1.Popover, tslib_1.__assign({ autoFocus: false, enforceFocus: false, isOpen: isOpen, position: core_1.Position.BOTTOM_LEFT }, popoverProps, { className: (0, classnames_1.default)(listProps.className, popoverProps.className), interactionKind: core_1.PopoverInteractionKind.CLICK, onInteraction: _this.handlePopoverInteraction, popoverClassName: (0, classnames_1.default)(common_1.Classes.SELECT_POPOVER, popoverProps.popoverClassName), onOpening: _this.handlePopoverOpening, onOpened: _this.handlePopoverOpened }),
                React.createElement(core_1.InputGroup, tslib_1.__assign({ autoComplete: autoComplete, disabled: _this.props.disabled }, inputProps, { inputRef: _this.handleInputRef, onChange: listProps.handleQueryChange, onFocus: _this.handleInputFocus, onKeyDown: _this.getTargetKeyDownHandler(handleKeyDown), onKeyUp: _this.getTargetKeyUpHandler(handleKeyUp), placeholder: inputPlaceholder, value: inputValue })),
                React.createElement("div", { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }, listProps.itemList)));
        };
        _this.selectText = function () {
            // wait until the input is properly focused to select the text inside of it
            _this.requestAnimationFrame(function () {
                var _a;
                (_a = _this.inputElement) === null || _a === void 0 ? void 0 : _a.setSelectionRange(0, _this.inputElement.value.length);
            });
        };
        _this.handleInputFocus = function (event) {
            var _a, _b;
            _this.selectText();
            // TODO can we leverage Popover.openOnTargetFocus for this?
            if (!_this.props.openOnKeyDown) {
                _this.setState({ isOpen: true });
            }
            (_b = (_a = _this.props.inputProps) === null || _a === void 0 ? void 0 : _a.onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        _this.handleItemSelect = function (item, event) {
            var _a, _b, _c, _d;
            var nextOpenState;
            if (!_this.props.closeOnSelect) {
                (_a = _this.inputElement) === null || _a === void 0 ? void 0 : _a.focus();
                _this.selectText();
                nextOpenState = true;
            }
            else {
                (_b = _this.inputElement) === null || _b === void 0 ? void 0 : _b.blur();
                nextOpenState = false;
            }
            // the internal state should only change when uncontrolled.
            if (_this.props.selectedItem === undefined) {
                _this.setState({
                    isOpen: nextOpenState,
                    selectedItem: item,
                });
            }
            else {
                // otherwise just set the next open state.
                _this.setState({ isOpen: nextOpenState });
            }
            (_d = (_c = _this.props).onItemSelect) === null || _d === void 0 ? void 0 : _d.call(_c, item, event);
        };
        // Popover interaction kind is CLICK, so this only handles click events.
        // Note that we defer to the next animation frame in order to get the latest document.activeElement
        _this.handlePopoverInteraction = function (nextOpenState, event) {
            return _this.requestAnimationFrame(function () {
                var _a, _b;
                var isInputFocused = _this.inputElement === document.activeElement;
                if (_this.inputElement != null && !isInputFocused) {
                    // the input is no longer focused, we should close the popover
                    _this.setState({ isOpen: false });
                }
                (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onInteraction) === null || _b === void 0 ? void 0 : _b.call(_a, nextOpenState, event);
            });
        };
        _this.handlePopoverOpening = function (node) {
            var _a, _b;
            // reset query before opening instead of when closing to prevent flash of unfiltered items.
            // this is a limitation of the interactions between QueryList state and Popover transitions.
            if (_this.props.resetOnClose && _this.queryList) {
                _this.queryList.setQuery("", true);
            }
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onOpening) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        };
        _this.handlePopoverOpened = function (node) {
            var _a, _b;
            // scroll active item into view after popover transition completes and all dimensions are stable.
            if (_this.queryList != null) {
                _this.queryList.scrollActiveItemIntoView();
            }
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onOpened) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        };
        _this.getTargetKeyDownHandler = function (handleQueryListKeyDown) {
            return function (evt) {
                var _a, _b, _c;
                // HACKHACK: https://github.com/palantir/blueprint/issues/4165
                var which = evt.which;
                if (which === core_1.Keys.ESCAPE || which === core_1.Keys.TAB) {
                    (_a = _this.inputElement) === null || _a === void 0 ? void 0 : _a.blur();
                    _this.setState({ isOpen: false });
                }
                else if (_this.props.openOnKeyDown &&
                    which !== core_1.Keys.BACKSPACE &&
                    which !== core_1.Keys.ARROW_LEFT &&
                    which !== core_1.Keys.ARROW_RIGHT) {
                    _this.setState({ isOpen: true });
                }
                if (_this.state.isOpen) {
                    handleQueryListKeyDown === null || handleQueryListKeyDown === void 0 ? void 0 : handleQueryListKeyDown(evt);
                }
                (_c = (_b = _this.props.inputProps) === null || _b === void 0 ? void 0 : _b.onKeyDown) === null || _c === void 0 ? void 0 : _c.call(_b, evt);
            };
        };
        _this.getTargetKeyUpHandler = function (handleQueryListKeyUp) {
            return function (evt) {
                var _a, _b;
                if (_this.state.isOpen) {
                    handleQueryListKeyUp === null || handleQueryListKeyUp === void 0 ? void 0 : handleQueryListKeyUp(evt);
                }
                (_b = (_a = _this.props.inputProps) === null || _a === void 0 ? void 0 : _a.onKeyUp) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
            };
        };
        return _this;
    }
    Suggest.ofType = function () {
        return Suggest;
    };
    Suggest.prototype.render = function () {
        var _a;
        // omit props specific to this component, spread the rest.
        var _b = this.props, disabled = _b.disabled, inputProps = _b.inputProps, popoverProps = _b.popoverProps, restProps = tslib_1.__rest(_b, ["disabled", "inputProps", "popoverProps"]);
        return (React.createElement(queryList_1.QueryList, tslib_1.__assign({}, restProps, { initialActiveItem: (_a = this.props.selectedItem) !== null && _a !== void 0 ? _a : undefined, onItemSelect: this.handleItemSelect, ref: this.handleQueryListRef, renderer: this.renderQueryList })));
    };
    Suggest.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        if (((_a = prevProps.inputProps) === null || _a === void 0 ? void 0 : _a.inputRef) !== ((_b = this.props.inputProps) === null || _b === void 0 ? void 0 : _b.inputRef)) {
            (0, core_1.setRef)((_c = prevProps.inputProps) === null || _c === void 0 ? void 0 : _c.inputRef, null);
            this.handleInputRef = (0, core_1.refHandler)(this, "inputElement", (_d = this.props.inputProps) === null || _d === void 0 ? void 0 : _d.inputRef);
            (0, core_1.setRef)((_e = this.props.inputProps) === null || _e === void 0 ? void 0 : _e.inputRef, this.inputElement);
        }
        // If the selected item prop changes, update the underlying state.
        if (this.props.selectedItem !== undefined && this.props.selectedItem !== this.state.selectedItem) {
            this.setState({ selectedItem: this.props.selectedItem });
        }
        if (this.state.isOpen === false && prevState.isOpen === true) {
            // just closed, likely by keyboard interaction
            // wait until the transition ends so there isn't a flash of content in the popover
            var timeout = (_g = (_f = this.props.popoverProps) === null || _f === void 0 ? void 0 : _f.transitionDuration) !== null && _g !== void 0 ? _g : core_1.Popover.defaultProps.transitionDuration;
            setTimeout(function () { return _this.maybeResetActiveItemToSelectedItem(); }, timeout);
        }
        if (this.state.isOpen && !prevState.isOpen && this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
    };
    Suggest.prototype.getInitialSelectedItem = function () {
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
    };
    Suggest.prototype.maybeResetActiveItemToSelectedItem = function () {
        var _a;
        var shouldResetActiveItemToSelectedItem = this.props.activeItem === undefined && this.state.selectedItem !== null && !this.props.resetOnSelect;
        if (this.queryList !== null && shouldResetActiveItemToSelectedItem) {
            this.queryList.setActiveItem((_a = this.props.selectedItem) !== null && _a !== void 0 ? _a : this.state.selectedItem);
        }
    };
    Suggest.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".Suggest");
    Suggest.defaultProps = {
        closeOnSelect: true,
        fill: false,
        openOnKeyDown: false,
        resetOnClose: false,
    };
    return Suggest;
}(core_1.AbstractPureComponent2));
exports.Suggest = Suggest;
//# sourceMappingURL=suggest.js.map