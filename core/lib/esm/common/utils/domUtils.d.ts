export declare function elementIsOrContains(element: HTMLElement, testElement: HTMLElement): boolean;
export declare function elementIsTextInput(elem: HTMLElement): boolean;
export declare function getActiveElement(element?: HTMLElement | null, options?: GetRootNodeOptions): Element | null;
export declare function throttleEvent(target: EventTarget, eventName: string, newEventName: string): (event: Event) => void;
export interface IThrottledReactEventOptions {
    preventDefault?: boolean;
}
export declare function throttleReactEventCallback<E extends React.SyntheticEvent = React.SyntheticEvent>(callback: (event: E, ...otherArgs: any[]) => any, options?: IThrottledReactEventOptions): (event2: E) => void;
export declare function throttle<T extends Function>(method: T): T;
export declare function clickElementOnKeyPress(keys: string[]): (e: React.KeyboardEvent) => boolean;
