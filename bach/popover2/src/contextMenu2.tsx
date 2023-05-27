/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import classNames from "classnames";
import * as React from "react";

import { Utils as CoreUtils, mergeRefs, Props } from "@blueprintjs/core";

import * as Classes from "./classes";
import { ContextMenu2Popover } from "./contextMenu2Popover";
import { ContextMenu2PopoverOptions, Offset } from "./contextMenu2Shared";
import { Tooltip2Context, Tooltip2Provider } from "./tooltip2Context";

/**
 * Render props relevant to the _content_ of a context menu (rendered as the underlying Popover's content).
 */
export interface ContextMenu2ContentProps {
    /** Whether the context menu is currently open. */
    isOpen: boolean;

    /**
     * The computed target offset (x, y) coordinates for the context menu click event.
     * On first render, before any context menu click event has occurred, this will be undefined.
     */
    targetOffset: Offset | undefined;

    /** The context menu click event. If isOpen is false, this will be undefined. */
    mouseEvent: React.MouseEvent<HTMLElement> | undefined;
}

/** @deprecated use ContextMenu2ContentProps */
export type ContextMenu2RenderProps = ContextMenu2ContentProps;

/**
 * Render props for advanced usage of ContextMenu.
 */
export interface ContextMenu2ChildrenProps {
    /** Context menu container element class */
    className: string;

    /** Render props relevant to the content of this context menu */
    contentProps: ContextMenu2ContentProps;

    /** Context menu handler which implements the custom context menu interaction */
    onContextMenu: React.MouseEventHandler<HTMLElement>;

    /** Popover element rendered by ContextMenu, used to establish a click target to position the menu */
    popover: JSX.Element | undefined;

    /** DOM ref for the context menu target, used to detect dark theme */
    ref: React.Ref<any>;
}

export interface ContextMenu2Props
    extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "className" | "onContextMenu">,
        React.RefAttributes<any>,
        Props {
    /**
     * Menu content. This will usually be a Blueprint `<Menu>` component.
     * This optionally functions as a render prop so you can use component state to render content.
     */
    content: JSX.Element | ((props: ContextMenu2ContentProps) => JSX.Element | undefined) | undefined;

    /**
     * The context menu target. This may optionally be a render function so you can use
     * component state to render the target.
     */
    children: React.ReactNode | ((props: ContextMenu2ChildrenProps) => React.ReactElement);

    /**
     * Whether the context menu is disabled.
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * Callback invoked when the popover overlay closes.
     */
    onClose?: () => void;

    /**
     * An optional context menu event handler. This can be useful if you want to do something with the
     * mouse event unrelated to rendering the context menu itself, especially if that involves setting
     * React state (which is an error to do in the render code path of this component).
     */
    onContextMenu?: React.MouseEventHandler<HTMLElement>;

    /**
     * A limited subset of props to forward along to the popover overlay generated by this component.
     */
    popoverProps?: ContextMenu2PopoverOptions;

    /**
     * HTML tag to use for container element. Only used if this component's children are specified as
     * React node(s), not when it is a render function (in that case, you get to render whatever tag
     * you wish).
     *
     * @default "div"
     */
    tagName?: keyof JSX.IntrinsicElements;
}

/**
 * Context menu (v2) component.
 *
 * @see https://blueprintjs.com/docs/#popover2-package/context-menu2
 */
export const ContextMenu2: React.FC<ContextMenu2Props> = React.forwardRef<any, ContextMenu2Props>((props, userRef) => {
    const {
        className,
        children,
        content,
        disabled = false,
        onClose,
        onContextMenu,
        popoverProps,
        tagName = "div",
        ...restProps
    } = props;

    // ancestor Tooltip2Context state doesn't affect us since we don't care about parent ContextMenu2s, we only want to
    // force disable parent Tooltip2s in certain cases through dispatching actions
    // N.B. any calls to this dispatch function will be no-ops if there is no Tooltip2Provider ancestor of this component
    const [, tooltipCtxDispatch] = React.useContext(Tooltip2Context);
    // click target offset relative to the viewport (e.clientX/clientY), since the target will be rendered in a Portal
    const [targetOffset, setTargetOffset] = React.useState<Offset | undefined>(undefined);
    // hold a reference to the click mouse event to pass to content/child render functions
    const [mouseEvent, setMouseEvent] = React.useState<React.MouseEvent<HTMLElement>>();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    // we need a ref on the child element (or the wrapper we generate) to check for dark theme
    const childRef = React.useRef<HTMLDivElement>(null);

    // If disabled prop is changed, we don't want our old context menu to stick around.
    // If it has just been enabled (disabled = false), then the menu ought to be opened by
    // a new mouse event. Users should not be updating this prop in the onContextMenu callback
    // for this component (that will lead to unpredictable behavior).
    React.useEffect(() => {
        setIsOpen(false);
        tooltipCtxDispatch({ type: "RESET_DISABLED_STATE" });
    }, [disabled]);

    const handlePopoverClose = React.useCallback(() => {
        setIsOpen(false);
        setMouseEvent(undefined);
        tooltipCtxDispatch({ type: "RESET_DISABLED_STATE" });
        onClose?.();
    }, []);

    // if the menu was just opened, we should check for dark theme (but don't do this on every render)
    const isDarkTheme = React.useMemo(() => CoreUtils.isDarkTheme(childRef.current), [childRef, isOpen]);

    // only render the popover if there is content in the context menu;
    // this avoid doing unnecessary rendering & computation
    const contentProps: ContextMenu2ContentProps = { isOpen, mouseEvent, targetOffset };
    const menu = disabled ? undefined : CoreUtils.isFunction(content) ? content(contentProps) : content;
    const maybePopover =
        menu === undefined ? undefined : (
            <ContextMenu2Popover
                {...popoverProps}
                content={menu}
                isDarkTheme={isDarkTheme}
                isOpen={isOpen}
                targetOffset={targetOffset}
                onClose={handlePopoverClose}
            />
        );

    const handleContextMenu = React.useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            // support nested menus (inner menu target would have called preventDefault())
            if (e.defaultPrevented) {
                return;
            }

            // If disabled, we should avoid this extra work.
            // Otherwise: if using the child or content function APIs, we need to make sure contentProps gets updated,
            // so we handle the event regardless of whether the consumer returned an undefined menu.
            const shouldHandleEvent =
                !disabled &&
                (CoreUtils.isFunction(children) || CoreUtils.isFunction(content) || maybePopover !== undefined);

            if (shouldHandleEvent) {
                e.preventDefault();
                e.persist();
                setMouseEvent(e);
                setTargetOffset({ left: e.clientX, top: e.clientY });
                setIsOpen(true);
                tooltipCtxDispatch({ type: "FORCE_DISABLED_STATE" });
            }

            onContextMenu?.(e);
        },
        [onContextMenu, disabled],
    );

    const containerClassName = classNames(className, Classes.CONTEXT_MENU2);

    const child = CoreUtils.isFunction(children) ? (
        children({
            className: containerClassName,
            contentProps,
            onContextMenu: handleContextMenu,
            popover: maybePopover,
            ref: childRef,
        })
    ) : (
        <>
            {maybePopover}
            {React.createElement<React.HTMLAttributes<any>>(
                tagName,
                {
                    className: containerClassName,
                    onContextMenu: handleContextMenu,
                    ref: mergeRefs(childRef, userRef),
                    ...restProps,
                },
                children,
            )}
        </>
    );

    // force descendant Tooltip2s to be disabled when this context menu is open
    return <Tooltip2Provider forceDisable={isOpen}>{child}</Tooltip2Provider>;
});
ContextMenu2.displayName = "Blueprint.ContextMenu2";