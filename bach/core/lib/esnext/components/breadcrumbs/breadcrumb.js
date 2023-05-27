"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breadcrumb = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const Classes = tslib_1.__importStar(require("../../common/classes"));
const icon_1 = require("../icon/icon");
const Breadcrumb = props => {
    const classes = (0, classnames_1.default)(Classes.BREADCRUMB, {
        [Classes.BREADCRUMB_CURRENT]: props.current,
        [Classes.DISABLED]: props.disabled,
    }, props.className);
    const icon = props.icon != null ? React.createElement(icon_1.Icon, { title: props.iconTitle, icon: props.icon }) : undefined;
    if (props.href == null && props.onClick == null) {
        return (React.createElement("span", { className: classes },
            icon,
            props.text,
            props.children));
    }
    return (React.createElement("a", { className: classes, href: props.href, onClick: props.disabled ? undefined : props.onClick, onFocus: props.disabled ? undefined : props.onFocus, tabIndex: props.disabled ? undefined : 0, target: props.target },
        icon,
        props.text,
        props.children));
};
exports.Breadcrumb = Breadcrumb;
//# sourceMappingURL=breadcrumb.js.map