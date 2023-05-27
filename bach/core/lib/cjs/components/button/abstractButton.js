"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractButton = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const icon_1 = require("../icon/icon");
const spinner_1 = require("../spinner/spinner");
class AbstractButton extends common_1.AbstractPureComponent2 {
    state = {
        isActive: false,
    };
    currentKeyDown;
    getCommonButtonProps() {
        const { active = false, alignText, fill, large, loading = false, outlined, minimal, small, tabIndex, } = this.props;
        const disabled = this.props.disabled || loading;
        const className = (0, classnames_1.default)(common_1.Classes.BUTTON, {
            [common_1.Classes.ACTIVE]: !disabled && (active || this.state.isActive),
            [common_1.Classes.DISABLED]: disabled,
            [common_1.Classes.FILL]: fill,
            [common_1.Classes.LARGE]: large,
            [common_1.Classes.LOADING]: loading,
            [common_1.Classes.MINIMAL]: minimal,
            [common_1.Classes.OUTLINED]: outlined,
            [common_1.Classes.SMALL]: small,
        }, common_1.Classes.alignmentClass(alignText), common_1.Classes.intentClass(this.props.intent), this.props.className);
        return {
            className,
            disabled,
            onBlur: this.handleBlur,
            onClick: disabled ? undefined : this.props.onClick,
            onFocus: disabled ? undefined : this.props.onFocus,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            tabIndex: disabled ? -1 : tabIndex,
        };
    }
    handleKeyDown = (e) => {
        if (common_1.Keys.isKeyboardClick(e.which)) {
            e.preventDefault();
            if (e.which !== this.currentKeyDown) {
                this.setState({ isActive: true });
            }
        }
        this.currentKeyDown = e.which;
        this.props.onKeyDown?.(e);
    };
    handleKeyUp = (e) => {
        if (common_1.Keys.isKeyboardClick(e.which)) {
            this.setState({ isActive: false });
            this.buttonRef?.click();
        }
        this.currentKeyDown = undefined;
        this.props.onKeyUp?.(e);
    };
    handleBlur = (e) => {
        if (this.state.isActive) {
            this.setState({ isActive: false });
        }
        this.props.onBlur?.(e);
    };
    renderChildren() {
        const { children, icon, loading, rightIcon, text } = this.props;
        const maybeHasText = !common_1.Utils.isReactNodeEmpty(text) || !common_1.Utils.isReactNodeEmpty(children);
        return [
            loading && React.createElement(spinner_1.Spinner, { key: "loading", className: common_1.Classes.BUTTON_SPINNER, size: icon_1.IconSize.LARGE }),
            React.createElement(icon_1.Icon, { key: "leftIcon", icon: icon }),
            maybeHasText && (React.createElement("span", { key: "text", className: common_1.Classes.BUTTON_TEXT },
                text,
                children)),
            React.createElement(icon_1.Icon, { key: "rightIcon", icon: rightIcon }),
        ];
    }
}
exports.AbstractButton = AbstractButton;
//# sourceMappingURL=abstractButton.js.map