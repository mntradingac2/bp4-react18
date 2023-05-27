"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotkeysEvents = exports.HotkeyScope = void 0;
const react_1 = require("react");
const utils_1 = require("../../common/utils");
const hotkey_1 = require("./hotkey");
const hotkeyParser_1 = require("./hotkeyParser");
const hotkeysDialog_1 = require("./hotkeysDialog");
const SHOW_DIALOG_KEY = "?";
var HotkeyScope;
(function (HotkeyScope) {
    HotkeyScope["LOCAL"] = "local";
    HotkeyScope["GLOBAL"] = "global";
})(HotkeyScope = exports.HotkeyScope || (exports.HotkeyScope = {}));
class HotkeysEvents {
    scope;
    actions = [];
    constructor(scope) {
        this.scope = scope;
    }
    count() {
        return this.actions.length;
    }
    clear() {
        this.actions = [];
    }
    setHotkeys(props) {
        const actions = [];
        react_1.Children.forEach(props.children, (child) => {
            if ((0, utils_1.isElementOfType)(child, hotkey_1.Hotkey) && this.isScope(child.props)) {
                actions.push({
                    combo: (0, hotkeyParser_1.parseKeyCombo)(child.props.combo),
                    props: child.props,
                });
            }
        });
        this.actions = actions;
    }
    handleKeyDown = (e) => {
        const combo = (0, hotkeyParser_1.getKeyCombo)(e);
        const isTextInput = this.isTextInput(e);
        if (!isTextInput && (0, hotkeyParser_1.comboMatches)((0, hotkeyParser_1.parseKeyCombo)(SHOW_DIALOG_KEY), combo)) {
            if ((0, hotkeysDialog_1.isHotkeysDialogShowing)()) {
                (0, hotkeysDialog_1.hideHotkeysDialogAfterDelay)();
            }
            else {
                (0, hotkeysDialog_1.showHotkeysDialog)(this.actions.map(action => action.props));
            }
            return;
        }
        else if ((0, hotkeysDialog_1.isHotkeysDialogShowing)()) {
            return;
        }
        this.invokeNamedCallbackIfComboRecognized(combo, "onKeyDown", e);
    };
    handleKeyUp = (e) => {
        if ((0, hotkeysDialog_1.isHotkeysDialogShowing)()) {
            return;
        }
        this.invokeNamedCallbackIfComboRecognized((0, hotkeyParser_1.getKeyCombo)(e), "onKeyUp", e);
    };
    invokeNamedCallbackIfComboRecognized(combo, callbackName, e) {
        const isTextInput = this.isTextInput(e);
        for (const action of this.actions) {
            const shouldIgnore = (isTextInput && !action.props.allowInInput) || action.props.disabled;
            if (!shouldIgnore && (0, hotkeyParser_1.comboMatches)(action.combo, combo)) {
                if (action.props.preventDefault) {
                    e.preventDefault();
                }
                if (action.props.stopPropagation) {
                    e.isPropagationStopped = true;
                    e.stopPropagation();
                }
                action.props[callbackName]?.(e);
            }
        }
    }
    isScope(props) {
        return (props.global ? HotkeyScope.GLOBAL : HotkeyScope.LOCAL) === this.scope;
    }
    isTextInput(e) {
        const elem = e.target;
        if (elem == null || elem.closest == null) {
            return false;
        }
        const editable = elem.closest("input, textarea, [contenteditable=true]");
        if (editable == null) {
            return false;
        }
        if (editable.tagName.toLowerCase() === "input") {
            const inputType = editable.type;
            if (inputType === "checkbox" || inputType === "radio") {
                return false;
            }
        }
        if (editable.readOnly) {
            return false;
        }
        return true;
    }
}
exports.HotkeysEvents = HotkeysEvents;
//# sourceMappingURL=hotkeysEvents.js.map