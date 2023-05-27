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
import { __assign, __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { Classes as CoreClasses, Utils as CoreUtils, DISPLAYNAME_PREFIX } from "@blueprintjs/core";
import * as Classes from "../common/classes";
import { LoadableContent } from "../common/loadableContent";
import { JSONFormat } from "./formats/jsonFormat";
import { JSONFormat2 } from "./formats/jsonFormat2";
import { TruncatedFormat } from "./formats/truncatedFormat";
import { TruncatedFormat2 } from "./formats/truncatedFormat2";
export var emptyCellRenderer = function () { return React.createElement(Cell, null); };
/**
 * Cell component.
 *
 * @see https://blueprintjs.com/docs/#table/api.cell
 */
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cell.prototype.shouldComponentUpdate = function (nextProps) {
        // deeply compare "style," because a new but identical object might have been provided.
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !CoreUtils.deepCompareKeys(this.props.style, nextProps.style));
    };
    Cell.prototype.render = function () {
        var _a, _b;
        var _c = this.props, cellRef = _c.cellRef, tabIndex = _c.tabIndex, onKeyDown = _c.onKeyDown, onKeyUp = _c.onKeyUp, onKeyPress = _c.onKeyPress, style = _c.style, intent = _c.intent, interactive = _c.interactive, loading = _c.loading, tooltip = _c.tooltip, truncated = _c.truncated, className = _c.className, wrapText = _c.wrapText;
        var classes = classNames(Classes.TABLE_CELL, CoreClasses.intentClass(intent), (_a = {},
            _a[Classes.TABLE_CELL_INTERACTIVE] = interactive,
            _a[CoreClasses.LOADING] = loading,
            _a[Classes.TABLE_TRUNCATED_CELL] = truncated,
            _a), className);
        var textClasses = classNames((_b = {},
            _b[Classes.TABLE_TRUNCATED_TEXT] = truncated,
            _b[Classes.TABLE_NO_WRAP_TEXT] = !wrapText,
            _b));
        // add width and height to the children, for use in shouldComponentUpdate in truncatedFormat
        // note: these aren't actually used by truncated format, just in shouldComponentUpdate
        var modifiedChildren = React.Children.map(this.props.children, function (child) {
            var isFormatElement = 
            // eslint-disable-next-line deprecation/deprecation
            CoreUtils.isElementOfType(child, TruncatedFormat) ||
                CoreUtils.isElementOfType(child, TruncatedFormat2) ||
                // eslint-disable-next-line deprecation/deprecation
                CoreUtils.isElementOfType(child, JSONFormat) ||
                CoreUtils.isElementOfType(child, JSONFormat2);
            if (style != null && React.isValidElement(child) && isFormatElement) {
                return React.cloneElement(child, {
                    parentCellHeight: style.height === undefined ? undefined : parseInt(style.height.toString(), 10),
                    parentCellWidth: style.width === undefined ? undefined : parseInt(style.width.toString(), 10),
                });
            }
            return child;
        });
        var content = React.createElement("div", { className: textClasses }, modifiedChildren);
        return (React.createElement("div", __assign({ className: classes, title: tooltip, ref: cellRef }, { style: style, tabIndex: tabIndex, onKeyDown: onKeyDown, onKeyUp: onKeyUp, onKeyPress: onKeyPress }),
            React.createElement(LoadableContent, { loading: loading !== null && loading !== void 0 ? loading : false, variableLength: true }, content)));
    };
    Cell.displayName = "".concat(DISPLAYNAME_PREFIX, ".Cell");
    Cell.defaultProps = {
        truncated: true,
        wrapText: false,
    };
    return Cell;
}(React.Component));
export { Cell };
//# sourceMappingURL=cell.js.map