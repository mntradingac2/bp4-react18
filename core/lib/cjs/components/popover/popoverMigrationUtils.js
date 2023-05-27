"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionToPlacement = void 0;
const position_1 = require("../../common/position");
function positionToPlacement(position) {
    switch (position) {
        case position_1.Position.TOP_LEFT:
            return "top-start";
        case position_1.Position.TOP:
            return "top";
        case position_1.Position.TOP_RIGHT:
            return "top-end";
        case position_1.Position.RIGHT_TOP:
            return "right-start";
        case position_1.Position.RIGHT:
            return "right";
        case position_1.Position.RIGHT_BOTTOM:
            return "right-end";
        case position_1.Position.BOTTOM_RIGHT:
            return "bottom-end";
        case position_1.Position.BOTTOM:
            return "bottom";
        case position_1.Position.BOTTOM_LEFT:
            return "bottom-start";
        case position_1.Position.LEFT_BOTTOM:
            return "left-end";
        case position_1.Position.LEFT:
            return "left";
        case position_1.Position.LEFT_TOP:
            return "left-start";
        case "auto":
        case "auto-start":
        case "auto-end":
            return position;
        default:
            return assertNever(position);
    }
}
exports.positionToPlacement = positionToPlacement;
function assertNever(x) {
    throw new Error("Unexpected position: " + x);
}
//# sourceMappingURL=popoverMigrationUtils.js.map