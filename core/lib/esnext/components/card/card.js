"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class Card extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Card`;
    static defaultProps = {
        elevation: common_1.Elevation.ZERO,
        interactive: false,
    };
    render() {
        const { className, elevation, interactive, ...htmlProps } = this.props;
        const classes = (0, classnames_1.default)(common_1.Classes.CARD, { [common_1.Classes.INTERACTIVE]: interactive }, common_1.Classes.elevationClass(elevation), className);
        return React.createElement("div", { className: classes, ...htmlProps });
    }
}
exports.Card = Card;
//# sourceMappingURL=card.js.map