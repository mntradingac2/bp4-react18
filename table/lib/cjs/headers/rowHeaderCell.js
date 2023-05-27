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
exports.RowHeaderCell = void 0;
var tslib_1 = require("tslib");
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to RowHeaderCell2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("../common/classes"));
var loadableContent_1 = require("../common/loadableContent");
var headerCell_1 = require("./headerCell");
/** @deprecated use RowHeaderCell2 */
var RowHeaderCell = /** @class */ (function (_super) {
    tslib_1.__extends(RowHeaderCell, _super);
    function RowHeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowHeaderCell.prototype.render = function () {
        var _a, _b;
        var _c = this.props, 
        // from IRowHeaderCellProps
        enableRowReordering = _c.enableRowReordering, isRowSelected = _c.isRowSelected, name = _c.name, nameRenderer = _c.nameRenderer, 
        // from IHeaderProps
        spreadableProps = tslib_1.__rest(_c, ["enableRowReordering", "isRowSelected", "name", "nameRenderer"]);
        var defaultName = React.createElement("div", { className: Classes.TABLE_ROW_NAME_TEXT }, name);
        var nameComponent = (React.createElement(loadableContent_1.LoadableContent, { loading: (_a = spreadableProps.loading) !== null && _a !== void 0 ? _a : false }, (_b = nameRenderer === null || nameRenderer === void 0 ? void 0 : nameRenderer(name, spreadableProps.index)) !== null && _b !== void 0 ? _b : defaultName));
        return (React.createElement(headerCell_1.HeaderCell, tslib_1.__assign({ isReorderable: this.props.enableRowReordering, isSelected: this.props.isRowSelected }, spreadableProps),
            React.createElement("div", { className: Classes.TABLE_ROW_NAME }, nameComponent),
            this.props.children,
            spreadableProps.loading ? undefined : spreadableProps.resizeHandle));
    };
    return RowHeaderCell;
}(core_1.AbstractPureComponent2));
exports.RowHeaderCell = RowHeaderCell;
//# sourceMappingURL=rowHeaderCell.js.map