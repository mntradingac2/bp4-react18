"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOpen = exports.hide = exports.show = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const common_1 = require("../../common");
const popover_1 = require("../popover/popover");
const POPPER_MODIFIERS = {
    preventOverflow: { boundariesElement: "viewport" },
};
const TRANSITION_DURATION = 100;
class ContextMenu extends common_1.AbstractPureComponent2 {
    state = {
        isDarkTheme: false,
        isOpen: false,
    };
    render() {
        const content = React.createElement("div", { onContextMenu: this.cancelContextMenu }, this.state.menu);
        const popoverClassName = (0, classnames_1.default)({ [common_1.Classes.DARK]: this.state.isDarkTheme });
        const key = this.state.offset === undefined ? "" : `${this.state.offset.left}x${this.state.offset.top}`;
        return (React.createElement("div", { className: common_1.Classes.CONTEXT_MENU_POPOVER_TARGET, style: this.state.offset },
            React.createElement(popover_1.Popover, { ...this.props, backdropProps: { onContextMenu: this.handleBackdropContextMenu }, content: content, enforceFocus: false, key: key, hasBackdrop: true, isOpen: this.state.isOpen, minimal: true, modifiers: POPPER_MODIFIERS, onInteraction: this.handlePopoverInteraction, position: common_1.Position.RIGHT_TOP, popoverClassName: popoverClassName, target: React.createElement("div", null), transitionDuration: TRANSITION_DURATION })));
    }
    show(menu, offset, onClose, isDarkTheme = false) {
        this.setState({ isOpen: true, menu, offset, onClose, isDarkTheme });
    }
    hide() {
        this.state.onClose?.();
        this.setState({ isOpen: false, onClose: undefined });
    }
    cancelContextMenu = (e) => e.preventDefault();
    handleBackdropContextMenu = (e) => {
        e.persist();
        e.preventDefault();
        this.setTimeout(() => {
            const newTarget = document.elementFromPoint(e.clientX, e.clientY);
            const { view, ...newEventInit } = e;
            newTarget?.dispatchEvent(new MouseEvent("contextmenu", newEventInit));
        }, TRANSITION_DURATION);
    };
    handlePopoverInteraction = (nextOpenState) => {
        if (!nextOpenState) {
            this.requestAnimationFrame(() => this.hide());
        }
    };
}
let contextMenuElement;
let contextMenu;
function show(menu, offset, onClose, isDarkTheme) {
    if (contextMenuElement === undefined) {
        contextMenuElement = document.createElement("div");
        contextMenuElement.classList.add(common_1.Classes.CONTEXT_MENU);
        document.body.appendChild(contextMenuElement);
        contextMenu = ReactDOM.render(React.createElement(ContextMenu, { onClosed: remove }), contextMenuElement);
    }
    contextMenu.show(menu, offset, onClose, isDarkTheme);
}
exports.show = show;
function hide() {
    contextMenu?.hide();
}
exports.hide = hide;
function isOpen() {
    return contextMenu != null && contextMenu.state.isOpen;
}
exports.isOpen = isOpen;
function remove() {
    if (contextMenuElement != null) {
        ReactDOM.unmountComponentAtNode(contextMenuElement);
        contextMenuElement.remove();
        contextMenuElement = undefined;
        contextMenu = undefined;
    }
}
//# sourceMappingURL=contextMenu.js.map