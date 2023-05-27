"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroup = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class FormGroup extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.FormGroup`;
    render() {
        const { children, contentClassName, helperText, label, labelFor, labelInfo, style, subLabel } = this.props;
        return (React.createElement("div", { className: this.getClassName(), style: style },
            label && (React.createElement("label", { className: common_1.Classes.LABEL, htmlFor: labelFor },
                label,
                " ",
                React.createElement("span", { className: common_1.Classes.TEXT_MUTED }, labelInfo))),
            subLabel && React.createElement("div", { className: common_1.Classes.FORM_GROUP_SUB_LABEL }, subLabel),
            React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.FORM_CONTENT, contentClassName) },
                children,
                helperText && React.createElement("div", { className: common_1.Classes.FORM_HELPER_TEXT }, helperText))));
    }
    getClassName() {
        const { className, disabled, inline, intent } = this.props;
        return (0, classnames_1.default)(common_1.Classes.FORM_GROUP, common_1.Classes.intentClass(intent), {
            [common_1.Classes.DISABLED]: disabled,
            [common_1.Classes.INLINE]: inline,
        }, className);
    }
}
exports.FormGroup = FormGroup;
//# sourceMappingURL=formGroup.js.map