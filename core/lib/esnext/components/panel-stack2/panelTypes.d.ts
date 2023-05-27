export interface Panel<P> {
    renderPanel: (props: PanelProps<P>) => JSX.Element | null;
    htmlTitle?: string;
    props?: P;
    title?: React.ReactNode;
}
export interface PanelActions {
    closePanel(): void;
    openPanel<P>(panel: Panel<P>): void;
}
export declare type PanelProps<P> = P & PanelActions;
