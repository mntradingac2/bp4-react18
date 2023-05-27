import * as React from "react";
export interface PortalContextOptions {
    portalClassName?: string;
}
export declare const PortalContext: React.Context<PortalContextOptions>;
export declare const PortalProvider: ({ children, ...options }: React.PropsWithChildren<PortalContextOptions>) => React.JSX.Element;
