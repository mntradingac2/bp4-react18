"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeKeyCombo = exports.getKeyCombo = exports.getKeyComboString = exports.parseKeyCombo = exports.comboMatches = exports.ShiftKeys = exports.Aliases = exports.ModifierBitMasks = exports.Modifiers = exports.KeyCodes = void 0;
exports.KeyCodes = {
    8: "backspace",
    9: "tab",
    13: "enter",
    20: "capslock",
    27: "esc",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "ins",
    46: "del",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
};
exports.Modifiers = {
    16: "shift",
    17: "ctrl",
    18: "alt",
    91: "meta",
    93: "meta",
    224: "meta",
};
exports.ModifierBitMasks = {
    alt: 1,
    ctrl: 2,
    meta: 4,
    shift: 8,
};
exports.Aliases = {
    cmd: "meta",
    command: "meta",
    escape: "esc",
    minus: "-",
    mod: isMac() ? "meta" : "ctrl",
    option: "alt",
    plus: "+",
    return: "enter",
    win: "meta",
};
exports.ShiftKeys = {
    "~": "`",
    "!": "1",
    "@": "2",
    "#": "3",
    $: "4",
    "%": "5",
    "^": "6",
    "&": "7",
    "*": "8",
    "(": "9",
    ")": "0",
    _: "-",
    "+": "=",
    "{": "[",
    "}": "]",
    "|": "\\",
    ":": ";",
    '"': "'",
    "<": ",",
    ">": ".",
    "?": "/",
};
for (let i = 1; i <= 12; ++i) {
    exports.KeyCodes[111 + i] = "f" + i;
}
for (let i = 0; i <= 9; ++i) {
    exports.KeyCodes[96 + i] = "num" + i.toString();
}
function comboMatches(a, b) {
    return a.modifiers === b.modifiers && a.key === b.key;
}
exports.comboMatches = comboMatches;
const parseKeyCombo = (combo) => {
    const pieces = combo.replace(/\s/g, "").toLowerCase().split("+");
    let modifiers = 0;
    let key;
    for (let piece of pieces) {
        if (piece === "") {
            throw new Error(`Failed to parse key combo "${combo}".
                Valid key combos look like "cmd + plus", "shift+p", or "!"`);
        }
        if (exports.Aliases[piece] != null) {
            piece = exports.Aliases[piece];
        }
        if (exports.ModifierBitMasks[piece] != null) {
            modifiers += exports.ModifierBitMasks[piece];
        }
        else if (exports.ShiftKeys[piece] != null) {
            modifiers += exports.ModifierBitMasks.shift;
            key = exports.ShiftKeys[piece];
        }
        else {
            key = piece.toLowerCase();
        }
    }
    return { modifiers, key };
};
exports.parseKeyCombo = parseKeyCombo;
const getKeyComboString = (e) => {
    const keys = [];
    if (e.ctrlKey) {
        keys.push("ctrl");
    }
    if (e.altKey) {
        keys.push("alt");
    }
    if (e.shiftKey) {
        keys.push("shift");
    }
    if (e.metaKey) {
        keys.push("meta");
    }
    const { which } = e;
    if (exports.Modifiers[which] != null) {
    }
    else if (exports.KeyCodes[which] != null) {
        keys.push(exports.KeyCodes[which]);
    }
    else {
        keys.push(String.fromCharCode(which).toLowerCase());
    }
    return keys.join(" + ");
};
exports.getKeyComboString = getKeyComboString;
const getKeyCombo = (e) => {
    let key;
    const { which } = e;
    if (exports.Modifiers[which] != null) {
    }
    else if (exports.KeyCodes[which] != null) {
        key = exports.KeyCodes[which];
    }
    else {
        key = String.fromCharCode(which).toLowerCase();
    }
    let modifiers = 0;
    if (e.altKey) {
        modifiers += exports.ModifierBitMasks.alt;
    }
    if (e.ctrlKey) {
        modifiers += exports.ModifierBitMasks.ctrl;
    }
    if (e.metaKey) {
        modifiers += exports.ModifierBitMasks.meta;
    }
    if (e.shiftKey) {
        modifiers += exports.ModifierBitMasks.shift;
    }
    return { modifiers, key };
};
exports.getKeyCombo = getKeyCombo;
const normalizeKeyCombo = (combo, platformOverride) => {
    const keys = combo.replace(/\s/g, "").split("+");
    return keys.map(key => {
        const keyName = exports.Aliases[key] != null ? exports.Aliases[key] : key;
        return keyName === "meta" ? (isMac(platformOverride) ? "cmd" : "ctrl") : keyName;
    });
};
exports.normalizeKeyCombo = normalizeKeyCombo;
function isMac(platformOverride) {
    const platform = platformOverride ?? (typeof navigator !== "undefined" ? navigator.platform : undefined);
    return platform === undefined ? false : /Mac|iPod|iPhone|iPad/.test(platform);
}
//# sourceMappingURL=hotkeyParser.js.map