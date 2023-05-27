import * as React from "react";
export declare abstract class AbstractPureComponent<P, S = {}> extends React.PureComponent<P, S> {
    protected displayName: never;
    private timeoutIds;
    constructor(props: P, context?: any);
    componentWillReceiveProps(nextProps: P & {
        children?: React.ReactNode;
    }): void;
    componentWillUnmount(): void;
    setTimeout(callback: () => void, timeout?: number): () => void;
    clearTimeouts: () => void;
    protected validateProps(_props: P & {
        children?: React.ReactNode;
    }): void;
}
