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
exports.DragEvents = void 0;
var DragEvents = /** @class */ (function () {
    function DragEvents() {
        var _this = this;
        this.isActivated = false;
        this.isDragging = false;
        this.handleMouseDown = function (event) {
            _this.initCoordinateData(event);
            if (_this.handler != null && _this.handler.onActivate != null) {
                var exitCode = _this.handler.onActivate(event);
                if (exitCode === false) {
                    return;
                }
            }
            _this.isActivated = true;
            _this.maybeAlterEventChain(event);
            // It is possible that the mouseup would not be called after the initial
            // mousedown (for example if the mouse is moved out of the window). So,
            // we preemptively detach to avoid duplicate listeners.
            _this.detachDocumentEventListeners();
            _this.attachDocumentEventListeners();
        };
        this.handleMouseMove = function (event) {
            var _a, _b;
            _this.maybeAlterEventChain(event);
            if (_this.isActivated) {
                _this.isDragging = true;
            }
            if (_this.isDragging) {
                var coords = _this.updateCoordinateData(event);
                if (coords !== undefined) {
                    (_b = (_a = _this.handler) === null || _a === void 0 ? void 0 : _a.onDragMove) === null || _b === void 0 ? void 0 : _b.call(_a, event, coords);
                }
            }
        };
        this.handleMouseUp = function (event) {
            var _a, _b, _c, _d;
            _this.maybeAlterEventChain(event);
            if (_this.handler != null) {
                if (_this.isDragging) {
                    var coords = _this.updateCoordinateData(event);
                    if (coords !== undefined) {
                        (_b = (_a = _this.handler) === null || _a === void 0 ? void 0 : _a.onDragMove) === null || _b === void 0 ? void 0 : _b.call(_a, event, coords);
                        (_d = (_c = _this.handler) === null || _c === void 0 ? void 0 : _c.onDragEnd) === null || _d === void 0 ? void 0 : _d.call(_c, event, coords);
                    }
                }
                else if (_this.isActivated) {
                    if (_this.handler.onDoubleClick != null) {
                        if (_this.doubleClickTimeoutToken == null) {
                            // if this the first click of a possible double-click,
                            // we delay the firing of the click event by the
                            // timeout.
                            _this.doubleClickTimeoutToken = window.setTimeout(function () {
                                var _a, _b;
                                delete _this.doubleClickTimeoutToken;
                                (_b = (_a = _this.handler) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                            }, DragEvents.DOUBLE_CLICK_TIMEOUT_MSEC);
                        }
                        else {
                            // otherwise, this is the second click in the double-
                            // click so we cancel the single-click timeout and
                            // fire the double-click event.
                            window.clearTimeout(_this.doubleClickTimeoutToken);
                            delete _this.doubleClickTimeoutToken;
                            _this.handler.onDoubleClick(event);
                        }
                    }
                    else if (_this.handler.onClick != null) {
                        _this.handler.onClick(event);
                    }
                }
            }
            _this.isActivated = false;
            _this.isDragging = false;
            _this.detachDocumentEventListeners();
        };
    }
    /**
     * Returns true if the event includes a modifier key that often adds the result of the drag
     * event to any existing state. For example, holding CTRL before dragging may select another
     * region in addition to an existing one, while the absence of a modifier key may clear the
     * existing selection first.
     *
     * @param event the mouse event for the drag interaction
     */
    DragEvents.isAdditive = function (event) {
        return event.ctrlKey || event.metaKey;
    };
    DragEvents.prototype.attach = function (element, handler) {
        this.detach();
        this.handler = handler;
        this.element = element;
        if (this.isValidDragHandler(handler)) {
            this.element.addEventListener("mousedown", this.handleMouseDown);
        }
        return this;
    };
    DragEvents.prototype.detach = function () {
        if (this.element != null) {
            this.element.removeEventListener("mousedown", this.handleMouseDown);
            this.detachDocumentEventListeners();
        }
    };
    DragEvents.prototype.isValidDragHandler = function (handler) {
        return (handler != null &&
            (handler.onActivate != null ||
                handler.onDragMove != null ||
                handler.onDragEnd != null ||
                handler.onClick != null ||
                handler.onDoubleClick != null));
    };
    DragEvents.prototype.attachDocumentEventListeners = function () {
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    };
    DragEvents.prototype.detachDocumentEventListeners = function () {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    };
    DragEvents.prototype.initCoordinateData = function (event) {
        this.activationCoordinates = [event.clientX, event.clientY];
        this.lastCoordinates = this.activationCoordinates;
    };
    DragEvents.prototype.updateCoordinateData = function (event) {
        var _a;
        if (this.activationCoordinates === undefined) {
            // invalid state; we should have activation by this point
            return undefined;
        }
        var currentCoordinates = [event.clientX, event.clientY];
        var lastCoordinates = (_a = this.lastCoordinates) !== null && _a !== void 0 ? _a : [0, 0];
        var deltaCoordinates = [
            currentCoordinates[0] - lastCoordinates[0],
            currentCoordinates[1] - lastCoordinates[1],
        ];
        var offsetCoordinates = [
            currentCoordinates[0] - this.activationCoordinates[0],
            currentCoordinates[1] - this.activationCoordinates[1],
        ];
        var data = {
            activation: this.activationCoordinates,
            current: currentCoordinates,
            delta: deltaCoordinates,
            last: lastCoordinates,
            offset: offsetCoordinates,
        };
        this.lastCoordinates = [event.clientX, event.clientY];
        return data;
    };
    DragEvents.prototype.maybeAlterEventChain = function (event) {
        var _a, _b;
        if ((_a = this.handler) === null || _a === void 0 ? void 0 : _a.preventDefault) {
            event.preventDefault();
        }
        if ((_b = this.handler) === null || _b === void 0 ? void 0 : _b.stopPropagation) {
            event.stopPropagation();
        }
    };
    DragEvents.DOUBLE_CLICK_TIMEOUT_MSEC = 500;
    return DragEvents;
}());
exports.DragEvents = DragEvents;
//# sourceMappingURL=dragEvents.js.map