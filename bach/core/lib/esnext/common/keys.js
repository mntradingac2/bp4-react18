"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeyboardClick = exports.DELETE = exports.ARROW_DOWN = exports.ARROW_RIGHT = exports.ARROW_UP = exports.ARROW_LEFT = exports.SPACE = exports.ESCAPE = exports.SHIFT = exports.ENTER = exports.TAB = exports.BACKSPACE = void 0;
exports.BACKSPACE = 8;
exports.TAB = 9;
exports.ENTER = 13;
exports.SHIFT = 16;
exports.ESCAPE = 27;
exports.SPACE = 32;
exports.ARROW_LEFT = 37;
exports.ARROW_UP = 38;
exports.ARROW_RIGHT = 39;
exports.ARROW_DOWN = 40;
exports.DELETE = 46;
function isKeyboardClick(keyCode) {
    return keyCode === exports.ENTER || keyCode === exports.SPACE;
}
exports.isKeyboardClick = isKeyboardClick;
//# sourceMappingURL=keys.js.map