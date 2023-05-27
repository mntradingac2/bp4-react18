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
export class RowHeaderCell extends AbstractPureComponent2 {
    render() {
        const { 
        // from IRowHeaderCellProps
        enableRowReordering, isRowSelected, name, nameRenderer, 
        // from IHeaderProps
        ...spreadableProps } = this.props;
        const defaultName = React.createElement("div", { className: Classes.TABLE_ROW_NAME_TEXT }, name);
        const nameComponent = (React.createElement(LoadableContent, { loading: spreadableProps.loading ?? false }, nameRenderer?.(name, spreadableProps.index) ?? defaultName));
        return (React.createElement(HeaderCell, { isReorderable: this.props.enableRowReordering, isSelected: this.props.isRowSelected, ...spreadableProps },
            React.createElement("div", { className: Classes.TABLE_ROW_NAME }, nameComponent),
            this.props.children,
            spreadableProps.loading ? undefined : spreadableProps.resizeHandle));
    }
}
//# sourceMappingURL=rowHeaderCell.js.map