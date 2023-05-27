"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarDivider = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class NavbarDivider extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.NavbarDivider`;
    render() {
        const { className, ...htmlProps } = this.props;
        return React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.NAVBAR_DIVIDER, className), ...htmlProps });
    }
}
exports.NavbarDivider = NavbarDivider;
//# sourceMappingURL=navbarDivider.js.map