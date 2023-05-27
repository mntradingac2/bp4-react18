"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const errors_1 = require("../../common/errors");
const buttons_1 = require("../button/buttons");
const dialog_1 = require("../dialog/dialog");
const icon_1 = require("../icon/icon");
class Alert extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        canEscapeKeyCancel: false,
        canOutsideClickCancel: false,
        confirmButtonText: "OK",
        isOpen: false,
        loading: false,
    };
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.Alert`;
    render() {
        const { canEscapeKeyCancel, canOutsideClickCancel, children, className, icon, intent, loading, cancelButtonText, confirmButtonText, onClose, ...overlayProps } = this.props;
        return (React.createElement(dialog_1.Dialog, { ...overlayProps, className: (0, classnames_1.default)(common_1.Classes.ALERT, className), canEscapeKeyClose: canEscapeKeyCancel, canOutsideClickClose: canOutsideClickCancel, onClose: this.handleCancel, portalContainer: this.props.portalContainer },
            React.createElement("div", { className: common_1.Classes.ALERT_BODY },
                React.createElement(icon_1.Icon, { icon: icon, size: 40, intent: intent }),
                React.createElement("div", { className: common_1.Classes.ALERT_CONTENTS }, children)),
            React.createElement("div", { className: common_1.Classes.ALERT_FOOTER },
                React.createElement(buttons_1.Button, { loading: loading, intent: intent, text: confirmButtonText, onClick: this.handleConfirm }),
                cancelButtonText && (React.createElement(buttons_1.Button, { text: cancelButtonText, disabled: loading, onClick: this.handleCancel })))));
    }
    validateProps(props) {
        if (props.onClose == null && (props.cancelButtonText == null) !== (props.onCancel == null)) {
            console.warn(errors_1.ALERT_WARN_CANCEL_PROPS);
        }
        const hasCancelHandler = props.onCancel != null || props.onClose != null;
        if (props.canEscapeKeyCancel && !hasCancelHandler) {
            console.warn(errors_1.ALERT_WARN_CANCEL_ESCAPE_KEY);
        }
        if (props.canOutsideClickCancel && !hasCancelHandler) {
            console.warn(errors_1.ALERT_WARN_CANCEL_OUTSIDE_CLICK);
        }
    }
    handleCancel = (evt) => this.internalHandleCallbacks(false, evt);
    handleConfirm = (evt) => this.internalHandleCallbacks(true, evt);
    internalHandleCallbacks(confirmed, evt) {
        const { onCancel, onClose, onConfirm } = this.props;
        (confirmed ? onConfirm : onCancel)?.(evt);
        onClose?.(confirmed, evt);
    }
}
exports.Alert = Alert;
//# sourceMappingURL=alert.js.map