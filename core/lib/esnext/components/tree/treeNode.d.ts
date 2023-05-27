import * as React from "react";
import { MaybeElement, Props } from "../../common/props";
import { IconName } from "../icon/icon";
export declare type TreeNodeInfo<T = {}> = ITreeNode<T>;
export interface ITreeNode<T = {}> extends Props {
    childNodes?: Array<TreeNodeInfo<T>>;
    disabled?: boolean;
    hasCaret?: boolean;
    icon?: IconName | MaybeElement;
    id: string | number;
    isExpanded?: boolean;
    isSelected?: boolean;
    label: string | JSX.Element;
    secondaryLabel?: string | MaybeElement;
    nodeData?: T;
}
export declare type TreeNodeProps<T = {}> = ITreeNodeProps<T>;
export interface ITreeNodeProps<T = {}> extends TreeNodeInfo<T> {
    children?: React.ReactNode;
    contentRef?: (node: TreeNode<T>, element: HTMLDivElement | null) => void;
    depth: number;
    key?: string | number;
    onClick?: (node: TreeNode<T>, e: React.MouseEvent<HTMLDivElement>) => void;
    onCollapse?: (node: TreeNode<T>, e: React.MouseEvent<HTMLSpanElement>) => void;
    onContextMenu?: (node: TreeNode<T>, e: React.MouseEvent<HTMLDivElement>) => void;
    onDoubleClick?: (node: TreeNode<T>, e: React.MouseEvent<HTMLDivElement>) => void;
    onExpand?: (node: TreeNode<T>, e: React.MouseEvent<HTMLSpanElement>) => void;
    onMouseEnter?: (node: TreeNode<T>, e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (node: TreeNode<T>, e: React.MouseEvent<HTMLDivElement>) => void;
    path: number[];
}
export declare class TreeNode<T = {}> extends React.Component<ITreeNodeProps<T>> {
    static displayName: string;
    static ofType<U>(): new (props: ITreeNodeProps<U>) => TreeNode<U>;
    render(): React.JSX.Element;
    private maybeRenderCaret;
    private maybeRenderSecondaryLabel;
    private handleCaretClick;
    private handleClick;
    private handleContentRef;
    private handleContextMenu;
    private handleDoubleClick;
    private handleMouseEnter;
    private handleMouseLeave;
}
