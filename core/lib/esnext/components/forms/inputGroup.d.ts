import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { ControlledProps2, HTMLInputProps, IControlledProps, IntentProps, MaybeElement, Props } from "../../common/props";
import { IconName } from "../icon/icon";
import type { InputSharedProps } from "./inputSharedProps";
export declare type InputGroupProps = IInputGroupProps;
export interface IInputGroupProps extends IControlledProps, IntentProps, Props {
    asyncControl?: boolean;
    disabled?: boolean;
    fill?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    leftElement?: JSX.Element;
    leftIcon?: IconName | MaybeElement;
    large?: boolean;
    small?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    rightElement?: JSX.Element;
    round?: boolean;
    type?: string;
}
export declare type IInputGroupProps2 = InputGroupProps2;
export interface InputGroupProps2 extends Omit<HTMLInputProps, keyof ControlledProps2>, ControlledProps2, InputSharedProps {
    asyncControl?: boolean;
    large?: boolean;
    small?: boolean;
    round?: boolean;
    tagName?: keyof JSX.IntrinsicElements;
    type?: string;
}
export interface IInputGroupState {
    leftElementWidth?: number;
    rightElementWidth?: number;
}
export declare class InputGroup extends AbstractPureComponent2<InputGroupProps2, IInputGroupState> {
    static displayName: string;
    state: IInputGroupState;
    private leftElement;
    private rightElement;
    private refHandlers;
    render(): React.ReactElement<{
        className: string;
    }, string | React.JSXElementConstructor<any>>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: InputGroupProps2): void;
    protected validateProps(props: InputGroupProps2): void;
    private maybeRenderLeftElement;
    private maybeRenderRightElement;
    private updateInputWidth;
}
