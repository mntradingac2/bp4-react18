"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDarkTheme = void 0;
const tslib_1 = require("tslib");
require("../configureDom4");
const Classes = tslib_1.__importStar(require("../classes"));
function isDarkTheme(element) {
    return element != null && element instanceof Element && element.closest(`.${Classes.DARK}`) != null;
}
exports.isDarkTheme = isDarkTheme;
//# sourceMappingURL=isDarkTheme.js.map