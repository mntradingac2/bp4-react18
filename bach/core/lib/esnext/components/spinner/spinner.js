"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = exports.SpinnerSize = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const errors_1 = require("../../common/errors");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
var SpinnerSize;
(function (SpinnerSize) {
    SpinnerSize[SpinnerSize["SMALL"] = 20] = "SMALL";
    SpinnerSize[SpinnerSize["STANDARD"] = 50] = "STANDARD";
    SpinnerSize[SpinnerSize["LARGE"] = 100] = "LARGE";
})(SpinnerSize = exports.SpinnerSize || (exports.SpinnerSize = {}));
const R = 45;
const SPINNER_TRACK = `M 50,50 m 0,-${R} a ${R},${R} 0 1 1 0,${R * 2} a ${R},${R} 0 1 1 0,-${R * 2}`;
const PATH_LENGTH = 280;
const MIN_SIZE = 10;
const STROKE_WIDTH = 4;
const MIN_STROKE_WIDTH = 16;
class Spinner extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Spinner`;
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.forceUpdate();
        }
    }
    render() {
        const { className, intent, value, tagName = "div", ...htmlProps } = this.props;
        const size = this.getSize();
        const classes = (0, classnames_1.default)(common_1.Classes.SPINNER, common_1.Classes.intentClass(intent), { [common_1.Classes.SPINNER_NO_SPIN]: value != null }, className);
        const strokeWidth = Math.min(MIN_STROKE_WIDTH, (STROKE_WIDTH * SpinnerSize.LARGE) / size);
        const strokeOffset = PATH_LENGTH - PATH_LENGTH * (value == null ? 0.25 : (0, utils_1.clamp)(value, 0, 1));
        return React.createElement(tagName, {
            "aria-valuemax": 100,
            "aria-valuemin": 0,
            "aria-valuenow": value === undefined ? undefined : value * 100,
            className: classes,
            role: "progressbar",
            ...htmlProps,
        }, React.createElement(tagName, { className: common_1.Classes.SPINNER_ANIMATION }, React.createElement("svg", { width: size, height: size, strokeWidth: strokeWidth.toFixed(2), viewBox: this.getViewBox(strokeWidth) },
            React.createElement("path", { className: common_1.Classes.SPINNER_TRACK, d: SPINNER_TRACK }),
            React.createElement("path", { className: common_1.Classes.SPINNER_HEAD, d: SPINNER_TRACK, pathLength: PATH_LENGTH, strokeDasharray: `${PATH_LENGTH} ${PATH_LENGTH}`, strokeDashoffset: strokeOffset }))));
    }
    validateProps({ className = "", size }) {
        if (size != null && (className.indexOf(common_1.Classes.SMALL) >= 0 || className.indexOf(common_1.Classes.LARGE) >= 0)) {
            console.warn(errors_1.SPINNER_WARN_CLASSES_SIZE);
        }
    }
    getSize() {
        const { className = "", size } = this.props;
        if (size == null) {
            if (className.indexOf(common_1.Classes.SMALL) >= 0) {
                return SpinnerSize.SMALL;
            }
            else if (className.indexOf(common_1.Classes.LARGE) >= 0) {
                return SpinnerSize.LARGE;
            }
            return SpinnerSize.STANDARD;
        }
        return Math.max(MIN_SIZE, size);
    }
    getViewBox(strokeWidth) {
        const radius = R + strokeWidth / 2;
        const viewBoxX = (50 - radius).toFixed(2);
        const viewBoxWidth = (radius * 2).toFixed(2);
        return `${viewBoxX} ${viewBoxX} ${viewBoxWidth} ${viewBoxWidth}`;
    }
}
exports.Spinner = Spinner;
//# sourceMappingURL=spinner.js.map