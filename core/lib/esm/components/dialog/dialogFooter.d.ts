import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Props } from "../../common/props";
export interface DialogFooterProps extends Props {
    children?: React.ReactNode;
    actions?: React.ReactNode;
    minimal?: boolean;
}
export declare class DialogFooter extends AbstractPureComponent2<DialogFooterProps> {
    static defaultProps: DialogFooterProps;
    render(): React.JSX.Element;
    private renderMainSection;
    private maybeRenderActionsSection;
}
