"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class Menu extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Menu`;
    render() {
        const { className, children, large, ulRef, ...htmlProps } = this.props;
        const classes = (0, classnames_1.default)(common_1.Classes.MENU, { [common_1.Classes.LARGE]: large }, className);
        return (React.createElement("ul", { role: "menu", ...htmlProps, className: classes, ref: ulRef }, children));
    }
}
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map