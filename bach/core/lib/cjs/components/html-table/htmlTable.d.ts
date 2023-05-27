import * as React from "react";
import { AbstractPureComponent2, IElementRefProps } from "../../common";
export declare type HTMLTableProps = IHTMLTableProps;
export interface IHTMLTableProps extends React.TableHTMLAttributes<HTMLTableElement>, IElementRefProps<HTMLTableElement> {
    bordered?: boolean;
    compact?: boolean;
    condensed?: boolean;
    interactive?: boolean;
    striped?: boolean;
}
export declare class HTMLTable extends AbstractPureComponent2<HTMLTableProps> {
    render(): React.JSX.Element;
}
