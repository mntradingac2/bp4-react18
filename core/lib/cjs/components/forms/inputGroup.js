"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGroup = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const props_1 = require("../../common/props");
const icon_1 = require("../icon/icon");
const asyncControllableInput_1 = require("./asyncControllableInput");
class InputGroup extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.InputGroup`;
    state = {};
    leftElement = null;
    rightElement = null;
    refHandlers = {
        leftElement: (ref) => (this.leftElement = ref),
        rightElement: (ref) => (this.rightElement = ref),
    };
    render() {
        const { asyncControl = false, className, disabled, fill, inputClassName, inputRef, intent, large, readOnly, round, small, tagName = "div", } = this.props;
        const inputGroupClasses = (0, classnames_1.default)(common_1.Classes.INPUT_GROUP, common_1.Classes.intentClass(intent), {
            [common_1.Classes.DISABLED]: disabled,
            [common_1.Classes.READ_ONLY]: readOnly,
            [common_1.Classes.FILL]: fill,
            [common_1.Classes.LARGE]: large,
            [common_1.Classes.SMALL]: small,
            [common_1.Classes.ROUND]: round,
        }, className);
        const style = {
            ...this.props.style,
            paddingLeft: this.state.leftElementWidth,
            paddingRight: this.state.rightElementWidth,
        };
        const inputProps = {
            type: "text",
            ...(0, props_1.removeNonHTMLProps)(this.props),
            className: (0, classnames_1.default)(common_1.Classes.INPUT, inputClassName),
            style,
        };
        const inputElement = asyncControl ? (React.createElement(asyncControllableInput_1.AsyncControllableInput, { ...inputProps, inputRef: inputRef })) : (React.createElement("input", { ...inputProps, ref: inputRef }));
        return React.createElement(tagName, { className: inputGroupClasses }, this.maybeRenderLeftElement(), inputElement, this.maybeRenderRightElement());
    }
    componentDidMount() {
        this.updateInputWidth();
    }
    componentDidUpdate(prevProps) {
        const { leftElement, rightElement } = this.props;
        if (prevProps.leftElement !== leftElement || prevProps.rightElement !== rightElement) {
            this.updateInputWidth();
        }
    }
    validateProps(props) {
        if (props.leftElement != null && props.leftIcon != null) {
            console.warn(Errors.INPUT_WARN_LEFT_ELEMENT_LEFT_ICON_MUTEX);
        }
    }
    maybeRenderLeftElement() {
        const { leftElement, leftIcon } = this.props;
        if (leftElement != null) {
            return (React.createElement("span", { className: common_1.Classes.INPUT_LEFT_CONTAINER, ref: this.refHandlers.leftElement }, leftElement));
        }
        else if (leftIcon != null) {
            return React.createElement(icon_1.Icon, { icon: leftIcon, "aria-hidden": true, tabIndex: -1 });
        }
        return undefined;
    }
    maybeRenderRightElement() {
        const { rightElement } = this.props;
        if (rightElement == null) {
            return undefined;
        }
        return (React.createElement("span", { className: common_1.Classes.INPUT_ACTION, ref: this.refHandlers.rightElement }, rightElement));
    }
    updateInputWidth() {
        const { leftElementWidth, rightElementWidth } = this.state;
        if (this.leftElement != null) {
            const { clientWidth } = this.leftElement;
            if (leftElementWidth === undefined || Math.abs(clientWidth - leftElementWidth) > 2) {
                this.setState({ leftElementWidth: clientWidth });
            }
        }
        else {
            this.setState({ leftElementWidth: undefined });
        }
        if (this.rightElement != null) {
            const { clientWidth } = this.rightElement;
            if (rightElementWidth === undefined || Math.abs(clientWidth - rightElementWidth) > 2) {
                this.setState({ rightElementWidth: clientWidth });
            }
        }
        else {
            this.setState({ rightElementWidth: undefined });
        }
    }
}
exports.InputGroup = InputGroup;
//# sourceMappingURL=inputGroup.js.map