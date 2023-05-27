"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelStack = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const react_transition_group_1 = require("react-transition-group");
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const panelView_1 = require("./panelView");
class PanelStack extends common_1.AbstractPureComponent2 {
    state = {
        direction: "push",
        stack: this.props.stack != null
            ? this.props.stack.slice().reverse()
            : this.props.initialPanel !== undefined
                ? [this.props.initialPanel]
                : [],
    };
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        if (this.props.stack !== prevProps.stack && prevProps.stack != null) {
            this.setState({ stack: this.props.stack.slice().reverse() });
        }
        const stackLength = this.props.stack != null ? this.props.stack.length : 0;
        const prevStackLength = prevProps.stack != null ? prevProps.stack.length : 0;
        if (stackLength !== prevStackLength && prevProps.stack != null) {
            this.setState({
                direction: prevProps.stack.length - this.props.stack.length < 0 ? "push" : "pop",
            });
        }
    }
    render() {
        const classes = (0, classnames_1.default)(common_1.Classes.PANEL_STACK, `${common_1.Classes.PANEL_STACK}-${this.state.direction}`, this.props.className);
        return (React.createElement(react_transition_group_1.TransitionGroup, { className: classes, component: "div" }, this.renderPanels()));
    }
    validateProps(props) {
        if ((props.initialPanel == null && props.stack == null) ||
            (props.initialPanel != null && props.stack != null)) {
            console.error(Errors.PANEL_STACK_INITIAL_PANEL_STACK_MUTEX);
        }
        if (props.stack != null && props.stack.length === 0) {
            console.error(Errors.PANEL_STACK_REQUIRES_PANEL);
        }
    }
    renderPanels() {
        const { renderActivePanelOnly = true } = this.props;
        const { stack } = this.state;
        if (stack.length === 0) {
            return null;
        }
        const panelsToRender = renderActivePanelOnly ? [stack[0]] : stack;
        const panelViews = panelsToRender.map(this.renderPanel).reverse();
        return panelViews;
    }
    renderPanel = (panel, index) => {
        const { renderActivePanelOnly, showPanelHeader = true } = this.props;
        const { stack } = this.state;
        const layer = stack.length - index;
        const key = renderActivePanelOnly ? stack.length : layer;
        return (React.createElement(react_transition_group_1.CSSTransition, { classNames: common_1.Classes.PANEL_STACK, key: key, timeout: 400 },
            React.createElement(panelView_1.PanelView, { onClose: this.handlePanelClose, onOpen: this.handlePanelOpen, panel: panel, previousPanel: stack[index + 1], showHeader: showPanelHeader })));
    };
    handlePanelClose = (panel) => {
        const { stack } = this.state;
        if (stack[0] !== panel || stack.length <= 1) {
            return;
        }
        this.props.onClose?.(panel);
        if (this.props.stack == null) {
            this.setState(state => ({
                direction: "pop",
                stack: state.stack.slice(1),
            }));
        }
    };
    handlePanelOpen = (panel) => {
        this.props.onOpen?.(panel);
        if (this.props.stack == null) {
            this.setState(state => ({
                direction: "push",
                stack: [panel, ...state.stack],
            }));
        }
    };
}
exports.PanelStack = PanelStack;
//# sourceMappingURL=panelStack.js.map