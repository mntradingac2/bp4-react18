"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagInput = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const icon_1 = require("../icon/icon");
const tag_1 = require("../tag/tag");
const resizableInput_1 = require("./resizableInput");
const NONE = -1;
class TagInput extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.TagInput`;
    static defaultProps = {
        addOnBlur: false,
        addOnPaste: true,
        autoResize: false,
        inputProps: {},
        separator: /[,\n\r]/,
        tagProps: {},
    };
    static getDerivedStateFromProps(props, state) {
        if (props.inputValue !== state.prevInputValueProp) {
            return {
                inputValue: props.inputValue,
                prevInputValueProp: props.inputValue,
            };
        }
        return null;
    }
    state = {
        activeIndex: NONE,
        inputValue: this.props.inputValue || "",
        isInputFocused: false,
    };
    inputElement = null;
    handleRef = (0, common_1.refHandler)(this, "inputElement", this.props.inputRef);
    render() {
        const { autoResize, className, disabled, fill, inputProps, intent, large, leftIcon, placeholder, values } = this.props;
        const classes = (0, classnames_1.default)(common_1.Classes.INPUT, common_1.Classes.TAG_INPUT, {
            [common_1.Classes.ACTIVE]: this.state.isInputFocused,
            [common_1.Classes.DISABLED]: disabled,
            [common_1.Classes.FILL]: fill,
            [common_1.Classes.LARGE]: large,
        }, common_1.Classes.intentClass(intent), className);
        const isLarge = classes.indexOf(common_1.Classes.LARGE) > NONE;
        const isSomeValueDefined = values.some(val => !!val);
        const resolvedPlaceholder = placeholder == null || isSomeValueDefined ? inputProps?.placeholder : placeholder;
        const resolvedInputProps = {
            value: this.state.inputValue,
            ...inputProps,
            className: (0, classnames_1.default)(common_1.Classes.INPUT_GHOST, inputProps?.className),
            disabled,
            onChange: this.handleInputChange,
            onFocus: this.handleInputFocus,
            onKeyDown: this.handleInputKeyDown,
            onKeyUp: this.handleInputKeyUp,
            onPaste: this.handleInputPaste,
            placeholder: resolvedPlaceholder,
            ref: this.handleRef,
        };
        return (React.createElement("div", { className: classes, onBlur: this.handleContainerBlur, onClick: this.handleContainerClick },
            React.createElement(icon_1.Icon, { className: common_1.Classes.TAG_INPUT_ICON, icon: leftIcon, size: isLarge ? icon_1.IconSize.LARGE : icon_1.IconSize.STANDARD }),
            React.createElement("div", { className: common_1.Classes.TAG_INPUT_VALUES },
                values.map(this.maybeRenderTag),
                this.props.children,
                autoResize ? React.createElement(resizableInput_1.ResizableInput, { ...resolvedInputProps }) : React.createElement("input", { ...resolvedInputProps })),
            this.props.rightElement));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.inputRef !== this.props.inputRef) {
            (0, common_1.setRef)(prevProps.inputRef, null);
            this.handleRef = (0, common_1.refHandler)(this, "inputElement", this.props.inputRef);
            (0, common_1.setRef)(this.props.inputRef, this.inputElement);
        }
    }
    addTags = (value, method = "default") => {
        const { inputValue, onAdd, onChange, values } = this.props;
        const newValues = this.getValues(value);
        let shouldClearInput = onAdd?.(newValues, method) !== false && inputValue === undefined;
        if (common_1.Utils.isFunction(onChange)) {
            shouldClearInput = onChange([...values, ...newValues]) !== false && shouldClearInput;
        }
        if (shouldClearInput) {
            this.setState({ inputValue: "" });
        }
    };
    maybeRenderTag = (tag, index) => {
        if (!tag) {
            return null;
        }
        const { large, tagProps } = this.props;
        const props = common_1.Utils.isFunction(tagProps) ? tagProps(tag, index) : tagProps;
        return (React.createElement(tag_1.Tag, { active: index === this.state.activeIndex, "data-tag-index": index, key: tag + "__" + index, large: large, onRemove: this.props.disabled ? undefined : this.handleRemoveTag, ...props }, tag));
    };
    getNextActiveIndex(direction) {
        const { activeIndex } = this.state;
        if (activeIndex === NONE) {
            return direction < 0 ? this.findNextIndex(this.props.values.length, -1) : NONE;
        }
        else {
            return this.findNextIndex(activeIndex, direction);
        }
    }
    findNextIndex(startIndex, direction) {
        const { values } = this.props;
        let index = startIndex + direction;
        while (index > 0 && index < values.length && !values[index]) {
            index += direction;
        }
        return common_1.Utils.clamp(index, 0, values.length);
    }
    getValues(inputValue) {
        const { separator } = this.props;
        return (separator === false ? [inputValue] : inputValue.split(separator))
            .map(val => val.trim())
            .filter(val => val.length > 0);
    }
    handleContainerClick = () => {
        this.inputElement?.focus();
    };
    handleContainerBlur = ({ currentTarget }) => {
        this.requestAnimationFrame(() => {
            const isFocusInsideContainer = currentTarget.contains((0, utils_1.getActiveElement)(this.inputElement));
            if (!isFocusInsideContainer) {
                if (this.props.addOnBlur && this.state.inputValue !== undefined && this.state.inputValue.length > 0) {
                    this.addTags(this.state.inputValue, "blur");
                }
                this.setState({ activeIndex: NONE, isInputFocused: false });
            }
        });
    };
    handleInputFocus = (event) => {
        this.setState({ isInputFocused: true });
        this.props.inputProps?.onFocus?.(event);
    };
    handleInputChange = (event) => {
        this.setState({ activeIndex: NONE, inputValue: event.currentTarget.value });
        this.props.onInputChange?.(event);
        this.props.inputProps?.onChange?.(event);
    };
    handleInputKeyDown = (event) => {
        const { selectionEnd, value } = event.currentTarget;
        const { activeIndex } = this.state;
        let activeIndexToEmit = activeIndex;
        if (event.which === common_1.Keys.ENTER && value.length > 0) {
            this.addTags(value, "default");
        }
        else if (selectionEnd === 0 && this.props.values.length > 0) {
            if (event.which === common_1.Keys.ARROW_LEFT || event.which === common_1.Keys.ARROW_RIGHT) {
                const nextActiveIndex = this.getNextActiveIndex(event.which === common_1.Keys.ARROW_RIGHT ? 1 : -1);
                if (nextActiveIndex !== activeIndex) {
                    event.stopPropagation();
                    activeIndexToEmit = nextActiveIndex;
                    this.setState({ activeIndex: nextActiveIndex });
                }
            }
            else if (event.which === common_1.Keys.BACKSPACE) {
                this.handleBackspaceToRemove(event);
            }
            else if (event.which === common_1.Keys.DELETE) {
                this.handleDeleteToRemove(event);
            }
        }
        this.invokeKeyPressCallback("onKeyDown", event, activeIndexToEmit);
    };
    handleInputKeyUp = (event) => {
        this.invokeKeyPressCallback("onKeyUp", event, this.state.activeIndex);
    };
    handleInputPaste = (event) => {
        const { separator } = this.props;
        const value = event.clipboardData.getData("text");
        if (!this.props.addOnPaste || value.length === 0) {
            return;
        }
        if (separator === false || value.split(separator).length === 1) {
            return;
        }
        event.preventDefault();
        this.addTags(value, "paste");
    };
    handleRemoveTag = (event) => {
        const index = +event.currentTarget.parentElement.getAttribute("data-tag-index");
        this.removeIndexFromValues(index);
    };
    handleBackspaceToRemove(event) {
        const previousActiveIndex = this.state.activeIndex;
        this.setState({ activeIndex: this.getNextActiveIndex(-1) });
        if (this.isValidIndex(previousActiveIndex)) {
            event.stopPropagation();
            this.removeIndexFromValues(previousActiveIndex);
        }
    }
    handleDeleteToRemove(event) {
        const { activeIndex } = this.state;
        if (this.isValidIndex(activeIndex)) {
            event.stopPropagation();
            this.removeIndexFromValues(activeIndex);
        }
    }
    removeIndexFromValues(index) {
        const { onChange, onRemove, values } = this.props;
        onRemove?.(values[index], index);
        onChange?.(values.filter((_, i) => i !== index));
    }
    invokeKeyPressCallback(propCallbackName, event, activeIndex) {
        this.props[propCallbackName]?.(event, activeIndex === NONE ? undefined : activeIndex);
        this.props.inputProps[propCallbackName]?.(event);
    }
    isValidIndex(index) {
        return index !== NONE && index < this.props.values.length;
    }
}
exports.TagInput = TagInput;
//# sourceMappingURL=tagInput.js.map