"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = exports.emptyCellRenderer = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("../common/classes"));
var loadableContent_1 = require("../common/loadableContent");
var jsonFormat_1 = require("./formats/jsonFormat");
var jsonFormat2_1 = require("./formats/jsonFormat2");
var truncatedFormat_1 = require("./formats/truncatedFormat");
var truncatedFormat2_1 = require("./formats/truncatedFormat2");
var emptyCellRenderer = function () { return React.createElement(Cell, null); };
exports.emptyCellRenderer = emptyCellRenderer;
/**
 * Cell component.
 *
 * @see https://blueprintjs.com/docs/#table/api.cell
 */
var Cell = /** @class */ (function (_super) {
    tslib_1.__extends(Cell, _super);
    function Cell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cell.prototype.shouldComponentUpdate = function (nextProps) {
        // deeply compare "style," because a new but identical object might have been provided.
        return (!core_1.Utils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !core_1.Utils.deepCompareKeys(this.props.style, nextProps.style));
    };
    Cell.prototype.render = function () {
        var _a, _b;
        var _c = this.props, cellRef = _c.cellRef, tabIndex = _c.tabIndex, onKeyDown = _c.onKeyDown, onKeyUp = _c.onKeyUp, onKeyPress = _c.onKeyPress, style = _c.style, intent = _c.intent, interactive = _c.interactive, loading = _c.loading, tooltip = _c.tooltip, truncated = _c.truncated, className = _c.className, wrapText = _c.wrapText;
        var classes = (0, classnames_1.default)(Classes.TABLE_CELL, core_1.Classes.intentClass(intent), (_a = {},
            _a[Classes.TABLE_CELL_INTERACTIVE] = interactive,
            _a[core_1.Classes.LOADING] = loading,
            _a[Classes.TABLE_TRUNCATED_CELL] = truncated,
            _a), className);
        var textClasses = (0, classnames_1.default)((_b = {},
            _b[Classes.TABLE_TRUNCATED_TEXT] = truncated,
            _b[Classes.TABLE_NO_WRAP_TEXT] = !wrapText,
            _b));
        // add width and height to the children, for use in shouldComponentUpdate in truncatedFormat
        // note: these aren't actually used by truncated format, just in shouldComponentUpdate
        var modifiedChildren = React.Children.map(this.props.children, function (child) {
            var isFormatElement = 
            // eslint-disable-next-line deprecation/deprecation
            core_1.Utils.isElementOfType(child, truncatedFormat_1.TruncatedFormat) ||
                core_1.Utils.isElementOfType(child, truncatedFormat2_1.TruncatedFormat2) ||
                // eslint-disable-next-line deprecation/deprecation
                core_1.Utils.isElementOfType(child, jsonFormat_1.JSONFormat) ||
                core_1.Utils.isElementOfType(child, jsonFormat2_1.JSONFormat2);
            if (style != null && React.isValidElement(child) && isFormatElement) {
                return React.cloneElement(child, {
                    parentCellHeight: style.height === undefined ? undefined : parseInt(style.height.toString(), 10),
                    parentCellWidth: style.width === undefined ? undefined : parseInt(style.width.toString(), 10),
                });
            }
            return child;
        });
        var content = React.createElement("div", { className: textClasses }, modifiedChildren);
        return (React.createElement("div", tslib_1.__assign({ className: classes, title: tooltip, ref: cellRef }, { style: style, tabIndex: tabIndex, onKeyDown: onKeyDown, onKeyUp: onKeyUp, onKeyPress: onKeyPress }),
            React.createElement(loadableContent_1.LoadableContent, { loading: loading !== null && loading !== void 0 ? loading : false, variableLength: true }, content)));
    };
    Cell.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".Cell");
    Cell.defaultProps = {
        truncated: true,
        wrapText: false,
    };
    return Cell;
}(React.Component));
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map