import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
export interface IAsyncControllableInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    inputRef?: React.LegacyRef<HTMLInputElement>;
}
declare type InputValue = IAsyncControllableInputProps["value"];
export interface IAsyncControllableInputState {
    isComposing: boolean;
    value: InputValue;
    nextValue: InputValue;
    hasPendingUpdate: boolean;
}
export declare class AsyncControllableInput extends AbstractPureComponent2<IAsyncControllableInputProps, IAsyncControllableInputState> {
    static displayName: string;
    static COMPOSITION_END_DELAY: number;
    state: IAsyncControllableInputState;
    private cancelPendingCompositionEnd;
    static getDerivedStateFromProps(nextProps: IAsyncControllableInputProps, nextState: IAsyncControllableInputState): Partial<IAsyncControllableInputState> | null;
    render(): React.JSX.Element;
    private handleCompositionStart;
    private handleCompositionEnd;
    private handleChange;
}
export {};
