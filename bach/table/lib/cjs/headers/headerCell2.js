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
exports.HeaderCell2 = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var popover2_1 = require("@blueprintjs/popover2");
var Classes = tslib_1.__importStar(require("../common/classes"));
var HeaderCell2 = /** @class */ (function (_super) {
    tslib_1.__extends(HeaderCell2, _super);
    function HeaderCell2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isActive: false,
        };
        return _this;
    }
    HeaderCell2.prototype.shouldComponentUpdate = function (nextProps) {
        return (!core_1.Utils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !core_1.Utils.deepCompareKeys(this.props, nextProps, ["style"]));
    };
    HeaderCell2.prototype.render = function () {
        var _a;
        var _b, _c;
        var classes = (0, classnames_1.default)(Classes.TABLE_HEADER, (_a = {},
            _a[Classes.TABLE_HEADER_ACTIVE] = this.props.isActive || this.state.isActive,
            _a[Classes.TABLE_HEADER_SELECTED] = this.props.isSelected,
            _a[core_1.Classes.LOADING] = this.props.loading,
            _a), this.props.className);
        var hasMenu = this.props.menuRenderer !== undefined;
        return (React.createElement(popover2_1.ContextMenu2, { className: classes, content: (_c = (_b = this.props).menuRenderer) === null || _c === void 0 ? void 0 : _c.call(_b, this.props.index), disabled: !hasMenu, style: this.props.style }, this.props.children));
    };
    return HeaderCell2;
}(React.Component));
exports.HeaderCell2 = HeaderCell2;
//# sourceMappingURL=headerCell2.js.map