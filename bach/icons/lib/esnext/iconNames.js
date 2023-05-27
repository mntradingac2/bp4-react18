/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable camelcase */
import { pascalCase, snakeCase } from "change-case";
// The two icon sets are identical aside from SVG paths, so we only need to import info for the 16px set
import { BlueprintIcons_16 } from "./generated-icons/16px/blueprint-icons-16";
const IconNamesNew = {};
const IconNamesLegacy = {};
for (const name of Object.values(BlueprintIcons_16)) {
    IconNamesNew[pascalCase(name)] = name;
    IconNamesLegacy[snakeCase(name).toUpperCase()] = name;
}
export const IconNames = {
    ...IconNamesNew,
    ...IconNamesLegacy,
};
//# sourceMappingURL=iconNames.js.map