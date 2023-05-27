"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsibleList = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const boundary_1 = require("../../common/boundary");
const Classes = tslib_1.__importStar(require("../../common/classes"));
const Errors = tslib_1.__importStar(require("../../common/errors"));
const position_1 = require("../../common/position");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const menu_1 = require("../menu/menu");
const menuItem_1 = require("../menu/menuItem");
const popover_1 = require("../popover/popover");
class CollapsibleList extends React.Component {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.CollapsibleList`;
    static defaultProps = {
        collapseFrom: boundary_1.Boundary.START,
        visibleItemCount: 3,
    };
    render() {
        const { collapseFrom } = this.props;
        const childrenLength = React.Children.count(this.props.children);
        const [visibleChildren, collapsedChildren] = this.partitionChildren();
        const visibleItems = visibleChildren.map((child, index) => {
            const absoluteIndex = collapseFrom === boundary_1.Boundary.START ? childrenLength - 1 - index : index;
            return (React.createElement("li", { className: this.props.visibleItemClassName, key: absoluteIndex }, this.props.visibleItemRenderer(child.props, absoluteIndex)));
        });
        if (collapseFrom === boundary_1.Boundary.START) {
            visibleItems.reverse();
        }
        let collapsedPopover;
        if (collapsedChildren.length > 0) {
            const position = collapseFrom === boundary_1.Boundary.END ? position_1.Position.BOTTOM_RIGHT : position_1.Position.BOTTOM_LEFT;
            collapsedPopover = (React.createElement("li", { className: this.props.visibleItemClassName },
                React.createElement(popover_1.Popover, { content: React.createElement(menu_1.Menu, null, collapsedChildren), position: position, ...this.props.dropdownProps }, this.props.dropdownTarget)));
        }
        return (React.createElement("ul", { className: (0, classnames_1.default)(Classes.COLLAPSIBLE_LIST, this.props.className) },
            collapseFrom === boundary_1.Boundary.START ? collapsedPopover : null,
            visibleItems,
            collapseFrom === boundary_1.Boundary.END ? collapsedPopover : null));
    }
    partitionChildren() {
        const childrenArray = React.Children.map(this.props.children, (child, index) => {
            if (!(0, utils_1.isElementOfType)(child, menuItem_1.MenuItem)) {
                throw new Error(Errors.COLLAPSIBLE_LIST_INVALID_CHILD);
            }
            return React.cloneElement(child, { key: `visible-${index}` });
        });
        if (childrenArray == null) {
            return [[], []];
        }
        if (this.props.collapseFrom === boundary_1.Boundary.START) {
            childrenArray.reverse();
        }
        const { visibleItemCount } = this.props;
        return [childrenArray.slice(0, visibleItemCount), childrenArray.slice(visibleItemCount)];
    }
}
exports.CollapsibleList = CollapsibleList;
//# sourceMappingURL=collapsibleList.js.map