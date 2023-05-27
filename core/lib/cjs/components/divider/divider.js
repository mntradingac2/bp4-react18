"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const classes_1 = require("../../common/classes");
const props_1 = require("../../common/props");
class Divider extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Divider`;
    render() {
        const { className, tagName = "div", ...htmlProps } = this.props;
        const classes = (0, classnames_1.default)(classes_1.DIVIDER, className);
        return React.createElement(tagName, {
            ...htmlProps,
            className: classes,
        });
    }
}
exports.Divider = Divider;
//# sourceMappingURL=divider.js.map