"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideHotkeysDialogAfterDelay = exports.hideHotkeysDialog = exports.showHotkeysDialog = exports.setHotkeysDialogProps = exports.isHotkeysDialogShowing = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const common_1 = require("../../common");
const components_1 = require("../../components");
const hotkey_1 = require("./hotkey");
const hotkeys_1 = require("./hotkeys");
const DELAY_IN_MS = 10;
class HotkeysDialog {
    componentProps = {
        globalHotkeysGroup: "Global hotkeys",
    };
    container = null;
    hotkeysQueue = [];
    isDialogShowing = false;
    showTimeoutToken;
    hideTimeoutToken;
    render() {
        if (this.container == null) {
            this.container = this.getContainer();
        }
        ReactDOM.render(this.renderComponent(), this.container);
    }
    unmount() {
        if (this.container != null) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.container.remove();
            this.container = null;
        }
    }
    enqueueHotkeysForDisplay(hotkeys) {
        this.hotkeysQueue.push(hotkeys);
        window.clearTimeout(this.showTimeoutToken);
        this.showTimeoutToken = window.setTimeout(this.show, DELAY_IN_MS);
    }
    hideAfterDelay() {
        window.clearTimeout(this.hideTimeoutToken);
        this.hideTimeoutToken = window.setTimeout(this.hide, DELAY_IN_MS);
    }
    show = () => {
        this.isDialogShowing = true;
        this.render();
    };
    hide = () => {
        this.isDialogShowing = false;
        this.render();
    };
    isShowing() {
        return this.isDialogShowing;
    }
    getContainer() {
        if (this.container == null) {
            this.container = document.createElement("div");
            this.container.classList.add(common_1.Classes.PORTAL);
            document.body.appendChild(this.container);
        }
        return this.container;
    }
    renderComponent() {
        return (React.createElement(components_1.Dialog, { ...this.componentProps, className: (0, classnames_1.default)(common_1.Classes.HOTKEY_DIALOG, this.componentProps.className), isOpen: this.isDialogShowing, onClose: this.hide },
            React.createElement(components_1.DialogBody, null, this.renderHotkeys())));
    }
    renderHotkeys() {
        const hotkeys = this.emptyHotkeyQueue();
        const elements = hotkeys.map((hotkey, index) => {
            const group = hotkey.global === true && hotkey.group == null ? this.componentProps.globalHotkeysGroup : hotkey.group;
            return React.createElement(hotkey_1.Hotkey, { key: index, ...hotkey, group: group });
        });
        return React.createElement(hotkeys_1.Hotkeys, null, elements);
    }
    emptyHotkeyQueue() {
        const hotkeys = this.hotkeysQueue.reduce((arr, queued) => arr.concat(queued), []);
        this.hotkeysQueue.length = 0;
        return hotkeys;
    }
}
const HOTKEYS_DIALOG = new HotkeysDialog();
function isHotkeysDialogShowing() {
    return HOTKEYS_DIALOG.isShowing();
}
exports.isHotkeysDialogShowing = isHotkeysDialogShowing;
function setHotkeysDialogProps(props) {
    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            HOTKEYS_DIALOG.componentProps[key] = props[key];
        }
    }
}
exports.setHotkeysDialogProps = setHotkeysDialogProps;
function showHotkeysDialog(hotkeys) {
    HOTKEYS_DIALOG.enqueueHotkeysForDisplay(hotkeys);
}
exports.showHotkeysDialog = showHotkeysDialog;
function hideHotkeysDialog() {
    HOTKEYS_DIALOG.hide();
}
exports.hideHotkeysDialog = hideHotkeysDialog;
function hideHotkeysDialogAfterDelay() {
    HOTKEYS_DIALOG.hideAfterDelay();
}
exports.hideHotkeysDialogAfterDelay = hideHotkeysDialogAfterDelay;
//# sourceMappingURL=hotkeysDialog.js.map