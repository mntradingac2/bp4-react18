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
export class ColumnHeaderCell extends AbstractPureComponent2 {
    static displayName = `${DISPLAYNAME_PREFIX}.ColumnHeaderCell`;
    static defaultProps = {
        isActive: false,
        menuIcon: "chevron-down",
    };
    static contextTypes = columnInteractionBarContextTypes;
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
    context = {
        enableColumnInteractionBar: false,
    };
    state = {
        isActive: false,
    };
    render() {
        const { 
        // from IColumnHeaderCellProps
        enableColumnReordering, isColumnSelected, menuIcon, 
        // from IColumnNameProps
        name, nameRenderer, 
        // from IHeaderProps
        ...spreadableProps } = this.props;
        const classes = classNames(spreadableProps.className, Classes.TABLE_COLUMN_HEADER_CELL, {
            [Classes.TABLE_HAS_INTERACTION_BAR]: this.context.enableColumnInteractionBar,
            [Classes.TABLE_HAS_REORDER_HANDLE]: this.props.reorderHandle != null,
        });
        return (React.createElement(HeaderCell, { isReorderable: this.props.enableColumnReordering, isSelected: this.props.isColumnSelected, ...spreadableProps, className: classes },
            this.renderName(),
            this.maybeRenderContent(),
            this.props.loading ? undefined : this.props.resizeHandle));
    }
    renderName() {
        const { index, loading, name, nameRenderer, reorderHandle } = this.props;
        const dropdownMenu = this.maybeRenderDropdownMenu();
        const defaultName = React.createElement("div", { className: Classes.TABLE_TRUNCATED_TEXT }, name);
        const nameComponent = (React.createElement(LoadableContent, { loading: loading ?? false, variableLength: true }, nameRenderer?.(name, index) ?? defaultName));
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
    }
    maybeRenderContent() {
        if (this.props.children === null) {
            return undefined;
        }
        return React.createElement("div", { className: Classes.TABLE_HEADER_CONTENT }, this.props.children);
    }
    maybeRenderDropdownMenu() {
        const { index, menuIcon, menuRenderer } = this.props;
        if (!CoreUtils.isFunction(menuRenderer)) {
            return undefined;
        }
        const classes = classNames(Classes.TABLE_TH_MENU_CONTAINER, CLASSNAME_EXCLUDED_FROM_TEXT_MEASUREMENT, {
            [Classes.TABLE_TH_MENU_OPEN]: this.state.isActive,
        });
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: Classes.TABLE_TH_MENU_CONTAINER_BACKGROUND }),
            React.createElement(Popover, { content: menuRenderer(index), position: Position.BOTTOM, className: Classes.TABLE_TH_MENU, modifiers: { preventOverflow: { boundariesElement: "window" } }, onOpened: this.handlePopoverOpened, onClosing: this.handlePopoverClosing },
                React.createElement(Icon, { icon: menuIcon }))));
    }
    handlePopoverOpened = () => this.setState({ isActive: true });
    handlePopoverClosing = () => this.setState({ isActive: false });
}
//# sourceMappingURL=columnHeaderCell.js.map