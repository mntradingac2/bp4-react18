import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { HTMLInputProps, IntentProps, MaybeElement, Props } from "../../common/props";
import { IconName } from "../icon/icon";
import { TagProps } from "../tag/tag";
export declare type TagInputAddMethod = "default" | "blur" | "paste";
export declare type TagInputProps = ITagInputProps;
export interface ITagInputProps extends IntentProps, Props {
    addOnBlur?: boolean;
    addOnPaste?: boolean;
    autoResize?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;
    fill?: boolean;
    inputProps?: HTMLInputProps;
    inputRef?: React.Ref<HTMLInputElement>;
    inputValue?: string;
    large?: boolean;
    leftIcon?: IconName | MaybeElement;
    onAdd?: (values: string[], method: TagInputAddMethod) => boolean | void;
    onChange?: (values: React.ReactNode[]) => boolean | void;
    onInputChange?: React.FormEventHandler<HTMLInputElement>;
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>, index?: number) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLElement>, index?: number) => void;
    onRemove?: (value: React.ReactNode, index: number) => void;
    placeholder?: string;
    rightElement?: JSX.Element;
    separator?: string | RegExp | false;
    tagProps?: TagProps | ((value: React.ReactNode, index: number) => TagProps);
    values: readonly React.ReactNode[];
}
export interface ITagInputState {
    activeIndex: number;
    inputValue: string;
    isInputFocused: boolean;
    prevInputValueProp?: string;
}
export declare class TagInput extends AbstractPureComponent2<TagInputProps, ITagInputState> {
    static displayName: string;
    static defaultProps: Partial<TagInputProps>;
    static getDerivedStateFromProps(props: Readonly<TagInputProps>, state: Readonly<ITagInputState>): Partial<ITagInputState> | null;
    state: ITagInputState;
    inputElement: HTMLInputElement | null;
    private handleRef;
    render(): React.JSX.Element;
    componentDidUpdate(prevProps: TagInputProps): void;
    private addTags;
    private maybeRenderTag;
    private getNextActiveIndex;
    private findNextIndex;
    private getValues;
    private handleContainerClick;
    private handleContainerBlur;
    private handleInputFocus;
    private handleInputChange;
    private handleInputKeyDown;
    private handleInputKeyUp;
    private handleInputPaste;
    private handleRemoveTag;
    private handleBackspaceToRemove;
    private handleDeleteToRemove;
    private removeIndexFromValues;
    private invokeKeyPressCallback;
    private isValidIndex;
}
