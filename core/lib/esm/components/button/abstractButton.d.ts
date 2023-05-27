import * as React from "react";
import { AbstractPureComponent2, ActionProps, Alignment, IElementRefProps, MaybeElement } from "../../common";
import { IconName } from "../icon/icon";
export declare type IButtonProps<E extends HTMLButtonElement | HTMLAnchorElement = HTMLButtonElement> = ButtonProps<E>;
export interface ButtonProps<E extends HTMLButtonElement | HTMLAnchorElement = HTMLButtonElement> extends ActionProps<HTMLElement>, IElementRefProps<E> {
    active?: boolean;
    alignText?: Alignment;
    children?: React.ReactNode;
    fill?: boolean;
    large?: boolean;
    loading?: boolean;
    minimal?: boolean;
    outlined?: boolean;
    rightIcon?: IconName | MaybeElement;
    small?: boolean;
    type?: "submit" | "reset" | "button";
}
export declare type IAnchorButtonProps = ButtonProps<HTMLAnchorElement>;
export declare type AnchorButtonProps = IAnchorButtonProps;
export interface IButtonState {
    isActive: boolean;
}
export declare abstract class AbstractButton<E extends HTMLButtonElement | HTMLAnchorElement> extends AbstractPureComponent2<ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>), IButtonState> {
    state: {
        isActive: boolean;
    };
    protected abstract buttonRef: HTMLElement | null;
    private currentKeyDown?;
    abstract render(): JSX.Element;
    protected getCommonButtonProps(): {
        className: string;
        disabled: boolean | NonNullable<(ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>))["disabled"]>;
        onBlur: (e: React.FocusEvent<any, Element>) => void;
        onClick: (ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>))["onClick"] | undefined;
        onFocus: (ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>))["onFocus"] | undefined;
        onKeyDown: (e: React.KeyboardEvent<any>) => void;
        onKeyUp: (e: React.KeyboardEvent<any>) => void;
        tabIndex: number | (ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>))["tabIndex"] | undefined;
    };
    protected handleKeyDown: (e: React.KeyboardEvent<any>) => void;
    protected handleKeyUp: (e: React.KeyboardEvent<any>) => void;
    protected handleBlur: (e: React.FocusEvent<any>) => void;
    protected renderChildren(): React.ReactNode;
}
