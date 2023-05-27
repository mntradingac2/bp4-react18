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
var TableQuadrantStackCache = /** @class */ (function () {
    function TableQuadrantStackCache() {
        this.cachedRowHeaderWidth = 0;
        this.cachedColumnHeaderHeight = 0;
        this.cachedScrollLeft = 0;
        this.cachedScrollTop = 0;
        this.reset();
    }
    TableQuadrantStackCache.prototype.reset = function () {
        this.cachedRowHeaderWidth = 0;
        this.cachedColumnHeaderHeight = 0;
        this.cachedScrollLeft = 0;
        this.cachedScrollTop = 0;
    };
    // Getters
    // =======
    TableQuadrantStackCache.prototype.getScrollOffset = function (scrollKey) {
        return scrollKey === "scrollLeft" ? this.cachedScrollLeft : this.cachedScrollTop;
    };
    TableQuadrantStackCache.prototype.getRowHeaderWidth = function () {
        return this.cachedRowHeaderWidth;
    };
    TableQuadrantStackCache.prototype.getColumnHeaderHeight = function () {
        return this.cachedColumnHeaderHeight;
    };
    TableQuadrantStackCache.prototype.getScrollContainerClientWidth = function () {
        return this.cachedScrollContainerClientWidth;
    };
    TableQuadrantStackCache.prototype.getScrollContainerClientHeight = function () {
        return this.cachedScrollContainerClientHeight;
    };
    // Setters
    // =======
    TableQuadrantStackCache.prototype.setColumnHeaderHeight = function (height) {
        this.cachedColumnHeaderHeight = height;
    };
    TableQuadrantStackCache.prototype.setRowHeaderWidth = function (width) {
        this.cachedRowHeaderWidth = width;
    };
    TableQuadrantStackCache.prototype.setScrollOffset = function (scrollKey, offset) {
        if (scrollKey === "scrollLeft") {
            this.cachedScrollLeft = offset;
        }
        else {
            this.cachedScrollTop = offset;
        }
    };
    TableQuadrantStackCache.prototype.setScrollContainerClientWidth = function (clientWidth) {
        this.cachedScrollContainerClientWidth = clientWidth;
    };
    TableQuadrantStackCache.prototype.setScrollContainerClientHeight = function (clientHeight) {
        this.cachedScrollContainerClientHeight = clientHeight;
    };
    return TableQuadrantStackCache;
}());
export { TableQuadrantStackCache };
//# sourceMappingURL=tableQuadrantStackCache.js.map