"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal2 = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const Classes = tslib_1.__importStar(require("../../common/classes"));
const Errors = tslib_1.__importStar(require("../../common/errors"));
const props_1 = require("../../common/props");
const portalProvider_1 = require("../../context/portal/portalProvider");
const usePrevious_1 = require("../../hooks/usePrevious");
const REACT_CONTEXT_TYPES = {
    blueprintPortalClassName: (obj, key) => {
        if (obj[key] != null && typeof obj[key] !== "string") {
            return new Error(Errors.PORTAL_CONTEXT_CLASS_NAME_STRING);
        }
        return undefined;
    },
};
function Portal2(props, legacyContext = {}) {
    const context = React.useContext(portalProvider_1.PortalContext);
    const [hasMounted, setHasMounted] = React.useState(false);
    const [portalElement, setPortalElement] = React.useState();
    const createContainerElement = React.useCallback(() => {
        const container = document.createElement("div");
        container.classList.add(Classes.PORTAL);
        maybeAddClass(container.classList, props.className);
        maybeAddClass(container.classList, context.portalClassName);
        const { blueprintPortalClassName } = legacyContext;
        if (blueprintPortalClassName != null && blueprintPortalClassName !== "") {
            console.error(Errors.PORTAL_LEGACY_CONTEXT_API);
            maybeAddClass(container.classList, blueprintPortalClassName);
        }
        return container;
    }, [props.className, context.portalClassName]);
    React.useEffect(() => {
        if (props.container == null) {
            return;
        }
        const newPortalElement = createContainerElement();
        props.container.appendChild(newPortalElement);
        setPortalElement(newPortalElement);
        setHasMounted(true);
        return () => {
            newPortalElement.remove();
            setHasMounted(false);
            setPortalElement(undefined);
        };
    }, [props.container, createContainerElement]);
    React.useEffect(() => {
        if (hasMounted) {
            props.onChildrenMount?.();
        }
    }, [hasMounted, props.onChildrenMount]);
    const prevClassName = (0, usePrevious_1.usePrevious)(props.className);
    React.useEffect(() => {
        if (portalElement != null) {
            maybeRemoveClass(portalElement.classList, prevClassName);
            maybeAddClass(portalElement.classList, props.className);
        }
    }, [props.className]);
    if (typeof document === "undefined" || !hasMounted || portalElement == null) {
        return null;
    }
    else {
        return ReactDOM.createPortal(props.children, portalElement);
    }
}
exports.Portal2 = Portal2;
Portal2.defaultProps = {
    container: typeof document !== "undefined" ? document.body : undefined,
};
Portal2.displayName = `${props_1.DISPLAYNAME_PREFIX}.Portal2`;
Portal2.contextTypes = REACT_CONTEXT_TYPES;
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
//# sourceMappingURL=portal2.js.map