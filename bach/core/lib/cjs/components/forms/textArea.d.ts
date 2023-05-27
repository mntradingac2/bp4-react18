import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IntentProps, Props } from "../../common/props";
export declare type TextAreaProps = ITextAreaProps;
export interface ITextAreaProps extends IntentProps, Props, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    fill?: boolean;
    large?: boolean;
    small?: boolean;
    growVertically?: boolean;
    inputRef?: React.Ref<HTMLTextAreaElement>;
}
export interface TextAreaState {
    height?: number;
}
export declare class TextArea extends AbstractPureComponent2<TextAreaProps, TextAreaState> {
    static displayName: string;
    state: TextAreaState;
    textareaElement: HTMLTextAreaElement | null;
    private handleRef;
    private maybeSyncHeightToScrollHeight;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TextAreaProps): void;
    render(): React.JSX.Element;
    private handleChange;
}
