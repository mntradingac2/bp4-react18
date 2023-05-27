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
exports.CopyCellsMenuItem = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var clipboard_1 = require("../../common/clipboard");
var errors_1 = require("../../common/errors");
var regions_1 = require("../../regions");
var CopyCellsMenuItem = /** @class */ (function (_super) {
    tslib_1.__extends(CopyCellsMenuItem, _super);
    function CopyCellsMenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var _a = _this.props, context = _a.context, getCellData = _a.getCellData, onCopy = _a.onCopy;
            var cells = context.getUniqueCells();
            var sparse = regions_1.Regions.sparseMapCells(cells, getCellData);
            if (sparse !== undefined) {
                clipboard_1.Clipboard.copyCells(sparse)
                    .then(function () { return onCopy === null || onCopy === void 0 ? void 0 : onCopy(true); })
                    .catch(function (reason) {
                    console.error(errors_1.TABLE_COPY_FAILED, reason);
                    onCopy === null || onCopy === void 0 ? void 0 : onCopy(false);
                });
            }
        };
        return _this;
    }
    CopyCellsMenuItem.prototype.render = function () {
        var _a = this.props, context = _a.context, getCellData = _a.getCellData, onCopy = _a.onCopy, menuItemProps = tslib_1.__rest(_a, ["context", "getCellData", "onCopy"]);
        return React.createElement(core_1.MenuItem, tslib_1.__assign({}, menuItemProps, { onClick: this.handleClick }));
    };
    return CopyCellsMenuItem;
}(React.PureComponent));
exports.CopyCellsMenuItem = CopyCellsMenuItem;
//# sourceMappingURL=copyCellsMenuItem.js.map