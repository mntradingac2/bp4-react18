import * as React from "react";
import { HotkeyConfig } from "@blueprintjs/core";
import type { ColumnProps } from "./column";
import { RegionCardinality } from "./regions";
import type { TableHotkeys } from "./tableHotkeys";
import type { TablePropsWithDefaults } from "./tableProps";
export declare function isSelectionModeEnabled(props: TablePropsWithDefaults, selectionMode: RegionCardinality, selectionModes?: RegionCardinality[]): boolean;
export declare function getHotkeysFromProps(props: TablePropsWithDefaults, hotkeysImpl: TableHotkeys): HotkeyConfig[];
/**
 * @returns true if new and old children arrays are the same
 */
export declare function compareChildren(newChildren: Array<React.ReactElement<ColumnProps>>, oldChildren: Array<React.ReactElement<ColumnProps>>): boolean;
