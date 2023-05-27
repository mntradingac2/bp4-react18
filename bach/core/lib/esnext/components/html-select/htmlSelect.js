"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLSelect = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const classes_1 = require("../../common/classes");
const icon_1 = require("../icon/icon");
class HTMLSelect extends common_1.AbstractPureComponent2 {
    render() {
        const { className, disabled, elementRef, fill, iconName = "double-caret-vertical", iconProps, large, minimal, options = [], ...htmlProps } = this.props;
        const classes = (0, classnames_1.default)(classes_1.HTML_SELECT, {
            [classes_1.DISABLED]: disabled,
            [classes_1.FILL]: fill,
            [classes_1.LARGE]: large,
            [classes_1.MINIMAL]: minimal,
        }, className);
        const optionChildren = options.map(option => {
            const props = typeof option === "object" ? option : { value: option };
            return React.createElement("option", { ...props, key: props.value, children: props.label || props.value });
        });
        return (React.createElement("div", { className: classes },
            React.createElement("select", { disabled: disabled, ref: elementRef, value: this.props.value, ...htmlProps, multiple: false },
                optionChildren,
                htmlProps.children),
            React.createElement(icon_1.Icon, { icon: iconName, title: "Open dropdown", ...iconProps })));
    }
}
exports.HTMLSelect = HTMLSelect;
//# sourceMappingURL=htmlSelect.js.map