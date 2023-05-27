"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrowOffsetModifier = exports.getTransformOrigin = exports.getAlignment = exports.getOppositePosition = exports.isVerticalPosition = exports.getPosition = void 0;
function getPosition(placement) {
    return placement.split("-")[0];
}
exports.getPosition = getPosition;
function isVerticalPosition(side) {
    return ["left", "right"].indexOf(side) !== -1;
}
exports.isVerticalPosition = isVerticalPosition;
function getOppositePosition(side) {
    switch (side) {
        case "top":
            return "bottom";
        case "left":
            return "right";
        case "bottom":
            return "top";
        default:
            return "left";
    }
}
exports.getOppositePosition = getOppositePosition;
function getAlignment(placement) {
    const align = placement.split("-")[1];
    switch (align) {
        case "start":
            return "left";
        case "end":
            return "right";
        default:
            return "center";
    }
}
exports.getAlignment = getAlignment;
function getTransformOrigin(data) {
    const position = getPosition(data.placement);
    if (data.arrowElement == null) {
        return isVerticalPosition(position)
            ? `${getOppositePosition(position)} ${getAlignment(position)}`
            : `${getAlignment(position)} ${getOppositePosition(position)}`;
    }
    else {
        const arrowSizeShift = data.arrowElement.clientHeight / 2;
        const { arrow } = data.offsets;
        return isVerticalPosition(position)
            ? `${getOppositePosition(position)} ${arrow.top + arrowSizeShift}px`
            : `${arrow.left + arrowSizeShift}px ${getOppositePosition(position)}`;
    }
}
exports.getTransformOrigin = getTransformOrigin;
const ARROW_SPACING = 4;
const arrowOffsetModifier = data => {
    if (data.arrowElement == null) {
        return data;
    }
    const arrowSize = data.arrowElement.clientWidth;
    const position = getPosition(data.placement);
    const isVertical = isVerticalPosition(position);
    const len = isVertical ? "width" : "height";
    const offsetSide = isVertical ? "left" : "top";
    const arrowOffsetSize = Math.round(arrowSize / 2 / Math.sqrt(2));
    if (position === "top" || position === "left") {
        data.offsets.popper[offsetSide] -= arrowOffsetSize + ARROW_SPACING;
        data.offsets.arrow[offsetSide] = data.offsets.popper[len] - arrowSize + arrowOffsetSize;
    }
    else {
        data.offsets.popper[offsetSide] += arrowOffsetSize + ARROW_SPACING;
        data.offsets.arrow[offsetSide] = -arrowOffsetSize;
    }
    return data;
};
exports.arrowOffsetModifier = arrowOffsetModifier;
//# sourceMappingURL=popperUtils.js.map