"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogBody = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
class DialogBody extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        useOverflowScrollContainer: true,
    };
    render() {
        return (React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.DIALOG_BODY, this.props.className, {
                [common_1.Classes.DIALOG_BODY_SCROLL_CONTAINER]: this.props.useOverflowScrollContainer,
            }) }, this.props.children));
    }
}
exports.DialogBody = DialogBody;
//# sourceMappingURL=dialogBody.js.map