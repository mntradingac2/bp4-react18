"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suggest2 = void 0;
var tslib_1 = require("tslib");
/** @fileoverview "V2" variant of Suggest which uses Popover2 instead of Popover2 */
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var popover2_1 = require("@blueprintjs/popover2");
var common_1 = require("../../common");
var queryList_1 = require("../query-list/queryList");
/**
 * Suggest (v2) component.
 *
 * @see https://blueprintjs.com/docs/#select/suggest2
 */
var Suggest2 = /** @class */ (function (_super) {
    tslib_1.__extends(Suggest2, _super);
    function Suggest2() {
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
        _this.listboxId = core_1.Utils.uniqueId("listbox");
        _this.renderQueryList = function (listProps) {
            var _a = _this.props, _b = _a.popoverContentProps, popoverContentProps = _b === void 0 ? {} : _b, _c = _a.popoverProps, popoverProps = _c === void 0 ? {} : _c, popoverRef = _a.popoverRef;
            var isOpen = _this.state.isOpen;
            var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
            // N.B. no need to set `popoverProps.fill` since that is unused with the `renderTarget` API
            return (React.createElement(popover2_1.Popover2, tslib_1.__assign({ autoFocus: false, enforceFocus: false, isOpen: isOpen, placement: popoverProps.position || popoverProps.placement ? undefined : "bottom-start" }, popoverProps, { className: (0, classnames_1.default)(listProps.className, popoverProps.className), content: React.createElement("div", tslib_1.__assign({}, popoverContentProps, { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp }), listProps.itemList), interactionKind: "click", onInteraction: _this.handlePopoverInteraction, onOpened: _this.handlePopoverOpened, onOpening: _this.handlePopoverOpening, popoverClassName: (0, classnames_1.default)(common_1.Classes.SUGGEST_POPOVER, popoverProps.popoverClassName), popupKind: popover2_1.PopupKind.LISTBOX, ref: popoverRef, renderTarget: _this.getPopoverTargetRenderer(listProps, isOpen) })));
        };
        // We use the renderTarget API to flatten the rendered DOM and make it easier to implement features like
        // the "fill" prop. Note that we must take `isOpen` as an argument to force this render function to be called
        // again after that state changes.
        _this.getPopoverTargetRenderer = function (listProps, isOpen) {
            // eslint-disable-next-line react/display-name
            return function (_a) {
                var 
                // pull out `isOpen` so that it's not forwarded to the DOM
                _isOpen = _a.isOpen, ref = _a.ref, targetProps = tslib_1.__rest(_a, ["isOpen", "ref"]);
                var _b = _this.props, disabled = _b.disabled, fill = _b.fill, _c = _b.inputProps, inputProps = _c === void 0 ? {} : _c, inputValueRenderer = _b.inputValueRenderer, _d = _b.popoverProps, popoverProps = _d === void 0 ? {} : _d, resetOnClose = _b.resetOnClose;
                var selectedItem = _this.state.selectedItem;
                var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
                var selectedItemText = selectedItem == null ? "" : inputValueRenderer(selectedItem);
                var _e = inputProps.autoComplete, autoComplete = _e === void 0 ? "off" : _e, _f = inputProps.placeholder, placeholder = _f === void 0 ? "Search..." : _f;
                // placeholder shows selected item while open.
                var inputPlaceholder = isOpen && selectedItemText ? selectedItemText : placeholder;
                // value shows query when open, and query remains when closed if nothing is selected.
                // if resetOnClose is enabled, then hide query when not open. (see handlePopoverOpening)
                var inputValue = isOpen
                    ? listProps.query
                    : selectedItemText === ""
                        ? resetOnClose
                            ? ""
                            : listProps.query
                        : selectedItemText;
                return (React.createElement(core_1.InputGroup, tslib_1.__assign({ "aria-controls": _this.listboxId, autoComplete: autoComplete, disabled: disabled, tagName: popoverProps.targetTagName }, targetProps, inputProps, { "aria-autocomplete": "list", "aria-expanded": isOpen, className: (0, classnames_1.default)(targetProps.className, inputProps.className), fill: fill, inputRef: (0, core_1.mergeRefs)(_this.handleInputRef, ref), onChange: listProps.handleQueryChange, onFocus: _this.handleInputFocus, onKeyDown: _this.getTargetKeyDownHandler(handleKeyDown), onKeyUp: _this.getTargetKeyUpHandler(handleKeyUp), placeholder: inputPlaceholder, role: "combobox", value: inputValue })));
            };
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
            // TODO can we leverage Popover2.openOnTargetFocus for this?
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
        // Popover2 interaction kind is CLICK, so this only handles click events.
        // Note that we defer to the next animation frame in order to get the latest activeElement
        _this.handlePopoverInteraction = function (nextOpenState, event) {
            return _this.requestAnimationFrame(function () {
                var _a, _b;
                var isInputFocused = _this.inputElement === core_1.Utils.getActiveElement(_this.inputElement);
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
            // this is a limitation of the interactions between QueryList state and Popover2 transitions.
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
                // eslint-disable-next-line deprecation/deprecation
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
    /** @deprecated no longer necessary now that the TypeScript parser supports type arguments on JSX element tags */
    Suggest2.ofType = function () {
        return Suggest2;
    };
    Suggest2.prototype.render = function () {
        var _a;
        // omit props specific to this component, spread the rest.
        var _b = this.props, disabled = _b.disabled, inputProps = _b.inputProps, menuProps = _b.menuProps, popoverProps = _b.popoverProps, restProps = tslib_1.__rest(_b, ["disabled", "inputProps", "menuProps", "popoverProps"]);
        return (React.createElement(queryList_1.QueryList, tslib_1.__assign({}, restProps, { menuProps: tslib_1.__assign(tslib_1.__assign({ "aria-label": "selectable options" }, menuProps), { id: this.listboxId }), initialActiveItem: (_a = this.props.selectedItem) !== null && _a !== void 0 ? _a : undefined, onItemSelect: this.handleItemSelect, ref: this.handleQueryListRef, renderer: this.renderQueryList })));
    };
    Suggest2.prototype.componentDidUpdate = function (prevProps, prevState) {
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
            /* eslint-disable-next-line deprecation/deprecation */
            var timeout = (_g = (_f = this.props.popoverProps) === null || _f === void 0 ? void 0 : _f.transitionDuration) !== null && _g !== void 0 ? _g : popover2_1.Popover2.defaultProps.transitionDuration;
            setTimeout(function () { return _this.maybeResetActiveItemToSelectedItem(); }, timeout);
        }
        if (this.state.isOpen && !prevState.isOpen && this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
    };
    Suggest2.prototype.getInitialSelectedItem = function () {
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
    Suggest2.prototype.maybeResetActiveItemToSelectedItem = function () {
        var _a;
        var shouldResetActiveItemToSelectedItem = this.props.activeItem === undefined && this.state.selectedItem !== null && !this.props.resetOnSelect;
        if (this.queryList !== null && shouldResetActiveItemToSelectedItem) {
            this.queryList.setActiveItem((_a = this.props.selectedItem) !== null && _a !== void 0 ? _a : this.state.selectedItem);
        }
    };
    Suggest2.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".Suggest2");
    Suggest2.defaultProps = {
        closeOnSelect: true,
        fill: false,
        openOnKeyDown: false,
        resetOnClose: false,
    };
    return Suggest2;
}(core_1.AbstractPureComponent2));
exports.Suggest2 = Suggest2;
//# sourceMappingURL=suggest2.js.map