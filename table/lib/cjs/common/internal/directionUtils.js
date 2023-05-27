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
exports.directionToDelta = void 0;
var direction_1 = require("../direction");
function directionToDelta(direction) {
    switch (direction) {
        case direction_1.Direction.UP:
            return { rows: -1, cols: 0 };
        case direction_1.Direction.DOWN:
            return { rows: +1, cols: 0 };
        case direction_1.Direction.LEFT:
            return { rows: 0, cols: -1 };
        case direction_1.Direction.RIGHT:
            return { rows: 0, cols: +1 };
    }
}
exports.directionToDelta = directionToDelta;
//# sourceMappingURL=directionUtils.js.map