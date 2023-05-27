"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogFooter = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
class DialogFooter extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        minimal: false,
    };
    render() {
        return (React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.DIALOG_FOOTER, this.props.className, {
                [common_1.Classes.DIALOG_FOOTER_FIXED]: !this.props.minimal,
            }) },
            this.renderMainSection(),
            this.maybeRenderActionsSection()));
    }
    renderMainSection() {
        return React.createElement("div", { className: common_1.Classes.DIALOG_FOOTER_MAIN_SECTION }, this.props.children);
    }
    maybeRenderActionsSection() {
        const { actions } = this.props;
        if (actions == null) {
            return undefined;
        }
        return React.createElement("div", { className: common_1.Classes.DIALOG_FOOTER_ACTIONS }, actions);
    }
}
exports.DialogFooter = DialogFooter;
//# sourceMappingURL=dialogFooter.js.map