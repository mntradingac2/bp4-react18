import * as React from "react";
import { AbstractPureComponent2, Alignment } from "../../common";
import { HTMLInputProps, Props } from "../../common/props";
export declare type ControlProps = IControlProps;
export interface IControlProps extends Props, HTMLInputProps {
    alignIndicator?: Alignment;
    checked?: boolean;
    children?: React.ReactNode;
    defaultChecked?: boolean;
    disabled?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    inline?: boolean;
    label?: string;
    labelElement?: React.ReactNode;
    large?: boolean;
    onChange?: React.FormEventHandler<HTMLInputElement>;
    tagName?: keyof JSX.IntrinsicElements;
}
export declare type SwitchProps = ISwitchProps;
export interface ISwitchProps extends ControlProps {
    innerLabelChecked?: string;
    innerLabel?: string;
}
export declare class Switch extends AbstractPureComponent2<SwitchProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
export declare type IRadioProps = ControlProps;
export declare type RadioProps = IRadioProps;
export declare class Radio extends AbstractPureComponent2<RadioProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
export declare type CheckboxProps = ICheckboxProps;
export interface ICheckboxProps extends ControlProps {
    defaultIndeterminate?: boolean;
    indeterminate?: boolean;
}
export interface ICheckboxState {
    indeterminate: boolean;
}
export declare class Checkbox extends AbstractPureComponent2<CheckboxProps, ICheckboxState> {
    static displayName: string;
    static getDerivedStateFromProps({ indeterminate }: CheckboxProps): ICheckboxState | null;
    state: ICheckboxState;
    input: HTMLInputElement | null;
    private handleInputRef;
    render(): React.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: CheckboxProps): void;
    private updateIndeterminate;
    private handleChange;
}
