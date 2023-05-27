"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotkey = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const keyComboTag_1 = require("./keyComboTag");
class Hotkey extends common_1.AbstractPureComponent2 {
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.Hotkey`;
    static defaultProps = {
        allowInInput: false,
        disabled: false,
        global: false,
        preventDefault: false,
        stopPropagation: false,
    };
    render() {
        const { label, className, ...spreadableProps } = this.props;
        const rootClasses = (0, classnames_1.default)(common_1.Classes.HOTKEY, className);
        return (React.createElement("div", { className: rootClasses },
            React.createElement("div", { className: common_1.Classes.HOTKEY_LABEL }, label),
            React.createElement(keyComboTag_1.KeyComboTag, { ...spreadableProps })));
    }
    validateProps(props) {
        if (props.global !== true && props.group == null) {
            console.error("non-global <Hotkey>s must define a group");
        }
    }
}
exports.Hotkey = Hotkey;
//# sourceMappingURL=hotkey.js.map