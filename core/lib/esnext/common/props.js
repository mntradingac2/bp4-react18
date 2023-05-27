"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNonHTMLProps = exports.DISPLAYNAME_PREFIX = void 0;
exports.DISPLAYNAME_PREFIX = "Blueprint4";
const INVALID_PROPS = [
    "active",
    "alignText",
    "asyncControl",
    "containerRef",
    "current",
    "elementRef",
    "fill",
    "icon",
    "inputClassName",
    "inputRef",
    "intent",
    "inline",
    "large",
    "loading",
    "leftElement",
    "leftIcon",
    "minimal",
    "onRemove",
    "outlined",
    "panel",
    "panelClassName",
    "popoverProps",
    "rightElement",
    "rightIcon",
    "round",
    "small",
    "tagName",
    "text",
];
function removeNonHTMLProps(props, invalidProps = INVALID_PROPS, shouldMerge = false) {
    if (shouldMerge) {
        invalidProps = invalidProps.concat(INVALID_PROPS);
    }
    return invalidProps.reduce((prev, curr) => {
        if (curr.indexOf("-") !== -1) {
            return prev;
        }
        if (prev.hasOwnProperty(curr)) {
            delete prev[curr];
        }
        return prev;
    }, { ...props });
}
exports.removeNonHTMLProps = removeNonHTMLProps;
//# sourceMappingURL=props.js.map