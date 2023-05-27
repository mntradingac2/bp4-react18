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
exports.JSONFormat = void 0;
var tslib_1 = require("tslib");
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to JSONFormat2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("../../common/classes"));
var truncatedFormat_1 = require("./truncatedFormat");
/* istanbul ignore next */
/** @deprecated use JSONFormat2 */
var JSONFormat = /** @class */ (function (_super) {
    tslib_1.__extends(JSONFormat, _super);
    function JSONFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONFormat.prototype.render = function () {
        var _a;
        var _b = this.props, children = _b.children, omitQuotesOnStrings = _b.omitQuotesOnStrings, stringify = _b.stringify;
        var showPopover = this.props.showPopover;
        // always hide popover if value is nully
        var isNully = children == null;
        if (isNully) {
            showPopover = truncatedFormat_1.TruncatedPopoverMode.NEVER;
        }
        var className = (0, classnames_1.default)(this.props.className, (_a = {},
            _a[Classes.TABLE_NULL] = isNully,
            _a));
        var displayValue = "";
        if (omitQuotesOnStrings && typeof children === "string") {
            displayValue = children;
        }
        else {
            displayValue = stringify(children);
        }
        return (React.createElement(truncatedFormat_1.TruncatedFormat, tslib_1.__assign({}, this.props, { className: className, showPopover: showPopover }), displayValue));
    };
    JSONFormat.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".JSONFormat");
    JSONFormat.defaultProps = {
        omitQuotesOnStrings: true,
        stringify: function (obj) { return JSON.stringify(obj, null, 2); },
    };
    return JSONFormat;
}(React.Component));
exports.JSONFormat = JSONFormat;
//# sourceMappingURL=jsonFormat.js.map