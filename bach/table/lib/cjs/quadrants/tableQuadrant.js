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
exports.TableQuadrant = exports.QuadrantType = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("../common/classes"));
var Errors = tslib_1.__importStar(require("../common/errors"));
var QuadrantType;
(function (QuadrantType) {
    /**
     * The main quadrant beneath any frozen rows or columns.
     */
    QuadrantType["MAIN"] = "main";
    /**
     * The top quadrant, containing column headers and frozen rows.
     */
    QuadrantType["TOP"] = "top";
    /**
     * The left quadrant, containing row headers and frozen columns.
     */
    QuadrantType["LEFT"] = "left";
    /**
     * The top-left quadrant, containing the headers and cells common to both
     * the frozen columns and frozen rows.
     */
    QuadrantType["TOP_LEFT"] = "top-left";
})(QuadrantType = exports.QuadrantType || (exports.QuadrantType = {}));
var TableQuadrant = /** @class */ (function (_super) {
    tslib_1.__extends(TableQuadrant, _super);
    function TableQuadrant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableQuadrant.prototype.render = function () {
        var _a, _b, _c, _d, _e, _f;
        var _g = this.props, grid = _g.grid, enableRowHeader = _g.enableRowHeader, quadrantType = _g.quadrantType, bodyRenderer = _g.bodyRenderer, enableColumnHeader = _g.enableColumnHeader;
        var showFrozenRowsOnly = quadrantType === QuadrantType.TOP || quadrantType === QuadrantType.TOP_LEFT;
        var showFrozenColumnsOnly = quadrantType === QuadrantType.LEFT || quadrantType === QuadrantType.TOP_LEFT;
        var className = (0, classnames_1.default)(Classes.TABLE_QUADRANT, this.getQuadrantCssClass(), this.props.className);
        var maybeMenu = enableRowHeader && ((_b = (_a = this.props).menuRenderer) === null || _b === void 0 ? void 0 : _b.call(_a));
        var maybeRowHeader = enableRowHeader && ((_d = (_c = this.props).rowHeaderCellRenderer) === null || _d === void 0 ? void 0 : _d.call(_c, showFrozenRowsOnly));
        var maybeColumnHeader = enableColumnHeader && ((_f = (_e = this.props).columnHeaderCellRenderer) === null || _f === void 0 ? void 0 : _f.call(_e, showFrozenColumnsOnly));
        var body = bodyRenderer(quadrantType, showFrozenRowsOnly, showFrozenColumnsOnly);
        // need to set bottom container size to prevent overlay clipping on scroll
        var bottomContainerStyle = {
            height: grid.getHeight(),
            width: grid.getWidth(),
        };
        return (React.createElement("div", { className: className, style: this.props.style, ref: this.props.quadrantRef },
            React.createElement("div", { className: Classes.TABLE_QUADRANT_SCROLL_CONTAINER, ref: this.props.scrollContainerRef, onScroll: this.props.onScroll, onWheel: this.props.onWheel },
                React.createElement("div", { className: Classes.TABLE_TOP_CONTAINER },
                    maybeMenu,
                    maybeColumnHeader),
                React.createElement("div", { className: Classes.TABLE_BOTTOM_CONTAINER, style: bottomContainerStyle },
                    maybeRowHeader,
                    React.createElement("div", { className: Classes.TABLE_QUADRANT_BODY_CONTAINER, ref: this.props.bodyRef }, body)))));
    };
    TableQuadrant.prototype.validateProps = function (nextProps) {
        var quadrantType = nextProps.quadrantType;
        if (nextProps.onScroll != null && quadrantType != null && quadrantType !== QuadrantType.MAIN) {
            console.warn(Errors.QUADRANT_ON_SCROLL_UNNECESSARILY_DEFINED);
        }
    };
    TableQuadrant.prototype.getQuadrantCssClass = function () {
        switch (this.props.quadrantType) {
            case QuadrantType.MAIN:
                return Classes.TABLE_QUADRANT_MAIN;
            case QuadrantType.TOP:
                return Classes.TABLE_QUADRANT_TOP;
            case QuadrantType.LEFT:
                return Classes.TABLE_QUADRANT_LEFT;
            case QuadrantType.TOP_LEFT:
                return Classes.TABLE_QUADRANT_TOP_LEFT;
            default:
                return undefined;
        }
    };
    // we want the user to explicitly pass a quadrantType. define defaultProps as a Partial to avoid
    // declaring that and other required props here.
    TableQuadrant.defaultProps = {
        enableColumnHeader: true,
        enableRowHeader: true,
    };
    return TableQuadrant;
}(core_1.AbstractComponent2));
exports.TableQuadrant = TableQuadrant;
//# sourceMappingURL=tableQuadrant.js.map