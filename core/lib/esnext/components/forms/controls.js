"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = exports.Radio = exports.Switch = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const Control = ({ alignIndicator, children, className, indicatorChildren, inline, inputRef, label, labelElement, large, style, type, typeClassName, tagName = "label", ...htmlProps }) => {
    const classes = (0, classnames_1.default)(common_1.Classes.CONTROL, typeClassName, {
        [common_1.Classes.DISABLED]: htmlProps.disabled,
        [common_1.Classes.INLINE]: inline,
        [common_1.Classes.LARGE]: large,
    }, common_1.Classes.alignmentClass(alignIndicator), className);
    return React.createElement(tagName, { className: classes, style }, React.createElement("input", { ...htmlProps, ref: inputRef, type: type }), React.createElement("span", { className: common_1.Classes.CONTROL_INDICATOR }, indicatorChildren), label, labelElement, children);
};
class Switch extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Switch`;
    render() {
        const { innerLabelChecked, innerLabel, ...controlProps } = this.props;
        const switchLabels = innerLabel || innerLabelChecked
            ? [
                React.createElement("div", { key: "checked", className: common_1.Classes.CONTROL_INDICATOR_CHILD },
                    React.createElement("div", { className: common_1.Classes.SWITCH_INNER_TEXT }, innerLabelChecked ? innerLabelChecked : innerLabel)),
                React.createElement("div", { key: "unchecked", className: common_1.Classes.CONTROL_INDICATOR_CHILD },
                    React.createElement("div", { className: common_1.Classes.SWITCH_INNER_TEXT }, innerLabel)),
            ]
            : null;
        return (React.createElement(Control, { ...controlProps, type: "checkbox", typeClassName: common_1.Classes.SWITCH, indicatorChildren: switchLabels }));
    }
}
exports.Switch = Switch;
class Radio extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Radio`;
    render() {
        return React.createElement(Control, { ...this.props, type: "radio", typeClassName: common_1.Classes.RADIO });
    }
}
exports.Radio = Radio;
class Checkbox extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Checkbox`;
    static getDerivedStateFromProps({ indeterminate }) {
        if (indeterminate != null) {
            return { indeterminate };
        }
        return null;
    }
    state = {
        indeterminate: this.props.indeterminate || this.props.defaultIndeterminate || false,
    };
    input = null;
    handleInputRef = (0, common_1.refHandler)(this, "input", this.props.inputRef);
    render() {
        const { defaultIndeterminate, indeterminate, ...controlProps } = this.props;
        return (React.createElement(Control, { ...controlProps, inputRef: this.handleInputRef, onChange: this.handleChange, type: "checkbox", typeClassName: common_1.Classes.CHECKBOX }));
    }
    componentDidMount() {
        this.updateIndeterminate();
    }
    componentDidUpdate(prevProps) {
        this.updateIndeterminate();
        if (prevProps.inputRef !== this.props.inputRef) {
            (0, common_1.setRef)(prevProps.inputRef, null);
            this.handleInputRef = (0, common_1.refHandler)(this, "input", this.props.inputRef);
            (0, common_1.setRef)(this.props.inputRef, this.input);
        }
    }
    updateIndeterminate() {
        if (this.input != null) {
            this.input.indeterminate = this.state.indeterminate;
        }
    }
    handleChange = (evt) => {
        const { indeterminate } = evt.target;
        if (this.props.indeterminate == null) {
            this.setState({ indeterminate });
        }
        this.props.onChange?.(evt);
    };
}
exports.Checkbox = Checkbox;
//# sourceMappingURL=controls.js.map