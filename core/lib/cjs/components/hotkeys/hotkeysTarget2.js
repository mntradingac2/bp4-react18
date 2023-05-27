"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotkeysTarget2 = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const Errors = tslib_1.__importStar(require("../../common/errors"));
const utils_1 = require("../../common/utils");
const hooks_1 = require("../../hooks");
const HotkeysTarget2 = ({ children, hotkeys, options }) => {
    const { handleKeyDown, handleKeyUp } = (0, hooks_1.useHotkeys)(hotkeys, options);
    React.useEffect(() => {
        if (!(0, utils_1.isNodeEnv)("production")) {
            if (typeof children !== "function" && hotkeys.some(h => !h.global)) {
                console.error(Errors.HOTKEYS_TARGET2_CHILDREN_LOCAL_HOTKEYS);
            }
        }
    }, [hotkeys]);
    if (typeof children === "function") {
        return children({ handleKeyDown, handleKeyUp });
    }
    else {
        return children;
    }
};
exports.HotkeysTarget2 = HotkeysTarget2;
//# sourceMappingURL=hotkeysTarget2.js.map