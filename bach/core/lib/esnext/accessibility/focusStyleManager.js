"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FocusStyleManager = void 0;
const classes_1 = require("../common/classes");
const interactionMode_1 = require("../common/interactionMode");
const fakeFocusEngine = {
    isActive: () => true,
    start: () => true,
    stop: () => true,
};
const focusEngine = typeof document !== "undefined"
    ? new interactionMode_1.InteractionModeEngine(document.documentElement, classes_1.FOCUS_DISABLED)
    : fakeFocusEngine;
exports.FocusStyleManager = {
    alwaysShowFocus: () => focusEngine.stop(),
    isActive: () => focusEngine.isActive(),
    onlyShowFocusOnTabs: () => focusEngine.start(),
};
//# sourceMappingURL=focusStyleManager.js.map