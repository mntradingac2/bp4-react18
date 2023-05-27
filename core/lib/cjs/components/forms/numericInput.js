"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericInput = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const buttonGroup_1 = require("../button/buttonGroup");
const buttons_1 = require("../button/buttons");
const controlGroup_1 = require("./controlGroup");
const inputGroup_1 = require("./inputGroup");
const numericInputUtils_1 = require("./numericInputUtils");
var IncrementDirection;
(function (IncrementDirection) {
    IncrementDirection[IncrementDirection["DOWN"] = -1] = "DOWN";
    IncrementDirection[IncrementDirection["UP"] = 1] = "UP";
})(IncrementDirection || (IncrementDirection = {}));
const NON_HTML_PROPS = [
    "allowNumericCharactersOnly",
    "buttonPosition",
    "clampValueOnBlur",
    "className",
    "defaultValue",
    "majorStepSize",
    "minorStepSize",
    "onButtonClick",
    "onValueChange",
    "selectAllOnFocus",
    "selectAllOnIncrement",
    "stepSize",
];
class NumericInput extends common_1.AbstractPureComponent2 {
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.NumericInput`;
    static VALUE_EMPTY = "";
    static VALUE_ZERO = "0";
    numericInputId = common_1.Utils.uniqueId("numericInput");
    static defaultProps = {
        allowNumericCharactersOnly: true,
        buttonPosition: common_1.Position.RIGHT,
        clampValueOnBlur: false,
        defaultValue: NumericInput.VALUE_EMPTY,
        large: false,
        majorStepSize: 10,
        minorStepSize: 0.1,
        selectAllOnFocus: false,
        selectAllOnIncrement: false,
        small: false,
        stepSize: 1,
    };
    static getDerivedStateFromProps(props, state) {
        const nextState = {
            prevMaxProp: props.max,
            prevMinProp: props.min,
        };
        const didMinChange = props.min !== state.prevMinProp;
        const didMaxChange = props.max !== state.prevMaxProp;
        const didBoundsChange = didMinChange || didMaxChange;
        const value = props.value?.toString() ?? state.value;
        const stepMaxPrecision = NumericInput.getStepMaxPrecision(props);
        const sanitizedValue = value !== NumericInput.VALUE_EMPTY
            ? NumericInput.roundAndClampValue(value, stepMaxPrecision, props.min, props.max, 0, props.locale)
            : NumericInput.VALUE_EMPTY;
        if (didBoundsChange && sanitizedValue !== state.value) {
            return { ...nextState, stepMaxPrecision, value: sanitizedValue };
        }
        return { ...nextState, stepMaxPrecision, value };
    }
    static CONTINUOUS_CHANGE_DELAY = 300;
    static CONTINUOUS_CHANGE_INTERVAL = 100;
    static getStepMaxPrecision(props) {
        if (props.minorStepSize != null) {
            return common_1.Utils.countDecimalPlaces(props.minorStepSize);
        }
        else {
            return common_1.Utils.countDecimalPlaces(props.stepSize);
        }
    }
    static roundAndClampValue(value, stepMaxPrecision, min, max, delta = 0, locale) {
        if (!(0, numericInputUtils_1.isValueNumeric)(value, locale)) {
            return NumericInput.VALUE_EMPTY;
        }
        const currentValue = (0, numericInputUtils_1.parseStringToStringNumber)(value, locale);
        const nextValue = (0, numericInputUtils_1.toMaxPrecision)(Number(currentValue) + delta, stepMaxPrecision);
        const clampedValue = (0, numericInputUtils_1.clampValue)(nextValue, min, max);
        return (0, numericInputUtils_1.toLocaleString)(clampedValue, locale);
    }
    state = {
        currentImeInputInvalid: false,
        shouldSelectAfterUpdate: false,
        stepMaxPrecision: NumericInput.getStepMaxPrecision(this.props),
        value: (0, numericInputUtils_1.getValueOrEmptyValue)(this.props.value ?? this.props.defaultValue),
    };
    didPasteEventJustOccur = false;
    delta = 0;
    inputElement = null;
    inputRef = (0, common_1.refHandler)(this, "inputElement", this.props.inputRef);
    intervalId;
    incrementButtonHandlers = this.getButtonEventHandlers(IncrementDirection.UP);
    decrementButtonHandlers = this.getButtonEventHandlers(IncrementDirection.DOWN);
    getCurrentValueAsNumber = () => Number((0, numericInputUtils_1.parseStringToStringNumber)(this.state.value, this.props.locale));
    render() {
        const { buttonPosition, className, fill, large, small } = this.props;
        const containerClasses = (0, classnames_1.default)(common_1.Classes.NUMERIC_INPUT, { [common_1.Classes.LARGE]: large, [common_1.Classes.SMALL]: small }, className);
        const buttons = this.renderButtons();
        return (React.createElement(controlGroup_1.ControlGroup, { className: containerClasses, fill: fill },
            buttonPosition === common_1.Position.LEFT && buttons,
            this.renderInput(),
            buttonPosition === common_1.Position.RIGHT && buttons));
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        if (prevProps.inputRef !== this.props.inputRef) {
            (0, common_1.setRef)(prevProps.inputRef, null);
            this.inputRef = (0, common_1.refHandler)(this, "inputElement", this.props.inputRef);
            (0, common_1.setRef)(this.props.inputRef, this.inputElement);
        }
        if (this.state.shouldSelectAfterUpdate) {
            this.inputElement?.setSelectionRange(0, this.state.value.length);
        }
        const didMinChange = this.props.min !== prevProps.min;
        const didMaxChange = this.props.max !== prevProps.max;
        const didBoundsChange = didMinChange || didMaxChange;
        const didLocaleChange = this.props.locale !== prevProps.locale;
        const didValueChange = this.state.value !== prevState.value;
        if ((didBoundsChange && didValueChange) || (didLocaleChange && prevState.value !== NumericInput.VALUE_EMPTY)) {
            const valueToParse = didLocaleChange ? prevState.value : this.state.value;
            const valueAsString = (0, numericInputUtils_1.parseStringToStringNumber)(valueToParse, prevProps.locale);
            const localizedValue = (0, numericInputUtils_1.toLocaleString)(+valueAsString, this.props.locale);
            this.props.onValueChange?.(+valueAsString, localizedValue, this.inputElement);
        }
    }
    validateProps(nextProps) {
        const { majorStepSize, max, min, minorStepSize, stepSize, value } = nextProps;
        if (min != null && max != null && min > max) {
            console.error(Errors.NUMERIC_INPUT_MIN_MAX);
        }
        if (stepSize <= 0) {
            console.error(Errors.NUMERIC_INPUT_STEP_SIZE_NON_POSITIVE);
        }
        if (minorStepSize && minorStepSize <= 0) {
            console.error(Errors.NUMERIC_INPUT_MINOR_STEP_SIZE_NON_POSITIVE);
        }
        if (majorStepSize && majorStepSize <= 0) {
            console.error(Errors.NUMERIC_INPUT_MAJOR_STEP_SIZE_NON_POSITIVE);
        }
        if (minorStepSize && minorStepSize > stepSize) {
            console.error(Errors.NUMERIC_INPUT_MINOR_STEP_SIZE_BOUND);
        }
        if (majorStepSize && majorStepSize < stepSize) {
            console.error(Errors.NUMERIC_INPUT_MAJOR_STEP_SIZE_BOUND);
        }
        if (value != null) {
            const stepMaxPrecision = NumericInput.getStepMaxPrecision(nextProps);
            const sanitizedValue = NumericInput.roundAndClampValue(value.toString(), stepMaxPrecision, min, max, 0, this.props.locale);
            const valueDoesNotMatch = sanitizedValue !== value.toString();
            const localizedValue = (0, numericInputUtils_1.toLocaleString)(Number((0, numericInputUtils_1.parseStringToStringNumber)(value, this.props.locale)), this.props.locale);
            const isNotLocalized = sanitizedValue !== localizedValue;
            if (valueDoesNotMatch && isNotLocalized) {
                console.warn(Errors.NUMERIC_INPUT_CONTROLLED_VALUE_INVALID);
            }
        }
    }
    renderButtons() {
        const { intent, max, min, locale } = this.props;
        const value = (0, numericInputUtils_1.parseStringToStringNumber)(this.state.value, locale);
        const disabled = this.props.disabled || this.props.readOnly;
        const isIncrementDisabled = max !== undefined && value !== "" && +value >= max;
        const isDecrementDisabled = min !== undefined && value !== "" && +value <= min;
        return (React.createElement(buttonGroup_1.ButtonGroup, { className: common_1.Classes.FIXED, key: "button-group", vertical: true },
            React.createElement(buttons_1.Button, { "aria-label": "increment", "aria-controls": this.numericInputId, disabled: disabled || isIncrementDisabled, icon: "chevron-up", intent: intent, ...this.incrementButtonHandlers }),
            React.createElement(buttons_1.Button, { "aria-label": "decrement", "aria-controls": this.numericInputId, disabled: disabled || isDecrementDisabled, icon: "chevron-down", intent: intent, ...this.decrementButtonHandlers })));
    }
    renderInput() {
        const inputGroupHtmlProps = (0, common_1.removeNonHTMLProps)(this.props, NON_HTML_PROPS, true);
        const valueAsNumber = this.getCurrentValueAsNumber();
        return (React.createElement(inputGroup_1.InputGroup, { asyncControl: this.props.asyncControl, autoComplete: "off", id: this.numericInputId, role: this.props.allowNumericCharactersOnly ? "spinbutton" : undefined, ...inputGroupHtmlProps, "aria-valuemax": this.props.max, "aria-valuemin": this.props.min, "aria-valuenow": valueAsNumber, intent: this.state.currentImeInputInvalid ? common_1.Intent.DANGER : this.props.intent, inputClassName: this.props.inputClassName, inputRef: this.inputRef, large: this.props.large, leftElement: this.props.leftElement, leftIcon: this.props.leftIcon, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onChange: this.handleInputChange, onCompositionEnd: this.handleCompositionEnd, onCompositionUpdate: this.handleCompositionUpdate, onKeyDown: this.handleInputKeyDown, onKeyPress: this.handleInputKeyPress, onPaste: this.handleInputPaste, rightElement: this.props.rightElement, small: this.props.small, value: this.state.value }));
    }
    getButtonEventHandlers(direction) {
        return {
            onKeyDown: evt => {
                if (!this.props.disabled && common_1.Keys.isKeyboardClick(evt.keyCode)) {
                    this.handleButtonClick(evt, direction);
                }
            },
            onMouseDown: evt => {
                if (!this.props.disabled) {
                    this.handleButtonClick(evt, direction);
                    this.startContinuousChange();
                }
            },
        };
    }
    handleButtonClick = (e, direction) => {
        const delta = this.updateDelta(direction, e);
        const nextValue = this.incrementValue(delta);
        this.props.onButtonClick?.(Number((0, numericInputUtils_1.parseStringToStringNumber)(nextValue, this.props.locale)), nextValue);
    };
    startContinuousChange() {
        document.addEventListener("mouseup", this.stopContinuousChange);
        this.setTimeout(() => {
            this.intervalId = window.setInterval(this.handleContinuousChange, NumericInput.CONTINUOUS_CHANGE_INTERVAL);
        }, NumericInput.CONTINUOUS_CHANGE_DELAY);
    }
    stopContinuousChange = () => {
        this.delta = 0;
        this.clearTimeouts();
        clearInterval(this.intervalId);
        document.removeEventListener("mouseup", this.stopContinuousChange);
    };
    handleContinuousChange = () => {
        if (this.props.min !== undefined || this.props.max !== undefined) {
            const min = this.props.min ?? -Infinity;
            const max = this.props.max ?? Infinity;
            const valueAsNumber = this.getCurrentValueAsNumber();
            if (valueAsNumber <= min || valueAsNumber >= max) {
                this.stopContinuousChange();
                return;
            }
        }
        const nextValue = this.incrementValue(this.delta);
        this.props.onButtonClick?.(Number((0, numericInputUtils_1.parseStringToStringNumber)(nextValue, this.props.locale)), nextValue);
    };
    handleInputFocus = (e) => {
        this.setState({ shouldSelectAfterUpdate: this.props.selectAllOnFocus });
        this.props.onFocus?.(e);
    };
    handleInputBlur = (e) => {
        this.setState({ shouldSelectAfterUpdate: false });
        if (this.props.clampValueOnBlur) {
            const { value } = e.target;
            this.handleNextValue(this.roundAndClampValue(value));
        }
        this.props.onBlur?.(e);
    };
    handleInputKeyDown = (e) => {
        if (this.props.disabled || this.props.readOnly) {
            return;
        }
        const { keyCode } = e;
        let direction;
        if (keyCode === common_1.Keys.ARROW_UP) {
            direction = IncrementDirection.UP;
        }
        else if (keyCode === common_1.Keys.ARROW_DOWN) {
            direction = IncrementDirection.DOWN;
        }
        if (direction !== undefined) {
            e.preventDefault();
            const delta = this.updateDelta(direction, e);
            this.incrementValue(delta);
        }
        this.props.onKeyDown?.(e);
    };
    handleCompositionEnd = (e) => {
        if (this.props.allowNumericCharactersOnly) {
            this.handleNextValue((0, numericInputUtils_1.sanitizeNumericInput)(e.data, this.props.locale));
            this.setState({ currentImeInputInvalid: false });
        }
    };
    handleCompositionUpdate = (e) => {
        if (this.props.allowNumericCharactersOnly) {
            const { data } = e;
            const sanitizedValue = (0, numericInputUtils_1.sanitizeNumericInput)(data, this.props.locale);
            if (sanitizedValue.length === 0 && data.length > 0) {
                this.setState({ currentImeInputInvalid: true });
            }
            else {
                this.setState({ currentImeInputInvalid: false });
            }
        }
    };
    handleInputKeyPress = (e) => {
        if (this.props.allowNumericCharactersOnly && !(0, numericInputUtils_1.isValidNumericKeyboardEvent)(e, this.props.locale)) {
            e.preventDefault();
        }
        this.props.onKeyPress?.(e);
    };
    handleInputPaste = (e) => {
        this.didPasteEventJustOccur = true;
        this.props.onPaste?.(e);
    };
    handleInputChange = (e) => {
        const { value } = e.target;
        let nextValue = value;
        if (this.props.allowNumericCharactersOnly && this.didPasteEventJustOccur) {
            this.didPasteEventJustOccur = false;
            nextValue = (0, numericInputUtils_1.sanitizeNumericInput)(value, this.props.locale);
        }
        this.handleNextValue(nextValue);
        this.setState({ shouldSelectAfterUpdate: false });
    };
    handleNextValue(valueAsString) {
        if (this.props.value == null) {
            this.setState({ value: valueAsString });
        }
        this.props.onValueChange?.(Number((0, numericInputUtils_1.parseStringToStringNumber)(valueAsString, this.props.locale)), valueAsString, this.inputElement);
    }
    incrementValue(delta) {
        const currValue = this.state.value === NumericInput.VALUE_EMPTY ? NumericInput.VALUE_ZERO : this.state.value;
        const nextValue = this.roundAndClampValue(currValue, delta);
        if (nextValue !== this.state.value) {
            this.handleNextValue(nextValue);
            this.setState({ shouldSelectAfterUpdate: this.props.selectAllOnIncrement });
        }
        return nextValue;
    }
    getIncrementDelta(direction, isShiftKeyPressed, isAltKeyPressed) {
        const { majorStepSize, minorStepSize, stepSize } = this.props;
        if (isShiftKeyPressed && majorStepSize != null) {
            return direction * majorStepSize;
        }
        else if (isAltKeyPressed && minorStepSize != null) {
            return direction * minorStepSize;
        }
        else {
            return direction * stepSize;
        }
    }
    roundAndClampValue(value, delta = 0) {
        return NumericInput.roundAndClampValue(value, this.state.stepMaxPrecision, this.props.min, this.props.max, delta, this.props.locale);
    }
    updateDelta(direction, e) {
        this.delta = this.getIncrementDelta(direction, e.shiftKey, e.altKey);
        return this.delta;
    }
}
exports.NumericInput = NumericInput;
//# sourceMappingURL=numericInput.js.map