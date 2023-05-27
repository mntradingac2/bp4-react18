import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IntentProps, Props } from "../../common/props";
export declare type EditableTextProps = IEditableTextProps;
export interface IEditableTextProps extends IntentProps, Props {
    alwaysRenderInput?: boolean;
    confirmOnEnterKey?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    isEditing?: boolean;
    maxLength?: number;
    minWidth?: number;
    multiline?: boolean;
    maxLines?: number;
    minLines?: number;
    placeholder?: string;
    selectAllOnFocus?: boolean;
    type?: string;
    value?: string;
    contentId?: string;
    onCancel?(value: string): void;
    onChange?(value: string): void;
    onConfirm?(value: string): void;
    onEdit?(value: string | undefined): void;
}
export interface IEditableTextState {
    inputHeight?: number;
    inputWidth?: number;
    isEditing?: boolean;
    lastValue?: string;
    value?: string;
}
export declare class EditableText extends AbstractPureComponent2<EditableTextProps, IEditableTextState> {
    static displayName: string;
    static defaultProps: EditableTextProps;
    private inputElement;
    private valueElement;
    private refHandlers;
    constructor(props: EditableTextProps, context?: any);
    render(): React.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: EditableTextProps, prevState: IEditableTextState): void;
    cancelEditing: () => void;
    toggleEditing: () => void;
    private handleFocus;
    private handleTextChange;
    private handleKeyEvent;
    private renderInput;
    private updateInputDimensions;
}
