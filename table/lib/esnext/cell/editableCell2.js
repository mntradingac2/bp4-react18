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
export class EditableCell2 extends React.Component {
    static displayName = `${DISPLAYNAME_PREFIX}.EditableCell2`;
    static defaultProps = {
        truncated: true,
        wrapText: false,
    };
    cellRef;
    refHandlers = {
        cell: (ref) => {
            this.cellRef = ref;
        },
    };
    state = {
        isEditing: false,
        savedValue: this.props.value,
    };
    componentDidMount() {
        this.checkShouldFocus();
    }
    componentDidUpdate(prevProps) {
        const didPropsChange = !CoreUtils.shallowCompareKeys(this.props, prevProps, { exclude: ["style"] }) ||
            !CoreUtils.deepCompareKeys(this.props, prevProps, ["style"]);
        const { value } = this.props;
        if (didPropsChange && value != null) {
            this.setState({ savedValue: value, dirtyValue: value });
        }
        this.checkShouldFocus();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !CoreUtils.shallowCompareKeys(this.state, nextState) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, ["style"]));
    }
    render() {
        return React.createElement(HotkeysTarget2, { hotkeys: this.hotkeys }, this.renderCell);
    }
    renderCell = ({ handleKeyDown, handleKeyUp }) => {
        const { editableTextProps, onCancel, onChange, onConfirm, tabIndex = 0, truncated, wrapText, ...spreadableProps } = this.props;
        const { isEditing, dirtyValue, savedValue } = this.state;
        const interactive = spreadableProps.interactive || isEditing;
        const hasValue = this.props.value != null && this.props.value !== "";
        let cellContents;
        if (isEditing) {
            const className = editableTextProps ? editableTextProps.className : null;
            cellContents = (React.createElement(EditableText, { ...editableTextProps, isEditing: true, className: classNames(Classes.TABLE_EDITABLE_TEXT, Classes.TABLE_EDITABLE_NAME, className), intent: spreadableProps.intent, minWidth: 0, onCancel: this.handleCancel, onChange: this.handleChange, onConfirm: this.handleConfirm, onEdit: this.handleEdit, placeholder: this.props.placeholder, selectAllOnFocus: false, value: dirtyValue }));
        }
        else {
            const textClasses = classNames(Classes.TABLE_EDITABLE_TEXT, {
                [Classes.TABLE_TRUNCATED_TEXT]: truncated,
                [Classes.TABLE_NO_WRAP_TEXT]: !wrapText,
                [Classes.TABLE_CELL_TEXT_PLACEHOLDER]: !hasValue,
            });
            cellContents = React.createElement("div", { className: textClasses }, hasValue ? savedValue : this.props.placeholder);
        }
        return (React.createElement(Cell, { ...spreadableProps, wrapText: wrapText, truncated: false, interactive: interactive, cellRef: this.refHandlers.cell, onKeyDown: handleKeyDown, onKeyPress: this.handleKeyPress, onKeyUp: handleKeyUp, tabIndex: tabIndex },
            React.createElement(Draggable, { onActivate: this.handleCellActivate, onDoubleClick: this.handleCellDoubleClick, preventDefault: false, stopPropagation: interactive }, cellContents)));
    };
    checkShouldFocus() {
        if (this.props.isFocused && !this.state.isEditing) {
            // don't focus if we're editing -- we'll lose the fact that we're editing
            this.cellRef?.focus();
        }
    }
    handleKeyPress = () => {
        if (this.state.isEditing || !this.props.isFocused) {
            return;
        }
        // setting dirty value to empty string because apparently the text field will pick up the key and write it in there
        this.setState({ isEditing: true, dirtyValue: "", savedValue: this.state.savedValue });
    };
    handleEdit = () => {
        this.setState({ isEditing: true, dirtyValue: this.state.savedValue });
    };
    handleCancel = (value) => {
        // don't strictly need to clear the dirtyValue, but it's better hygiene
        this.setState({ isEditing: false, dirtyValue: undefined });
        this.invokeCallback(this.props.onCancel, value);
    };
    handleChange = (value) => {
        this.setState({ dirtyValue: value });
        this.invokeCallback(this.props.onChange, value);
    };
    handleConfirm = (value) => {
        this.setState({ isEditing: false, savedValue: value, dirtyValue: undefined });
        this.invokeCallback(this.props.onConfirm, value);
    };
    invokeCallback(callback, value) {
        // pass through the row and column indices if they were provided as props by the consumer
        const { rowIndex, columnIndex } = this.props;
        callback?.(value, rowIndex, columnIndex);
    }
    handleCellActivate = (_event) => {
        return true;
    };
    handleCellDoubleClick = (_event) => {
        this.handleEdit();
    };
    hotkeys = [
        {
            combo: "f2",
            group: "Table",
            label: "Edit the currently focused cell",
            onKeyDown: this.handleEdit,
        },
    ];
}
//# sourceMappingURL=editableCell2.js.map