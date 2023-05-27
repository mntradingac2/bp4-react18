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
import { Regions } from "../../regions";
var MenuContext = /** @class */ (function () {
    function MenuContext(target, selectedRegions, numRows, numCols) {
        this.target = target;
        this.selectedRegions = selectedRegions;
        this.numRows = numRows;
        this.numCols = numCols;
        this.regions = Regions.overlapsRegion(selectedRegions, target) ? selectedRegions : [target];
    }
    MenuContext.prototype.getTarget = function () {
        return this.target;
    };
    MenuContext.prototype.getSelectedRegions = function () {
        return this.selectedRegions;
    };
    MenuContext.prototype.getRegions = function () {
        return this.regions;
    };
    MenuContext.prototype.getUniqueCells = function () {
        return Regions.enumerateUniqueCells(this.regions, this.numRows, this.numCols);
    };
    return MenuContext;
}());
export { MenuContext };
//# sourceMappingURL=menuContext.js.map