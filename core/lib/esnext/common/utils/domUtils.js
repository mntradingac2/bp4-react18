"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickElementOnKeyPress = exports.throttle = exports.throttleReactEventCallback = exports.throttleEvent = exports.getActiveElement = exports.elementIsTextInput = exports.elementIsOrContains = void 0;
function elementIsOrContains(element, testElement) {
    return element === testElement || element.contains(testElement);
}
exports.elementIsOrContains = elementIsOrContains;
function elementIsTextInput(elem) {
    if (elem == null || elem.closest == null) {
        return false;
    }
    const editable = elem.closest("input, textarea, [contenteditable=true]");
    if (editable == null) {
        return false;
    }
    if (editable.tagName.toLowerCase() === "input") {
        const inputType = editable.type;
        if (inputType === "checkbox" || inputType === "radio") {
            return false;
        }
    }
    if (editable.readOnly) {
        return false;
    }
    return true;
}
exports.elementIsTextInput = elementIsTextInput;
function getActiveElement(element, options) {
    if (element == null) {
        return document.activeElement;
    }
    const rootNode = (element.getRootNode(options) ?? document);
    return rootNode.activeElement;
}
exports.getActiveElement = getActiveElement;
function throttleEvent(target, eventName, newEventName) {
    const throttledFunc = throttleImpl((event) => {
        target.dispatchEvent(new CustomEvent(newEventName, event));
    });
    target.addEventListener(eventName, throttledFunc);
    return throttledFunc;
}
exports.throttleEvent = throttleEvent;
function throttleReactEventCallback(callback, options = {}) {
    const throttledFunc = throttleImpl(callback, (event2) => {
        if (options.preventDefault) {
            event2.preventDefault();
        }
    }, (event2) => event2.persist());
    return throttledFunc;
}
exports.throttleReactEventCallback = throttleReactEventCallback;
function throttle(method) {
    return throttleImpl(method);
}
exports.throttle = throttle;
function throttleImpl(onAnimationFrameRequested, onBeforeIsRunningCheck, onAfterIsRunningCheck) {
    let isRunning = false;
    const func = (...args) => {
        onBeforeIsRunningCheck?.(...args);
        if (isRunning) {
            return;
        }
        isRunning = true;
        onAfterIsRunningCheck?.(...args);
        requestAnimationFrame(() => {
            onAnimationFrameRequested(...args);
            isRunning = false;
        });
    };
    return func;
}
function clickElementOnKeyPress(keys) {
    return (e) => keys.some(key => e.key === key) && e.target.dispatchEvent(new MouseEvent("click", { ...e, view: undefined }));
}
exports.clickElementOnKeyPress = clickElementOnKeyPress;
//# sourceMappingURL=domUtils.js.map