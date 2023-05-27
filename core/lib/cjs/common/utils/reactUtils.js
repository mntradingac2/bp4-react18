"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isElementOfType = exports.getDisplayName = exports.ensureElement = exports.isReactChildrenElementOrElements = exports.isReactNodeEmpty = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function isReactNodeEmpty(node, skipArray = false) {
    return (node == null ||
        node === "" ||
        node === false ||
        (!skipArray &&
            Array.isArray(node) &&
            (node.length === 0 || node.every(n => isReactNodeEmpty(n, true)))));
}
exports.isReactNodeEmpty = isReactNodeEmpty;
function isReactChildrenElementOrElements(children) {
    return !isReactNodeEmpty(children, true) && children !== true;
}
exports.isReactChildrenElementOrElements = isReactChildrenElementOrElements;
function ensureElement(child, tagName = "span") {
    if (child == null || typeof child === "boolean") {
        return undefined;
    }
    else if (typeof child === "string") {
        return child.trim().length > 0 ? React.createElement(tagName, {}, child) : undefined;
    }
    else if (typeof child === "number" || typeof child.type === "symbol" || Array.isArray(child)) {
        return React.createElement(tagName, {}, child);
    }
    else if (isReactElement(child)) {
        return child;
    }
    else {
        return undefined;
    }
}
exports.ensureElement = ensureElement;
function isReactElement(child) {
    return (typeof child === "object" &&
        typeof child.type !== "undefined" &&
        typeof child.props !== "undefined");
}
function getDisplayName(ComponentClass) {
    return ComponentClass.displayName || ComponentClass.name || "Unknown";
}
exports.getDisplayName = getDisplayName;
function isElementOfType(element, ComponentType) {
    return (element != null &&
        element.type != null &&
        element.type.displayName != null &&
        element.type.displayName === ComponentType.displayName);
}
exports.isElementOfType = isElementOfType;
//# sourceMappingURL=reactUtils.js.map