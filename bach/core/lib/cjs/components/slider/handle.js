"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const sliderUtils_1 = require("./sliderUtils");
const NUMBER_PROPS = ["max", "min", "stepSize", "tickSize", "value"];
class Handle extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.SliderHandle`;
    state = {
        isMoving: false,
    };
    handleElement = null;
    refHandlers = {
        handle: (el) => (this.handleElement = el),
    };
    componentDidMount() {
        this.forceUpdate();
    }
    render() {
        const { className, disabled, label, min, max, value, vertical, htmlProps } = this.props;
        const { isMoving } = this.state;
        return (React.createElement("span", { role: "slider", tabIndex: 0, ...htmlProps, className: (0, classnames_1.default)(common_1.Classes.SLIDER_HANDLE, { [common_1.Classes.ACTIVE]: isMoving }, className), onKeyDown: disabled ? undefined : this.handleKeyDown, onKeyUp: disabled ? undefined : this.handleKeyUp, onMouseDown: disabled ? undefined : this.beginHandleMovement, onTouchStart: disabled ? undefined : this.beginHandleTouchMovement, ref: this.refHandlers.handle, style: this.getStyleProperties(), "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, "aria-orientation": vertical ? "vertical" : "horizontal" }, label == null ? null : React.createElement("span", { className: common_1.Classes.SLIDER_LABEL }, label)));
    }
    componentWillUnmount() {
        this.removeDocumentEventListeners();
    }
    clientToValue(clientPixel) {
        const { stepSize, tickSize, value, vertical } = this.props;
        if (this.handleElement == null) {
            return value;
        }
        const clientPixelNormalized = vertical ? window.innerHeight - clientPixel : clientPixel;
        const handleCenterPixel = this.getHandleElementCenterPixel(this.handleElement);
        const pixelDelta = clientPixelNormalized - handleCenterPixel;
        if (isNaN(pixelDelta)) {
            return value;
        }
        return value + Math.round(pixelDelta / (tickSize * stepSize)) * stepSize;
    }
    mouseEventClientOffset(event) {
        return this.props.vertical ? event.clientY : event.clientX;
    }
    touchEventClientOffset(event) {
        const touch = event.changedTouches[0];
        return this.props.vertical ? touch.clientY : touch.clientX;
    }
    beginHandleMovement = (event) => {
        document.addEventListener("mousemove", this.handleHandleMovement);
        document.addEventListener("mouseup", this.endHandleMovement);
        this.setState({ isMoving: true });
        this.changeValue(this.clientToValue(this.mouseEventClientOffset(event)));
    };
    beginHandleTouchMovement = (event) => {
        document.addEventListener("touchmove", this.handleHandleTouchMovement);
        document.addEventListener("touchend", this.endHandleTouchMovement);
        document.addEventListener("touchcancel", this.endHandleTouchMovement);
        this.setState({ isMoving: true });
        this.changeValue(this.clientToValue(this.touchEventClientOffset(event)));
    };
    validateProps(props) {
        for (const prop of NUMBER_PROPS) {
            if (typeof props[prop] !== "number") {
                throw new Error(`[Blueprint] <Handle> requires number value for ${prop} prop`);
            }
        }
    }
    getStyleProperties = () => {
        if (this.handleElement == null) {
            return {};
        }
        const { min = 0, tickSizeRatio, value, vertical } = this.props;
        const { handleMidpoint } = this.getHandleMidpointAndOffset(this.handleElement, true);
        const offsetRatio = (value - min) * tickSizeRatio;
        const offsetCalc = `calc(${(0, sliderUtils_1.formatPercentage)(offsetRatio)} - ${handleMidpoint}px)`;
        return vertical ? { bottom: offsetCalc } : { left: offsetCalc };
    };
    endHandleMovement = (event) => {
        this.handleMoveEndedAt(this.mouseEventClientOffset(event));
    };
    endHandleTouchMovement = (event) => {
        this.handleMoveEndedAt(this.touchEventClientOffset(event));
    };
    handleMoveEndedAt = (clientPixel) => {
        this.removeDocumentEventListeners();
        this.setState({ isMoving: false });
        const finalValue = this.changeValue(this.clientToValue(clientPixel));
        this.props.onRelease?.(finalValue);
    };
    handleHandleMovement = (event) => {
        this.handleMovedTo(this.mouseEventClientOffset(event));
    };
    handleHandleTouchMovement = (event) => {
        this.handleMovedTo(this.touchEventClientOffset(event));
    };
    handleMovedTo = (clientPixel) => {
        if (this.state.isMoving && !this.props.disabled) {
            this.changeValue(this.clientToValue(clientPixel));
        }
    };
    handleKeyDown = (event) => {
        const { stepSize, value } = this.props;
        const { which } = event;
        if (which === common_1.Keys.ARROW_DOWN || which === common_1.Keys.ARROW_LEFT) {
            this.changeValue(value - stepSize);
            event.preventDefault();
        }
        else if (which === common_1.Keys.ARROW_UP || which === common_1.Keys.ARROW_RIGHT) {
            this.changeValue(value + stepSize);
            event.preventDefault();
        }
    };
    handleKeyUp = (event) => {
        if ([common_1.Keys.ARROW_UP, common_1.Keys.ARROW_DOWN, common_1.Keys.ARROW_LEFT, common_1.Keys.ARROW_RIGHT].indexOf(event.which) >= 0) {
            this.props.onRelease?.(this.props.value);
        }
    };
    changeValue(newValue, callback = this.props.onChange) {
        newValue = this.clamp(newValue);
        if (!isNaN(newValue) && this.props.value !== newValue) {
            callback?.(newValue);
        }
        return newValue;
    }
    clamp(value) {
        return (0, utils_1.clamp)(value, this.props.min, this.props.max);
    }
    getHandleElementCenterPixel(handleElement) {
        const { handleMidpoint, handleOffset } = this.getHandleMidpointAndOffset(handleElement);
        return handleOffset + handleMidpoint;
    }
    getHandleMidpointAndOffset(handleElement, useOppositeDimension = false) {
        if (handleElement == null) {
            return { handleMidpoint: 0, handleOffset: 0 };
        }
        const { vertical } = this.props;
        const handleRect = handleElement.getBoundingClientRect();
        const sizeKey = vertical
            ? useOppositeDimension
                ? "width"
                : "height"
            : useOppositeDimension
                ? "height"
                : "width";
        const handleOffset = vertical ? window.innerHeight - (handleRect.top + handleRect[sizeKey]) : handleRect.left;
        return { handleMidpoint: handleRect[sizeKey] / 2, handleOffset };
    }
    removeDocumentEventListeners() {
        document.removeEventListener("mousemove", this.handleHandleMovement);
        document.removeEventListener("mouseup", this.endHandleMovement);
        document.removeEventListener("touchmove", this.handleHandleTouchMovement);
        document.removeEventListener("touchend", this.endHandleTouchMovement);
        document.removeEventListener("touchcancel", this.endHandleTouchMovement);
    }
}
exports.Handle = Handle;
//# sourceMappingURL=handle.js.map