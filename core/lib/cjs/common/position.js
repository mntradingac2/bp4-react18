"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPositionIgnoreAngles = exports.isPositionVertical = exports.isPositionHorizontal = exports.Position = void 0;
exports.Position = {
    BOTTOM: "bottom",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    LEFT: "left",
    LEFT_BOTTOM: "left-bottom",
    LEFT_TOP: "left-top",
    RIGHT: "right",
    RIGHT_BOTTOM: "right-bottom",
    RIGHT_TOP: "right-top",
    TOP: "top",
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
};
function isPositionHorizontal(position) {
    return (position === exports.Position.TOP ||
        position === exports.Position.TOP_LEFT ||
        position === exports.Position.TOP_RIGHT ||
        position === exports.Position.BOTTOM ||
        position === exports.Position.BOTTOM_LEFT ||
        position === exports.Position.BOTTOM_RIGHT);
}
exports.isPositionHorizontal = isPositionHorizontal;
function isPositionVertical(position) {
    return (position === exports.Position.LEFT ||
        position === exports.Position.LEFT_TOP ||
        position === exports.Position.LEFT_BOTTOM ||
        position === exports.Position.RIGHT ||
        position === exports.Position.RIGHT_TOP ||
        position === exports.Position.RIGHT_BOTTOM);
}
exports.isPositionVertical = isPositionVertical;
function getPositionIgnoreAngles(position) {
    if (position === exports.Position.TOP || position === exports.Position.TOP_LEFT || position === exports.Position.TOP_RIGHT) {
        return exports.Position.TOP;
    }
    else if (position === exports.Position.BOTTOM ||
        position === exports.Position.BOTTOM_LEFT ||
        position === exports.Position.BOTTOM_RIGHT) {
        return exports.Position.BOTTOM;
    }
    else if (position === exports.Position.LEFT || position === exports.Position.LEFT_TOP || position === exports.Position.LEFT_BOTTOM) {
        return exports.Position.LEFT;
    }
    else {
        return exports.Position.RIGHT;
    }
}
exports.getPositionIgnoreAngles = getPositionIgnoreAngles;
//# sourceMappingURL=position.js.map