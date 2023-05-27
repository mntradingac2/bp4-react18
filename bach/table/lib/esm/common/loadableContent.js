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
import { __extends } from "tslib";
import * as React from "react";
import { Classes } from "@blueprintjs/core";
// This class expects a single, non-string child.
var LoadableContent = /** @class */ (function (_super) {
    __extends(LoadableContent, _super);
    function LoadableContent(props) {
        var _this = _super.call(this, props) || this;
        _this.style = _this.calculateStyle(props.variableLength);
        return _this;
    }
    LoadableContent.prototype.componentDidUpdate = function (prevProps) {
        if ((!prevProps.loading && this.props.loading) || prevProps.variableLength !== this.props.variableLength) {
            this.style = this.calculateStyle(this.props.variableLength);
        }
    };
    LoadableContent.prototype.render = function () {
        if (this.props.loading) {
            return React.createElement("div", { className: Classes.SKELETON, style: this.style });
        }
        return React.Children.only(this.props.children);
    };
    LoadableContent.prototype.calculateStyle = function (variableLength) {
        if (variableLength === void 0) { variableLength = false; }
        var skeletonLength = variableLength ? 75 - Math.floor(Math.random() * 11) * 5 : 100;
        return { width: "".concat(skeletonLength, "%") };
    };
    return LoadableContent;
}(React.PureComponent));
export { LoadableContent };
//# sourceMappingURL=loadableContent.js.map