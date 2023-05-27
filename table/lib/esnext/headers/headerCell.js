/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
import { __decorate } from "tslib";
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * All changes & bugfixes should be made to HeaderCell2 instead.
 */
/* eslint-disable deprecation/deprecation, @blueprintjs/no-deprecated-components */
import classNames from "classnames";
import * as React from "react";
import { ContextMenuTarget, Classes as CoreClasses, Utils as CoreUtils } from "@blueprintjs/core";
import * as Classes from "../common/classes";
/** @deprecated use HeaderCell2 */
let HeaderCell = class HeaderCell extends React.Component {
    state = {
        isActive: false,
    };
    shouldComponentUpdate(nextProps) {
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !CoreUtils.deepCompareKeys(this.props, nextProps, ["style"]));
    }
    renderContextMenu(_event) {
        const { menuRenderer } = this.props;
        if (CoreUtils.isFunction(menuRenderer)) {
            // the preferred way (a consistent function instance that won't cause as many re-renders)
            return menuRenderer(this.props.index);
        }
        else {
            return undefined;
        }
    }
    render() {
        const classes = classNames(Classes.TABLE_HEADER, {
            [Classes.TABLE_HEADER_ACTIVE]: this.props.isActive || this.state.isActive,
            [Classes.TABLE_HEADER_SELECTED]: this.props.isSelected,
            [CoreClasses.LOADING]: this.props.loading,
        }, this.props.className);
        return (React.createElement("div", { className: classes, style: this.props.style }, this.props.children));
    }
};
HeaderCell = __decorate([
    ContextMenuTarget
], HeaderCell);
export { HeaderCell };
//# sourceMappingURL=headerCell.js.map