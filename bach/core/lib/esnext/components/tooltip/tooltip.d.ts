import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IntentProps } from "../../common/props";
import { PopoverInteractionKind } from "../popover/popover";
import { IPopoverSharedProps } from "../popover/popoverSharedProps";
export declare type TooltipProps = ITooltipProps;
export interface ITooltipProps extends IPopoverSharedProps, IntentProps {
    content: JSX.Element | string;
    hoverCloseDelay?: number;
    hoverOpenDelay?: number;
    interactionKind?: typeof PopoverInteractionKind.HOVER | typeof PopoverInteractionKind.HOVER_TARGET_ONLY;
    transitionDuration?: number;
}
export declare class Tooltip extends AbstractPureComponent2<TooltipProps> {
    static displayName: string;
    static defaultProps: Partial<TooltipProps>;
    private popover;
    render(): React.JSX.Element;
    reposition(): void;
}
