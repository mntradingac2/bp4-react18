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
import { __extends } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { Utils as CoreUtils } from "@blueprintjs/core";
import * as Classes from "../common/classes";
var GuideLayer = /** @class */ (function (_super) {
    __extends(GuideLayer, _super);
    function GuideLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderVerticalGuide = function (offset, index) {
            var _a;
            var style = {
                left: "".concat(offset, "px"),
            };
            var className = classNames(Classes.TABLE_OVERLAY, Classes.TABLE_VERTICAL_GUIDE, (_a = {},
                _a["".concat(Classes.TABLE_VERTICAL_GUIDE, "-flush-left")] = offset === 0,
                _a));
            return React.createElement("div", { className: className, key: index, style: style });
        };
        _this.renderHorizontalGuide = function (offset, index) {
            var _a;
            var style = {
                top: "".concat(offset, "px"),
            };
            var className = classNames(Classes.TABLE_OVERLAY, Classes.TABLE_HORIZONTAL_GUIDE, (_a = {},
                _a["".concat(Classes.TABLE_HORIZONTAL_GUIDE, "-flush-top")] = offset === 0,
                _a));
            return React.createElement("div", { className: className, key: index, style: style });
        };
        return _this;
    }
    GuideLayer.prototype.shouldComponentUpdate = function (nextProps) {
        if (this.props.className !== nextProps.className) {
            return true;
        }
        // shallow-comparing guide arrays leads to tons of unnecessary re-renders, so we check the
        // array contents explicitly.
        return (!CoreUtils.arraysEqual(this.props.verticalGuides, nextProps.verticalGuides) ||
            !CoreUtils.arraysEqual(this.props.horizontalGuides, nextProps.horizontalGuides));
    };
    GuideLayer.prototype.render = function () {
        var _a = this.props, verticalGuides = _a.verticalGuides, horizontalGuides = _a.horizontalGuides, className = _a.className;
        var verticals = verticalGuides == null ? undefined : verticalGuides.map(this.renderVerticalGuide);
        var horizontals = horizontalGuides == null ? undefined : horizontalGuides.map(this.renderHorizontalGuide);
        return (React.createElement("div", { className: classNames(className, Classes.TABLE_OVERLAY_LAYER) },
            verticals,
            horizontals));
    };
    return GuideLayer;
}(React.Component));
export { GuideLayer };
//# sourceMappingURL=guides.js.map