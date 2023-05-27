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
import { __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { Classes as CoreClasses, Utils as CoreUtils } from "@blueprintjs/core";
import { ContextMenu2 } from "@blueprintjs/popover2";
import * as Classes from "../common/classes";
var HeaderCell2 = /** @class */ (function (_super) {
    __extends(HeaderCell2, _super);
    function HeaderCell2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isActive: false,
        };
        return _this;
    }
    HeaderCell2.prototype.shouldComponentUpdate = function (nextProps) {
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, ["style"]));
    };
    HeaderCell2.prototype.render = function () {
        var _a;
        var _b, _c;
        var classes = classNames(Classes.TABLE_HEADER, (_a = {},
            _a[Classes.TABLE_HEADER_ACTIVE] = this.props.isActive || this.state.isActive,
            _a[Classes.TABLE_HEADER_SELECTED] = this.props.isSelected,
            _a[CoreClasses.LOADING] = this.props.loading,
            _a), this.props.className);
        var hasMenu = this.props.menuRenderer !== undefined;
        return (React.createElement(ContextMenu2, { className: classes, content: (_c = (_b = this.props).menuRenderer) === null || _c === void 0 ? void 0 : _c.call(_b, this.props.index), disabled: !hasMenu, style: this.props.style }, this.props.children));
    };
    return HeaderCell2;
}(React.Component));
export { HeaderCell2 };
//# sourceMappingURL=headerCell2.js.map