"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Omnibar = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var common_1 = require("../../common");
var queryList_1 = require("../query-list/queryList");
/**
 * Omnibar component.
 *
 * @see https://blueprintjs.com/docs/#select/omnibar
 */
var Omnibar = /** @class */ (function (_super) {
    tslib_1.__extends(Omnibar, _super);
    function Omnibar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderQueryList = function (listProps) {
            var _a = _this.props, _b = _a.inputProps, inputProps = _b === void 0 ? {} : _b, isOpen = _a.isOpen, _c = _a.overlayProps, overlayProps = _c === void 0 ? {} : _c;
            var handleKeyDown = listProps.handleKeyDown, handleKeyUp = listProps.handleKeyUp;
            var handlers = isOpen ? { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp } : {};
            return (React.createElement(core_1.Overlay, tslib_1.__assign({ hasBackdrop: true }, overlayProps, { isOpen: isOpen, className: (0, classnames_1.default)(common_1.Classes.OMNIBAR_OVERLAY, overlayProps.className), onClose: _this.handleOverlayClose }),
                React.createElement("div", tslib_1.__assign({ className: (0, classnames_1.default)(common_1.Classes.OMNIBAR, listProps.className) }, handlers),
                    React.createElement(core_1.InputGroup, tslib_1.__assign({ autoFocus: true, large: true, leftIcon: "search", placeholder: "Search..." }, inputProps, { onChange: listProps.handleQueryChange, value: listProps.query })),
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
        var _a = this.props, isOpen = _a.isOpen, inputProps = _a.inputProps, overlayProps = _a.overlayProps, restProps = tslib_1.__rest(_a, ["isOpen", "inputProps", "overlayProps"]);
        var initialContent = "initialContent" in this.props ? this.props.initialContent : null;
        return React.createElement(queryList_1.QueryList, tslib_1.__assign({}, restProps, { initialContent: initialContent, renderer: this.renderQueryList }));
    };
    Omnibar.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".Omnibar");
    return Omnibar;
}(React.PureComponent));
exports.Omnibar = Omnibar;
//# sourceMappingURL=omnibar.js.map