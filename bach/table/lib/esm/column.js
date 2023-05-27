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
import * as React from "react";
import { DISPLAYNAME_PREFIX } from "@blueprintjs/core";
import { emptyCellRenderer } from "./cell/cell";
/**
 * Column component.
 *
 * @see https://blueprintjs.com/docs/#table/api.column
 */
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Column.displayName = "".concat(DISPLAYNAME_PREFIX, ".Column");
    Column.defaultProps = {
        cellRenderer: emptyCellRenderer,
    };
    return Column;
}(React.PureComponent));
export { Column };
//# sourceMappingURL=column.js.map