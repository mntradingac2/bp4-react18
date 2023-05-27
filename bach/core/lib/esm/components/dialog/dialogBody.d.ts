import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
export interface DialogBodyProps extends Props {
    children?: React.ReactNode;
    useOverflowScrollContainer?: boolean;
}
export declare class DialogBody extends AbstractPureComponent2<DialogBodyProps> {
    static defaultProps: DialogBodyProps;
    render(): React.JSX.Element;
}
