import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
export declare type FileInputProps = IFileInputProps;
export interface IFileInputProps extends React.LabelHTMLAttributes<HTMLLabelElement>, Props {
    disabled?: boolean;
    fill?: boolean;
    hasSelection?: boolean;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    large?: boolean;
    onInputChange?: React.FormEventHandler<HTMLInputElement>;
    small?: boolean;
    text?: React.ReactNode;
    buttonText?: string;
}
export declare class FileInput extends AbstractPureComponent2<FileInputProps> {
    static displayName: string;
    static defaultProps: FileInputProps;
    render(): React.JSX.Element;
    private handleInputChange;
}
