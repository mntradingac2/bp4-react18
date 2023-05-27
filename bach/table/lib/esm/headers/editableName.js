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
import { __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { EditableText } from "@blueprintjs/core";
import * as Classes from "../common/classes";
/**
 * Editable name component.
 *
 * @see https://blueprintjs.com/docs/#table/api.editablename
 */
var EditableName = /** @class */ (function (_super) {
    __extends(EditableName, _super);
    function EditableName(props) {
        var _this = _super.call(this, props) || this;
        _this.handleEdit = function () {
            _this.setState({ isEditing: true, dirtyName: _this.state.savedName });
        };
        _this.handleCancel = function (value) {
            var _a, _b;
            // don't strictly need to clear the dirtyName, but it's better hygiene
            _this.setState({ isEditing: false, dirtyName: undefined });
            (_b = (_a = _this.props).onCancel) === null || _b === void 0 ? void 0 : _b.call(_a, value, _this.props.index);
        };
        _this.handleChange = function (value) {
            var _a, _b;
            _this.setState({ dirtyName: value });
            (_b = (_a = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value, _this.props.index);
        };
        _this.handleConfirm = function (value) {
            var _a, _b;
            _this.setState({ isEditing: false, savedName: value, dirtyName: undefined });
            (_b = (_a = _this.props).onConfirm) === null || _b === void 0 ? void 0 : _b.call(_a, value, _this.props.index);
        };
        _this.state = {
            dirtyName: props.name,
            isEditing: false,
            savedName: props.name,
        };
        return _this;
    }
    EditableName.prototype.componentDidUpdate = function (prevProps) {
        var name = this.props.name;
        if (name !== prevProps.name) {
            this.setState({ savedName: name, dirtyName: name });
        }
    };
    EditableName.prototype.render = function () {
        var _a = this.props, className = _a.className, intent = _a.intent, name = _a.name;
        var _b = this.state, isEditing = _b.isEditing, dirtyName = _b.dirtyName, savedName = _b.savedName;
        return (React.createElement(EditableText, { className: classNames(className, Classes.TABLE_EDITABLE_NAME), defaultValue: name, intent: intent, minWidth: 0, onCancel: this.handleCancel, onChange: this.handleChange, onConfirm: this.handleConfirm, onEdit: this.handleEdit, placeholder: "", selectAllOnFocus: true, value: isEditing ? dirtyName : savedName }));
    };
    return EditableName;
}(React.PureComponent));
export { EditableName };
//# sourceMappingURL=editableName.js.map