"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuDivider = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const Classes = tslib_1.__importStar(require("../../common/classes"));
const props_1 = require("../../common/props");
const html_1 = require("../html/html");
class MenuDivider extends React.Component {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.MenuDivider`;
    render() {
        const { className, title, titleId } = this.props;
        if (title == null) {
            return React.createElement("li", { className: (0, classnames_1.default)(Classes.MENU_DIVIDER, className), role: "separator" });
        }
        else {
            return (React.createElement("li", { className: (0, classnames_1.default)(Classes.MENU_HEADER, className), role: "separator", tabIndex: -1 },
                React.createElement(html_1.H6, { id: titleId }, title)));
        }
    }
}
exports.MenuDivider = MenuDivider;
//# sourceMappingURL=menuDivider.js.map