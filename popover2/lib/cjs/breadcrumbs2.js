"use strict";
/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
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
exports.Breadcrumbs2 = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var popover2_1 = require("./popover2");
/**
 * Breadcrumbs (v2) component.
 *
 * @see https://blueprintjs.com/docs/#popover2-package/breadcrumbs2
 */
var Breadcrumbs2 = /** @class */ (function (_super) {
    tslib_1.__extends(Breadcrumbs2, _super);
    function Breadcrumbs2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderOverflow = function (items) {
            var _a = _this.props, collapseFrom = _a.collapseFrom, popoverProps = _a.popoverProps;
            var orderedItems = items;
            if (collapseFrom === core_1.Boundary.START) {
                // If we're collapsing from the start, the menu should be read from the bottom to the
                // top, continuing with the breadcrumbs to the right. Since this means the first
                // breadcrumb in the props must be the last in the menu, we need to reverse the overlow
                // order.
                orderedItems = items.slice().reverse();
            }
            return (React.createElement("li", null,
                React.createElement(popover2_1.Popover2, tslib_1.__assign({ placement: collapseFrom === core_1.Boundary.END ? "bottom-end" : "bottom-start", disabled: orderedItems.length === 0, content: React.createElement(core_1.Menu, null, orderedItems.map(_this.renderOverflowBreadcrumb)) }, popoverProps),
                    React.createElement("span", { className: core_1.Classes.BREADCRUMBS_COLLAPSED }))));
        };
        _this.renderOverflowBreadcrumb = function (props, index) {
            var isClickable = props.href != null || props.onClick != null;
            var htmlProps = (0, core_1.removeNonHTMLProps)(props);
            return React.createElement(core_1.MenuItem, tslib_1.__assign({ disabled: !isClickable }, htmlProps, { text: props.text, key: index }));
        };
        _this.renderBreadcrumbWrapper = function (props, index) {
            var isCurrent = _this.props.items[_this.props.items.length - 1] === props;
            return React.createElement("li", { key: index }, _this.renderBreadcrumb(props, isCurrent));
        };
        return _this;
    }
    Breadcrumbs2.prototype.render = function () {
        var _a = this.props, className = _a.className, collapseFrom = _a.collapseFrom, items = _a.items, minVisibleItems = _a.minVisibleItems, _b = _a.overflowListProps, overflowListProps = _b === void 0 ? {} : _b;
        return (React.createElement(core_1.OverflowList, tslib_1.__assign({ collapseFrom: collapseFrom, minVisibleItems: minVisibleItems, tagName: "ul" }, overflowListProps, { className: (0, classnames_1.default)(core_1.Classes.BREADCRUMBS, overflowListProps.className, className), items: items, overflowRenderer: this.renderOverflow, visibleItemRenderer: this.renderBreadcrumbWrapper })));
    };
    Breadcrumbs2.prototype.renderBreadcrumb = function (props, isCurrent) {
        if (isCurrent && this.props.currentBreadcrumbRenderer != null) {
            return this.props.currentBreadcrumbRenderer(props);
        }
        else if (this.props.breadcrumbRenderer != null) {
            return this.props.breadcrumbRenderer(props);
        }
        else {
            // allow user to override 'current' prop
            return React.createElement(core_1.Breadcrumb, tslib_1.__assign({ current: isCurrent }, props));
        }
    };
    Breadcrumbs2.defaultProps = {
        collapseFrom: core_1.Boundary.START,
    };
    return Breadcrumbs2;
}(core_1.AbstractPureComponent2));
exports.Breadcrumbs2 = Breadcrumbs2;
//# sourceMappingURL=breadcrumbs2.js.map