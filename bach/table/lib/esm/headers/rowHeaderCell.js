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
import { __assign, __extends, __rest } from "tslib";
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to RowHeaderCell2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import * as React from "react";
import { AbstractPureComponent2 } from "@blueprintjs/core";
import * as Classes from "../common/classes";
import { LoadableContent } from "../common/loadableContent";
import { HeaderCell } from "./headerCell";
/** @deprecated use RowHeaderCell2 */
var RowHeaderCell = /** @class */ (function (_super) {
    __extends(RowHeaderCell, _super);
    function RowHeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowHeaderCell.prototype.render = function () {
        var _a, _b;
        var _c = this.props, 
        // from IRowHeaderCellProps
        enableRowReordering = _c.enableRowReordering, isRowSelected = _c.isRowSelected, name = _c.name, nameRenderer = _c.nameRenderer, 
        // from IHeaderProps
        spreadableProps = __rest(_c, ["enableRowReordering", "isRowSelected", "name", "nameRenderer"]);
        var defaultName = React.createElement("div", { className: Classes.TABLE_ROW_NAME_TEXT }, name);
        var nameComponent = (React.createElement(LoadableContent, { loading: (_a = spreadableProps.loading) !== null && _a !== void 0 ? _a : false }, (_b = nameRenderer === null || nameRenderer === void 0 ? void 0 : nameRenderer(name, spreadableProps.index)) !== null && _b !== void 0 ? _b : defaultName));
        return (React.createElement(HeaderCell, __assign({ isReorderable: this.props.enableRowReordering, isSelected: this.props.isRowSelected }, spreadableProps),
            React.createElement("div", { className: Classes.TABLE_ROW_NAME }, nameComponent),
            this.props.children,
            spreadableProps.loading ? undefined : spreadableProps.resizeHandle));
    };
    return RowHeaderCell;
}(AbstractPureComponent2));
export { RowHeaderCell };
//# sourceMappingURL=rowHeaderCell.js.map