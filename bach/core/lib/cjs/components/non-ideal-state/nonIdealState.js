"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonIdealState = exports.NonIdealStateIconSize = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const Classes = tslib_1.__importStar(require("../../common/classes"));
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const html_1 = require("../html/html");
const icon_1 = require("../icon/icon");
var NonIdealStateIconSize;
(function (NonIdealStateIconSize) {
    NonIdealStateIconSize[NonIdealStateIconSize["STANDARD"] = 48] = "STANDARD";
    NonIdealStateIconSize[NonIdealStateIconSize["SMALL"] = 32] = "SMALL";
    NonIdealStateIconSize[NonIdealStateIconSize["EXTRA_SMALL"] = 20] = "EXTRA_SMALL";
})(NonIdealStateIconSize = exports.NonIdealStateIconSize || (exports.NonIdealStateIconSize = {}));
class NonIdealState extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.NonIdealState`;
    static defaultProps = {
        iconSize: NonIdealStateIconSize.STANDARD,
        layout: "vertical",
    };
    render() {
        const { action, children, className, layout } = this.props;
        return (React.createElement("div", { className: (0, classnames_1.default)(Classes.NON_IDEAL_STATE, `${Classes.NON_IDEAL_STATE}-${layout}`, className) },
            this.maybeRenderVisual(),
            this.maybeRenderText(),
            action,
            children));
    }
    maybeRenderVisual() {
        const { icon, iconSize } = this.props;
        if (icon == null) {
            return undefined;
        }
        else {
            return (React.createElement("div", { className: Classes.NON_IDEAL_STATE_VISUAL, style: { fontSize: `${iconSize}px`, lineHeight: `${iconSize}px` } },
                React.createElement(icon_1.Icon, { icon: icon, size: iconSize, "aria-hidden": true, tabIndex: -1 })));
        }
    }
    maybeRenderText() {
        const { description, title } = this.props;
        if (title == null && description == null) {
            return undefined;
        }
        else {
            return (React.createElement("div", { className: Classes.NON_IDEAL_STATE_TEXT },
                title && React.createElement(html_1.H4, null, title),
                description && (0, utils_1.ensureElement)(description, "div")));
        }
    }
}
exports.NonIdealState = NonIdealState;
//# sourceMappingURL=nonIdealState.js.map