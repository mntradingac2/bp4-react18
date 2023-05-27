import * as React from "react";
import { AbstractPureComponent2, IElementRefProps, IntentProps, MaybeElement, Props } from "../../common";
import { IconName } from "../icon/icon";
export declare type TagProps = ITagProps;
export interface ITagProps extends Props, IntentProps, IElementRefProps<HTMLSpanElement>, React.HTMLAttributes<HTMLSpanElement> {
    active?: boolean;
    children?: React.ReactNode;
    fill?: boolean;
    icon?: IconName | MaybeElement;
    interactive?: boolean;
    large?: boolean;
    minimal?: boolean;
    multiline?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onRemove?: (e: React.MouseEvent<HTMLButtonElement>, tagProps: TagProps) => void;
    rightIcon?: IconName | MaybeElement;
    round?: boolean;
    htmlTitle?: string;
}
export declare class Tag extends AbstractPureComponent2<TagProps> {
    static displayName: string;
    render(): React.JSX.Element;
    private onRemoveClick;
}
