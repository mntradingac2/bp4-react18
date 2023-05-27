"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverflowList = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const boundary_1 = require("../../common/boundary");
const Classes = tslib_1.__importStar(require("../../common/classes"));
const errors_1 = require("../../common/errors");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const resizeSensor_1 = require("../resize-sensor/resizeSensor");
class OverflowList extends React.Component {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.OverflowList`;
    static defaultProps = {
        alwaysRenderOverflow: false,
        collapseFrom: boundary_1.Boundary.START,
        minVisibleItems: 0,
    };
    static ofType() {
        return OverflowList;
    }
    state = {
        chopSize: this.defaultChopSize(),
        lastChopSize: null,
        lastOverflowCount: 0,
        overflow: [],
        repartitioning: false,
        visible: this.props.items,
    };
    spacer = null;
    componentDidMount() {
        this.repartition();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || !(this.state !== nextState && (0, utils_1.shallowCompareKeys)(this.state, nextState));
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.observeParents !== this.props.observeParents) {
            console.warn(errors_1.OVERFLOW_LIST_OBSERVE_PARENTS_CHANGED);
        }
        if (prevProps.collapseFrom !== this.props.collapseFrom ||
            prevProps.items !== this.props.items ||
            prevProps.minVisibleItems !== this.props.minVisibleItems ||
            prevProps.overflowRenderer !== this.props.overflowRenderer ||
            prevProps.alwaysRenderOverflow !== this.props.alwaysRenderOverflow ||
            prevProps.visibleItemRenderer !== this.props.visibleItemRenderer) {
            this.setState({
                chopSize: this.defaultChopSize(),
                lastChopSize: null,
                lastOverflowCount: 0,
                overflow: [],
                repartitioning: true,
                visible: this.props.items,
            });
        }
        const { repartitioning, overflow, lastOverflowCount } = this.state;
        if (repartitioning === false &&
            prevState.repartitioning === true) {
            if (overflow.length !== lastOverflowCount) {
                this.props.onOverflow?.(overflow.slice());
            }
        }
        else if (!(0, utils_1.shallowCompareKeys)(prevState, this.state)) {
            this.repartition();
        }
    }
    render() {
        const { className, collapseFrom, observeParents, style, tagName = "div", visibleItemRenderer } = this.props;
        const overflow = this.maybeRenderOverflow();
        const list = React.createElement(tagName, {
            className: (0, classnames_1.default)(Classes.OVERFLOW_LIST, className),
            style,
        }, collapseFrom === boundary_1.Boundary.START ? overflow : null, this.state.visible.map(visibleItemRenderer), collapseFrom === boundary_1.Boundary.END ? overflow : null, React.createElement("div", { className: Classes.OVERFLOW_LIST_SPACER, ref: ref => (this.spacer = ref) }));
        return (React.createElement(resizeSensor_1.ResizeSensor, { onResize: this.resize, observeParents: observeParents }, list));
    }
    maybeRenderOverflow() {
        const { overflow } = this.state;
        if (overflow.length === 0 && !this.props.alwaysRenderOverflow) {
            return null;
        }
        return this.props.overflowRenderer(overflow.slice());
    }
    resize = () => {
        this.repartition();
    };
    repartition() {
        if (this.spacer == null) {
            return;
        }
        const partitionExhausted = this.state.lastChopSize === 1;
        const minVisible = this.props.minVisibleItems ?? 0;
        const shouldShrink = this.spacer.offsetWidth < 0.9 && this.state.visible.length > minVisible;
        const shouldGrow = (this.spacer.offsetWidth >= 1 || this.state.visible.length < minVisible) &&
            this.state.overflow.length > 0 &&
            !partitionExhausted;
        if (shouldShrink || shouldGrow) {
            this.setState(state => {
                let visible;
                let overflow;
                if (this.props.collapseFrom === boundary_1.Boundary.END) {
                    const result = shiftElements(state.visible, state.overflow, this.state.chopSize * (shouldShrink ? 1 : -1));
                    visible = result[0];
                    overflow = result[1];
                }
                else {
                    const result = shiftElements(state.overflow, state.visible, this.state.chopSize * (shouldShrink ? -1 : 1));
                    overflow = result[0];
                    visible = result[1];
                }
                return {
                    chopSize: halve(state.chopSize),
                    lastChopSize: state.chopSize,
                    lastOverflowCount: this.isFirstPartitionCycle(state.chopSize)
                        ? state.overflow.length
                        : state.lastOverflowCount,
                    overflow,
                    repartitioning: true,
                    visible,
                };
            });
        }
        else {
            this.setState({
                chopSize: this.defaultChopSize(),
                lastChopSize: null,
                repartitioning: false,
            });
        }
    }
    defaultChopSize() {
        return halve(this.props.items.length);
    }
    isFirstPartitionCycle(currentChopSize) {
        return currentChopSize === this.defaultChopSize();
    }
}
exports.OverflowList = OverflowList;
function halve(num) {
    return Math.ceil(num / 2);
}
function shiftElements(leftArray, rightArray, num) {
    const allElements = leftArray.concat(rightArray);
    const newLeftLength = leftArray.length - num;
    if (newLeftLength <= 0) {
        return [[], allElements];
    }
    else if (newLeftLength >= allElements.length) {
        return [allElements, []];
    }
    const sliceIndex = allElements.length - newLeftLength;
    return [allElements.slice(0, -sliceIndex), allElements.slice(-sliceIndex)];
}
//# sourceMappingURL=overflowList.js.map