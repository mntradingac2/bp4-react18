"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionLayer = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("../common/classes"));
var regions_1 = require("../regions");
// don't include "regions" or "regionStyles" in here, because they can't be shallowly compared
var UPDATE_PROPS_KEYS = ["className"];
var RegionLayer = /** @class */ (function (_super) {
    tslib_1.__extends(RegionLayer, _super);
    function RegionLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderRegion = function (_region, index) {
            var _a = _this.props, className = _a.className, regionStyles = _a.regionStyles;
            return (React.createElement("div", { className: (0, classnames_1.default)(Classes.TABLE_OVERLAY, Classes.TABLE_REGION, className), key: index, style: regionStyles === undefined ? undefined : regionStyles[index] }));
        };
        return _this;
    }
    RegionLayer.prototype.shouldComponentUpdate = function (nextProps) {
        var _a, _b, _c, _d;
        // shallowly comparable props like "className" tend not to change in the default table
        // implementation, so do that check last with hope that we return earlier and avoid it
        // altogether.
        return (!core_1.Utils.arraysEqual((_a = this.props.regions) !== null && _a !== void 0 ? _a : [], (_b = nextProps.regions) !== null && _b !== void 0 ? _b : [], regions_1.Regions.regionsEqual) ||
            !core_1.Utils.arraysEqual((_c = this.props.regionStyles) !== null && _c !== void 0 ? _c : [], (_d = nextProps.regionStyles) !== null && _d !== void 0 ? _d : [], core_1.Utils.shallowCompareKeys) ||
            !core_1.Utils.shallowCompareKeys(this.props, nextProps, { include: UPDATE_PROPS_KEYS }));
    };
    RegionLayer.prototype.render = function () {
        return React.createElement("div", { className: Classes.TABLE_OVERLAY_LAYER }, this.renderRegionChildren());
    };
    RegionLayer.prototype.renderRegionChildren = function () {
        var regions = this.props.regions;
        if (regions == null) {
            return undefined;
        }
        return regions.map(this.renderRegion);
    };
    return RegionLayer;
}(React.Component));
exports.RegionLayer = RegionLayer;
//# sourceMappingURL=regions.js.map