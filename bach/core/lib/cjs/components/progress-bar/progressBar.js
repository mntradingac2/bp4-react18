"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
class ProgressBar extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.ProgressBar`;
    render() {
        const { animate = true, className, intent, stripes = true, value } = this.props;
        const classes = (0, classnames_1.default)(common_1.Classes.PROGRESS_BAR, common_1.Classes.intentClass(intent), { [common_1.Classes.PROGRESS_NO_ANIMATION]: !animate, [common_1.Classes.PROGRESS_NO_STRIPES]: !stripes }, className);
        const percent = value == null ? undefined : 100 * (0, utils_1.clamp)(value, 0, 1);
        const width = percent == null ? undefined : percent + "%";
        return (React.createElement("div", { "aria-valuemax": 100, "aria-valuemin": 0, "aria-valuenow": percent == null ? undefined : Math.round(percent), className: classes, role: "progressbar" },
            React.createElement("div", { className: common_1.Classes.PROGRESS_METER, style: { width } })));
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progressBar.js.map