"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argMin = exports.fillValues = exports.formatPercentage = void 0;
function formatPercentage(ratio) {
    return `${(ratio * 100).toFixed(2)}%`;
}
exports.formatPercentage = formatPercentage;
function fillValues(values, startIndex, endIndex, fillValue) {
    const inc = startIndex < endIndex ? 1 : -1;
    for (let index = startIndex; index !== endIndex + inc; index += inc) {
        values[index] = fillValue;
    }
}
exports.fillValues = fillValues;
function argMin(values, argFn) {
    if (values.length === 0) {
        return undefined;
    }
    let minValue = values[0];
    let minArg = argFn(minValue);
    for (let index = 1; index < values.length; index++) {
        const value = values[index];
        const arg = argFn(value);
        if (arg < minArg) {
            minValue = value;
            minArg = arg;
        }
    }
    return minValue;
}
exports.argMin = argMin;
//# sourceMappingURL=sliderUtils.js.map