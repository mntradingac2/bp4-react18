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
exports.ContextMenuTargetWrapper = void 0;
var tslib_1 = require("tslib");
/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * Table components should use ContextMenu2 instead.
 */
/* eslint-disable deprecation/deprecation */
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
/**
 * Since the ContextMenuTarget uses the `onContextMenu` prop instead
 * `element.addEventListener`, the prop can be lost. This wrapper helps us
 * maintain context menu fuctionality when doing fancy React.cloneElement
 * chains.
 *
 * @deprecated use ContextMenu2 instead
 */
var ContextMenuTargetWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(ContextMenuTargetWrapper, _super);
    function ContextMenuTargetWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextMenuTargetWrapper.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, style = _a.style;
        return (React.createElement("div", { className: className, style: style }, children));
    };
    ContextMenuTargetWrapper.prototype.renderContextMenu = function (e) {
        return this.props.renderContextMenu(e);
    };
    ContextMenuTargetWrapper = tslib_1.__decorate([
        core_1.ContextMenuTarget
    ], ContextMenuTargetWrapper);
    return ContextMenuTargetWrapper;
}(React.PureComponent));
exports.ContextMenuTargetWrapper = ContextMenuTargetWrapper;
//# sourceMappingURL=contextMenuTargetWrapper.js.map