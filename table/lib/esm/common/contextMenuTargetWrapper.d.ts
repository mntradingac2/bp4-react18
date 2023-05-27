/**
 * @fileoverview This component is DEPRECATED, and the code is frozen.
 * Table components should use ContextMenu2 instead.
 */
import * as React from "react";
import { IProps } from "@blueprintjs/core";
export interface IContextMenuTargetWrapper extends IProps {
    children?: React.ReactNode;
    renderContextMenu: (e: React.MouseEvent<HTMLElement>) => JSX.Element | undefined;
    style: React.CSSProperties;
}
/**
 * Since the ContextMenuTarget uses the `onContextMenu` prop instead
 * `element.addEventListener`, the prop can be lost. This wrapper helps us
 * maintain context menu fuctionality when doing fancy React.cloneElement
 * chains.
 *
 * @deprecated use ContextMenu2 instead
 */
export declare class ContextMenuTargetWrapper extends React.PureComponent<IContextMenuTargetWrapper> {
    render(): JSX.Element;
    renderContextMenu(e: React.MouseEvent<HTMLElement>): JSX.Element | undefined;
}
