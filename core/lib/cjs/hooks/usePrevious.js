"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
function usePrevious(value) {
    const ref = react_1.default.useRef();
    react_1.default.useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
exports.usePrevious = usePrevious;
//# sourceMappingURL=usePrevious.js.map