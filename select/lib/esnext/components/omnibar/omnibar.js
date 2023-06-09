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
import classNames from "classnames";
import * as React from "react";
import { DISPLAYNAME_PREFIX, InputGroup, Overlay } from "@blueprintjs/core";
import { Classes } from "../../common";
import { QueryList } from "../query-list/queryList";
/**
 * Omnibar component.
 *
 * @see https://blueprintjs.com/docs/#select/omnibar
 */
export class Omnibar extends React.PureComponent {
    static displayName = `${DISPLAYNAME_PREFIX}.Omnibar`;
    static ofType() {
        return Omnibar;
    }
    render() {
        // omit props specific to this component, spread the rest.
        const { isOpen, inputProps, overlayProps, ...restProps } = this.props;
        const initialContent = "initialContent" in this.props ? this.props.initialContent : null;
        return React.createElement(QueryList, { ...restProps, initialContent: initialContent, renderer: this.renderQueryList });
    }
    renderQueryList = (listProps) => {
        const { inputProps = {}, isOpen, overlayProps = {} } = this.props;
        const { handleKeyDown, handleKeyUp } = listProps;
        const handlers = isOpen ? { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp } : {};
        return (React.createElement(Overlay, { hasBackdrop: true, ...overlayProps, isOpen: isOpen, className: classNames(Classes.OMNIBAR_OVERLAY, overlayProps.className), onClose: this.handleOverlayClose },
            React.createElement("div", { className: classNames(Classes.OMNIBAR, listProps.className), ...handlers },
                React.createElement(InputGroup, { autoFocus: true, large: true, leftIcon: "search", placeholder: "Search...", ...inputProps, onChange: listProps.handleQueryChange, value: listProps.query }),
                listProps.itemList)));
    };
    handleOverlayClose = (event) => {
        this.props.overlayProps?.onClose?.(event);
        this.props.onClose?.(event);
    };
}
//# sourceMappingURL=omnibar.js.map