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
export class DragEvents {
    static DOUBLE_CLICK_TIMEOUT_MSEC = 500;
    /**
     * Returns true if the event includes a modifier key that often adds the result of the drag
     * event to any existing state. For example, holding CTRL before dragging may select another
     * region in addition to an existing one, while the absence of a modifier key may clear the
     * existing selection first.
     *
     * @param event the mouse event for the drag interaction
     */
    static isAdditive(event) {
        return event.ctrlKey || event.metaKey;
    }
    handler;
    element;
    activationCoordinates;
    doubleClickTimeoutToken;
    isActivated = false;
    isDragging = false;
    lastCoordinates;
    attach(element, handler) {
        this.detach();
        this.handler = handler;
        this.element = element;
        if (this.isValidDragHandler(handler)) {
            this.element.addEventListener("mousedown", this.handleMouseDown);
        }
        return this;
    }
    detach() {
        if (this.element != null) {
            this.element.removeEventListener("mousedown", this.handleMouseDown);
            this.detachDocumentEventListeners();
        }
    }
    isValidDragHandler(handler) {
        return (handler != null &&
            (handler.onActivate != null ||
                handler.onDragMove != null ||
                handler.onDragEnd != null ||
                handler.onClick != null ||
                handler.onDoubleClick != null));
    }
    attachDocumentEventListeners() {
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    }
    detachDocumentEventListeners() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    }
    initCoordinateData(event) {
        this.activationCoordinates = [event.clientX, event.clientY];
        this.lastCoordinates = this.activationCoordinates;
    }
    updateCoordinateData(event) {
        if (this.activationCoordinates === undefined) {
            // invalid state; we should have activation by this point
            return undefined;
        }
        const currentCoordinates = [event.clientX, event.clientY];
        const lastCoordinates = this.lastCoordinates ?? [0, 0];
        const deltaCoordinates = [
            currentCoordinates[0] - lastCoordinates[0],
            currentCoordinates[1] - lastCoordinates[1],
        ];
        const offsetCoordinates = [
            currentCoordinates[0] - this.activationCoordinates[0],
            currentCoordinates[1] - this.activationCoordinates[1],
        ];
        const data = {
            activation: this.activationCoordinates,
            current: currentCoordinates,
            delta: deltaCoordinates,
            last: lastCoordinates,
            offset: offsetCoordinates,
        };
        this.lastCoordinates = [event.clientX, event.clientY];
        return data;
    }
    maybeAlterEventChain(event) {
        if (this.handler?.preventDefault) {
            event.preventDefault();
        }
        if (this.handler?.stopPropagation) {
            event.stopPropagation();
        }
    }
    handleMouseDown = (event) => {
        this.initCoordinateData(event);
        if (this.handler != null && this.handler.onActivate != null) {
            const exitCode = this.handler.onActivate(event);
            if (exitCode === false) {
                return;
            }
        }
        this.isActivated = true;
        this.maybeAlterEventChain(event);
        // It is possible that the mouseup would not be called after the initial
        // mousedown (for example if the mouse is moved out of the window). So,
        // we preemptively detach to avoid duplicate listeners.
        this.detachDocumentEventListeners();
        this.attachDocumentEventListeners();
    };
    handleMouseMove = (event) => {
        this.maybeAlterEventChain(event);
        if (this.isActivated) {
            this.isDragging = true;
        }
        if (this.isDragging) {
            const coords = this.updateCoordinateData(event);
            if (coords !== undefined) {
                this.handler?.onDragMove?.(event, coords);
            }
        }
    };
    handleMouseUp = (event) => {
        this.maybeAlterEventChain(event);
        if (this.handler != null) {
            if (this.isDragging) {
                const coords = this.updateCoordinateData(event);
                if (coords !== undefined) {
                    this.handler?.onDragMove?.(event, coords);
                    this.handler?.onDragEnd?.(event, coords);
                }
            }
            else if (this.isActivated) {
                if (this.handler.onDoubleClick != null) {
                    if (this.doubleClickTimeoutToken == null) {
                        // if this the first click of a possible double-click,
                        // we delay the firing of the click event by the
                        // timeout.
                        this.doubleClickTimeoutToken = window.setTimeout(() => {
                            delete this.doubleClickTimeoutToken;
                            this.handler?.onClick?.(event);
                        }, DragEvents.DOUBLE_CLICK_TIMEOUT_MSEC);
                    }
                    else {
                        // otherwise, this is the second click in the double-
                        // click so we cancel the single-click timeout and
                        // fire the double-click event.
                        window.clearTimeout(this.doubleClickTimeoutToken);
                        delete this.doubleClickTimeoutToken;
                        this.handler.onDoubleClick(event);
                    }
                }
                else if (this.handler.onClick != null) {
                    this.handler.onClick(event);
                }
            }
        }
        this.isActivated = false;
        this.isDragging = false;
        this.detachDocumentEventListeners();
    };
}
//# sourceMappingURL=dragEvents.js.map