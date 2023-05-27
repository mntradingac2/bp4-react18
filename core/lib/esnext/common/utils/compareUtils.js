"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeepUnequalKeyValues = exports.deepCompareKeys = exports.shallowCompareKeys = exports.arraysEqual = void 0;
function arraysEqual(arrA, arrB, compare = (a, b) => a === b) {
    if (arrA == null && arrB == null) {
        return true;
    }
    else if (arrA == null || arrB == null || arrA.length !== arrB.length) {
        return false;
    }
    else {
        return arrA.every((a, i) => compare(a, arrB[i]));
    }
}
exports.arraysEqual = arraysEqual;
function shallowCompareKeys(objA, objB, keys) {
    if (objA == null && objB == null) {
        return true;
    }
    else if (objA == null || objB == null) {
        return false;
    }
    else if (Array.isArray(objA) || Array.isArray(objB)) {
        return false;
    }
    else if (keys != null) {
        return shallowCompareKeysImpl(objA, objB, keys);
    }
    else {
        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);
        return (shallowCompareKeysImpl(objA, objB, { include: keysA }) &&
            shallowCompareKeysImpl(objA, objB, { include: keysB }));
    }
}
exports.shallowCompareKeys = shallowCompareKeys;
function deepCompareKeys(objA, objB, keys) {
    if (objA === objB) {
        return true;
    }
    else if (objA == null && objB == null) {
        return true;
    }
    else if (objA == null || objB == null) {
        return false;
    }
    else if (Array.isArray(objA) || Array.isArray(objB)) {
        return arraysEqual(objA, objB, deepCompareKeys);
    }
    else if (isSimplePrimitiveType(objA) || isSimplePrimitiveType(objB)) {
        return objA === objB;
    }
    else if (keys != null) {
        return deepCompareKeysImpl(objA, objB, keys);
    }
    else if (objA.constructor !== objB.constructor) {
        return false;
    }
    else {
        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);
        if (keysA == null || keysB == null) {
            return false;
        }
        if (keysA.length === 0 && keysB.length === 0) {
            return true;
        }
        return arraysEqual(keysA, keysB) && deepCompareKeysImpl(objA, objB, keysA);
    }
}
exports.deepCompareKeys = deepCompareKeys;
function getDeepUnequalKeyValues(objA = {}, objB = {}, keys) {
    const filteredKeys = keys == null ? unionKeys(objA, objB) : keys;
    return getUnequalKeyValues(objA, objB, filteredKeys, (a, b, key) => {
        return deepCompareKeys(a, b, [key]);
    });
}
exports.getDeepUnequalKeyValues = getDeepUnequalKeyValues;
function shallowCompareKeysImpl(objA, objB, keys) {
    return filterKeys(objA, objB, keys).every(key => {
        return objA.hasOwnProperty(key) === objB.hasOwnProperty(key) && objA[key] === objB[key];
    });
}
function deepCompareKeysImpl(objA, objB, keys) {
    return keys.every(key => {
        return objA.hasOwnProperty(key) === objB.hasOwnProperty(key) && deepCompareKeys(objA[key], objB[key]);
    });
}
function isSimplePrimitiveType(value) {
    return typeof value === "number" || typeof value === "string" || typeof value === "boolean";
}
function filterKeys(objA, objB, keys) {
    if (isAllowlist(keys)) {
        return keys.include;
    }
    else if (isDenylist(keys)) {
        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);
        const keySet = arrayToObject(keysA.concat(keysB));
        keys.exclude.forEach(key => delete keySet[key]);
        return Object.keys(keySet);
    }
    return [];
}
function isAllowlist(keys) {
    return keys != null && keys.include != null;
}
function isDenylist(keys) {
    return keys != null && keys.exclude != null;
}
function arrayToObject(arr) {
    return arr.reduce((obj, element) => {
        obj[element] = true;
        return obj;
    }, {});
}
function getUnequalKeyValues(objA, objB, keys, compareFn) {
    const unequalKeys = keys.filter(key => !compareFn(objA, objB, key));
    const unequalKeyValues = unequalKeys.map(key => ({
        key,
        valueA: objA[key],
        valueB: objB[key],
    }));
    return unequalKeyValues;
}
function unionKeys(objA, objB) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    const concatKeys = keysA.concat(keysB);
    const keySet = arrayToObject(concatKeys);
    return Object.keys(keySet);
}
//# sourceMappingURL=compareUtils.js.map