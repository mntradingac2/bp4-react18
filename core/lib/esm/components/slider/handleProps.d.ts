import * as React from "react";
import { Intent, Props } from "../../common";
export declare const HandleType: {
    FULL: "full";
    START: "start";
    END: "end";
};
export declare type HandleType = (typeof HandleType)[keyof typeof HandleType];
export declare const HandleInteractionKind: {
    LOCK: "lock";
    PUSH: "push";
    NONE: "none";
};
export declare type HandleInteractionKind = (typeof HandleInteractionKind)[keyof typeof HandleInteractionKind];
export declare type HandleHtmlProps = Pick<React.HTMLProps<HTMLSpanElement>, "aria-label" | "aria-labelledby">;
export declare type HandleProps = IHandleProps;
export interface IHandleProps extends Props {
    value: number;
    intentAfter?: Intent;
    intentBefore?: Intent;
    trackStyleAfter?: React.CSSProperties;
    trackStyleBefore?: React.CSSProperties;
    interactionKind?: HandleInteractionKind;
    onChange?: (newValue: number) => void;
    onRelease?: (newValue: number) => void;
    type?: HandleType;
    htmlProps?: HandleHtmlProps;
}
