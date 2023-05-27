import * as React from "react";
import { AbstractPureComponent2, Props } from "../../common";
export declare type KeyComboTagProps = IKeyComboProps;
export interface IKeyComboProps extends Props {
    combo: string;
    minimal?: boolean;
}
export declare class KeyComboTag extends AbstractPureComponent2<KeyComboTagProps> {
    static displayName: string;
    render(): React.JSX.Element;
    private renderKey;
    private renderMinimalKey;
}
export declare const KeyCombo: typeof KeyComboTag;
