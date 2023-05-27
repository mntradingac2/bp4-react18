import * as React from "react";
export interface IPanel<P = {}> {
    component: React.ComponentType<P & IPanelProps>;
    htmlTitle?: string;
    props?: P;
    title?: React.ReactNode;
}
export interface IPanelProps {
    closePanel(): void;
    openPanel<P>(panel: IPanel<P>): void;
}
