import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
export interface IDividerProps extends Props, React.HTMLAttributes<HTMLElement> {
    tagName?: keyof JSX.IntrinsicElements;
}
export declare class Divider extends AbstractPureComponent2<IDividerProps> {
    static displayName: string;
    render(): JSX.Element;
}
