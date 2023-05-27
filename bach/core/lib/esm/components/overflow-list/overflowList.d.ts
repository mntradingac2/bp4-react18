import * as React from "react";
import { Boundary } from "../../common/boundary";
import { Props } from "../../common/props";
export declare type OverflowListProps<T> = IOverflowListProps<T>;
export interface IOverflowListProps<T> extends Props {
    alwaysRenderOverflow?: boolean;
    collapseFrom?: Boundary;
    items: readonly T[];
    minVisibleItems?: number;
    observeParents?: boolean;
    onOverflow?: (overflowItems: T[]) => void;
    overflowRenderer: (overflowItems: T[]) => React.ReactNode;
    style?: React.CSSProperties;
    tagName?: keyof JSX.IntrinsicElements;
    visibleItemRenderer: (item: T, index: number) => React.ReactChild;
}
export interface IOverflowListState<T> {
    repartitioning: boolean;
    lastOverflowCount: number;
    overflow: readonly T[];
    visible: readonly T[];
    chopSize: number;
    lastChopSize: number | null;
}
export declare class OverflowList<T> extends React.Component<OverflowListProps<T>, IOverflowListState<T>> {
    static displayName: string;
    static defaultProps: Partial<OverflowListProps<any>>;
    static ofType<U>(): new (props: OverflowListProps<U>) => OverflowList<U>;
    state: IOverflowListState<T>;
    private spacer;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: OverflowListProps<T>, nextState: IOverflowListState<T>): boolean;
    componentDidUpdate(prevProps: OverflowListProps<T>, prevState: IOverflowListState<T>): void;
    render(): React.JSX.Element;
    private maybeRenderOverflow;
    private resize;
    private repartition;
    private defaultChopSize;
    private isFirstPartitionCycle;
}
