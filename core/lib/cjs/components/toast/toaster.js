"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toaster = exports.OverlayToaster = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const react_1 = tslib_1.__importDefault(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom/client"));
const common_1 = require("../../common");
const errors_1 = require("../../common/errors");
const keys_1 = require("../../common/keys");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const overlay_1 = require("../overlay/overlay");
const toast_1 = require("./toast");
class OverlayToaster extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.OverlayToaster`;
    static defaultProps = {
        autoFocus: false,
        canEscapeKeyClear: true,
        position: common_1.Position.TOP,
        usePortal: true,
    };
    static create(props, container = document.body) {
        if (props != null && props.usePortal != null && !(0, utils_1.isNodeEnv)("production")) {
            console.warn(errors_1.TOASTER_WARN_INLINE);
        }
        const containerElement = document.createElement("div");
        container.appendChild(containerElement);
        const renderer = ReactDOM.createRoot(containerElement);
        const toaster = renderer.render(react_1.default.createElement(OverlayToaster, { ...props, usePortal: false }));
        if (toaster == null) {
            throw new Error(errors_1.TOASTER_CREATE_NULL);
        }
        return toaster;
    }
    state = {
        toasts: [],
    };
    toastId = 0;
    show(props, key) {
        if (this.props.maxToasts) {
            this.dismissIfAtLimit();
        }
        const options = this.createToastOptions(props, key);
        if (key === undefined || this.isNewToastKey(key)) {
            this.setState(prevState => ({
                toasts: [options, ...prevState.toasts],
            }));
        }
        else {
            this.setState(prevState => ({
                toasts: prevState.toasts.map(t => (t.key === key ? options : t)),
            }));
        }
        return options.key;
    }
    setState(arg0) {
        arg0;
        throw new Error("Method not implemented.");
    }
    dismiss(key, timeoutExpired = false) {
        this.setState(({ toasts }) => ({
            toasts: toasts.filter(t => {
                const matchesKey = t.key === key;
                if (matchesKey) {
                    t.onDismiss?.(timeoutExpired);
                }
                return !matchesKey;
            }),
        }));
    }
    clear() {
        this.state.toasts.forEach(t => t.onDismiss?.(false));
        this.setState({ toasts: [] });
    }
    getToasts() {
        return this.state.toasts;
    }
    render() {
        const classes = (0, classnames_1.default)(common_1.Classes.TOAST_CONTAINER, this.getPositionClasses(), this.props.className);
        return (react_1.default.createElement(overlay_1.Overlay, { autoFocus: this.props.autoFocus, canEscapeKeyClose: this.props.canEscapeKeyClear, canOutsideClickClose: false, className: classes, enforceFocus: false, hasBackdrop: false, isOpen: this.state.toasts.length > 0 || this.props.children != null, onClose: this.handleClose, shouldReturnFocusOnClose: false, transitionDuration: 350, transitionName: common_1.Classes.TOAST, usePortal: this.props.usePortal },
            this.state.toasts.map(this.renderToast, this),
            this.props.children));
    }
    validateProps({ maxToasts }) {
        if (maxToasts !== undefined && maxToasts < 1) {
            throw new Error(errors_1.TOASTER_MAX_TOASTS_INVALID);
        }
    }
    isNewToastKey(key) {
        return this.state.toasts.every(toast => toast.key !== key);
    }
    dismissIfAtLimit() {
        if (this.state.toasts.length === this.props.maxToasts) {
            this.dismiss(this.state.toasts[this.state.toasts.length - 1].key);
        }
    }
    renderToast = (toast) => {
        return react_1.default.createElement(toast_1.Toast, { ...toast, onDismiss: this.getDismissHandler(toast) });
    };
    createToastOptions(props, key = `toast-${this.toastId++}`) {
        return { ...props, key };
    }
    getPositionClasses() {
        const positions = this.props.position.split("-");
        return [
            ...positions.map(p => `${common_1.Classes.TOAST_CONTAINER}-${p.toLowerCase()}`),
            `${common_1.Classes.TOAST_CONTAINER}-${this.props.usePortal ? "in-portal" : "inline"}`,
        ];
    }
    getDismissHandler = (toast) => (timeoutExpired) => {
        this.dismiss(toast.key, timeoutExpired);
    };
    handleClose = (e) => {
        if (e.which === keys_1.ESCAPE) {
            this.clear();
        }
    };
}
exports.OverlayToaster = OverlayToaster;
exports.Toaster = OverlayToaster;
//# sourceMappingURL=toaster.js.map