"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnHeaderCell2 = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var popover2_1 = require("@blueprintjs/popover2");
var Classes = tslib_1.__importStar(require("../common/classes"));
var loadableContent_1 = require("../common/loadableContent");
var utils_1 = require("../common/utils");
var columnHeaderCell_1 = require("./columnHeaderCell");
var headerCell2_1 = require("./headerCell2");
/**
 * Column header cell (v2) component.
 *
 * @see https://blueprintjs.com/docs/#table/api.columnheadercell2
 */
var ColumnHeaderCell2 = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnHeaderCell2, _super);
    function ColumnHeaderCell2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
    ColumnHeaderCell2.isHeaderMouseTarget = function (target) {
        return (target.classList.contains(Classes.TABLE_HEADER) ||
            target.classList.contains(Classes.TABLE_COLUMN_NAME) ||
            target.classList.contains(Classes.TABLE_INTERACTION_BAR) ||
            target.classList.contains(Classes.TABLE_HEADER_CONTENT));
    };
    ColumnHeaderCell2.prototype.render = function () {
        var _a;
        var _b = this.props, enableColumnInteractionBar = _b.enableColumnInteractionBar, enableColumnReordering = _b.enableColumnReordering, isColumnSelected = _b.isColumnSelected, menuIcon = _b.menuIcon, name = _b.name, nameRenderer = _b.nameRenderer, spreadableProps = tslib_1.__rest(_b, ["enableColumnInteractionBar", "enableColumnReordering", "isColumnSelected", "menuIcon", "name", "nameRenderer"]);
        var classes = (0, classnames_1.default)(spreadableProps.className, Classes.TABLE_COLUMN_HEADER_CELL, (_a = {},
            _a[Classes.TABLE_HAS_INTERACTION_BAR] = enableColumnInteractionBar,
            _a[Classes.TABLE_HAS_REORDER_HANDLE] = this.props.reorderHandle != null,
            _a));
        return (React.createElement(headerCell2_1.HeaderCell2, tslib_1.__assign({ isReorderable: enableColumnReordering, isSelected: isColumnSelected }, spreadableProps, { className: classes }),
            this.renderName(),
            this.maybeRenderContent(),
            this.props.loading ? undefined : this.props.resizeHandle));
    };
    ColumnHeaderCell2.prototype.renderName = function () {
        var _a;
        var _b = this.props, enableColumnInteractionBar = _b.enableColumnInteractionBar, index = _b.index, loading = _b.loading, name = _b.name, nameRenderer = _b.nameRenderer, reorderHandle = _b.reorderHandle;
        var dropdownMenu = this.maybeRenderDropdownMenu();
        var defaultName = React.createElement("div", { className: Classes.TABLE_TRUNCATED_TEXT }, name);
        var nameComponent = (React.createElement(loadableContent_1.LoadableContent, { loading: loading !== null && loading !== void 0 ? loading : false, variableLength: true }, (_a = nameRenderer === null || nameRenderer === void 0 ? void 0 : nameRenderer(name, index)) !== null && _a !== void 0 ? _a : defaultName));
        if (enableColumnInteractionBar) {
            return (React.createElement("div", { className: Classes.TABLE_COLUMN_NAME, title: name },
                React.createElement("div", { className: Classes.TABLE_INTERACTION_BAR },
                    reorderHandle,
                    dropdownMenu),
                React.createElement(columnHeaderCell_1.HorizontalCellDivider, null),
                React.createElement("div", { className: Classes.TABLE_COLUMN_NAME_TEXT }, nameComponent)));
        }
        else {
            return (React.createElement("div", { className: Classes.TABLE_COLUMN_NAME, title: name },
                reorderHandle,
                dropdownMenu,
                React.createElement("div", { className: Classes.TABLE_COLUMN_NAME_TEXT }, nameComponent)));
        }
    };
    ColumnHeaderCell2.prototype.maybeRenderContent = function () {
        if (this.props.children === null) {
            return undefined;
        }
        return React.createElement("div", { className: Classes.TABLE_HEADER_CONTENT }, this.props.children);
    };
    ColumnHeaderCell2.prototype.maybeRenderDropdownMenu = function () {
        var _a;
        var _b = this.props, index = _b.index, menuIcon = _b.menuIcon, menuPopoverProps = _b.menuPopoverProps, menuRenderer = _b.menuRenderer, selectCellsOnMenuClick = _b.selectCellsOnMenuClick;
        if (!core_1.Utils.isFunction(menuRenderer)) {
            return undefined;
        }
        var classes = (0, classnames_1.default)(Classes.TABLE_TH_MENU_CONTAINER, utils_1.CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT, (_a = {},
            _a[Classes.TABLE_TH_MENU_OPEN] = this.state.isActive,
            _a[Classes.TABLE_TH_MENU_SELECT_CELLS] = selectCellsOnMenuClick,
            _a));
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: Classes.TABLE_TH_MENU_CONTAINER_BACKGROUND }),
            React.createElement(popover2_1.Popover2, tslib_1.__assign({ className: (0, classnames_1.default)(Classes.TABLE_TH_MENU, menuPopoverProps === null || menuPopoverProps === void 0 ? void 0 : menuPopoverProps.className), content: menuRenderer(index), onClosing: this.handlePopoverClosing, onOpened: this.handlePopoverOpened, placement: "bottom", rootBoundary: "document" }, menuPopoverProps),
                React.createElement(core_1.Icon, { icon: menuIcon }))));
    };
    ColumnHeaderCell2.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".ColumnHeaderCell2");
    ColumnHeaderCell2.defaultProps = {
        enableColumnInteractionBar: false,
        isActive: false,
        menuIcon: "chevron-down",
        selectCellsOnMenuClick: true,
    };
    return ColumnHeaderCell2;
}(core_1.AbstractPureComponent2));
exports.ColumnHeaderCell2 = ColumnHeaderCell2;
//# sourceMappingURL=columnHeaderCell2.js.map