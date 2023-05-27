"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const icon_1 = require("../icon/icon");
const popover_1 = require("../popover/popover");
const text_1 = require("../text/text");
const menu_1 = require("./menu");
class MenuItem extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        active: false,
        disabled: false,
        multiline: false,
        popoverProps: {},
        selected: false,
        shouldDismissPopover: true,
        text: "",
    };
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.MenuItem`;
    render() {
        const { active, className, children, disabled, elementRef, icon, intent, labelClassName, labelElement, multiline, popoverProps, roleStructure = "menuitem", selected, shouldDismissPopover, submenuProps, text, textClassName, tagName = "a", htmlTitle, ...htmlProps } = this.props;
        const hasIcon = icon != null;
        const hasSubmenu = children != null;
        const intentClass = common_1.Classes.intentClass(intent);
        const anchorClasses = (0, classnames_1.default)(common_1.Classes.MENU_ITEM, intentClass, {
            [common_1.Classes.ACTIVE]: active,
            [common_1.Classes.DISABLED]: disabled,
            [common_1.Classes.POPOVER_DISMISS]: shouldDismissPopover && !disabled && !hasSubmenu,
            [common_1.Classes.SELECTED]: selected || (active && intentClass === undefined),
        }, className);
        const [liRole, targetRole, ariaSelected] = roleStructure === "listoption"
            ? ["option", undefined, active || selected]
            : roleStructure === "menuitem"
                ? ["none", "menuitem", undefined]
                : roleStructure === "none"
                    ? ["none", undefined, undefined]
                    : [undefined, undefined, undefined];
        const target = React.createElement(tagName, {
            onKeyDown: (0, utils_1.clickElementOnKeyPress)(["Enter", " "]),
            role: hasSubmenu ? "none" : targetRole,
            tabIndex: hasSubmenu ? -1 : 0,
            ...htmlProps,
            ...(disabled ? DISABLED_PROPS : {}),
            className: anchorClasses,
        }, hasIcon ? (React.createElement("span", { className: common_1.Classes.MENU_ITEM_ICON },
            React.createElement(icon_1.Icon, { icon: icon, "aria-hidden": true, tabIndex: -1 }))) : undefined, React.createElement(text_1.Text, { className: (0, classnames_1.default)(common_1.Classes.FILL, textClassName), ellipsize: !multiline, title: htmlTitle }, text), this.maybeRenderLabel(labelElement), hasSubmenu ? React.createElement(icon_1.Icon, { className: common_1.Classes.MENU_SUBMENU_ICON, icon: "caret-right" }) : undefined);
        const liClasses = (0, classnames_1.default)({ [common_1.Classes.MENU_SUBMENU]: hasSubmenu });
        return (React.createElement("li", { className: liClasses, ref: elementRef, role: liRole, "aria-selected": ariaSelected }, this.maybeRenderPopover(target, { role: targetRole, tabIndex: 0 }, children)));
    }
    maybeRenderLabel(labelElement) {
        const { label, labelClassName } = this.props;
        if (label == null && labelElement == null) {
            return null;
        }
        return (React.createElement("span", { className: (0, classnames_1.default)(common_1.Classes.MENU_ITEM_LABEL, labelClassName) },
            label,
            labelElement));
    }
    maybeRenderPopover(target, popoverTargetProps, children) {
        if (children == null) {
            return target;
        }
        const { disabled, popoverProps, submenuProps } = this.props;
        return (React.createElement(popover_1.Popover, { autoFocus: false, captureDismiss: false, disabled: disabled, enforceFocus: false, hoverCloseDelay: 0, interactionKind: popover_1.PopoverInteractionKind.HOVER, modifiers: SUBMENU_POPOVER_MODIFIERS, targetProps: popoverTargetProps, position: common_1.Position.RIGHT_TOP, usePortal: false, ...popoverProps, content: React.createElement(menu_1.Menu, { ...submenuProps }, children), minimal: true, popoverClassName: (0, classnames_1.default)(common_1.Classes.MENU_SUBMENU, popoverProps?.popoverClassName), target: target }));
    }
}
exports.MenuItem = MenuItem;
const SUBMENU_POPOVER_MODIFIERS = {
    flip: { boundariesElement: "viewport", padding: 20 },
    offset: { offset: -5 },
    preventOverflow: { boundariesElement: "viewport", padding: 20 },
};
const DISABLED_PROPS = {
    href: undefined,
    onClick: undefined,
    onMouseDown: undefined,
    onMouseEnter: undefined,
    onMouseLeave: undefined,
    tabIndex: -1,
};
//# sourceMappingURL=menuItem.js.map