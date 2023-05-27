"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopoverArrow = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const Classes = tslib_1.__importStar(require("../../common/classes"));
const props_1 = require("../../common/props");
const popperUtils_1 = require("./popperUtils");
const SVG_SHADOW_PATH = "M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378" +
    "-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z";
const SVG_ARROW_PATH = "M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005" +
    "c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z";
function getArrowAngle(placement) {
    if (placement == null) {
        return 0;
    }
    switch ((0, popperUtils_1.getPosition)(placement)) {
        case "top":
            return -90;
        case "left":
            return 180;
        case "bottom":
            return 90;
        default:
            return 0;
    }
}
const PopoverArrow = ({ arrowProps: { ref, style }, placement }) => (React.createElement("div", { className: Classes.POPOVER_ARROW, ref: ref, style: style.left == null || isNaN(+style.left) ? {} : style },
    React.createElement("svg", { viewBox: "0 0 30 30", style: { transform: `rotate(${getArrowAngle(placement)}deg)` } },
        React.createElement("path", { className: Classes.POPOVER_ARROW + "-border", d: SVG_SHADOW_PATH }),
        React.createElement("path", { className: Classes.POPOVER_ARROW + "-fill", d: SVG_ARROW_PATH }))));
exports.PopoverArrow = PopoverArrow;
exports.PopoverArrow.displayName = `${props_1.DISPLAYNAME_PREFIX}.PopoverArrow`;
//# sourceMappingURL=popoverArrow.js.map