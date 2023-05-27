"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarGroup = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class NavbarGroup extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.NavbarGroup`;
    static defaultProps = {
        align: common_1.Alignment.LEFT,
    };
    render() {
        const { align, children, className, ...htmlProps } = this.props;
        const classes = (0, classnames_1.default)(common_1.Classes.NAVBAR_GROUP, common_1.Classes.alignmentClass(align), className);
        return (React.createElement("div", { className: classes, ...htmlProps }, children));
    }
}
exports.NavbarGroup = NavbarGroup;
//# sourceMappingURL=navbarGroup.js.map