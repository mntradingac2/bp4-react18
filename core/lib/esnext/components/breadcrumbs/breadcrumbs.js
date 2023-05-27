"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumbs = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const menu_1 = require("../menu/menu");
const menuItem_1 = require("../menu/menuItem");
const overflowList_1 = require("../overflow-list/overflowList");
const popover_1 = require("../popover/popover");
const breadcrumb_1 = require("./breadcrumb");
class Breadcrumbs extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        collapseFrom: common_1.Boundary.START,
    };
    render() {
        const { className, collapseFrom, items, minVisibleItems, overflowListProps = {} } = this.props;
        return (React.createElement(overflowList_1.OverflowList, { collapseFrom: collapseFrom, minVisibleItems: minVisibleItems, tagName: "ul", ...overflowListProps, className: (0, classnames_1.default)(common_1.Classes.BREADCRUMBS, overflowListProps.className, className), items: items, overflowRenderer: this.renderOverflow, visibleItemRenderer: this.renderBreadcrumbWrapper }));
    }
    renderOverflow = (items) => {
        const { collapseFrom } = this.props;
        const position = collapseFrom === common_1.Boundary.END ? common_1.Position.BOTTOM_RIGHT : common_1.Position.BOTTOM_LEFT;
        let orderedItems = items;
        if (collapseFrom === common_1.Boundary.START) {
            orderedItems = items.slice().reverse();
        }
        return (React.createElement("li", null,
            React.createElement(popover_1.Popover, { position: position, disabled: orderedItems.length === 0, content: React.createElement(menu_1.Menu, null, orderedItems.map(this.renderOverflowBreadcrumb)), ...this.props.popoverProps },
                React.createElement("span", { className: common_1.Classes.BREADCRUMBS_COLLAPSED }))));
    };
    renderOverflowBreadcrumb = (props, index) => {
        const isClickable = props.href != null || props.onClick != null;
        const htmlProps = (0, common_1.removeNonHTMLProps)(props);
        return React.createElement(menuItem_1.MenuItem, { disabled: !isClickable, ...htmlProps, text: props.text, key: index });
    };
    renderBreadcrumbWrapper = (props, index) => {
        const isCurrent = this.props.items[this.props.items.length - 1] === props;
        return React.createElement("li", { key: index }, this.renderBreadcrumb(props, isCurrent));
    };
    renderBreadcrumb(props, isCurrent) {
        if (isCurrent && this.props.currentBreadcrumbRenderer != null) {
            return this.props.currentBreadcrumbRenderer(props);
        }
        else if (this.props.breadcrumbRenderer != null) {
            return this.props.breadcrumbRenderer(props);
        }
        else {
            return React.createElement(breadcrumb_1.Breadcrumb, { current: isCurrent, ...props });
        }
    }
}
exports.Breadcrumbs = Breadcrumbs;
//# sourceMappingURL=breadcrumbs.js.map