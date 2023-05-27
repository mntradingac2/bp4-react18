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
 * Table components should use ContextMenu2 instead.
 */
/* eslint-disable deprecation/deprecation */
import * as React from "react";
import { ContextMenuTarget } from "@blueprintjs/core";
/**
 * Since the ContextMenuTarget uses the `onContextMenu` prop instead
 * `element.addEventListener`, the prop can be lost. This wrapper helps us
 * maintain context menu fuctionality when doing fancy React.cloneElement
 * chains.
 *
 * @deprecated use ContextMenu2 instead
 */
let ContextMenuTargetWrapper = class ContextMenuTargetWrapper extends React.PureComponent {
    render() {
        const { className, children, style } = this.props;
        return (React.createElement("div", { className: className, style: style }, children));
    }
    renderContextMenu(e) {
        return this.props.renderContextMenu(e);
    }
};
ContextMenuTargetWrapper = __decorate([
    ContextMenuTarget
], ContextMenuTargetWrapper);
export { ContextMenuTargetWrapper };
//# sourceMappingURL=contextMenuTargetWrapper.js.map