import * as React from "react";
export declare abstract class AbstractComponent<P, S> extends React.Component<P, S> {
    protected displayName: never;
    private timeoutIds;
    constructor(props: P, context?: any);
    componentWillReceiveProps(nextProps: P & {
        children?: React.ReactNode;
    }): void;
    componentWillUnmount(): void;
    setTimeout(callback: () => void, timeout?: number): () => void;
    clearTimeouts: () => void;
    protected validateProps(_: P & {
        children?: React.ReactNode;
    }): void;
}
