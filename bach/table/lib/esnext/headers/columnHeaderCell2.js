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
import classNames from "classnames";
import * as React from "react";
import { AbstractPureComponent2, Utils as CoreUtils, DISPLAYNAME_PREFIX, Icon, } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import * as Classes from "../common/classes";
import { LoadableContent } from "../common/loadableContent";
import { CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT } from "../common/utils";
import { HorizontalCellDivider } from "./columnHeaderCell";
import { HeaderCell2 } from "./headerCell2";
/**
 * Column header cell (v2) component.
 *
 * @see https://blueprintjs.com/docs/#table/api.columnheadercell2
 */
export class ColumnHeaderCell2 extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.ColumnHeaderCell2`;
    static defaultProps = {
        enableColumnInteractionBar: false,
        isActive: false,
        menuIcon: "chevron-down",
        selectCellsOnMenuClick: true,
    };
    /**
     * This method determines if a `MouseEvent` was triggered on a target that
     * should be used as the header click/drag target. This enables users of
     * this component to render fully interactive components in their header
     * cells without worry of selection or resize operations from capturing
     * their mouse events.
     */
    static isHeaderMouseTarget(target) {
        return (target.classList.contains(Classes.TABLE_HEADER) ||
            target.classList.contains(Classes.TABLE_COLUMN_NAME) ||
            target.classList.contains(Classes.TABLE_INTERACTION_BAR) ||
            target.classList.contains(Classes.TABLE_HEADER_CONTENT));
    }
    state = {
        isActive: false,
    };
    render() {
        const { enableColumnInteractionBar, enableColumnReordering, isColumnSelected, menuIcon, name, nameRenderer, ...spreadableProps } = this.props;
        const classes = classNames(spreadableProps.className, Classes.TABLE_COLUMN_HEADER_CELL, {
            [Classes.TABLE_HAS_INTERACTION_BAR]: enableColumnInteractionBar,
            [Classes.TABLE_HAS_REORDER_HANDLE]: this.props.reorderHandle != null,
        });
        return (React.createElement(HeaderCell2, { isReorderable: enableColumnReordering, isSelected: isColumnSelected, ...spreadableProps, className: classes },
            this.renderName(),
            this.maybeRenderContent(),
            this.props.loading ? undefined : this.props.resizeHandle));
    }
    renderName() {
        const { enableColumnInteractionBar, index, loading, name, nameRenderer, reorderHandle } = this.props;
        const dropdownMenu = this.maybeRenderDropdownMenu();
        const defaultName = React.createElement("div", { className: Classes.TABLE_TRUNCATED_TEXT }, name);
        const nameComponent = (React.createElement(LoadableContent, { loading: loading ?? false, variableLength: true }, nameRenderer?.(name, index) ?? defaultName));
        if (enableColumnInteractionBar) {
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
    }
    maybeRenderContent() {
        if (this.props.children === null) {
            return undefined;
        }
        return React.createElement("div", { className: Classes.TABLE_HEADER_CONTENT }, this.props.children);
    }
    maybeRenderDropdownMenu() {
        const { index, menuIcon, menuPopoverProps, menuRenderer, selectCellsOnMenuClick } = this.props;
        if (!CoreUtils.isFunction(menuRenderer)) {
            return undefined;
        }
        const classes = classNames(Classes.TABLE_TH_MENU_CONTAINER, CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT, {
            [Classes.TABLE_TH_MENU_OPEN]: this.state.isActive,
            [Classes.TABLE_TH_MENU_SELECT_CELLS]: selectCellsOnMenuClick,
        });
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: Classes.TABLE_TH_MENU_CONTAINER_BACKGROUND }),
            React.createElement(Popover2, { className: classNames(Classes.TABLE_TH_MENU, menuPopoverProps?.className), content: menuRenderer(index), onClosing: this.handlePopoverClosing, onOpened: this.handlePopoverOpened, placement: "bottom", rootBoundary: "document", ...menuPopoverProps },
                React.createElement(Icon, { icon: menuIcon }))));
    }
    handlePopoverOpened = () => this.setState({ isActive: true });
    handlePopoverClosing = () => this.setState({ isActive: false });
}
//# sourceMappingURL=columnHeaderCell2.js.map