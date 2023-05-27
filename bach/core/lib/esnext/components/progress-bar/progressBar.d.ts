import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IntentProps, Props } from "../../common/props";
export declare type ProgressBarProps = IProgressBarProps;
export interface IProgressBarProps extends Props, IntentProps {
    animate?: boolean;
    stripes?: boolean;
    value?: number;
}
export declare class ProgressBar extends AbstractPureComponent2<ProgressBarProps> {
    static displayName: string;
    render(): React.JSX.Element;
}
