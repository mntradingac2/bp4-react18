import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IElementRefProps, OptionProps } from "../../common/props";
import { Extends } from "../../common/utils";
import { IconName, IconProps } from "../icon/icon";
export declare type HTMLSelectIconName = Extends<IconName, "double-caret-vertical" | "caret-down">;
export declare type HTMLSelectProps = IHTMLSelectProps;
export interface IHTMLSelectProps extends IElementRefProps<HTMLSelectElement>, React.SelectHTMLAttributes<HTMLSelectElement> {
    children?: React.ReactNode;
    disabled?: boolean;
    fill?: boolean;
    iconName?: HTMLSelectIconName;
    iconProps?: Partial<IconProps>;
    large?: boolean;
    minimal?: boolean;
    multiple?: never;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    options?: ReadonlyArray<string | number | OptionProps>;
    value?: string | number;
}
export declare class HTMLSelect extends AbstractPureComponent2<HTMLSelectProps> {
    render(): React.JSX.Element;
}
