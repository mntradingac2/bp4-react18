import * as React from "react";
import { AbstractPureComponent2, HTMLDivProps, Intent, IntentProps, MaybeElement, Props } from "../../common";
import { IconName } from "../icon/icon";
export declare type CalloutProps = ICalloutProps;
export interface ICalloutProps extends IntentProps, Props, HTMLDivProps {
    children?: React.ReactNode;
    icon?: IconName | MaybeElement;
    intent?: Intent;
    title?: string;
}
export declare class Callout extends AbstractPureComponent2<CalloutProps> {
    static displayName: string;
    render(): React.JSX.Element;
    private getIconName;
}
