"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collapse = exports.AnimationStates = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
var AnimationStates;
(function (AnimationStates) {
    AnimationStates[AnimationStates["OPEN_START"] = 0] = "OPEN_START";
    AnimationStates[AnimationStates["OPENING"] = 1] = "OPENING";
    AnimationStates[AnimationStates["OPEN"] = 2] = "OPEN";
    AnimationStates[AnimationStates["CLOSING_START"] = 3] = "CLOSING_START";
    AnimationStates[AnimationStates["CLOSING"] = 4] = "CLOSING";
    AnimationStates[AnimationStates["CLOSED"] = 5] = "CLOSED";
})(AnimationStates = exports.AnimationStates || (exports.AnimationStates = {}));
class Collapse extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Collapse`;
    static defaultProps = {
        component: "div",
        isOpen: false,
        keepChildrenMounted: false,
        transitionDuration: 200,
    };
    static getDerivedStateFromProps(props, state) {
        const { isOpen } = props;
        const { animationState } = state;
        if (isOpen) {
            switch (animationState) {
                case AnimationStates.OPEN:
                    break;
                case AnimationStates.OPENING:
                    break;
                default:
                    return { animationState: AnimationStates.OPEN_START };
            }
        }
        else {
            switch (animationState) {
                case AnimationStates.CLOSED:
                    break;
                case AnimationStates.CLOSING:
                    break;
                default:
                    return {
                        animationState: AnimationStates.CLOSING_START,
                        height: `${state.heightWhenOpen}px`,
                    };
            }
        }
        return null;
    }
    state = {
        animationState: this.props.isOpen ? AnimationStates.OPEN : AnimationStates.CLOSED,
        height: undefined,
        heightWhenOpen: undefined,
    };
    contents = null;
    render() {
        const isContentVisible = this.state.animationState !== AnimationStates.CLOSED;
        const shouldRenderChildren = isContentVisible || this.props.keepChildrenMounted;
        const displayWithTransform = isContentVisible && this.state.animationState !== AnimationStates.CLOSING;
        const isAutoHeight = this.state.height === "auto";
        const containerStyle = {
            height: isContentVisible ? this.state.height : undefined,
            overflowY: isAutoHeight ? "visible" : undefined,
            transition: isAutoHeight ? "none" : undefined,
        };
        const contentsStyle = {
            transform: displayWithTransform ? "translateY(0)" : `translateY(-${this.state.heightWhenOpen}px)`,
            transition: isAutoHeight ? "none" : undefined,
        };
        return React.createElement(this.props.component, {
            className: (0, classnames_1.default)(common_1.Classes.COLLAPSE, this.props.className),
            style: containerStyle,
        }, React.createElement("div", { className: common_1.Classes.COLLAPSE_BODY, ref: this.contentsRefHandler, style: contentsStyle, "aria-hidden": !isContentVisible }, shouldRenderChildren ? this.props.children : null));
    }
    componentDidMount() {
        this.forceUpdate();
        if (this.props.isOpen) {
            this.setState({ animationState: AnimationStates.OPEN, height: "auto" });
        }
        else {
            this.setState({ animationState: AnimationStates.CLOSED, height: "0px" });
        }
    }
    componentDidUpdate() {
        if (this.contents == null) {
            return;
        }
        const { transitionDuration } = this.props;
        const { animationState } = this.state;
        if (animationState === AnimationStates.OPEN_START) {
            const { clientHeight } = this.contents;
            this.setState({
                animationState: AnimationStates.OPENING,
                height: `${clientHeight}px`,
                heightWhenOpen: clientHeight,
            });
            this.setTimeout(() => this.onDelayedStateChange(), transitionDuration);
        }
        else if (animationState === AnimationStates.CLOSING_START) {
            const { clientHeight } = this.contents;
            this.setTimeout(() => this.setState({
                animationState: AnimationStates.CLOSING,
                height: "0px",
                heightWhenOpen: clientHeight,
            }));
            this.setTimeout(() => this.onDelayedStateChange(), transitionDuration);
        }
    }
    contentsRefHandler = (el) => {
        this.contents = el;
        if (this.contents != null) {
            const height = this.contents.clientHeight;
            this.setState({
                animationState: this.props.isOpen ? AnimationStates.OPEN : AnimationStates.CLOSED,
                height: height === 0 ? undefined : `${height}px`,
                heightWhenOpen: height === 0 ? undefined : height,
            });
        }
    };
    onDelayedStateChange() {
        switch (this.state.animationState) {
            case AnimationStates.OPENING:
                this.setState({ animationState: AnimationStates.OPEN, height: "auto" });
                break;
            case AnimationStates.CLOSING:
                this.setState({ animationState: AnimationStates.CLOSED });
                break;
            default:
                break;
        }
    }
}
exports.Collapse = Collapse;
//# sourceMappingURL=collapse.js.map