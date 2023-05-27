"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotkeysDialog2 = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const dialog_1 = require("../dialog/dialog");
const dialogBody_1 = require("../dialog/dialogBody");
const hotkey_1 = require("./hotkey");
const hotkeys_1 = require("./hotkeys");
const HotkeysDialog2 = ({ globalGroupName = "Global", hotkeys, ...props }) => {
    return (React.createElement(dialog_1.Dialog, { ...props, className: (0, classnames_1.default)(common_1.Classes.HOTKEY_DIALOG, props.className) },
        React.createElement(dialogBody_1.DialogBody, null,
            React.createElement(hotkeys_1.Hotkeys, null, hotkeys.map((hotkey, index) => (React.createElement(hotkey_1.Hotkey, { key: index, ...hotkey, group: hotkey.global === true && hotkey.group == null ? globalGroupName : hotkey.group })))))));
};
exports.HotkeysDialog2 = HotkeysDialog2;
//# sourceMappingURL=hotkeysDialog2.js.map