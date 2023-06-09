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
exports.Select = void 0;
var tslib_1 = require("tslib");
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to Select2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var common_1 = require("../../common");
var queryList_1 = require("../query-list/queryList");
/**
 * Select component.
 *
 * @see https://blueprintjs.com/docs/#select/select-component
 * @deprecated use { Select2 } from "@blueprintjs/select"
 */
var Select = /** @class */ (function (_super) {
    tslib_1.__extends(Select, _super);
    function Select() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = { isOpen: false };
        _this.inputElement = null;
        _this.queryList = null;
        _this.handleInputRef = (0, core_1.refHandler)(_this, "inputElement", (_a = _this.props.inputProps) === null || _a === void 0 ? void 0 : _a.inputRef);
        _this.handleQueryListRef = function (ref) { return (_this.queryList = ref); };
        _this.renderQueryList = function (listProps) {
            var _a;
            // not using defaultProps cuz they're hard to type with generics (can't use <T> on static members)
            var _b = _this.props, fill = _b.fill, _c = _b.filterable, filterable = _c === void 0 ? true : _c, _d = _b.disabled, disabled = _d === void 0 ? false : _d, _e = _b.inputProps, inputProps = _e === void 0 ? {} : _e, _f = _b.popoverProps, popoverProps = _f === void 0 ? {} : _f, matchTargetWidth = _b.matchTargetWidth;
            if (fill) {
                popoverProps.fill = true;
            }
            if (matchTargetWidth) {
                if (popoverProps.modifiers == null) {
                    popoverProps.modifiers = {};
                }
                popoverProps.modifiers.minWidth = {
                    enabled: true,
                    fn: function (data) {
                        data.styles.width = "".concat(data.offsets.reference.width, "px");
                        return data;
                    },
                    order: 800,
                };
                popoverProps.usePortal = false;
                popoverProps.wrapperTagName = "div";
            }
            var input = (React.createElement(core_1.InputGroup, tslib_1.__assign({ leftIcon: "search", placeholder: "Filter...", rightElement: _this.maybeRenderClearButton(listProps.query) }, inputProps, { inputRef: _this.handleInputRef, onChange: listProps.handleQueryChange, value: listProps.query })));
            var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
            return (React.createElement(core_1.Popover, tslib_1.__assign({ autoFocus: false, enforceFocus: false, isOpen: _this.state.isOpen, disabled: disabled, position: core_1.Position.BOTTOM_LEFT }, popoverProps, { className: (0, classnames_1.default)(listProps.className, popoverProps.className), onInteraction: _this.handlePopoverInteraction, popoverClassName: (0, classnames_1.default)(common_1.Classes.SELECT_POPOVER, popoverProps.popoverClassName, (_a = {},
                    _a[common_1.Classes.SELECT_MATCH_TARGET_WIDTH] = matchTargetWidth,
                    _a)), onOpening: _this.handlePopoverOpening, onOpened: _this.handlePopoverOpened, onClosing: _this.handlePopoverClosing }),
                React.createElement("div", { onKeyDown: _this.state.isOpen ? handleKeyDown : _this.handleTargetKeyDown, onKeyUp: _this.state.isOpen ? handleKeyUp : undefined }, _this.props.children),
                React.createElement("div", { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp },
                    filterable ? input : undefined,
                    listProps.itemList)));
        };
        _this.handleTargetKeyDown = function (event) {
            // open popover when arrow key pressed on target while closed
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            if (event.which === core_1.Keys.ARROW_UP || event.which === core_1.Keys.ARROW_DOWN) {
                event.preventDefault();
                _this.setState({ isOpen: true });
            }
        };
        _this.handleItemSelect = function (item, event) {
            var _a, _b;
            _this.setState({ isOpen: false });
            (_b = (_a = _this.props).onItemSelect) === null || _b === void 0 ? void 0 : _b.call(_a, item, event);
        };
        _this.handlePopoverInteraction = function (isOpen, event) {
            var _a, _b;
            _this.setState({ isOpen: isOpen });
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onInteraction) === null || _b === void 0 ? void 0 : _b.call(_a, isOpen, event);
        };
        _this.handlePopoverOpening = function (node) {
            var _a, _b;
            // save currently focused element before popover steals focus, so we can restore it when closing.
            _this.previousFocusedElement = document.activeElement;
            if (_this.props.resetOnClose) {
                _this.resetQuery();
            }
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onOpening) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        };
        _this.handlePopoverOpened = function (node) {
            var _a, _b;
            // scroll active item into view after popover transition completes and all dimensions are stable.
            if (_this.queryList != null) {
                _this.queryList.scrollActiveItemIntoView();
            }
            _this.requestAnimationFrame(function () {
                var _a;
                var _b = _this.props.inputProps, inputProps = _b === void 0 ? {} : _b;
                // autofocus is enabled by default
                if (inputProps.autoFocus !== false) {
                    (_a = _this.inputElement) === null || _a === void 0 ? void 0 : _a.focus();
                }
            });
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onOpened) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        };
        _this.handlePopoverClosing = function (node) {
            var _a, _b;
            // restore focus to saved element.
            // timeout allows popover to begin closing and remove focus handlers beforehand.
            /* istanbul ignore next */
            _this.requestAnimationFrame(function () {
                if (_this.previousFocusedElement !== undefined) {
                    _this.previousFocusedElement.focus();
                    _this.previousFocusedElement = undefined;
                }
            });
            (_b = (_a = _this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.onClosing) === null || _b === void 0 ? void 0 : _b.call(_a, node);
        };
        _this.resetQuery = function () { return _this.queryList && _this.queryList.setQuery("", true); };
        return _this;
    }
    Select.ofType = function () {
        return Select;
    };
    Select.prototype.render = function () {
        // omit props specific to this component, spread the rest.
        var _a = this.props, filterable = _a.filterable, inputProps = _a.inputProps, popoverProps = _a.popoverProps, restProps = tslib_1.__rest(_a, ["filterable", "inputProps", "popoverProps"]);
        return (React.createElement(queryList_1.QueryList, tslib_1.__assign({}, restProps, { onItemSelect: this.handleItemSelect, ref: this.handleQueryListRef, renderer: this.renderQueryList })));
    };
    Select.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b, _c, _d, _e;
        if (((_a = prevProps.inputProps) === null || _a === void 0 ? void 0 : _a.inputRef) !== ((_b = this.props.inputProps) === null || _b === void 0 ? void 0 : _b.inputRef)) {
            (0, core_1.setRef)((_c = prevProps.inputProps) === null || _c === void 0 ? void 0 : _c.inputRef, null);
            this.handleInputRef = (0, core_1.refHandler)(this, "inputElement", (_d = this.props.inputProps) === null || _d === void 0 ? void 0 : _d.inputRef);
            (0, core_1.setRef)((_e = this.props.inputProps) === null || _e === void 0 ? void 0 : _e.inputRef, this.inputElement);
        }
        if (this.state.isOpen && !prevState.isOpen && this.queryList != null) {
            this.queryList.scrollActiveItemIntoView();
        }
    };
    Select.prototype.maybeRenderClearButton = function (query) {
        return query.length > 0 ? React.createElement(core_1.Button, { icon: "cross", minimal: true, onClick: this.resetQuery }) : undefined;
    };
    Select.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".Select");
    return Select;
}(core_1.AbstractPureComponent2));
exports.Select = Select;
//# sourceMappingURL=select.js.map