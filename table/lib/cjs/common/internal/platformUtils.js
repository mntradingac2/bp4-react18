"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModKeyPressed = exports.isMac = void 0;
/**
 * Returns `true` if `navigator.platform` matches a known Mac platform, or
 * `false` otherwise.
 */
function isMac(platformOverride) {
    // HACKHACK: see https://github.com/palantir/blueprint/issues/5174
    // eslint-disable-next-line deprecation/deprecation
    var platform = platformOverride !== null && platformOverride !== void 0 ? platformOverride : (typeof navigator !== "undefined" ? navigator.platform : undefined);
    return platform === undefined ? false : /Mac|iPod|iPhone|iPad/.test(platform);
}
exports.isMac = isMac;
/**
 * Returns `true` if (1) the platform is Mac and the keypress includes the `cmd`
 * key, or (2) the platform is non-Mac and the keypress includes the `ctrl` key.
 */
var isModKeyPressed = function (event, platformOverride) {
    var isMacPlatform = isMac(platformOverride);
    return (isMacPlatform && event.metaKey) || (!isMacPlatform && event.ctrlKey);
};
exports.isModKeyPressed = isModKeyPressed;
//# sourceMappingURL=platformUtils.js.map