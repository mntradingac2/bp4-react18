"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogStep = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class DialogStep extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.DialogStep`;
    render() {
        const { className } = this.props;
        return (React.createElement("div", { className: common_1.Classes.DIALOG_STEP_CONTAINER, role: "tab" },
            React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.DIALOG_STEP, className) })));
    }
}
exports.DialogStep = DialogStep;
//# sourceMappingURL=dialogStep.js.map