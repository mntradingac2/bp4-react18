import * as React from "react";
import { IconName } from "@blueprintjs/icons";
import { AbstractPureComponent2, IntentProps, MaybeElement, Props } from "../../common";
export type { IconName };
export declare enum IconSize {
    STANDARD = 16,
    LARGE = 20
}
export declare type IconProps = IIconProps;
export interface IIconProps extends IntentProps, Props {
    children?: never;
    color?: string;
    htmlTitle?: string;
    icon: IconName | MaybeElement;
    iconSize?: number;
    size?: number;
    style?: React.CSSProperties;
    svgProps?: React.HTMLAttributes<SVGElement>;
    tagName?: keyof JSX.IntrinsicElements;
    title?: string | false | null;
}
export declare class Icon extends AbstractPureComponent2<IconProps & Omit<React.HTMLAttributes<HTMLElement>, "title">> {
    static displayName: string;
    render(): JSX.Element | null;
    private renderSvgPaths;
}
