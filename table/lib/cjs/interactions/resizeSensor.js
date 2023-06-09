"use strict";
/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
exports.ResizeSensor = void 0;
var tslib_1 = require("tslib");
var Classes = tslib_1.__importStar(require("../common/classes"));
/* eslint-disable @typescript-eslint/no-extraneous-class */
/**
 * Efficiently detect when an HTMLElement is resized.
 *
 * Attaches an invisible "resize-sensor" div to the element. Then it checks
 * the element's offsetWidth and offsetHeight whenever a scroll event is
 * triggered on the "resize-sensor" children. These events are further
 * debounced using requestAnimationFrame.
 *
 * Inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
 */
var ResizeSensor = /** @class */ (function () {
    function ResizeSensor() {
    }
    ResizeSensor.attach = function (element, callback) {
        var lifecycle = ResizeSensor.debounce(callback);
        var resizeSensor = document.createElement("div");
        resizeSensor.className = Classes.TABLE_RESIZE_SENSOR;
        resizeSensor.style.cssText = ResizeSensor.RESIZE_SENSOR_STYLE;
        resizeSensor.innerHTML = ResizeSensor.RESIZE_SENSOR_HTML;
        element.appendChild(resizeSensor);
        if (getComputedStyle(element, null).getPropertyValue("position") === "static") {
            element.style.position = "relative";
        }
        var expand = resizeSensor.childNodes[0];
        var expandChild = expand.childNodes[0];
        var shrink = resizeSensor.childNodes[1];
        var reset = function () {
            expandChild.style.width = "100000px";
            expandChild.style.height = "100000px";
            expand.scrollLeft = 100000;
            expand.scrollTop = 100000;
            shrink.scrollLeft = 100000;
            shrink.scrollTop = 100000;
        };
        reset();
        var lastWidth;
        var lastHeight;
        var onScroll = function () {
            if (element == null) {
                return;
            }
            var currentWidth = element.offsetWidth;
            var currentHeight = element.offsetHeight;
            if (currentWidth !== lastWidth || currentHeight !== lastHeight) {
                lastWidth = currentWidth;
                lastHeight = currentHeight;
                lifecycle.trigger();
            }
            reset();
        };
        expand.addEventListener("scroll", onScroll);
        shrink.addEventListener("scroll", onScroll);
        return function () {
            element.removeChild(resizeSensor);
            lifecycle.cancelled = true;
        };
    };
    ResizeSensor.debounce = function (callback) {
        var scope = {
            cancelled: false,
            trigger: function () {
                if (scope.triggered || scope.cancelled) {
                    return;
                }
                scope.triggered = true;
                requestAnimationFrame(function () {
                    scope.triggered = false;
                    if (!scope.cancelled) {
                        callback();
                    }
                });
            },
            triggered: false,
        };
        return scope;
    };
    ResizeSensor.RESIZE_SENSOR_STYLE = "position: absolute; left: 0; top: 0; right: 0; " +
        "bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;";
    ResizeSensor.RESIZE_SENSOR_HTML = "<div class=\"".concat(Classes.TABLE_RESIZE_SENSOR_EXPAND, "\"\n        style=\"").concat(ResizeSensor.RESIZE_SENSOR_STYLE, "\"><div style=\"position: absolute; left: 0; top: 0; transition: 0s;\"\n        ></div></div><div class=\"").concat(Classes.TABLE_RESIZE_SENSOR_SHRINK, "\" style=\"").concat(ResizeSensor.RESIZE_SENSOR_STYLE, "\"\n        ><div style=\"position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%;\"></div></div>");
    return ResizeSensor;
}());
exports.ResizeSensor = ResizeSensor;
//# sourceMappingURL=resizeSensor.js.map