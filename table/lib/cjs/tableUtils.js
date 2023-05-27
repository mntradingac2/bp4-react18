"use strict";
/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
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
exports.hasLoadingOption = exports.clampNumFrozenRows = exports.clampNumFrozenColumns = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var utils_1 = require("./common/utils");
function clampNumFrozenColumns(props) {
    var numFrozenColumns = props.numFrozenColumns;
    var numColumns = React.Children.count(props.children);
    return maybeClampValue(numFrozenColumns, numColumns);
}
exports.clampNumFrozenColumns = clampNumFrozenColumns;
function clampNumFrozenRows(props) {
    var numFrozenRows = props.numFrozenRows, numRows = props.numRows;
    return maybeClampValue(numFrozenRows, numRows);
}
exports.clampNumFrozenRows = clampNumFrozenRows;
function maybeClampValue(value, max) {
    return value === undefined ? 0 : utils_1.Utils.clamp(value, 0, max);
}
function hasLoadingOption(loadingOptions, loadingOption) {
    if (loadingOptions === undefined) {
        return false;
    }
    return loadingOptions.indexOf(loadingOption) >= 0;
}
exports.hasLoadingOption = hasLoadingOption;
//# sourceMappingURL=tableUtils.js.map