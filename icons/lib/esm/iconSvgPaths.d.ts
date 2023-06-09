import * as IconSvgPaths16 from "./generated-icons/16px/paths";
import * as IconSvgPaths20 from "./generated-icons/20px/paths";
import type { IconName } from "./iconNames";
import type { PascalCase } from "./type-utils";
export { IconSvgPaths16, IconSvgPaths20 };
/**
 * Type safe string literal conversion of snake-case icon names to PascalCase icon names.
 * This is useful for indexing into the SVG paths record to extract a single icon's SVG path definition.
 */
export declare function iconNameToPathsRecordKey(name: IconName): PascalCase<IconName>;
