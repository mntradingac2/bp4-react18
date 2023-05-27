import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IPopoverSharedProps } from "./popoverSharedProps";
export declare const PopoverInteractionKind: {
    CLICK: "click";
    CLICK_TARGET_ONLY: "click-target";
    HOVER: "hover";
    HOVER_TARGET_ONLY: "hover-target";
};
export declare type PopoverInteractionKind = (typeof PopoverInteractionKind)[keyof typeof PopoverInteractionKind];
export interface IPopoverProps extends IPopoverSharedProps {
    backdropProps?: React.HTMLProps<HTMLDivElement>;
    content?: string | JSX.Element;
    fill?: boolean;
    interactionKind?: PopoverInteractionKind;
    hasBackdrop?: boolean;
    shouldReturnFocusOnClose?: boolean;
    popoverRef?: React.Ref<HTMLElement>;
    target?: string | JSX.Element;
}
export interface IPopoverState {
    transformOrigin: string;
    isOpen: boolean;
    hasDarkParent: boolean;
}
export declare class Popover extends AbstractPureComponent2<IPopoverProps, IPopoverState> {
    static displayName: string;
    private popoverRef;
    static defaultProps: IPopoverProps;
    popoverElement: HTMLElement | null;
    targetElement: HTMLElement | null;
    state: IPopoverState;
    private cancelOpenTimeout?;
    private isMouseInTargetOrPopover;
    private lostFocusOnSamePage;
    private popperScheduleUpdate?;
    private handlePopoverRef;
    private handleTargetRef;
    render(): React.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPopoverProps, prevState: IPopoverState): void;
    reposition: () => void | undefined;
    protected validateProps(props: IPopoverProps & {
        children?: React.ReactNode;
    }): void;
    private updateDarkParent;
    private renderPopover;
    private renderTarget;
    private understandChildren;
    private isControlled;
    private getIsOpen;
    private getPopperModifiers;
    private handleTargetFocus;
    private handleTargetBlur;
    private handleMouseEnter;
    private handleMouseLeave;
    private handlePopoverClick;
    private handleOverlayClose;
    private handleTargetClick;
    private setOpenState;
    private isArrowEnabled;
    private isElementInPopover;
    private isHoverInteractionKind;
    private updatePopoverState;
}
