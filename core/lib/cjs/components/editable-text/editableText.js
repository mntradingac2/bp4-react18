"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableText = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const compatibility_1 = require("../../compatibility");
const BUFFER_WIDTH_DEFAULT = 5;
const BUFFER_WIDTH_IE = 30;
class EditableText extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.EditableText`;
    static defaultProps = {
        alwaysRenderInput: false,
        confirmOnEnterKey: false,
        defaultValue: "",
        disabled: false,
        maxLines: Infinity,
        minLines: 1,
        minWidth: 80,
        multiline: false,
        placeholder: "Click to Edit",
        type: "text",
    };
    inputElement = null;
    valueElement = null;
    refHandlers = {
        content: (spanElement) => {
            this.valueElement = spanElement;
        },
        input: (input) => {
            if (input != null) {
                this.inputElement = input;
                if (!this.props.alwaysRenderInput) {
                    this.inputElement.focus();
                }
                if (this.state != null && this.state.isEditing) {
                    const supportsSelection = inputSupportsSelection(input);
                    if (supportsSelection) {
                        const { length } = input.value;
                        input.setSelectionRange(this.props.selectAllOnFocus ? 0 : length, length);
                    }
                    if (!supportsSelection || !this.props.selectAllOnFocus) {
                        input.scrollLeft = input.scrollWidth;
                    }
                }
            }
        },
    };
    constructor(props, context) {
        super(props, context);
        const value = props.value == null ? props.defaultValue : props.value;
        this.state = {
            inputHeight: 0,
            inputWidth: 0,
            isEditing: props.isEditing === true && props.disabled === false,
            lastValue: value,
            value,
        };
    }
    render() {
        const { alwaysRenderInput, disabled, multiline, contentId } = this.props;
        const value = this.props.value ?? this.state.value;
        const hasValue = value != null && value !== "";
        const classes = (0, classnames_1.default)(common_1.Classes.EDITABLE_TEXT, common_1.Classes.intentClass(this.props.intent), {
            [common_1.Classes.DISABLED]: disabled,
            [common_1.Classes.EDITABLE_TEXT_EDITING]: this.state.isEditing,
            [common_1.Classes.EDITABLE_TEXT_PLACEHOLDER]: !hasValue,
            [common_1.Classes.MULTILINE]: multiline,
        }, this.props.className);
        let contentStyle;
        if (multiline) {
            contentStyle = { height: !this.state.isEditing ? this.state.inputHeight : undefined };
        }
        else {
            contentStyle = {
                height: this.state.inputHeight,
                lineHeight: this.state.inputHeight != null ? `${this.state.inputHeight}px` : undefined,
                minWidth: this.props.minWidth,
            };
        }
        const tabIndex = alwaysRenderInput || this.state.isEditing || disabled ? undefined : 0;
        const shouldHideContents = alwaysRenderInput && !this.state.isEditing;
        const spanProps = contentId != null ? { id: contentId } : {};
        return (React.createElement("div", { className: classes, onFocus: this.handleFocus, tabIndex: tabIndex },
            alwaysRenderInput || this.state.isEditing ? this.renderInput(value) : undefined,
            shouldHideContents ? undefined : (React.createElement("span", { ...spanProps, className: common_1.Classes.EDITABLE_TEXT_CONTENT, ref: this.refHandlers.content, style: contentStyle }, hasValue ? value : this.props.placeholder))));
    }
    componentDidMount() {
        this.updateInputDimensions();
    }
    componentDidUpdate(prevProps, prevState) {
        const newState = {};
        if (this.props.value !== prevProps.value && (prevProps.value != null || this.props.value != null)) {
            newState.value = this.props.value;
        }
        if (this.props.isEditing != null && this.props.isEditing !== prevProps.isEditing) {
            newState.isEditing = this.props.isEditing;
        }
        if (this.props.disabled || (this.props.disabled == null && prevProps.disabled)) {
            newState.isEditing = false;
        }
        this.setState(newState);
        if (this.state.isEditing && !prevState.isEditing) {
            this.props.onEdit?.(this.state.value);
        }
        if (this.state.value !== prevState.value ||
            this.props.alwaysRenderInput !== prevProps.alwaysRenderInput ||
            this.props.maxLines !== prevProps.maxLines ||
            this.props.minLines !== prevProps.minLines ||
            this.props.minWidth !== prevProps.minWidth ||
            this.props.multiline !== prevProps.multiline) {
            this.updateInputDimensions();
        }
    }
    cancelEditing = () => {
        const { lastValue, value } = this.state;
        this.setState({ isEditing: false, value: lastValue });
        if (value !== lastValue) {
            this.props.onChange?.(lastValue);
        }
        this.props.onCancel?.(lastValue);
    };
    toggleEditing = () => {
        if (this.state.isEditing) {
            const { value } = this.state;
            this.setState({ isEditing: false, lastValue: value });
            this.props.onConfirm?.(value);
        }
        else if (!this.props.disabled) {
            this.setState({ isEditing: true });
        }
    };
    handleFocus = () => {
        const { alwaysRenderInput, disabled, selectAllOnFocus } = this.props;
        if (!disabled) {
            this.setState({ isEditing: true });
        }
        if (alwaysRenderInput && selectAllOnFocus && this.inputElement != null) {
            const { length } = this.inputElement.value;
            this.inputElement.setSelectionRange(0, length);
        }
    };
    handleTextChange = (event) => {
        const value = event.target.value;
        if (this.props.value == null) {
            this.setState({ value });
        }
        this.props.onChange?.(value);
    };
    handleKeyEvent = (event) => {
        const { altKey, ctrlKey, metaKey, shiftKey, which } = event;
        if (which === common_1.Keys.ESCAPE) {
            this.cancelEditing();
            return;
        }
        const hasModifierKey = altKey || ctrlKey || metaKey || shiftKey;
        if (which === common_1.Keys.ENTER) {
            if (altKey || shiftKey) {
                event.preventDefault();
            }
            if (this.props.confirmOnEnterKey && this.props.multiline) {
                if (event.target != null && hasModifierKey) {
                    insertAtCaret(event.target, "\n");
                    this.handleTextChange(event);
                }
                else {
                    this.toggleEditing();
                }
            }
            else if (!this.props.multiline || hasModifierKey) {
                this.toggleEditing();
            }
        }
    };
    renderInput(value) {
        const { disabled, maxLength, multiline, type, placeholder } = this.props;
        const props = {
            className: common_1.Classes.EDITABLE_TEXT_INPUT,
            disabled,
            maxLength,
            onBlur: this.toggleEditing,
            onChange: this.handleTextChange,
            onKeyDown: this.handleKeyEvent,
            placeholder,
            value,
        };
        const { inputHeight, inputWidth } = this.state;
        if (inputHeight !== 0 && inputWidth !== 0) {
            props.style = {
                height: inputHeight,
                lineHeight: !multiline && inputHeight != null ? `${inputHeight}px` : undefined,
                width: multiline ? "100%" : inputWidth,
            };
        }
        return multiline ? (React.createElement("textarea", { ref: this.refHandlers.input, ...props })) : (React.createElement("input", { ref: this.refHandlers.input, type: type, ...props }));
    }
    updateInputDimensions() {
        if (this.valueElement != null) {
            const { maxLines, minLines, minWidth, multiline } = this.props;
            const { parentElement, textContent } = this.valueElement;
            let { scrollHeight, scrollWidth } = this.valueElement;
            const lineHeight = getLineHeight(this.valueElement);
            if (multiline && this.state.isEditing && /\n$/.test(textContent ?? "")) {
                scrollHeight += lineHeight;
            }
            if (lineHeight > 0) {
                scrollHeight = (0, utils_1.clamp)(scrollHeight, minLines * lineHeight, maxLines * lineHeight);
            }
            scrollHeight = Math.max(scrollHeight, getFontSize(this.valueElement) + 1, getLineHeight(parentElement));
            scrollWidth += compatibility_1.Browser.isInternetExplorer() ? BUFFER_WIDTH_IE : BUFFER_WIDTH_DEFAULT;
            this.setState({
                inputHeight: scrollHeight,
                inputWidth: Math.max(scrollWidth, minWidth),
            });
            if (multiline && this.state.isEditing) {
                this.setTimeout(() => (parentElement.style.height = `${scrollHeight}px`));
            }
        }
    }
}
exports.EditableText = EditableText;
function getFontSize(element) {
    const fontSize = getComputedStyle(element).fontSize;
    return fontSize === "" ? 0 : parseInt(fontSize.slice(0, -2), 10);
}
function getLineHeight(element) {
    let lineHeight = parseInt(getComputedStyle(element).lineHeight.slice(0, -2), 10);
    if (isNaN(lineHeight)) {
        const line = document.createElement("span");
        line.innerHTML = "<br>";
        element.appendChild(line);
        const singleLineHeight = element.offsetHeight;
        line.innerHTML = "<br><br>";
        const doubleLineHeight = element.offsetHeight;
        element.removeChild(line);
        lineHeight = doubleLineHeight - singleLineHeight;
    }
    return lineHeight;
}
function insertAtCaret(el, text) {
    const { selectionEnd, selectionStart, value } = el;
    if (selectionStart >= 0) {
        const before = value.substring(0, selectionStart);
        const after = value.substring(selectionEnd, value.length);
        const len = text.length;
        el.value = `${before}${text}${after}`;
        el.selectionStart = selectionStart + len;
        el.selectionEnd = selectionStart + len;
    }
}
function inputSupportsSelection(input) {
    switch (input.type) {
        case "textarea":
            return true;
        case "text":
        case "search":
        case "tel":
        case "url":
        case "password":
            return true;
        default:
            return false;
    }
}
//# sourceMappingURL=editableText.js.map