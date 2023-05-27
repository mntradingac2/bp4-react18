"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueId = exports.countDecimalPlaces = exports.clamp = exports.approxEqual = exports.arrayLengthCompare = exports.isNodeEnv = void 0;
const errors_1 = require("../errors");
function isNodeEnv(env) {
    return typeof process !== "undefined" && process.env && process.env.NODE_ENV === env;
}
exports.isNodeEnv = isNodeEnv;
function arrayLengthCompare(a = [], b = []) {
    return a.length - b.length;
}
exports.arrayLengthCompare = arrayLengthCompare;
function approxEqual(a, b, tolerance = 0.00001) {
    return Math.abs(a - b) <= tolerance;
}
exports.approxEqual = approxEqual;
function clamp(val, min, max) {
    if (val == null) {
        return val;
    }
    if (max < min) {
        throw new Error(errors_1.CLAMP_MIN_MAX);
    }
    return Math.min(Math.max(val, min), max);
}
exports.clamp = clamp;
function countDecimalPlaces(num) {
    if (!isFinite(num)) {
        return 0;
    }
    let e = 1;
    let p = 0;
    while (Math.round(num * e) / e !== num) {
        e *= 10;
        p++;
    }
    return p;
}
exports.countDecimalPlaces = countDecimalPlaces;
const uniqueCountForNamespace = new Map();
function uniqueId(namespace) {
    const curCount = uniqueCountForNamespace.get(namespace) ?? 0;
    uniqueCountForNamespace.set(namespace, curCount + 1);
    return `${namespace}-${curCount}`;
}
exports.uniqueId = uniqueId;
//# sourceMappingURL=jsUtils.js.map