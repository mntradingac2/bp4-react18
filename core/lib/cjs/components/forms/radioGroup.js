"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const controls_1 = require("./controls");
let counter = 0;
function nextName() {
    return `${RadioGroup.displayName}-${counter++}`;
}
class RadioGroup extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.RadioGroup`;
    autoGroupName = nextName();
    render() {
        const { label } = this.props;
        return (React.createElement("div", { className: this.props.className },
            label == null ? null : React.createElement("label", { className: common_1.Classes.LABEL }, label),
            Array.isArray(this.props.options) ? this.renderOptions() : this.renderChildren()));
    }
    validateProps() {
        if (this.props.children != null && this.props.options != null) {
            console.warn(Errors.RADIOGROUP_WARN_CHILDREN_OPTIONS_MUTEX);
        }
    }
    renderChildren() {
        return React.Children.map(this.props.children, child => {
            if ((0, utils_1.isElementOfType)(child, controls_1.Radio)) {
                return React.cloneElement(child, this.getRadioProps(child.props));
            }
            else {
                return child;
            }
        });
    }
    renderOptions() {
        return this.props.options?.map(option => (React.createElement(controls_1.Radio, { ...this.getRadioProps(option), key: option.value, labelElement: option.label || option.value })));
    }
    getRadioProps(optionProps) {
        const { name } = this.props;
        const { className, disabled, value } = optionProps;
        return {
            checked: value === this.props.selectedValue,
            className,
            disabled: disabled || this.props.disabled,
            inline: this.props.inline,
            name: name == null ? this.autoGroupName : name,
            onChange: this.props.onChange,
            value,
        };
    }
}
exports.RadioGroup = RadioGroup;
//# sourceMappingURL=radioGroup.js.map