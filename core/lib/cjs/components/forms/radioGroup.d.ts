import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { OptionProps, Props } from "../../common/props";
export declare type RadioGroupProps = IRadioGroupProps;
export interface IRadioGroupProps extends Props {
    children?: React.ReactNode;
    disabled?: boolean;
    inline?: boolean;
    label?: React.ReactNode;
    name?: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
    options?: readonly OptionProps[];
    selectedValue?: string | number;
}
export declare class RadioGroup extends AbstractPureComponent2<RadioGroupProps> {
    static displayName: string;
    private autoGroupName;
    render(): React.JSX.Element;
    protected validateProps(): void;
    private renderChildren;
    private renderOptions;
    private getRadioProps;
}
