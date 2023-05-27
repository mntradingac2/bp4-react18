import * as React from "react";
export declare function isReactNodeEmpty(node?: React.ReactNode, skipArray?: boolean): boolean;
export declare function ensureElement(child: React.ReactNode | undefined, tagName?: keyof JSX.IntrinsicElements): React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
interface INamed {
    name?: string;
}
export declare function getDisplayName(ComponentClass: React.ComponentType | INamed): string;
export declare function isElementOfType<P = {}>(element: any, ComponentType: React.ComponentType<P>): element is React.ReactElement<P>;
export {};
