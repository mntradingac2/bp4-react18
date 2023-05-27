"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroup = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class ButtonGroup extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.ButtonGroup`;
    render() {
        const { alignText, className, elementRef, fill, minimal, large, vertical, ...htmlProps } = this.props;
        const buttonGroupClasses = (0, classnames_1.default)(common_1.Classes.BUTTON_GROUP, {
            [common_1.Classes.FILL]: fill,
            [common_1.Classes.LARGE]: large,
            [common_1.Classes.MINIMAL]: minimal,
            [common_1.Classes.VERTICAL]: vertical,
        }, common_1.Classes.alignmentClass(alignText), className);
        return (React.createElement("div", { ...htmlProps, className: buttonGroupClasses, ref: elementRef }, this.props.children));
    }
}
exports.ButtonGroup = ButtonGroup;
//# sourceMappingURL=buttonGroup.js.map