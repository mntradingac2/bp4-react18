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
import { __assign, __extends, __rest } from "tslib";
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
var Omnibar = /** @class */ (function (_super) {
    __extends(Omnibar, _super);
    function Omnibar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderQueryList = function (listProps) {
            var _a = _this.props, _b = _a.inputProps, inputProps = _b === void 0 ? {} : _b, isOpen = _a.isOpen, _c = _a.overlayProps, overlayProps = _c === void 0 ? {} : _c;
            var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
            var handlers = isOpen ? { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp } : {};
            return (React.createElement(Overlay, __assign({ hasBackdrop: true }, overlayProps, { isOpen: isOpen, className: classNames(Classes.OMNIBAR_OVERLAY, overlayProps.className), onClose: _this.handleOverlayClose }),
                React.createElement("div", __assign({ className: classNames(Classes.OMNIBAR, listProps.className) }, handlers),
                    React.createElement(InputGroup, __assign({ autoFocus: true, large: true, leftIcon: "search", placeholder: "Search..." }, inputProps, { onChange: listProps.handleQueryChange, value: listProps.query })),
                    listProps.itemList)));
        };
        _this.handleOverlayClose = function (event) {
            var _a, _b, _c, _d;
            (_b = (_a = _this.props.overlayProps) === null || _a === void 0 ? void 0 : _a.onClose) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            (_d = (_c = _this.props).onClose) === null || _d === void 0 ? void 0 : _d.call(_c, event);
        };
        return _this;
    }
    Omnibar.ofType = function () {
        return Omnibar;
    };
    Omnibar.prototype.render = function () {
        // omit props specific to this component, spread the rest.
        var _a = this.props, isOpen = _a.isOpen, inputProps = _a.inputProps, overlayProps = _a.overlayProps, restProps = __rest(_a, ["isOpen", "inputProps", "overlayProps"]);
        var initialContent = "initialContent" in this.props ? this.props.initialContent : null;
        return React.createElement(QueryList, __assign({}, restProps, { initialContent: initialContent, renderer: this.renderQueryList }));
    };
    Omnibar.displayName = "".concat(DISPLAYNAME_PREFIX, ".Omnibar");
    return Omnibar;
}(React.PureComponent));
export { Omnibar };
//# sourceMappingURL=omnibar.js.map