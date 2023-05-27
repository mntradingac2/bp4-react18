import * as React from "react";
import { ValidationMap } from "../../common/context";
import { Props } from "../../common/props";
import type { PortalLegacyContext } from "./portal";
export interface Portal2Props extends Props {
    children: React.ReactNode;
    onChildrenMount?: () => void;
    container?: HTMLElement;
}
export declare function Portal2(props: Portal2Props, legacyContext?: PortalLegacyContext): React.ReactPortal | null;
export declare namespace Portal2 {
    var defaultProps: {
        container: HTMLElement | undefined;
    };
    var displayName: string;
    var contextTypes: ValidationMap<PortalLegacyContext>;
}
