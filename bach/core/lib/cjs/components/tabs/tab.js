"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class Tab extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        disabled: false,
    };
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Tab`;
    render() {
        const { className, panel } = this.props;
        return (React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.TAB_PANEL, className), role: "tablist" }, panel));
    }
}
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map