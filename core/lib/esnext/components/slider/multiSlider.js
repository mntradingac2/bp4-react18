"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSlider = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const props_1 = require("../../common/props");
const Utils = tslib_1.__importStar(require("../../common/utils"));
const handle_1 = require("./handle");
const handleProps_1 = require("./handleProps");
const sliderUtils_1 = require("./sliderUtils");
const MultiSliderHandle = () => null;
MultiSliderHandle.displayName = `${props_1.DISPLAYNAME_PREFIX}.MultiSliderHandle`;
class MultiSlider extends common_1.AbstractPureComponent2 {
    static defaultSliderProps = {
        disabled: false,
        max: 10,
        min: 0,
        showTrackFill: true,
        stepSize: 1,
        vertical: false,
    };
    static defaultProps = {
        ...MultiSlider.defaultSliderProps,
        defaultTrackIntent: common_1.Intent.NONE,
    };
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.MultiSlider`;
    static Handle = MultiSliderHandle;
    static getDerivedStateFromProps(props) {
        return { labelPrecision: MultiSlider.getLabelPrecision(props) };
    }
    static getLabelPrecision({ labelPrecision, stepSize }) {
        return labelPrecision == null ? Utils.countDecimalPlaces(stepSize) : labelPrecision;
    }
    state = {
        labelPrecision: getLabelPrecision(this.props),
        tickSize: 0,
        tickSizeRatio: 0,
    };
    handleElements = [];
    trackElement = null;
    getSnapshotBeforeUpdate(prevProps) {
        const prevHandleProps = getSortedInteractiveHandleProps(prevProps);
        const newHandleProps = getSortedInteractiveHandleProps(this.props);
        if (newHandleProps.length !== prevHandleProps.length) {
            this.handleElements = [];
        }
        return null;
    }
    render() {
        const classes = (0, classnames_1.default)(common_1.Classes.SLIDER, {
            [common_1.Classes.DISABLED]: this.props.disabled,
            [`${common_1.Classes.SLIDER}-unlabeled`]: this.props.labelRenderer === false,
            [common_1.Classes.VERTICAL]: this.props.vertical,
        }, this.props.className);
        return (React.createElement("div", { className: classes, onMouseDown: this.maybeHandleTrackClick, onTouchStart: this.maybeHandleTrackTouch },
            React.createElement("div", { className: common_1.Classes.SLIDER_TRACK, ref: ref => (this.trackElement = ref) }, this.renderTracks()),
            React.createElement("div", { className: common_1.Classes.SLIDER_AXIS }, this.renderLabels()),
            this.renderHandles()));
    }
    componentDidMount() {
        this.updateTickSize();
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        this.updateTickSize();
    }
    validateProps(props) {
        if (props.stepSize <= 0) {
            throw new Error(Errors.SLIDER_ZERO_STEP);
        }
        if (props.labelStepSize !== undefined && props.labelValues !== undefined) {
            throw new Error(Errors.MULTISLIDER_WARN_LABEL_STEP_SIZE_LABEL_VALUES_MUTEX);
        }
        if (props.labelStepSize !== undefined && props.labelStepSize <= 0) {
            throw new Error(Errors.SLIDER_ZERO_LABEL_STEP);
        }
        if (props.min !== undefined && !isFinite(props.min)) {
            throw new Error(Errors.SLIDER_MIN);
        }
        if (props.max !== undefined && !isFinite(props.max)) {
            throw new Error(Errors.SLIDER_MAX);
        }
        let anyInvalidChildren = false;
        React.Children.forEach(props.children, child => {
            if (child && !Utils.isElementOfType(child, MultiSlider.Handle)) {
                anyInvalidChildren = true;
            }
        });
        if (anyInvalidChildren) {
            throw new Error(Errors.MULTISLIDER_INVALID_CHILD);
        }
    }
    formatLabel(value, isHandleTooltip = false) {
        const { labelRenderer } = this.props;
        if (labelRenderer === false) {
            return undefined;
        }
        else if (Utils.isFunction(labelRenderer)) {
            return labelRenderer(value, { isHandleTooltip });
        }
        else {
            return value.toFixed(this.state.labelPrecision);
        }
    }
    renderLabels() {
        if (this.props.labelRenderer === false) {
            return null;
        }
        const values = this.getLabelValues();
        const { max, min } = this.props;
        const labels = values.map((step, i) => {
            const offsetPercentage = (0, sliderUtils_1.formatPercentage)((step - min) / (max - min));
            const style = this.props.vertical ? { bottom: offsetPercentage } : { left: offsetPercentage };
            return (React.createElement("div", { className: common_1.Classes.SLIDER_LABEL, key: i, style: style }, this.formatLabel(step)));
        });
        return labels;
    }
    renderTracks() {
        const trackStops = getSortedHandleProps(this.props);
        trackStops.push({ value: this.props.max });
        let previous = { value: this.props.min };
        const handles = [];
        for (let index = 0; index < trackStops.length; index++) {
            const current = trackStops[index];
            handles.push(this.renderTrackFill(index, previous, current));
            previous = current;
        }
        return handles;
    }
    renderTrackFill(index, start, end) {
        const [startRatio, endRatio] = [this.getOffsetRatio(start.value), this.getOffsetRatio(end.value)].sort((left, right) => left - right);
        const startOffset = (0, sliderUtils_1.formatPercentage)(startRatio);
        const endOffset = (0, sliderUtils_1.formatPercentage)(1 - endRatio);
        const orientationStyle = this.props.vertical
            ? { bottom: startOffset, top: endOffset, left: 0 }
            : { left: startOffset, right: endOffset, top: 0 };
        const style = {
            ...orientationStyle,
            ...(start.trackStyleAfter || end.trackStyleBefore || {}),
        };
        const classes = (0, classnames_1.default)(common_1.Classes.SLIDER_PROGRESS, common_1.Classes.intentClass(this.getTrackIntent(start, end)));
        return React.createElement("div", { key: `track-${index}`, className: classes, style: style });
    }
    renderHandles() {
        const { disabled, max, min, stepSize, vertical } = this.props;
        const handleProps = getSortedInteractiveHandleProps(this.props);
        if (handleProps.length === 0) {
            return null;
        }
        return handleProps.map(({ value, type, className, htmlProps }, index) => (React.createElement(handle_1.Handle, { htmlProps: htmlProps, className: (0, classnames_1.default)({
                [common_1.Classes.START]: type === handleProps_1.HandleType.START,
                [common_1.Classes.END]: type === handleProps_1.HandleType.END,
            }, className), disabled: disabled, key: `${index}-${handleProps.length}`, label: this.formatLabel(value, true), max: max, min: min, onChange: this.getHandlerForIndex(index, this.handleChange), onRelease: this.getHandlerForIndex(index, this.handleRelease), ref: this.addHandleRef, stepSize: stepSize, tickSize: this.state.tickSize, tickSizeRatio: this.state.tickSizeRatio, value: value, vertical: vertical })));
    }
    addHandleRef = (ref) => {
        if (ref != null) {
            this.handleElements.push(ref);
        }
    };
    maybeHandleTrackClick = (event) => {
        if (this.canHandleTrackEvent(event)) {
            const foundHandle = this.nearestHandleForValue(this.handleElements, handle => handle.mouseEventClientOffset(event));
            if (foundHandle) {
                foundHandle.beginHandleMovement(event);
            }
        }
    };
    maybeHandleTrackTouch = (event) => {
        if (this.canHandleTrackEvent(event)) {
            const foundHandle = this.nearestHandleForValue(this.handleElements, handle => handle.touchEventClientOffset(event));
            if (foundHandle) {
                foundHandle.beginHandleTouchMovement(event);
            }
        }
    };
    canHandleTrackEvent = (event) => {
        const target = event.target;
        return !this.props.disabled && target.closest(`.${common_1.Classes.SLIDER_HANDLE}`) == null;
    };
    nearestHandleForValue(handles, getOffset) {
        return (0, sliderUtils_1.argMin)(handles, handle => {
            const offset = getOffset(handle);
            const offsetValue = handle.clientToValue(offset);
            const handleValue = handle.props.value;
            return Math.abs(offsetValue - handleValue);
        });
    }
    getHandlerForIndex = (index, callback) => {
        return (newValue) => {
            callback?.(this.getNewHandleValues(newValue, index));
        };
    };
    getNewHandleValues(newValue, oldIndex) {
        const handleProps = getSortedInteractiveHandleProps(this.props);
        const oldValues = handleProps.map(handle => handle.value);
        const newValues = oldValues.slice();
        newValues[oldIndex] = newValue;
        newValues.sort((left, right) => left - right);
        const newIndex = newValues.indexOf(newValue);
        const lockIndex = this.findFirstLockedHandleIndex(oldIndex, newIndex);
        if (lockIndex === -1) {
            (0, sliderUtils_1.fillValues)(newValues, oldIndex, newIndex, newValue);
        }
        else {
            const lockValue = oldValues[lockIndex];
            (0, sliderUtils_1.fillValues)(oldValues, oldIndex, lockIndex, lockValue);
            return oldValues;
        }
        return newValues;
    }
    findFirstLockedHandleIndex(startIndex, endIndex) {
        const inc = startIndex < endIndex ? 1 : -1;
        const handleProps = getSortedInteractiveHandleProps(this.props);
        for (let index = startIndex + inc; index !== endIndex + inc; index += inc) {
            if (handleProps[index].interactionKind !== handleProps_1.HandleInteractionKind.PUSH) {
                return index;
            }
        }
        return -1;
    }
    handleChange = (newValues) => {
        const handleProps = getSortedInteractiveHandleProps(this.props);
        const oldValues = handleProps.map(handle => handle.value);
        if (!Utils.arraysEqual(newValues, oldValues)) {
            this.props.onChange?.(newValues);
            handleProps.forEach((handle, index) => {
                if (oldValues[index] !== newValues[index]) {
                    handle.onChange?.(newValues[index]);
                }
            });
        }
    };
    handleRelease = (newValues) => {
        const handleProps = getSortedInteractiveHandleProps(this.props);
        this.props.onRelease?.(newValues);
        handleProps.forEach((handle, index) => {
            handle.onRelease?.(newValues[index]);
        });
    };
    getLabelValues() {
        const { labelStepSize, labelValues, min, max } = this.props;
        let values = [];
        if (labelValues !== undefined) {
            values = labelValues.slice();
        }
        else {
            for (let i = min; i < max || Utils.approxEqual(i, max); i += labelStepSize ?? 1) {
                values.push(i);
            }
        }
        return values;
    }
    getOffsetRatio(value) {
        return Utils.clamp((value - this.props.min) * this.state.tickSizeRatio, 0, 1);
    }
    getTrackIntent(start, end) {
        if (!this.props.showTrackFill) {
            return common_1.Intent.NONE;
        }
        if (start.intentAfter !== undefined) {
            return start.intentAfter;
        }
        else if (end !== undefined && end.intentBefore !== undefined) {
            return end.intentBefore;
        }
        return this.props.defaultTrackIntent;
    }
    updateTickSize() {
        if (this.trackElement != null) {
            const trackSize = this.props.vertical ? this.trackElement.clientHeight : this.trackElement.clientWidth;
            const tickSizeRatio = 1 / (this.props.max - this.props.min);
            const tickSize = trackSize * tickSizeRatio;
            this.setState({ tickSize, tickSizeRatio });
        }
    }
}
exports.MultiSlider = MultiSlider;
function getLabelPrecision({ labelPrecision, stepSize = MultiSlider.defaultSliderProps.stepSize }) {
    return labelPrecision == null ? Utils.countDecimalPlaces(stepSize) : labelPrecision;
}
function getSortedInteractiveHandleProps(props) {
    return getSortedHandleProps(props, childProps => childProps.interactionKind !== handleProps_1.HandleInteractionKind.NONE);
}
function getSortedHandleProps({ children }, predicate = () => true) {
    const maybeHandles = React.Children.map(children, child => Utils.isElementOfType(child, MultiSlider.Handle) && predicate(child.props) ? child.props : null);
    let handles = maybeHandles != null ? maybeHandles : [];
    handles = handles.filter(handle => handle !== null);
    handles.sort((left, right) => left.value - right.value);
    return handles;
}
//# sourceMappingURL=multiSlider.js.map