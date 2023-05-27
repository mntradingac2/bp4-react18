"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const navbarDivider_1 = require("./navbarDivider");
const navbarGroup_1 = require("./navbarGroup");
const navbarHeading_1 = require("./navbarHeading");
class Navbar extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Navbar`;
    static Divider = navbarDivider_1.NavbarDivider;
    static Group = navbarGroup_1.NavbarGroup;
    static Heading = navbarHeading_1.NavbarHeading;
    render() {
        const { children, className, fixedToTop, ...htmlProps } = this.props;
        const classes = (0, classnames_1.default)(common_1.Classes.NAVBAR, { [common_1.Classes.FIXED_TOP]: fixedToTop }, className);
        return (React.createElement("div", { className: classes, ...htmlProps }, children));
    }
}
exports.Navbar = Navbar;
//# sourceMappingURL=navbar.js.map