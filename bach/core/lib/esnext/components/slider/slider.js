"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const multiSlider_1 = require("./multiSlider");
class Slider extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        ...multiSlider_1.MultiSlider.defaultSliderProps,
        initialValue: 0,
        intent: common_1.Intent.PRIMARY,
        value: 0,
    };
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Slider`;
    render() {
        const { initialValue, intent, value, onChange, onRelease, handleHtmlProps, ...props } = this.props;
        return (React.createElement(multiSlider_1.MultiSlider, { ...props },
            React.createElement(multiSlider_1.MultiSlider.Handle, { value: value, intentAfter: value < initialValue ? intent : undefined, intentBefore: value >= initialValue ? intent : undefined, onChange: onChange, onRelease: onRelease, htmlProps: handleHtmlProps }),
            React.createElement(multiSlider_1.MultiSlider.Handle, { value: initialValue, interactionKind: "none" })));
    }
}
exports.Slider = Slider;
//# sourceMappingURL=slider.js.map