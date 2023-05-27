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
import classNames from "classnames";
import * as React from "react";
import { EditableText } from "@blueprintjs/core";
import * as Classes from "../common/classes";
/**
 * Editable name component.
 *
 * @see https://blueprintjs.com/docs/#table/api.editablename
 */
export class EditableName extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dirtyName: props.name,
            isEditing: false,
            savedName: props.name,
        };
    }
    componentDidUpdate(prevProps) {
        const { name } = this.props;
        if (name !== prevProps.name) {
            this.setState({ savedName: name, dirtyName: name });
        }
    }
    render() {
        const { className, intent, name } = this.props;
        const { isEditing, dirtyName, savedName } = this.state;
        return (React.createElement(EditableText, { className: classNames(className, Classes.TABLE_EDITABLE_NAME), defaultValue: name, intent: intent, minWidth: 0, onCancel: this.handleCancel, onChange: this.handleChange, onConfirm: this.handleConfirm, onEdit: this.handleEdit, placeholder: "", selectAllOnFocus: true, value: isEditing ? dirtyName : savedName }));
    }
    handleEdit = () => {
        this.setState({ isEditing: true, dirtyName: this.state.savedName });
    };
    handleCancel = (value) => {
        // don't strictly need to clear the dirtyName, but it's better hygiene
        this.setState({ isEditing: false, dirtyName: undefined });
        this.props.onCancel?.(value, this.props.index);
    };
    handleChange = (value) => {
        this.setState({ dirtyName: value });
        this.props.onChange?.(value, this.props.index);
    };
    handleConfirm = (value) => {
        this.setState({ isEditing: false, savedName: value, dirtyName: undefined });
        this.props.onConfirm?.(value, this.props.index);
    };
}
//# sourceMappingURL=editableName.js.map