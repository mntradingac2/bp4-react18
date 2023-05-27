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
import { __assign, __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { DISPLAYNAME_PREFIX } from "@blueprintjs/core";
import * as Classes from "../../common/classes";
import { TruncatedPopoverMode } from "./truncatedFormat";
import { TruncatedFormat2 } from "./truncatedFormat2";
/* istanbul ignore next */
/**
 * JSON cell format (v2) component.
 *
 * @see https://blueprintjs.com/docs/#table/api.jsonformat
 */
var JSONFormat2 = /** @class */ (function (_super) {
    __extends(JSONFormat2, _super);
    function JSONFormat2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONFormat2.prototype.render = function () {
        var _a;
        var _b = this.props, children = _b.children, omitQuotesOnStrings = _b.omitQuotesOnStrings, stringify = _b.stringify;
        var showPopover = this.props.showPopover;
        // always hide popover if value is nully
        var isNully = children == null;
        if (isNully) {
            showPopover = TruncatedPopoverMode.NEVER;
        }
        var className = classNames(this.props.className, (_a = {},
            _a[Classes.TABLE_NULL] = isNully,
            _a));
        var displayValue = "";
        if (omitQuotesOnStrings && typeof children === "string") {
            displayValue = children;
        }
        else {
            displayValue = stringify(children);
        }
        return (React.createElement(TruncatedFormat2, __assign({}, this.props, { className: className, showPopover: showPopover }), displayValue));
    };
    JSONFormat2.displayName = "".concat(DISPLAYNAME_PREFIX, ".JSONFormat2");
    JSONFormat2.defaultProps = {
        omitQuotesOnStrings: true,
        stringify: function (obj) { return JSON.stringify(obj, null, 2); },
    };
    return JSONFormat2;
}(React.Component));
export { JSONFormat2 };
//# sourceMappingURL=jsonFormat2.js.map