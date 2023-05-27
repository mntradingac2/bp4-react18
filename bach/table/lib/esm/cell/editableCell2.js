/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
import { Utils as CoreUtils, DISPLAYNAME_PREFIX, EditableText, HotkeysTarget2, } from "@blueprintjs/core";
import * as Classes from "../common/classes";
import { Draggable } from "../interactions/draggable";
import { Cell } from "./cell";
/**
 * Editable cell (v2) component.
 *
 * @see https://blueprintjs.com/docs/#table/api.editablecell2
 */
var EditableCell2 = /** @class */ (function (_super) {
    __extends(EditableCell2, _super);
    function EditableCell2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refHandlers = {
            cell: function (ref) {
                _this.cellRef = ref;
            },
        };
        _this.state = {
            isEditing: false,
            savedValue: _this.props.value,
        };
        _this.renderCell = function (_a) {
            var _b;
            var handleKeyDown = _a.handleKeyDown, handleKeyUp = _a.handleKeyUp;
            var _c = _this.props, editableTextProps = _c.editableTextProps, onCancel = _c.onCancel, onChange = _c.onChange, onConfirm = _c.onConfirm, _d = _c.tabIndex, tabIndex = _d === void 0 ? 0 : _d, truncated = _c.truncated, wrapText = _c.wrapText, spreadableProps = __rest(_c, ["editableTextProps", "onCancel", "onChange", "onConfirm", "tabIndex", "truncated", "wrapText"]);
            var _e = _this.state, isEditing = _e.isEditing, dirtyValue = _e.dirtyValue, savedValue = _e.savedValue;
            var interactive = spreadableProps.interactive || isEditing;
            var hasValue = _this.props.value != null && _this.props.value !== "";
            var cellContents;
            if (isEditing) {
                var className = editableTextProps ? editableTextProps.className : null;
                cellContents = (React.createElement(EditableText, __assign({}, editableTextProps, { isEditing: true, className: classNames(Classes.TABLE_EDITABLE_TEXT, Classes.TABLE_EDITABLE_NAME, className), intent: spreadableProps.intent, minWidth: 0, onCancel: _this.handleCancel, onChange: _this.handleChange, onConfirm: _this.handleConfirm, onEdit: _this.handleEdit, placeholder: _this.props.placeholder, selectAllOnFocus: false, value: dirtyValue })));
            }
            else {
                var textClasses = classNames(Classes.TABLE_EDITABLE_TEXT, (_b = {},
                    _b[Classes.TABLE_TRUNCATED_TEXT] = truncated,
                    _b[Classes.TABLE_NO_WRAP_TEXT] = !wrapText,
                    _b[Classes.TABLE_CELL_TEXT_PLACEHOLDER] = !hasValue,
                    _b));
                cellContents = React.createElement("div", { className: textClasses }, hasValue ? savedValue : _this.props.placeholder);
            }
            return (React.createElement(Cell, __assign({}, spreadableProps, { wrapText: wrapText, truncated: false, interactive: interactive, cellRef: _this.refHandlers.cell, onKeyDown: handleKeyDown, onKeyPress: _this.handleKeyPress, onKeyUp: handleKeyUp, tabIndex: tabIndex }),
                React.createElement(Draggable, { onActivate: _this.handleCellActivate, onDoubleClick: _this.handleCellDoubleClick, preventDefault: false, stopPropagation: interactive }, cellContents)));
        };
        _this.handleKeyPress = function () {
            if (_this.state.isEditing || !_this.props.isFocused) {
                return;
            }
            // setting dirty value to empty string because apparently the text field will pick up the key and write it in there
            _this.setState({ isEditing: true, dirtyValue: "", savedValue: _this.state.savedValue });
        };
        _this.handleEdit = function () {
            _this.setState({ isEditing: true, dirtyValue: _this.state.savedValue });
        };
        _this.handleCancel = function (value) {
            // don't strictly need to clear the dirtyValue, but it's better hygiene
            _this.setState({ isEditing: false, dirtyValue: undefined });
            _this.invokeCallback(_this.props.onCancel, value);
        };
        _this.handleChange = function (value) {
            _this.setState({ dirtyValue: value });
            _this.invokeCallback(_this.props.onChange, value);
        };
        _this.handleConfirm = function (value) {
            _this.setState({ isEditing: false, savedValue: value, dirtyValue: undefined });
            _this.invokeCallback(_this.props.onConfirm, value);
        };
        _this.handleCellActivate = function (_event) {
            return true;
        };
        _this.handleCellDoubleClick = function (_event) {
            _this.handleEdit();
        };
        _this.hotkeys = [
            {
                combo: "f2",
                group: "Table",
                label: "Edit the currently focused cell",
                onKeyDown: _this.handleEdit,
            },
        ];
        return _this;
    }
    EditableCell2.prototype.componentDidMount = function () {
        this.checkShouldFocus();
    };
    EditableCell2.prototype.componentDidUpdate = function (prevProps) {
        var didPropsChange = !CoreUtils.shallowCompareKeys(this.props, prevProps, { exclude: ["style"] }) ||
            !CoreUtils.deepCompareKeys(this.props, prevProps, ["style"]);
        var value = this.props.value;
        if (didPropsChange && value != null) {
            this.setState({ savedValue: value, dirtyValue: value });
        }
        this.checkShouldFocus();
    };
    EditableCell2.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !CoreUtils.shallowCompareKeys(this.state, nextState) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, ["style"]));
    };
    EditableCell2.prototype.render = function () {
        return React.createElement(HotkeysTarget2, { hotkeys: this.hotkeys }, this.renderCell);
    };
    EditableCell2.prototype.checkShouldFocus = function () {
        var _a;
        if (this.props.isFocused && !this.state.isEditing) {
            // don't focus if we're editing -- we'll lose the fact that we're editing
            (_a = this.cellRef) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    EditableCell2.prototype.invokeCallback = function (callback, value) {
        // pass through the row and column indices if they were provided as props by the consumer
        var _a = this.props, rowIndex = _a.rowIndex, columnIndex = _a.columnIndex;
        callback === null || callback === void 0 ? void 0 : callback(value, rowIndex, columnIndex);
    };
    EditableCell2.displayName = "".concat(DISPLAYNAME_PREFIX, ".EditableCell2");
    EditableCell2.defaultProps = {
        truncated: true,
        wrapText: false,
    };
    return EditableCell2;
}(React.Component));
export { EditableCell2 };
//# sourceMappingURL=editableCell2.js.map