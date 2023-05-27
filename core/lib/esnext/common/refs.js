"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refHandler = exports.getRef = exports.mergeRefs = exports.combineRefs = exports.setRef = exports.isRefCallback = exports.isRefObject = void 0;
function isRefObject(value) {
    return value != null && typeof value !== "function";
}
exports.isRefObject = isRefObject;
function isRefCallback(value) {
    return typeof value === "function";
}
exports.isRefCallback = isRefCallback;
function setRef(refTarget, ref) {
    if (isRefObject(refTarget)) {
        refTarget.current = ref;
    }
    else if (isRefCallback(refTarget)) {
        refTarget(ref);
    }
}
exports.setRef = setRef;
function combineRefs(ref1, ref2) {
    return mergeRefs(ref1, ref2);
}
exports.combineRefs = combineRefs;
function mergeRefs(...refs) {
    return value => {
        refs.forEach(ref => {
            setRef(ref, value);
        });
    };
}
exports.mergeRefs = mergeRefs;
function getRef(ref) {
    if (ref === null) {
        return null;
    }
    return ref.current ?? ref;
}
exports.getRef = getRef;
function refHandler(refTargetParent, refTargetKey, refProp) {
    return (ref) => {
        refTargetParent[refTargetKey] = ref;
        setRef(refProp, ref);
    };
}
exports.refHandler = refHandler;
//# sourceMappingURL=refs.js.map