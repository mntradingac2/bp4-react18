"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeNumericInput = exports.toMaxPrecision = exports.isValidNumericKeyboardEvent = exports.isValueNumeric = exports.parseStringToStringNumber = exports.getValueOrEmptyValue = exports.clampValue = exports.toLocaleString = void 0;
const utils_1 = require("../../common/utils");
function getDecimalSeparator(locale) {
    const testNumber = 1.9;
    const testText = testNumber.toLocaleString(locale);
    const one = (1).toLocaleString(locale);
    const nine = (9).toLocaleString(locale);
    const pattern = `${one}(.+)${nine}`;
    const result = new RegExp(pattern).exec(testText);
    return (result && result[1]) || ".";
}
function toLocaleString(num, locale = "en-US") {
    return sanitizeNumericInput(num.toLocaleString(locale), locale);
}
exports.toLocaleString = toLocaleString;
function clampValue(value, min, max) {
    const adjustedMin = min != null ? min : -Infinity;
    const adjustedMax = max != null ? max : Infinity;
    return (0, utils_1.clamp)(value, adjustedMin, adjustedMax);
}
exports.clampValue = clampValue;
function getValueOrEmptyValue(value = "") {
    return value.toString();
}
exports.getValueOrEmptyValue = getValueOrEmptyValue;
function transformLocalizedNumberToStringNumber(character, locale) {
    const charactersMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => value.toLocaleString(locale));
    const jsNumber = charactersMap.indexOf(character);
    if (jsNumber !== -1) {
        return jsNumber;
    }
    else {
        return character;
    }
}
function parseStringToStringNumber(value, locale) {
    const valueAsString = "" + value;
    if (parseFloat(valueAsString).toString() === value.toString()) {
        return value.toString();
    }
    if (locale !== undefined) {
        const decimalSeparator = getDecimalSeparator(locale);
        const sanitizedString = sanitizeNumericInput(valueAsString, locale);
        return sanitizedString
            .split("")
            .map(character => transformLocalizedNumberToStringNumber(character, locale))
            .join("")
            .replace(decimalSeparator, ".");
    }
    return value.toString();
}
exports.parseStringToStringNumber = parseStringToStringNumber;
function isValueNumeric(value, locale) {
    const stringToStringNumber = parseStringToStringNumber(value, locale);
    return value != null && stringToStringNumber - parseFloat(stringToStringNumber) + 1 >= 0;
}
exports.isValueNumeric = isValueNumeric;
function isValidNumericKeyboardEvent(e, locale) {
    if (e.key == null) {
        return true;
    }
    if (e.ctrlKey || e.altKey || e.metaKey) {
        return true;
    }
    const isSingleCharKey = e.key.length === 1;
    if (!isSingleCharKey) {
        return true;
    }
    return isFloatingPointNumericCharacter(e.key, locale);
}
exports.isValidNumericKeyboardEvent = isValidNumericKeyboardEvent;
function isFloatingPointNumericCharacter(character, locale) {
    if (locale !== undefined) {
        const decimalSeparator = getDecimalSeparator(locale).replace(".", "\\.");
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => value.toLocaleString(locale)).join("");
        const localeFloatingPointNumericCharacterRegex = new RegExp("^[Ee" + numbers + "\\+\\-" + decimalSeparator + "]$");
        return localeFloatingPointNumericCharacterRegex.test(character);
    }
    else {
        const floatingPointNumericCharacterRegex = /^[Ee0-9\+\-\.]$/;
        return floatingPointNumericCharacterRegex.test(character);
    }
}
function toMaxPrecision(value, maxPrecision) {
    const scaleFactor = Math.pow(10, maxPrecision);
    return Math.round(value * scaleFactor) / scaleFactor;
}
exports.toMaxPrecision = toMaxPrecision;
function convertFullWidthNumbersToAscii(value) {
    return value.replace(/[\uFF10-\uFF19]/g, m => String.fromCharCode(m.charCodeAt(0) - 0xfee0));
}
function sanitizeNumericInput(value, locale) {
    const valueChars = convertFullWidthNumbersToAscii(value).split("");
    const sanitizedValueChars = valueChars.filter(valueChar => isFloatingPointNumericCharacter(valueChar, locale));
    return sanitizedValueChars.join("");
}
exports.sanitizeNumericInput = sanitizeNumericInput;
//# sourceMappingURL=numericInputUtils.js.map