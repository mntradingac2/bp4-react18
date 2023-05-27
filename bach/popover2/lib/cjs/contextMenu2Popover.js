"use strict";
/*
 * Copyright 2023 Palantir Technologies, Inc. All rights reserved.
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
exports.ContextMenu2Popover = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("./classes"));
var popover2_1 = require("./popover2");
/**
 * A floating popover which is positioned at a given target offset inside its parent element container.
 * Used to display context menus. Note that this behaves differently from other popover components like
 * Popover2 and Tooltip2, which wrap their children with interaction handlers -- if you're looking for the whole
 * interaction package, use ContextMenu2 instead.
 *
 * @see https://blueprintjs.com/docs/#popover2-package/context-menu2-popover
 */
exports.ContextMenu2Popover = React.memo(function _ContextMenu2Popover(props) {
    var _a;
    var content = props.content, popoverClassName = props.popoverClassName, onClose = props.onClose, _b = props.isDarkTheme, isDarkTheme = _b === void 0 ? false : _b, _c = props.rootBoundary, rootBoundary = _c === void 0 ? "viewport" : _c, targetOffset = props.targetOffset, _d = props.transitionDuration, transitionDuration = _d === void 0 ? 100 : _d, popoverProps = tslib_1.__rest(props, ["content", "popoverClassName", "onClose", "isDarkTheme", "rootBoundary", "targetOffset", "transitionDuration"]);
    var cancelContextMenu = React.useCallback(function (e) { return e.preventDefault(); }, []);
    // Popover2 should attach its ref to the virtual target we render inside a Portal, not the "inline" child target
    var renderTarget = React.useCallback(function (_a) {
        var ref = _a.ref;
        return (React.createElement(core_1.Portal, null,
            React.createElement("div", { className: Classes.CONTEXT_MENU2_VIRTUAL_TARGET, style: targetOffset, ref: ref })));
    }, [targetOffset]);
    var handleInteraction = React.useCallback(function (nextOpenState) {
        if (!nextOpenState) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    }, []);
    return (React.createElement(popover2_1.Popover2, tslib_1.__assign({ placement: "right-start", rootBoundary: rootBoundary, transitionDuration: transitionDuration }, popoverProps, { content: 
        // this prevents right-clicking inside our context menu
        React.createElement("div", { onContextMenu: cancelContextMenu }, content), enforceFocus: false, 
        // Generate key based on offset so that a new Popover instance is created
        // when offset changes, to force recomputing position.
        key: getPopoverKey(targetOffset), hasBackdrop: true, backdropProps: { className: Classes.CONTEXT_MENU2_BACKDROP }, minimal: true, onInteraction: handleInteraction, popoverClassName: (0, classnames_1.default)(Classes.CONTEXT_MENU2_POPOVER2, popoverClassName, (_a = {},
            _a[core_1.Classes.DARK] = isDarkTheme,
            _a)), positioningStrategy: "fixed", renderTarget: renderTarget })));
});
exports.ContextMenu2Popover.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".ContextMenu2Popover");
function getPopoverKey(targetOffset) {
    return targetOffset === undefined ? "default" : "".concat(targetOffset.left, "x").concat(targetOffset.top);
}
//# sourceMappingURL=contextMenu2Popover.js.map