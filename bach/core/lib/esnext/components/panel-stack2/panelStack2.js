"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelStack2 = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const react_transition_group_1 = require("react-transition-group");
const common_1 = require("../../common");
const panelView2_1 = require("./panelView2");
const PanelStack2 = (props) => {
    const { renderActivePanelOnly = true, showPanelHeader = true, stack: propsStack } = props;
    const [direction, setDirection] = React.useState("push");
    const [localStack, setLocalStack] = React.useState(props.initialPanel !== undefined ? [props.initialPanel] : []);
    const stack = React.useMemo(() => (propsStack != null ? propsStack.slice().reverse() : localStack), [localStack, propsStack]);
    const stackLength = React.useRef(stack.length);
    React.useEffect(() => {
        if (stack.length !== stackLength.current) {
            setDirection(stack.length - stackLength.current < 0 ? "pop" : "push");
        }
        stackLength.current = stack.length;
    }, [stack]);
    const handlePanelOpen = React.useCallback((panel) => {
        props.onOpen?.(panel);
        if (props.stack == null) {
            setLocalStack(prevStack => [panel, ...prevStack]);
        }
    }, [props.onOpen]);
    const handlePanelClose = React.useCallback((panel) => {
        if (stack[0] !== panel || stack.length <= 1) {
            return;
        }
        props.onClose?.(panel);
        if (props.stack == null) {
            setLocalStack(prevStack => prevStack.slice(1));
        }
    }, [stack, props.onClose]);
    if (stack.length === 0) {
        return null;
    }
    const panelsToRender = renderActivePanelOnly ? [stack[0]] : stack;
    const panels = panelsToRender
        .map((panel, index) => {
        const layer = stack.length - index;
        const key = renderActivePanelOnly ? stack.length : layer;
        return (React.createElement(react_transition_group_1.CSSTransition, { classNames: common_1.Classes.PANEL_STACK2, key: key, timeout: 400 },
            React.createElement(panelView2_1.PanelView2, { onClose: handlePanelClose, onOpen: handlePanelOpen, panel: panel, previousPanel: stack[index + 1], showHeader: showPanelHeader })));
    })
        .reverse();
    const classes = (0, classnames_1.default)(common_1.Classes.PANEL_STACK2, `${common_1.Classes.PANEL_STACK2}-${direction}`, props.className);
    return (React.createElement(react_transition_group_1.TransitionGroup, { className: classes, component: "div" }, panels));
};
exports.PanelStack2 = PanelStack2;
exports.PanelStack2.displayName = `${common_1.DISPLAYNAME_PREFIX}.PanelStack2`;
//# sourceMappingURL=panelStack2.js.map