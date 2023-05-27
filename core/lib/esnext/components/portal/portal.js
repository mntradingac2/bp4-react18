"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const Classes = tslib_1.__importStar(require("../../common/classes"));
const Errors = tslib_1.__importStar(require("../../common/errors"));
const props_1 = require("../../common/props");
const REACT_CONTEXT_TYPES = {
    blueprintPortalClassName: (obj, key) => {
        if (obj[key] != null && typeof obj[key] !== "string") {
            return new Error(Errors.PORTAL_CONTEXT_CLASS_NAME_STRING);
        }
        return undefined;
    },
};
class Portal extends React.Component {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Portal`;
    static contextTypes = REACT_CONTEXT_TYPES;
    static defaultProps = {
        container: typeof document !== "undefined" ? document.body : undefined,
    };
    context = {};
    state = { hasMounted: false };
    portalElement = null;
    render() {
        if (typeof document === "undefined" || !this.state.hasMounted || this.portalElement === null) {
            return null;
        }
        else {
            return ReactDOM.createPortal(this.props.children, this.portalElement);
        }
    }
    componentDidMount() {
        if (this.props.container == null) {
            return;
        }
        this.portalElement = this.createContainerElement();
        this.props.container.appendChild(this.portalElement);
        this.addStopPropagationListeners(this.props.stopPropagationEvents);
        this.setState({ hasMounted: true }, this.props.onChildrenMount);
    }
    componentDidUpdate(prevProps) {
        if (this.portalElement != null && prevProps.className !== this.props.className) {
            maybeRemoveClass(this.portalElement.classList, prevProps.className);
            maybeAddClass(this.portalElement.classList, this.props.className);
        }
        if (this.portalElement != null && prevProps.stopPropagationEvents !== this.props.stopPropagationEvents) {
            this.removeStopPropagationListeners(prevProps.stopPropagationEvents);
            this.addStopPropagationListeners(this.props.stopPropagationEvents);
        }
    }
    componentWillUnmount() {
        this.removeStopPropagationListeners(this.props.stopPropagationEvents);
        this.portalElement?.remove();
    }
    createContainerElement() {
        const container = document.createElement("div");
        container.classList.add(Classes.PORTAL);
        maybeAddClass(container.classList, this.props.className);
        if (this.context != null) {
            maybeAddClass(container.classList, this.context.blueprintPortalClassName);
        }
        return container;
    }
    addStopPropagationListeners(eventNames) {
        eventNames?.forEach(event => this.portalElement?.addEventListener(event, handleStopProgation));
    }
    removeStopPropagationListeners(events) {
        events?.forEach(event => this.portalElement?.removeEventListener(event, handleStopProgation));
    }
}
exports.Portal = Portal;
function maybeRemoveClass(classList, className) {
    if (className != null && className !== "") {
        classList.remove(...className.split(" "));
    }
}
function maybeAddClass(classList, className) {
    if (className != null && className !== "") {
        classList.add(...className.split(" "));
    }
}
function handleStopProgation(e) {
    e.stopPropagation();
}
//# sourceMappingURL=portal.js.map