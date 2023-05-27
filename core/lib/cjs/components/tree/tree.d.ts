import * as React from "react";
import { Props } from "../../common/props";
import { TreeNodeInfo } from "./treeNode";
export declare type TreeEventHandler<T = {}> = (node: TreeNodeInfo<T>, nodePath: number[], e: React.MouseEvent<HTMLElement>) => void;
export declare type TreeProps<T = {}> = ITreeProps<T>;
export interface ITreeProps<T = {}> extends Props {
    contents: ReadonlyArray<TreeNodeInfo<T>>;
    onNodeClick?: TreeEventHandler<T>;
    onNodeCollapse?: TreeEventHandler<T>;
    onNodeContextMenu?: TreeEventHandler<T>;
    onNodeDoubleClick?: TreeEventHandler<T>;
    onNodeExpand?: TreeEventHandler<T>;
    onNodeMouseEnter?: TreeEventHandler<T>;
    onNodeMouseLeave?: TreeEventHandler<T>;
}
export declare class Tree<T = {}> extends React.Component<TreeProps<T>> {
    static displayName: string;
    static ofType<U>(): new (props: TreeProps<U>) => Tree<U>;
    static nodeFromPath<U>(path: readonly number[], treeNodes?: ReadonlyArray<TreeNodeInfo<U>>): TreeNodeInfo<U>;
    private nodeRefs;
    render(): React.JSX.Element;
    getNodeContentElement(nodeId: string | number): HTMLElement | undefined;
    private renderNodes;
    private handleNodeCollapse;
    private handleNodeClick;
    private handleContentRef;
    private handleNodeContextMenu;
    private handleNodeDoubleClick;
    private handleNodeExpand;
    private handleNodeMouseEnter;
    private handleNodeMouseLeave;
    private handlerHelper;
}
