import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
export declare type CollapseProps = ICollapseProps;
export interface ICollapseProps extends Props {
    children?: React.ReactNode;
    component?: React.ElementType;
    isOpen?: boolean;
    keepChildrenMounted?: boolean;
    transitionDuration?: number;
}
export interface ICollapseState {
    animationState: AnimationStates;
    height: string | undefined;
    heightWhenOpen: number | undefined;
}
export declare enum AnimationStates {
    OPEN_START = 0,
    OPENING = 1,
    OPEN = 2,
    CLOSING_START = 3,
    CLOSING = 4,
    CLOSED = 5
}
export declare class Collapse extends AbstractPureComponent2<CollapseProps, ICollapseState> {
    static displayName: string;
    static defaultProps: Partial<CollapseProps>;
    static getDerivedStateFromProps(props: CollapseProps, state: ICollapseState): {
        animationState: AnimationStates;
        height?: undefined;
    } | {
        animationState: AnimationStates;
        height: string;
    } | null;
    state: ICollapseState;
    private contents;
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private contentsRefHandler;
    private onDelayedStateChange;
}
