"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCombo = exports.KeyComboTag = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const icon_1 = require("../icon/icon");
const hotkeyParser_1 = require("./hotkeyParser");
const KeyIcons = {
    alt: { icon: "key-option", iconTitle: "Alt/Option key" },
    cmd: { icon: "key-command", iconTitle: "Command key" },
    ctrl: { icon: "key-control", iconTitle: "Control key" },
    delete: { icon: "key-delete", iconTitle: "Delete key" },
    down: { icon: "arrow-down", iconTitle: "Down key" },
    enter: { icon: "key-enter", iconTitle: "Enter key" },
    left: { icon: "arrow-left", iconTitle: "Left key" },
    meta: { icon: "key-command", iconTitle: "Command key" },
    right: { icon: "arrow-right", iconTitle: "Right key" },
    shift: { icon: "key-shift", iconTitle: "Shift key" },
    up: { icon: "arrow-up", iconTitle: "Up key" },
};
class KeyComboTag extends common_1.AbstractPureComponent2 {
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.KeyComboTag`;
    render() {
        const { className, combo, minimal } = this.props;
        const keys = (0, hotkeyParser_1.normalizeKeyCombo)(combo)
            .map(key => (key.length === 1 ? key.toUpperCase() : key))
            .map(minimal ? this.renderMinimalKey : this.renderKey);
        return React.createElement("span", { className: (0, classnames_1.default)(common_1.Classes.KEY_COMBO, className) }, keys);
    }
    renderKey = (key, index) => {
        const icon = KeyIcons[key];
        const reactKey = `key-${index}`;
        return (React.createElement("kbd", { className: (0, classnames_1.default)(common_1.Classes.KEY, { [common_1.Classes.MODIFIER_KEY]: icon != null }), key: reactKey },
            icon != null && React.createElement(icon_1.Icon, { icon: icon.icon, title: icon.iconTitle }),
            key));
    };
    renderMinimalKey = (key, index) => {
        const icon = KeyIcons[key];
        return icon == null ? key : React.createElement(icon_1.Icon, { icon: icon.icon, title: icon.iconTitle, key: `key-${index}` });
    };
}
exports.KeyComboTag = KeyComboTag;
exports.KeyCombo = KeyComboTag;
exports.KeyCombo.displayName = `${common_1.DISPLAYNAME_PREFIX}.KeyCombo`;
//# sourceMappingURL=keyComboTag.js.map