import { Placement } from "@popperjs/core";
import * as React from "react";
import { PopperArrowProps } from "react-popper";
export declare const POPOVER_ARROW_SVG_SIZE = 30;
export declare const TOOLTIP_ARROW_SVG_SIZE = 22;
export interface IPopoverArrowProps {
    arrowProps: PopperArrowProps;
    placement: Placement;
}
export declare const Popover2Arrow: React.FC<IPopoverArrowProps>;
