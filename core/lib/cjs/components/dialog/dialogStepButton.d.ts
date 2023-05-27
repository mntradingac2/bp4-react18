import * as React from "react";
import { ButtonProps } from "../button/buttons";
import { TooltipProps } from "../tooltip/tooltip";
export declare type DialogStepButtonProps = Partial<Omit<ButtonProps, "elementRef">> & {
    tooltipContent?: TooltipProps["content"];
};
export declare function DialogStepButton({ tooltipContent, ...props }: DialogStepButtonProps): React.JSX.Element;
