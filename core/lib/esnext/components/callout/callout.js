"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callout = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const html_1 = require("../html/html");
const icon_1 = require("../icon/icon");
class Callout extends common_1.AbstractPureComponent2 {
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.Callout`;
    render() {
        const { className, children, icon, intent, title, ...htmlProps } = this.props;
        const iconName = this.getIconName(icon, intent);
        const classes = (0, classnames_1.default)(common_1.Classes.CALLOUT, common_1.Classes.intentClass(intent), { [common_1.Classes.CALLOUT_ICON]: iconName != null }, className);
        return (React.createElement("div", { className: classes, ...htmlProps },
            iconName && React.createElement(icon_1.Icon, { icon: iconName, "aria-hidden": true, tabIndex: -1 }),
            title && React.createElement(html_1.H5, null, title),
            children));
    }
    getIconName(icon, intent) {
        if (icon === null) {
            return undefined;
        }
        if (icon !== undefined) {
            return icon;
        }
        switch (intent) {
            case common_1.Intent.DANGER:
                return "error";
            case common_1.Intent.PRIMARY:
                return "info-sign";
            case common_1.Intent.WARNING:
                return "warning-sign";
            case common_1.Intent.SUCCESS:
                return "tick";
            default:
                return undefined;
        }
    }
}
exports.Callout = Callout;
//# sourceMappingURL=callout.js.map