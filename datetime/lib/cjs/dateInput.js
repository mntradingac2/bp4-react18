"use strict";
/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
exports.DateInput = void 0;
var tslib_1 = require("tslib");
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to DateInput2 in the datetime2
 * package instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("./common/classes"));
var dateUtils_1 = require("./common/dateUtils");
var dateFormat_1 = require("./dateFormat");
var datePicker_1 = require("./datePicker");
var datePickerCore_1 = require("./datePickerCore");
/**
 * Date input component.
 *
 * @see https://blueprintjs.com/docs/#datetime/dateinput
 * @deprecated use { DateInput2 } from "@blueprintjs/datetime2"
 */
var DateInput = /** @class */ (function (_super) {
    tslib_1.__extends(DateInput, _super);
    function DateInput() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = {
            isInputFocused: false,
            isOpen: false,
            value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue,
            valueString: null,
        };
        _this.inputElement = null;
        _this.popoverContentElement = null;
        _this.handleInputRef = (0, core_1.refHandler)(_this, "inputElement", (_a = _this.props.inputProps) === null || _a === void 0 ? void 0 : _a.inputRef);
        _this.handlePopoverContentRef = (0, core_1.refHandler)(_this, "popoverContentElement");
        _this.handleClosePopover = function (e) {
            var _a;
            var _b = _this.props.popoverProps, popoverProps = _b === void 0 ? {} : _b;
            (_a = popoverProps.onClose) === null || _a === void 0 ? void 0 : _a.call(popoverProps, e);
            _this.setState({ isOpen: false });
        };
        _this.handleDateChange = function (newDate, isUserChange, didSubmitWithEnter) {
            var _a, _b;
            if (didSubmitWithEnter === void 0) { didSubmitWithEnter = false; }
            var prevDate = _this.state.value;
            // this change handler was triggered by a change in month, day, or (if
            // enabled) time. for UX purposes, we want to close the popover only if
            // the user explicitly clicked a day within the current month.
            var isOpen = !isUserChange ||
                !_this.props.closeOnSelection ||
                (prevDate != null && (_this.hasMonthChanged(prevDate, newDate) || _this.hasTimeChanged(prevDate, newDate)));
            // if selecting a date via click or Tab, the input will already be
            // blurred by now, so sync isInputFocused to false. if selecting via
            // Enter, setting isInputFocused to false won't do anything by itself,
            // plus we want the field to retain focus anyway.
            // (note: spelling out the ternary explicitly reads more clearly.)
            var isInputFocused = didSubmitWithEnter ? true : false;
            if (_this.props.value === undefined) {
                var valueString = (0, dateFormat_1.getFormattedDateString)(newDate, _this.props);
                _this.setState({ isInputFocused: isInputFocused, isOpen: isOpen, value: newDate, valueString: valueString });
            }
            else {
                _this.setState({ isInputFocused: isInputFocused, isOpen: isOpen });
            }
            (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, newDate, isUserChange);
        };
        _this.handleInputFocus = function (e) {
            var valueString = _this.state.value == null ? "" : _this.formatDate(_this.state.value);
            _this.setState({ isInputFocused: true, isOpen: true, valueString: valueString });
            _this.safeInvokeInputProp("onFocus", e);
        };
        _this.handleInputClick = function (e) {
            // stop propagation to the Popover's internal handleTargetClick handler;
            // otherwise, the popover will flicker closed as soon as it opens.
            e.stopPropagation();
            _this.safeInvokeInputProp("onClick", e);
        };
        _this.handleInputChange = function (e) {
            var _a, _b, _c, _d;
            var valueString = e.target.value;
            var value = _this.parseDate(valueString);
            if ((0, dateUtils_1.isDateValid)(value) && _this.isDateInRange(value)) {
                if (_this.props.value === undefined) {
                    _this.setState({ value: value, valueString: valueString });
                }
                else {
                    _this.setState({ valueString: valueString });
                }
                (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value, true);
            }
            else {
                if (valueString.length === 0) {
                    (_d = (_c = _this.props).onChange) === null || _d === void 0 ? void 0 : _d.call(_c, null, true);
                }
                _this.setState({ valueString: valueString });
            }
            _this.safeInvokeInputProp("onChange", e);
        };
        _this.handleInputBlur = function (e) {
            var _a, _b, _c, _d, _e, _f;
            var valueString = _this.state.valueString;
            var date = _this.parseDate(valueString);
            if (valueString.length > 0 &&
                valueString !== (0, dateFormat_1.getFormattedDateString)(_this.state.value, _this.props) &&
                (!(0, dateUtils_1.isDateValid)(date) || !_this.isDateInRange(date))) {
                if (_this.props.value === undefined) {
                    _this.setState({ isInputFocused: false, value: date, valueString: null });
                }
                else {
                    _this.setState({ isInputFocused: false });
                }
                if (isNaN(date.valueOf())) {
                    (_b = (_a = _this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, new Date(undefined));
                }
                else if (!_this.isDateInRange(date)) {
                    (_d = (_c = _this.props).onError) === null || _d === void 0 ? void 0 : _d.call(_c, date);
                }
                else {
                    (_f = (_e = _this.props).onChange) === null || _f === void 0 ? void 0 : _f.call(_e, date, true);
                }
            }
            else {
                if (valueString.length === 0) {
                    _this.setState({ isInputFocused: false, value: null, valueString: null });
                }
                else {
                    _this.setState({ isInputFocused: false });
                }
            }
            _this.safeInvokeInputProp("onBlur", e);
        };
        _this.handleInputKeyDown = function (e) {
            var _a, _b;
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            if (e.which === core_1.Keys.ENTER) {
                var nextDate = _this.parseDate(_this.state.valueString);
                _this.handleDateChange(nextDate, true, true);
            }
            else if (e.which === core_1.Keys.TAB && e.shiftKey) {
                // close popover on SHIFT+TAB key press
                _this.handleClosePopover();
            }
            else if (e.which === core_1.Keys.TAB && _this.state.isOpen) {
                (_a = _this.getKeyboardFocusableElements().shift()) === null || _a === void 0 ? void 0 : _a.focus();
                // necessary to prevent focusing the second focusable element
                e.preventDefault();
            }
            else if (e.which === core_1.Keys.ESCAPE) {
                _this.setState({ isOpen: false });
                (_b = _this.inputElement) === null || _b === void 0 ? void 0 : _b.blur();
            }
            _this.safeInvokeInputProp("onKeyDown", e);
        };
        _this.getKeyboardFocusableElements = function () {
            var _a;
            var elements = Array.from((_a = _this.popoverContentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll("button:not([disabled]),input,[tabindex]:not([tabindex='-1'])"));
            // Remove focus boundary div elements
            elements.pop();
            elements.shift();
            return elements;
        };
        _this.handleStartFocusBoundaryFocusIn = function (e) {
            var _a, _b;
            if (_this.popoverContentElement.contains(_this.getRelatedTarget(e))) {
                // Not closing Popover to allow user to freely switch between manually entering a date
                // string in the input and selecting one via the Popover
                (_a = _this.inputElement) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else {
                (_b = _this.getKeyboardFocusableElements().shift()) === null || _b === void 0 ? void 0 : _b.focus();
            }
        };
        _this.handleEndFocusBoundaryFocusIn = function (e) {
            var _a, _b;
            if (_this.popoverContentElement.contains(_this.getRelatedTarget(e))) {
                (_a = _this.inputElement) === null || _a === void 0 ? void 0 : _a.focus();
                _this.handleClosePopover();
            }
            else {
                (_b = _this.getKeyboardFocusableElements().pop()) === null || _b === void 0 ? void 0 : _b.focus();
            }
        };
        _this.handleShortcutChange = function (_, selectedShortcutIndex) {
            _this.setState({ selectedShortcutIndex: selectedShortcutIndex });
        };
        return _this;
    }
    DateInput.prototype.render = function () {
        var _this = this;
        var _a = this.state, value = _a.value, valueString = _a.valueString;
        var dateString = this.state.isInputFocused ? valueString : (0, dateFormat_1.getFormattedDateString)(value, this.props);
        var dateValue = (0, dateUtils_1.isDateValid)(value) ? value : null;
        var dayPickerProps = tslib_1.__assign(tslib_1.__assign({}, this.props.dayPickerProps), { onDayKeyDown: function (day, modifiers, e) {
                var _a, _b;
                (_b = (_a = _this.props.dayPickerProps).onDayKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, day, modifiers, e);
            }, onMonthChange: function (month) {
                var _a, _b;
                (_b = (_a = _this.props.dayPickerProps).onMonthChange) === null || _b === void 0 ? void 0 : _b.call(_a, month);
            } });
        // React's onFocus prop listens to the focusin browser event under the hood, so it's safe to
        // provide it the focusIn event handlers instead of using a ref and manually adding the
        // event listeners ourselves.
        var wrappedPopoverContent = (React.createElement("div", { ref: this.handlePopoverContentRef },
            React.createElement("div", { onFocus: this.handleStartFocusBoundaryFocusIn, tabIndex: 0 }),
            React.createElement(datePicker_1.DatePicker, tslib_1.__assign({}, this.props, { dayPickerProps: dayPickerProps, onChange: this.handleDateChange, value: dateValue, onShortcutChange: this.handleShortcutChange, selectedShortcutIndex: this.state.selectedShortcutIndex })),
            React.createElement("div", { onFocus: this.handleEndFocusBoundaryFocusIn, tabIndex: 0 })));
        // assign default empty object here to prevent mutation
        var _b = this.props, _c = _b.inputProps, inputProps = _c === void 0 ? {} : _c, _d = _b.popoverProps, popoverProps = _d === void 0 ? {} : _d;
        var isErrorState = value != null && (!(0, dateUtils_1.isDateValid)(value) || !this.isDateInRange(value));
        return (React.createElement(core_1.Popover, tslib_1.__assign({ isOpen: this.state.isOpen && !this.props.disabled, fill: this.props.fill }, popoverProps, { autoFocus: false, className: (0, classnames_1.default)(popoverProps.className, this.props.className), content: wrappedPopoverContent, enforceFocus: false, onClose: this.handleClosePopover, popoverClassName: (0, classnames_1.default)(Classes.DATEINPUT_POPOVER, popoverProps.popoverClassName) }),
            React.createElement(core_1.InputGroup, tslib_1.__assign({ autoComplete: "off", intent: isErrorState ? core_1.Intent.DANGER : core_1.Intent.NONE, placeholder: this.props.placeholder, rightElement: this.props.rightElement, type: "text" }, inputProps, { disabled: this.props.disabled, inputRef: this.handleInputRef, onBlur: this.handleInputBlur, onChange: this.handleInputChange, onClick: this.handleInputClick, onFocus: this.handleInputFocus, onKeyDown: this.handleInputKeyDown, value: dateString }))));
    };
    DateInput.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b, _c, _d, _e;
        _super.prototype.componentDidUpdate.call(this, prevProps, prevState);
        if (((_a = prevProps.inputProps) === null || _a === void 0 ? void 0 : _a.inputRef) !== ((_b = this.props.inputProps) === null || _b === void 0 ? void 0 : _b.inputRef)) {
            (0, core_1.setRef)((_c = prevProps.inputProps) === null || _c === void 0 ? void 0 : _c.inputRef, null);
            this.handleInputRef = (0, core_1.refHandler)(this, "inputElement", (_d = this.props.inputProps) === null || _d === void 0 ? void 0 : _d.inputRef);
            (0, core_1.setRef)((_e = this.props.inputProps) === null || _e === void 0 ? void 0 : _e.inputRef, this.inputElement);
        }
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    };
    DateInput.prototype.isDateInRange = function (value) {
        return (0, dateUtils_1.isDayInRange)(value, [this.props.minDate, this.props.maxDate]);
    };
    DateInput.prototype.hasMonthChanged = function (prevDate, nextDate) {
        return (prevDate == null) !== (nextDate == null) || nextDate.getMonth() !== prevDate.getMonth();
    };
    DateInput.prototype.hasTimeChanged = function (prevDate, nextDate) {
        if (this.props.timePrecision == null) {
            return false;
        }
        return ((prevDate == null) !== (nextDate == null) ||
            nextDate.getHours() !== prevDate.getHours() ||
            nextDate.getMinutes() !== prevDate.getMinutes() ||
            nextDate.getSeconds() !== prevDate.getSeconds() ||
            nextDate.getMilliseconds() !== prevDate.getMilliseconds());
    };
    DateInput.prototype.getRelatedTarget = function (e) {
        var _a;
        // Support IE11 (#2924)
        return ((_a = e.relatedTarget) !== null && _a !== void 0 ? _a : document.activeElement);
    };
    /** safe wrapper around invoking input props event handler (prop defaults to undefined) */
    DateInput.prototype.safeInvokeInputProp = function (name, e) {
        var _a;
        var _b = this.props.inputProps, inputProps = _b === void 0 ? {} : _b;
        (_a = inputProps[name]) === null || _a === void 0 ? void 0 : _a.call(inputProps, e);
    };
    DateInput.prototype.parseDate = function (dateString) {
        if (dateString === this.props.outOfRangeMessage || dateString === this.props.invalidDateMessage) {
            return null;
        }
        var _a = this.props, locale = _a.locale, parseDate = _a.parseDate;
        var newDate = parseDate(dateString, locale);
        return newDate === false ? new Date(undefined) : newDate;
    };
    DateInput.prototype.formatDate = function (date) {
        if (!(0, dateUtils_1.isDateValid)(date) || !this.isDateInRange(date)) {
            return "";
        }
        var _a = this.props, locale = _a.locale, formatDate = _a.formatDate;
        return formatDate(date, locale);
    };
    DateInput.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".DateInput");
    DateInput.defaultProps = {
        closeOnSelection: true,
        dayPickerProps: {},
        disabled: false,
        invalidDateMessage: "Invalid date",
        maxDate: (0, datePickerCore_1.getDefaultMaxDate)(),
        minDate: (0, datePickerCore_1.getDefaultMinDate)(),
        outOfRangeMessage: "Out of range",
        reverseMonthAndYearMenus: false,
    };
    return DateInput;
}(core_1.AbstractPureComponent2));
exports.DateInput = DateInput;
//# sourceMappingURL=dateInput.js.map