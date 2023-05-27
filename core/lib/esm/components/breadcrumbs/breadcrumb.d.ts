import * as React from "react";
import { ActionProps, LinkProps } from "../../common/props";
export declare type BreadcrumbProps = IBreadcrumbProps;
export interface IBreadcrumbProps extends ActionProps<HTMLAnchorElement>, LinkProps {
    children?: React.ReactNode;
    current?: boolean;
    iconTitle?: string;
}
export declare const Breadcrumb: React.FC<BreadcrumbProps>;
