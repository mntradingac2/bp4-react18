import * as React from "react";
import type { IconName } from "@blueprintjs/icons";
import { Intent } from "./intent";
export declare const DISPLAYNAME_PREFIX = "Blueprint4";
export declare type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>;
export declare type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;
export declare type MaybeElement = JSX.Element | false | null | undefined;
export interface IProps {
    className?: string;
}
export declare type Props = IProps;
export interface IIntentProps {
    intent?: Intent;
}
export declare type IntentProps = IIntentProps;
export interface ActionProps<T extends HTMLElement = HTMLElement> extends IntentProps, Props {
    disabled?: boolean;
    icon?: IconName | MaybeElement;
    onClick?: (event: React.MouseEvent<T>) => void;
    onFocus?: (event: React.FocusEvent<T>) => void;
    text?: React.ReactNode;
}
export declare type IActionProps = ActionProps;
export interface ILinkProps {
    href?: string;
    target?: string;
}
export declare type LinkProps = ILinkProps;
export interface IControlledProps {
    defaultValue?: string;
    onChange?: React.FormEventHandler<HTMLElement>;
    value?: string;
}
export interface IControlledProps2 {
    defaultValue?: string;
    value?: string;
}
export declare type ControlledProps2 = IControlledProps2;
export interface IElementRefProps<E extends HTMLElement> {
    elementRef?: React.Ref<E>;
}
export interface IOptionProps extends Props {
    disabled?: boolean;
    label?: string;
    value: string | number;
}
export declare type OptionProps = IOptionProps;
export declare function removeNonHTMLProps(props: {
    [key: string]: any;
}, invalidProps?: string[], shouldMerge?: boolean): {
    [key: string]: any;
};
