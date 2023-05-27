import PopperJS from "popper.js";
export declare function getPosition(placement: PopperJS.Placement): PopperJS.Position;
export declare function isVerticalPosition(side: PopperJS.Position): boolean;
export declare function getOppositePosition(side: PopperJS.Position): "left" | "right" | "bottom" | "top";
export declare function getAlignment(placement: PopperJS.Placement): "center" | "left" | "right";
export declare function getTransformOrigin(data: PopperJS.Data): string;
export declare const arrowOffsetModifier: PopperJS.ModifierFn;
