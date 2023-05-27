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
 * All changes & bugfixes should be made to ColumnHeaderCell2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Utils as CoreUtils, DISPLAYNAME_PREFIX, Icon, Popover, Position, } from "@blueprintjs/core";
import * as Classes from "../common/classes";
import { columnInteractionBarContextTypes } from "../common/context";
import { LoadableContent } from "../common/loadableContent";
import { CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT } from "../common/utils";
import { HeaderCell } from "./headerCell";
export function HorizontalCellDivider() {
    return React.createElement("div", { className: Classes.TABLE_HORIZONTAL_CELL_DIVIDER });
}
/** @deprecated use ColumnHeaderCell2 instead */
var ColumnHeaderCell = /** @class */ (function (_super) {
    __extends(ColumnHeaderCell, _super);
    function ColumnHeaderCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.context = {
            enableColumnInteractionBar: false,
        };
        _this.state = {
            isActive: false,
        };
        _this.handlePopoverOpened = function () { return _this.setState({ isActive: true }); };
        _this.handlePopoverClosing = function () { return _this.setState({ isActive: false }); };
        return _this;
    }
    /**
     * This method determines if a `MouseEvent` was triggered on a target that
     * should be used as the header click/drag target. This enables users of
     * this component to render fully interactive components in their header
     * cells without worry of selection or resize operations from capturing
     * their mouse events.
     */
    ColumnHeaderCell.isHeaderMouseTarget = function (target) {
        return (target.classList.contains(Classes.TABLE_HEADER) ||
            target.classList.contains(Classes.TABLE_COLUMN_NAME) ||
            target.classList.contains(Classes.TABLE_INTERACTION_BAR) ||
            target.classList.contains(Classes.TABLE_HEADER_CONTENT));
    };
    ColumnHeaderCell.prototype.render = function () {
        var _a;
        var _b = this.props, 
        // from IColumnHeaderCellProps
        enableColumnReordering = _b.enableColumnReordering, isColumnSelected = _b.isColumnSelected, menuIcon = _b.menuIcon, 
        // from IColumnNameProps
        name = _b.name, nameRenderer = _b.nameRenderer, 
        // from IHeaderProps
        spreadableProps = __rest(_b, ["enableColumnReordering", "isColumnSelected", "menuIcon", "name", "nameRenderer"]);
        var classes = classNames(spreadableProps.className, Classes.TABLE_COLUMN_HEADER_CELL, (_a = {},
            _a[Classes.TABLE_HAS_INTERACTION_BAR] = this.context.enableColumnInteractionBar,
            _a[Classes.TABLE_HAS_REORDER_HANDLE] = this.props.reorderHandle != null,
            _a));
        return (React.createElement(HeaderCell, __assign({ isReorderable: this.props.enableColumnReordering, isSelected: this.props.isColumnSelected }, spreadableProps, { className: classes }),
            this.renderName(),
            this.maybeRenderContent(),
            this.props.loading ? undefined : this.props.resizeHandle));
    };
    ColumnHeaderCell.prototype.renderName = function () {
        var _a;
        var _b = this.props, index = _b.index, loading = _b.loading, name = _b.name, nameRenderer = _b.nameRenderer, reorderHandle = _b.reorderHandle;
        var dropdownMenu = this.maybeRenderDropdownMenu();
        var defaultName = React.createElement("div", { className: Classes.TABLE_TRUNCATED_TEXT }, name);
        var nameComponent = (React.createElement(LoadableContent, { loading: loading !== null && loading !== void 0 ? loading : false, variableLength: true }, (_a = nameRenderer === null || nameRenderer === void 0 ? void 0 : nameRenderer(name, index)) !== null && _a !== void 0 ? _a : defaultName));
        if (this.context.enableColumnInteractionBar) {
            return (React.createElement("div", { className: Classes.TABLE_COLUMN_NAME, title: name },
                React.createElement("div", { className: Classes.TABLE_INTERACTION_BAR },
                    reorderHandle,
                    dropdownMenu),
                React.createElement(HorizontalCellDivider, null),
                React.createElement("div", { className: Classes.TABLE_COLUMN_NAME_TEXT }, nameComponent)));
        }
        else {
            return (React.createElement("div", { className: Classes.TABLE_COLUMN_NAME, title: name },
                reorderHandle,
                dropdownMenu,
                React.createElement("div", { className: Classes.TABLE_COLUMN_NAME_TEXT }, nameComponent)));
        }
    };
    ColumnHeaderCell.prototype.maybeRenderContent = function () {
        if (this.props.children === null) {
            return undefined;
        }
        return React.createElement("div", { className: Classes.TABLE_HEADER_CONTENT }, this.props.children);
    };
    ColumnHeaderCell.prototype.maybeRenderDropdownMenu = function () {
        var _a;
        var _b = this.props, index = _b.index, menuIcon = _b.menuIcon, menuRenderer = _b.menuRenderer;
        if (!CoreUtils.isFunction(menuRenderer)) {
            return undefined;
        }
        var classes = classNames(Classes.TABLE_TH_MENU_CONTAINER, CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT, (_a = {},
            _a[Classes.TABLE_TH_MENU_OPEN] = this.state.isActive,
            _a));
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: Classes.TABLE_TH_MENU_CONTAINER_BACKGROUND }),
            React.createElement(Popover, { content: menuRenderer(index), position: Position.BOTTOM, className: Classes.TABLE_TH_MENU, modifiers: { preventOverflow: { boundariesElement: "window" } }, onOpened: this.handlePopoverOpened, onClosing: this.handlePopoverClosing },
                React.createElement(Icon, { icon: menuIcon }))));
    };
    ColumnHeaderCell.displayName = "".concat(DISPLAYNAME_PREFIX, ".ColumnHeaderCell");
    ColumnHeaderCell.defaultProps = {
        isActive: false,
        menuIcon: "chevron-down",
    };
    ColumnHeaderCell.contextTypes = columnInteractionBarContextTypes;
    return ColumnHeaderCell;
}(AbstractPureComponent2));
export { ColumnHeaderCell };
//# sourceMappingURL=columnHeaderCell.js.map