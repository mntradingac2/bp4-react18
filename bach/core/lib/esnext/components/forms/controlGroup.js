"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlGroup = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class ControlGroup extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.ControlGroup`;
    render() {
        const { children, className, elementRef, fill, vertical, ...htmlProps } = this.props;
        const rootClasses = (0, classnames_1.default)(common_1.Classes.CONTROL_GROUP, {
            [common_1.Classes.FILL]: fill,
            [common_1.Classes.VERTICAL]: vertical,
        }, className);
        return (React.createElement("div", { ...htmlProps, className: rootClasses, ref: elementRef }, children));
    }
}
exports.ControlGroup = ControlGroup;
//# sourceMappingURL=controlGroup.js.map