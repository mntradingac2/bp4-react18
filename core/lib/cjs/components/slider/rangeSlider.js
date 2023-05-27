"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeSlider = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const props_1 = require("../../common/props");
const multiSlider_1 = require("./multiSlider");
var RangeIndex;
(function (RangeIndex) {
    RangeIndex[RangeIndex["START"] = 0] = "START";
    RangeIndex[RangeIndex["END"] = 1] = "END";
})(RangeIndex || (RangeIndex = {}));
class RangeSlider extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        ...multiSlider_1.MultiSlider.defaultSliderProps,
        intent: common_1.Intent.PRIMARY,
        value: [0, 10],
    };
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.RangeSlider`;
    render() {
        const { value, handleHtmlProps, ...props } = this.props;
        return (React.createElement(multiSlider_1.MultiSlider, { ...props },
            React.createElement(multiSlider_1.MultiSlider.Handle, { value: value[RangeIndex.START], type: "start", intentAfter: props.intent, htmlProps: handleHtmlProps?.start }),
            React.createElement(multiSlider_1.MultiSlider.Handle, { value: value[RangeIndex.END], type: "end", htmlProps: handleHtmlProps?.end })));
    }
    validateProps(props) {
        const { value } = props;
        if (value == null || value[RangeIndex.START] == null || value[RangeIndex.END] == null) {
            throw new Error(Errors.RANGESLIDER_NULL_VALUE);
        }
    }
}
exports.RangeSlider = RangeSlider;
//# sourceMappingURL=rangeSlider.js.map