"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const Classes = tslib_1.__importStar(require("../../common/classes"));
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const treeNode_1 = require("./treeNode");
class Tree extends React.Component {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Tree`;
    static ofType() {
        return Tree;
    }
    static nodeFromPath(path, treeNodes) {
        if (path.length === 1) {
            return treeNodes[path[0]];
        }
        else {
            return Tree.nodeFromPath(path.slice(1), treeNodes[path[0]].childNodes);
        }
    }
    nodeRefs = {};
    render() {
        return (React.createElement("div", { className: (0, classnames_1.default)(Classes.TREE, this.props.className) }, this.renderNodes(this.props.contents, [], Classes.TREE_ROOT)));
    }
    getNodeContentElement(nodeId) {
        return this.nodeRefs[nodeId];
    }
    renderNodes(treeNodes, currentPath, className) {
        if (treeNodes == null) {
            return null;
        }
        const nodeItems = treeNodes.map((node, i) => {
            const elementPath = currentPath.concat(i);
            return (React.createElement(treeNode_1.TreeNode, { ...node, key: node.id, contentRef: this.handleContentRef, depth: elementPath.length - 1, onClick: this.handleNodeClick, onContextMenu: this.handleNodeContextMenu, onCollapse: this.handleNodeCollapse, onDoubleClick: this.handleNodeDoubleClick, onExpand: this.handleNodeExpand, onMouseEnter: this.handleNodeMouseEnter, onMouseLeave: this.handleNodeMouseLeave, path: elementPath }, this.renderNodes(node.childNodes, elementPath)));
        });
        return React.createElement("ul", { className: (0, classnames_1.default)(Classes.TREE_NODE_LIST, className) }, nodeItems);
    }
    handleNodeCollapse = (node, e) => {
        this.handlerHelper(this.props.onNodeCollapse, node, e);
    };
    handleNodeClick = (node, e) => {
        this.handlerHelper(this.props.onNodeClick, node, e);
    };
    handleContentRef = (node, element) => {
        if (element != null) {
            this.nodeRefs[node.props.id] = element;
        }
        else {
            delete this.nodeRefs[node.props.id];
        }
    };
    handleNodeContextMenu = (node, e) => {
        this.handlerHelper(this.props.onNodeContextMenu, node, e);
    };
    handleNodeDoubleClick = (node, e) => {
        this.handlerHelper(this.props.onNodeDoubleClick, node, e);
    };
    handleNodeExpand = (node, e) => {
        this.handlerHelper(this.props.onNodeExpand, node, e);
    };
    handleNodeMouseEnter = (node, e) => {
        this.handlerHelper(this.props.onNodeMouseEnter, node, e);
    };
    handleNodeMouseLeave = (node, e) => {
        this.handlerHelper(this.props.onNodeMouseLeave, node, e);
    };
    handlerHelper(handlerFromProps, node, e) {
        if ((0, utils_1.isFunction)(handlerFromProps)) {
            const nodeData = Tree.nodeFromPath(node.props.path, this.props.contents);
            handlerFromProps(nodeData, node.props.path, e);
        }
    }
}
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map