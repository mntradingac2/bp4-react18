import * as React from "react";
import { AbstractPureComponent2, Elevation } from "../../common";
import { HTMLDivProps, Props } from "../../common/props";
export declare type CardProps = ICardProps;
export interface ICardProps extends Props, HTMLDivProps {
    elevation?: Elevation;
    interactive?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export declare class Card extends AbstractPureComponent2<CardProps> {
    static displayName: string;
    static defaultProps: CardProps;
    render(): React.JSX.Element;
}
