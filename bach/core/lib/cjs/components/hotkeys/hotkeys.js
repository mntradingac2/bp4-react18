"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotkeys = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const errors_1 = require("../../common/errors");
const utils_1 = require("../../common/utils");
const html_1 = require("../html/html");
const hotkey_1 = require("./hotkey");
class Hotkeys extends common_1.AbstractPureComponent2 {
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.Hotkeys`;
    static defaultProps = {
        tabIndex: 0,
    };
    render() {
        if (!(0, utils_1.isReactChildrenElementOrElements)(this.props.children)) {
            return null;
        }
        const hotkeys = React.Children.map(this.props.children, (child) => child.props);
        hotkeys.sort((a, b) => {
            if (a.global === b.global && a.group && b.group) {
                return a.group.localeCompare(b.group);
            }
            return a.global ? -1 : 1;
        });
        let lastGroup;
        const elems = [];
        for (const hotkey of hotkeys) {
            const groupLabel = hotkey.group;
            if (groupLabel !== lastGroup) {
                elems.push(React.createElement(html_1.H4, { key: `group-${elems.length}` }, groupLabel));
                lastGroup = groupLabel;
            }
            elems.push(React.createElement(hotkey_1.Hotkey, { key: elems.length, ...hotkey }));
        }
        const rootClasses = (0, classnames_1.default)(common_1.Classes.HOTKEY_COLUMN, this.props.className);
        return React.createElement("div", { className: rootClasses }, elems);
    }
    validateProps(props) {
        if (!(0, utils_1.isReactChildrenElementOrElements)(props.children)) {
            return;
        }
        React.Children.forEach(props.children, (child) => {
            if (!(0, utils_1.isElementOfType)(child, hotkey_1.Hotkey)) {
                throw new Error(errors_1.HOTKEYS_HOTKEY_CHILDREN);
            }
        });
    }
}
exports.Hotkeys = Hotkeys;
//# sourceMappingURL=hotkeys.js.map