import * as React from "react";
export declare abstract class AbstractPureComponent2<P, S = {}, SS = {}> extends React.PureComponent<P, S, SS> {
    componentWillUpdate: never;
    componentWillReceiveProps: never;
    componentWillMount: never;
    getDerivedStateFromProps: never;
    protected displayName: never;
    private timeoutIds;
    private requestIds;
    constructor(props: P, context?: any);
    componentDidUpdate(_prevProps: P, _prevState: S, _snapshot?: SS): void;
    componentWillUnmount(): void;
    requestAnimationFrame(callback: () => void): () => void;
    setTimeout(callback: () => void, timeout?: number): () => void;
    clearTimeouts: () => void;
    cancelAnimationFrames: () => void;
    protected validateProps(_props: P): void;
}
