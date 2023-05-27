"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const Classes = tslib_1.__importStar(require("../../common/classes"));
const props_1 = require("../../common/props");
const collapse_1 = require("../collapse/collapse");
const icon_1 = require("../icon/icon");
class TreeNode extends React.Component {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.TreeNode`;
    static ofType() {
        return TreeNode;
    }
    render() {
        const { children, className, disabled, icon, isExpanded, isSelected, label } = this.props;
        const classes = (0, classnames_1.default)(Classes.TREE_NODE, {
            [Classes.DISABLED]: disabled,
            [Classes.TREE_NODE_SELECTED]: isSelected,
            [Classes.TREE_NODE_EXPANDED]: isExpanded,
        }, className);
        const contentClasses = (0, classnames_1.default)(Classes.TREE_NODE_CONTENT, `${Classes.TREE_NODE_CONTENT}-${this.props.depth}`);
        const eventHandlers = disabled === true
            ? {}
            : {
                onClick: this.handleClick,
                onContextMenu: this.handleContextMenu,
                onDoubleClick: this.handleDoubleClick,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
            };
        return (React.createElement("li", { className: classes },
            React.createElement("div", { className: contentClasses, ref: this.handleContentRef, ...eventHandlers },
                this.maybeRenderCaret(),
                React.createElement(icon_1.Icon, { className: Classes.TREE_NODE_ICON, icon: icon, "aria-hidden": true, tabIndex: -1 }),
                React.createElement("span", { className: Classes.TREE_NODE_LABEL }, label),
                this.maybeRenderSecondaryLabel()),
            React.createElement(collapse_1.Collapse, { isOpen: isExpanded }, children)));
    }
    maybeRenderCaret() {
        const { children, isExpanded, disabled, hasCaret = React.Children.count(children) > 0 } = this.props;
        if (hasCaret) {
            const caretClasses = (0, classnames_1.default)(Classes.TREE_NODE_CARET, isExpanded ? Classes.TREE_NODE_CARET_OPEN : Classes.TREE_NODE_CARET_CLOSED);
            const onClick = disabled === true ? undefined : this.handleCaretClick;
            return (React.createElement(icon_1.Icon, { title: isExpanded ? "Collapse group" : "Expand group", className: caretClasses, onClick: onClick, icon: "chevron-right" }));
        }
        return React.createElement("span", { className: Classes.TREE_NODE_CARET_NONE });
    }
    maybeRenderSecondaryLabel() {
        if (this.props.secondaryLabel != null) {
            return React.createElement("span", { className: Classes.TREE_NODE_SECONDARY_LABEL }, this.props.secondaryLabel);
        }
        else {
            return undefined;
        }
    }
    handleCaretClick = (e) => {
        e.stopPropagation();
        const { isExpanded, onCollapse, onExpand } = this.props;
        (isExpanded ? onCollapse : onExpand)?.(this, e);
    };
    handleClick = (e) => {
        this.props.onClick?.(this, e);
    };
    handleContentRef = (element) => {
        this.props.contentRef?.(this, element);
    };
    handleContextMenu = (e) => {
        this.props.onContextMenu?.(this, e);
    };
    handleDoubleClick = (e) => {
        this.props.onDoubleClick?.(this, e);
    };
    handleMouseEnter = (e) => {
        this.props.onMouseEnter?.(this, e);
    };
    handleMouseLeave = (e) => {
        this.props.onMouseLeave?.(this, e);
    };
}
exports.TreeNode = TreeNode;
//# sourceMappingURL=treeNode.js.map