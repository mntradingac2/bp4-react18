"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizableInput = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
exports.ResizableInput = (0, react_1.forwardRef)(function ResizableInput(props, ref) {
    const [content, setContent] = (0, react_1.useState)("");
    const [width, setWidth] = (0, react_1.useState)(0);
    const span = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (span.current != null) {
            setWidth(span.current.offsetWidth);
        }
    }, [content]);
    const { onChange, style, ...otherProps } = props;
    const handleInputChange = evt => {
        onChange?.(evt);
        setContent(evt?.target?.value ?? "");
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { ref: span, className: common_1.Classes.RESIZABLE_INPUT_SPAN, "aria-hidden": true }, content.replace(/ /g, "\u00a0")),
        react_1.default.createElement("input", { ...otherProps, type: "text", style: { ...style, width }, onChange: handleInputChange, ref: ref })));
});
exports.ResizableInput.displayName = `${common_1.DISPLAYNAME_PREFIX}.ResizableInput`;
//# sourceMappingURL=resizableInput.js.map