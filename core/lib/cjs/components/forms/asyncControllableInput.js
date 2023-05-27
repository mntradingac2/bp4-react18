"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncControllableInput = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
class AsyncControllableInput extends common_1.AbstractPureComponent2 {
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.AsyncControllableInput`;
    static COMPOSITION_END_DELAY = 10;
    state = {
        hasPendingUpdate: false,
        isComposing: false,
        nextValue: this.props.value,
        value: this.props.value,
    };
    cancelPendingCompositionEnd = null;
    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextState.isComposing || nextProps.value === undefined) {
            return null;
        }
        const userTriggeredUpdate = nextState.nextValue !== nextState.value;
        if (userTriggeredUpdate) {
            if (nextProps.value === nextState.nextValue) {
                if (nextState.hasPendingUpdate) {
                    return { value: nextProps.value, hasPendingUpdate: false };
                }
                else {
                    return { value: nextState.nextValue };
                }
            }
            else {
                if (nextProps.value === nextState.value) {
                    return { hasPendingUpdate: true };
                }
                return { value: nextProps.value, nextValue: nextProps.value, hasPendingUpdate: false };
            }
        }
        else {
            return { value: nextProps.value, nextValue: nextProps.value, hasPendingUpdate: false };
        }
    }
    render() {
        const { isComposing, hasPendingUpdate, value, nextValue } = this.state;
        const { inputRef, ...restProps } = this.props;
        return (React.createElement("input", { ...restProps, ref: inputRef, value: isComposing || hasPendingUpdate ? nextValue : value, onCompositionStart: this.handleCompositionStart, onCompositionEnd: this.handleCompositionEnd, onChange: this.handleChange }));
    }
    handleCompositionStart = (e) => {
        this.cancelPendingCompositionEnd?.();
        this.setState({ isComposing: true });
        this.props.onCompositionStart?.(e);
    };
    handleCompositionEnd = (e) => {
        this.cancelPendingCompositionEnd = this.setTimeout(() => this.setState({ isComposing: false }), AsyncControllableInput.COMPOSITION_END_DELAY);
        this.props.onCompositionEnd?.(e);
    };
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ nextValue: value });
        this.props.onChange?.(e);
    };
}
exports.AsyncControllableInput = AsyncControllableInput;
//# sourceMappingURL=asyncControllableInput.js.map