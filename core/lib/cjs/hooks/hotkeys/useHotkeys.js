"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHotkeys = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const errors_1 = require("../../common/errors");
const domUtils_1 = require("../../common/utils/domUtils");
const hotkeyParser_1 = require("../../components/hotkeys/hotkeyParser");
const context_1 = require("../../context");
function useHotkeys(keys, options = {}) {
    const { document = getDefaultDocument(), showDialogKeyCombo = "?" } = options;
    const localKeys = React.useMemo(() => keys
        .filter(k => !k.global)
        .map(k => ({
        combo: (0, hotkeyParser_1.parseKeyCombo)(k.combo),
        config: k,
    })), [keys]);
    const globalKeys = React.useMemo(() => keys
        .filter(k => k.global)
        .map(k => ({
        combo: (0, hotkeyParser_1.parseKeyCombo)(k.combo),
        config: k,
    })), [keys]);
    const [state, dispatch] = React.useContext(context_1.HotkeysContext);
    if (!state.hasProvider) {
        React.useEffect(() => console.warn(errors_1.HOTKEYS_PROVIDER_NOT_FOUND), []);
    }
    React.useEffect(() => {
        const payload = [...globalKeys.map(k => k.config), ...localKeys.map(k => k.config)];
        dispatch({ type: "ADD_HOTKEYS", payload });
        return () => dispatch({ type: "REMOVE_HOTKEYS", payload });
    }, [keys]);
    const invokeNamedCallbackIfComboRecognized = (global, combo, callbackName, e) => {
        const isTextInput = (0, domUtils_1.elementIsTextInput)(e.target);
        for (const key of global ? globalKeys : localKeys) {
            const { allowInInput = false, disabled = false, preventDefault = false, stopPropagation = false, } = key.config;
            const shouldIgnore = (isTextInput && !allowInInput) || disabled;
            if (!shouldIgnore && (0, hotkeyParser_1.comboMatches)(key.combo, combo)) {
                if (preventDefault) {
                    e.preventDefault();
                }
                if (stopPropagation) {
                    e.isPropagationStopped = true;
                    e.stopPropagation();
                }
                key.config[callbackName]?.(e);
            }
        }
    };
    const handleGlobalKeyDown = React.useCallback((e) => {
        const combo = (0, hotkeyParser_1.getKeyCombo)(e);
        const isTextInput = (0, domUtils_1.elementIsTextInput)(e.target);
        if (!isTextInput && (0, hotkeyParser_1.comboMatches)((0, hotkeyParser_1.parseKeyCombo)(showDialogKeyCombo), combo)) {
            dispatch({ type: "OPEN_DIALOG" });
        }
        else {
            invokeNamedCallbackIfComboRecognized(true, (0, hotkeyParser_1.getKeyCombo)(e), "onKeyDown", e);
        }
    }, [globalKeys]);
    const handleGlobalKeyUp = React.useCallback((e) => invokeNamedCallbackIfComboRecognized(true, (0, hotkeyParser_1.getKeyCombo)(e), "onKeyUp", e), [globalKeys]);
    const handleLocalKeyDown = React.useCallback((e) => invokeNamedCallbackIfComboRecognized(false, (0, hotkeyParser_1.getKeyCombo)(e.nativeEvent), "onKeyDown", e.nativeEvent), [localKeys]);
    const handleLocalKeyUp = React.useCallback((e) => invokeNamedCallbackIfComboRecognized(false, (0, hotkeyParser_1.getKeyCombo)(e.nativeEvent), "onKeyUp", e.nativeEvent), [localKeys]);
    React.useEffect(() => {
        document.addEventListener("keydown", handleGlobalKeyDown);
        document.addEventListener("keyup", handleGlobalKeyUp);
        return () => {
            document.removeEventListener("keydown", handleGlobalKeyDown);
            document.removeEventListener("keyup", handleGlobalKeyUp);
        };
    }, [handleGlobalKeyDown, handleGlobalKeyUp]);
    return { handleKeyDown: handleLocalKeyDown, handleKeyUp: handleLocalKeyUp };
}
exports.useHotkeys = useHotkeys;
function getDefaultDocument() {
    if (typeof window === "undefined") {
        return undefined;
    }
    return window.document;
}
//# sourceMappingURL=useHotkeys.js.map