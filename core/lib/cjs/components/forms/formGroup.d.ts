import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IntentProps, Props } from "../../common/props";
export declare type FormGroupProps = IFormGroupProps;
export interface IFormGroupProps extends IntentProps, Props {
    children?: React.ReactNode;
    contentClassName?: string;
    disabled?: boolean;
    helperText?: React.ReactNode;
    inline?: boolean;
    label?: React.ReactNode;
    labelFor?: string;
    labelInfo?: React.ReactNode;
    style?: React.CSSProperties;
    subLabel?: React.ReactNode;
}
export declare class FormGroup extends AbstractPureComponent2<FormGroupProps> {
    static displayName: string;
    render(): React.JSX.Element;
    private getClassName;
}
