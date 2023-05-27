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
import { __assign, __decorate, __extends, __rest } from "tslib";
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to EditableCell2 instead.
 */
import classNames from "classnames";
import * as React from "react";
import { Utils as CoreUtils, DISPLAYNAME_PREFIX, EditableText, Hotkey, Hotkeys, HotkeysTarget, } from "@blueprintjs/core";
import * as Classes from "../common/classes";
import { Draggable } from "../interactions/draggable";
import { Cell } from "./cell";
/** @deprecated use { EditableCell2, Table2 } from "@blueprintjs/table" */
// eslint-disable-next-line deprecation/deprecation
var EditableCell = /** @class */ (function (_super) {
    __extends(EditableCell, _super);
    function EditableCell(props) {
        var _this = _super.call(this, props) || this;
        _this.refHandlers = {
            cell: function (ref) {
                _this.cellRef = ref;
            },
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
        _this.state = {
            isEditing: false,
            savedValue: props.value,
        };
        return _this;
    }
    EditableCell.prototype.componentDidMount = function () {
        this.checkShouldFocus();
    };
    EditableCell.prototype.componentDidUpdate = function (prevProps) {
        var didPropsChange = !CoreUtils.shallowCompareKeys(this.props, prevProps, { exclude: ["style"] }) ||
            !CoreUtils.deepCompareKeys(this.props, prevProps, ["style"]);
        var value = this.props.value;
        if (didPropsChange && value != null) {
            this.setState({ savedValue: value, dirtyValue: value });
        }
        this.checkShouldFocus();
    };
    EditableCell.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !CoreUtils.shallowCompareKeys(this.state, nextState) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, ["style"]));
    };
    EditableCell.prototype.render = function () {
        var _a;
        var _b = this.props, onCancel = _b.onCancel, onChange = _b.onChange, onConfirm = _b.onConfirm, truncated = _b.truncated, wrapText = _b.wrapText, editableTextProps = _b.editableTextProps, spreadableProps = __rest(_b, ["onCancel", "onChange", "onConfirm", "truncated", "wrapText", "editableTextProps"]);
        var _c = this.state, isEditing = _c.isEditing, dirtyValue = _c.dirtyValue, savedValue = _c.savedValue;
        var interactive = spreadableProps.interactive || isEditing;
        var cellContents;
        if (isEditing) {
            var className = editableTextProps ? editableTextProps.className : null;
            cellContents = (React.createElement(EditableText, __assign({}, editableTextProps, { isEditing: true, className: classNames(Classes.TABLE_EDITABLE_TEXT, Classes.TABLE_EDITABLE_NAME, className), intent: spreadableProps.intent, minWidth: 0, onCancel: this.handleCancel, onChange: this.handleChange, onConfirm: this.handleConfirm, onEdit: this.handleEdit, placeholder: "", selectAllOnFocus: false, value: dirtyValue })));
        }
        else {
            var textClasses = classNames(Classes.TABLE_EDITABLE_TEXT, (_a = {},
                _a[Classes.TABLE_TRUNCATED_TEXT] = truncated,
                _a[Classes.TABLE_NO_WRAP_TEXT] = !wrapText,
                _a));
            cellContents = React.createElement("div", { className: textClasses }, savedValue);
        }
        return (React.createElement(Cell, __assign({}, spreadableProps, { wrapText: wrapText, truncated: false, interactive: interactive, cellRef: this.refHandlers.cell, onKeyPress: this.handleKeyPress }),
            React.createElement(Draggable, { onActivate: this.handleCellActivate, onDoubleClick: this.handleCellDoubleClick, preventDefault: false, stopPropagation: interactive }, cellContents)));
    };
    EditableCell.prototype.renderHotkeys = function () {
        var tabIndex = this.props.tabIndex;
        return (React.createElement(Hotkeys, { tabIndex: tabIndex },
            React.createElement(Hotkey, { key: "edit-cell", label: "Edit the currently focused cell", group: "Table", combo: "f2", onKeyDown: this.handleEdit })));
    };
    EditableCell.prototype.checkShouldFocus = function () {
        var _a;
        if (this.props.isFocused && !this.state.isEditing) {
            // don't focus if we're editing -- we'll lose the fact that we're editing
            (_a = this.cellRef) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    EditableCell.prototype.invokeCallback = function (callback, value) {
        // pass through the row and column indices if they were provided as props by the consumer
        var _a = this.props, rowIndex = _a.rowIndex, columnIndex = _a.columnIndex;
        callback === null || callback === void 0 ? void 0 : callback(value, rowIndex, columnIndex);
    };
    EditableCell.displayName = "".concat(DISPLAYNAME_PREFIX, ".EditableCell");
    EditableCell.defaultProps = {
        truncated: true,
        wrapText: false,
    };
    EditableCell = __decorate([
        HotkeysTarget
    ], EditableCell);
    return EditableCell;
}(React.Component));
export { EditableCell };
//# sourceMappingURL=editableCell.js.map