"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const buttonGroup_1 = require("../button/buttonGroup");
const buttons_1 = require("../button/buttons");
const icon_1 = require("../icon/icon");
class Toast extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        className: "",
        isCloseButtonShown: true,
        message: "",
        timeout: 5000,
    };
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Toast`;
    render() {
        const { className, icon, intent, message, isCloseButtonShown } = this.props;
        return (React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.TOAST, common_1.Classes.intentClass(intent), className), onBlur: this.startTimeout, onFocus: this.clearTimeouts, onMouseEnter: this.clearTimeouts, onMouseLeave: this.startTimeout, tabIndex: 0 },
            React.createElement(icon_1.Icon, { icon: icon }),
            React.createElement("span", { className: common_1.Classes.TOAST_MESSAGE, role: "alert" }, message),
            React.createElement(buttonGroup_1.ButtonGroup, { minimal: true },
                this.maybeRenderActionButton(),
                isCloseButtonShown && React.createElement(buttons_1.Button, { "aria-label": "Close", icon: "cross", onClick: this.handleCloseClick }))));
    }
    componentDidMount() {
        this.startTimeout();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.timeout !== this.props.timeout) {
            if (this.props.timeout > 0) {
                this.startTimeout();
            }
            else {
                this.clearTimeouts();
            }
        }
    }
    componentWillUnmount() {
        this.clearTimeouts();
    }
    maybeRenderActionButton() {
        const { action } = this.props;
        if (action == null) {
            return undefined;
        }
        else {
            return React.createElement(buttons_1.AnchorButton, { ...action, intent: undefined, onClick: this.handleActionClick });
        }
    }
    handleActionClick = (e) => {
        this.props.action?.onClick?.(e);
        this.triggerDismiss(false);
    };
    handleCloseClick = () => this.triggerDismiss(false);
    triggerDismiss(didTimeoutExpire) {
        this.clearTimeouts();
        this.props.onDismiss?.(didTimeoutExpire);
    }
    startTimeout = () => {
        this.clearTimeouts();
        if (this.props.timeout > 0) {
            this.setTimeout(() => this.triggerDismiss(true), this.props.timeout);
        }
    };
}
exports.Toast = Toast;
//# sourceMappingURL=toast.js.map