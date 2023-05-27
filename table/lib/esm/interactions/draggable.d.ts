import * as React from "react";
import { Props } from "@blueprintjs/core";
import { IDragHandler } from "./dragTypes";
export interface IDraggableProps extends Props, IDragHandler {
    children?: React.ReactNode;
}
/**
 * This component provides a simple interface for combined drag and/or click
 * events.
 *
 * Since the mouse interactions for drag and click are overloaded, here are
 * the events that will fire in these cases:
 *
 * A Click Interaction
 * 1. The user presses down on the render element, triggering the onActivate
 *    callback.
 * 2. The user releases the mouse button without moving it, triggering the
 *    onClick callback.
 *
 * A Drag Interaction
 * 1. The user presses down on the render element, triggering the onActivate
 *    callback.
 * 2. The user moves the mouse, triggering the onDragMove callback.
 * 3. The user moves the mouse, triggering the onDragMove callback.
 * 4. The user moves the mouse, triggering the onDragMove callback.
 * 5. The user releases the mouse button, triggering a final onDragMove
 *    callback as well as an onDragEnd callback.
 *
 * If `false` is returned from the onActivate callback, no further events
 * will be fired until the next activation.
 */
export declare class Draggable extends React.PureComponent<IDraggableProps> {
    static defaultProps: {
        preventDefault: boolean;
        stopPropagation: boolean;
    };
    private events?;
    render(): boolean | {} | React.ReactChild | React.ReactPortal | null | undefined;
    componentDidUpdate(prevProps: IDraggableProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
