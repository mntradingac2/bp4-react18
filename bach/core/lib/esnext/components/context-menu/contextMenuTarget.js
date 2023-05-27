"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuTarget = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const errors_1 = require("../../common/errors");
const utils_1 = require("../../common/utils");
const isDarkTheme_1 = require("../../common/utils/isDarkTheme");
const ContextMenu = tslib_1.__importStar(require("./contextMenu"));
function ContextMenuTarget(WrappedComponent) {
    if (!(0, utils_1.isFunction)(WrappedComponent.prototype.renderContextMenu)) {
        console.warn(errors_1.CONTEXTMENU_WARN_DECORATOR_NO_METHOD);
    }
    return class ContextMenuTargetClass extends WrappedComponent {
        static displayName = `ContextMenuTarget(${(0, utils_1.getDisplayName)(WrappedComponent)})`;
        render() {
            const element = super.render();
            if (element == null) {
                return element;
            }
            if (!React.isValidElement(element)) {
                console.warn(errors_1.CONTEXTMENU_WARN_DECORATOR_NEEDS_REACT_ELEMENT);
                return element;
            }
            const oldOnContextMenu = element.props.onContextMenu;
            const onContextMenu = (e) => {
                if (e.defaultPrevented) {
                    return;
                }
                if ((0, utils_1.isFunction)(this.renderContextMenu)) {
                    const menu = this.renderContextMenu(e);
                    if (menu != null) {
                        const darkTheme = (0, isDarkTheme_1.isDarkTheme)(ReactDOM.findDOMNode(this));
                        e.preventDefault();
                        ContextMenu.show(menu, { left: e.clientX, top: e.clientY }, this.onContextMenuClose, darkTheme);
                    }
                }
                oldOnContextMenu?.(e);
            };
            return React.cloneElement(element, { onContextMenu });
        }
    };
}
exports.ContextMenuTarget = ContextMenuTarget;
//# sourceMappingURL=contextMenuTarget.js.map