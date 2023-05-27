/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
import { Classes as CoreClasses, Utils as CoreUtils, DISPLAYNAME_PREFIX } from "@blueprintjs/core";
import * as Classes from "../common/classes";
import { LoadableContent } from "../common/loadableContent";
import { JSONFormat } from "./formats/jsonFormat";
import { JSONFormat2 } from "./formats/jsonFormat2";
import { TruncatedFormat } from "./formats/truncatedFormat";
import { TruncatedFormat2 } from "./formats/truncatedFormat2";
export const emptyCellRenderer = () => React.createElement(Cell, null);
/**
 * Cell component.
 *
 * @see https://blueprintjs.com/docs/#table/api.cell
 */
export class Cell extends React.Component {
    static displayName = `${DISPLAYNAME_PREFIX}.Cell`;
    static defaultProps = {
        truncated: true,
        wrapText: false,
    };
    shouldComponentUpdate(nextProps) {
        // deeply compare "style," because a new but identical object might have been provided.
        return (!CoreUtils.shallowCompareKeys(this.props, nextProps, { exclude: ["style"] }) ||
            !CoreUtils.deepCompareKeys(this.props.style, nextProps.style));
    }
    render() {
        const { cellRef, tabIndex, onKeyDown, onKeyUp, onKeyPress, style, intent, interactive, loading, tooltip, truncated, className, wrapText, } = this.props;
        const classes = classNames(Classes.TABLE_CELL, CoreClasses.intentClass(intent), {
            [Classes.TABLE_CELL_INTERACTIVE]: interactive,
            [CoreClasses.LOADING]: loading,
            [Classes.TABLE_TRUNCATED_CELL]: truncated,
        }, className);
        const textClasses = classNames({
            [Classes.TABLE_TRUNCATED_TEXT]: truncated,
            [Classes.TABLE_NO_WRAP_TEXT]: !wrapText,
        });
        // add width and height to the children, for use in shouldComponentUpdate in truncatedFormat
        // note: these aren't actually used by truncated format, just in shouldComponentUpdate
        const modifiedChildren = React.Children.map(this.props.children, child => {
            const isFormatElement = 
            // eslint-disable-next-line deprecation/deprecation
            CoreUtils.isElementOfType(child, TruncatedFormat) ||
                CoreUtils.isElementOfType(child, TruncatedFormat2) ||
                // eslint-disable-next-line deprecation/deprecation
                CoreUtils.isElementOfType(child, JSONFormat) ||
                CoreUtils.isElementOfType(child, JSONFormat2);
            if (style != null && React.isValidElement(child) && isFormatElement) {
                return React.cloneElement(child, {
                    parentCellHeight: style.height === undefined ? undefined : parseInt(style.height.toString(), 10),
                    parentCellWidth: style.width === undefined ? undefined : parseInt(style.width.toString(), 10),
                });
            }
            return child;
        });
        const content = React.createElement("div", { className: textClasses }, modifiedChildren);
        return (React.createElement("div", { className: classes, title: tooltip, ref: cellRef, ...{ style, tabIndex, onKeyDown, onKeyUp, onKeyPress } },
            React.createElement(LoadableContent, { loading: loading ?? false, variableLength: true }, content)));
    }
}
//# sourceMappingURL=cell.js.map