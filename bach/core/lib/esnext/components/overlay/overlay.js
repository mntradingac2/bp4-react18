"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const react_dom_1 = require("react-dom");
const react_transition_group_1 = require("react-transition-group");
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const portal_1 = require("../portal/portal");
class Overlay extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Overlay`;
    static defaultProps = {
        autoFocus: true,
        backdropProps: {},
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        hasBackdrop: true,
        isOpen: false,
        lazy: true,
        shouldReturnFocusOnClose: true,
        transitionDuration: 300,
        transitionName: common_1.Classes.OVERLAY,
        usePortal: true,
    };
    static getDerivedStateFromProps({ isOpen: hasEverOpened }) {
        if (hasEverOpened) {
            return { hasEverOpened };
        }
        return null;
    }
    static openStack = [];
    static getLastOpened = () => Overlay.openStack[Overlay.openStack.length - 1];
    isAutoFocusing = false;
    lastActiveElementBeforeOpened;
    state = {
        hasEverOpened: this.props.isOpen,
    };
    containerElement = null;
    startFocusTrapElement = null;
    endFocusTrapElement = null;
    refHandlers = {
        container: (ref) => (this.containerElement = (0, react_dom_1.findDOMNode)(ref)),
        endFocusTrap: (ref) => (this.endFocusTrapElement = ref),
        startFocusTrap: (ref) => (this.startFocusTrapElement = ref),
    };
    render() {
        if (this.props.lazy && !this.state.hasEverOpened) {
            return null;
        }
        const { autoFocus, children, className, enforceFocus, usePortal, isOpen } = this.props;
        const childrenWithTransitions = isOpen ? React.Children.map(children, this.maybeRenderChild) ?? [] : [];
        const maybeBackdrop = this.maybeRenderBackdrop();
        if (maybeBackdrop !== null) {
            childrenWithTransitions.unshift(maybeBackdrop);
        }
        if (isOpen && (autoFocus || enforceFocus) && childrenWithTransitions.length > 0) {
            childrenWithTransitions.unshift(this.renderDummyElement("__start", {
                className: common_1.Classes.OVERLAY_START_FOCUS_TRAP,
                onFocus: this.handleStartFocusTrapElementFocus,
                onKeyDown: this.handleStartFocusTrapElementKeyDown,
                ref: this.refHandlers.startFocusTrap,
            }));
            if (enforceFocus) {
                childrenWithTransitions.push(this.renderDummyElement("__end", {
                    className: common_1.Classes.OVERLAY_END_FOCUS_TRAP,
                    onFocus: this.handleEndFocusTrapElementFocus,
                    ref: this.refHandlers.endFocusTrap,
                }));
            }
        }
        const containerClasses = (0, classnames_1.default)(common_1.Classes.OVERLAY, {
            [common_1.Classes.OVERLAY_OPEN]: isOpen,
            [common_1.Classes.OVERLAY_INLINE]: !usePortal,
        }, className);
        const transitionGroup = (React.createElement(react_transition_group_1.TransitionGroup, { appear: true, "aria-live": "polite", className: containerClasses, component: "div", onKeyDown: this.handleKeyDown, ref: this.refHandlers.container }, childrenWithTransitions));
        if (usePortal) {
            return (React.createElement(portal_1.Portal, { className: this.props.portalClassName, container: this.props.portalContainer, stopPropagationEvents: this.props.portalStopPropagationEvents }, transitionGroup));
        }
        else {
            return transitionGroup;
        }
    }
    componentDidMount() {
        if (this.props.isOpen) {
            this.overlayWillOpen();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isOpen && !this.props.isOpen) {
            this.overlayWillClose();
        }
        else if (!prevProps.isOpen && this.props.isOpen) {
            this.overlayWillOpen();
        }
    }
    componentWillUnmount() {
        this.overlayWillClose();
    }
    bringFocusInsideOverlay() {
        return this.requestAnimationFrame(() => {
            const activeElement = (0, utils_1.getActiveElement)(this.containerElement);
            if (this.containerElement == null || activeElement == null || !this.props.isOpen) {
                return;
            }
            const isFocusOutsideModal = !this.containerElement.contains(activeElement);
            if (isFocusOutsideModal) {
                this.startFocusTrapElement?.focus({ preventScroll: true });
                this.isAutoFocusing = false;
            }
        });
    }
    maybeRenderChild = (child) => {
        if ((0, utils_1.isFunction)(child)) {
            child = child();
        }
        if (child == null) {
            return null;
        }
        const decoratedChild = typeof child === "object" ? (React.cloneElement(child, {
            className: (0, classnames_1.default)(child.props.className, common_1.Classes.OVERLAY_CONTENT),
        })) : (React.createElement("span", { className: common_1.Classes.OVERLAY_CONTENT }, child));
        const { onOpening, onOpened, onClosing, transitionDuration, transitionName } = this.props;
        return (React.createElement(react_transition_group_1.CSSTransition, { classNames: transitionName, onEntering: onOpening, onEntered: onOpened, onExiting: onClosing, onExited: this.handleTransitionExited, timeout: transitionDuration, addEndListener: this.handleTransitionAddEnd }, decoratedChild));
    };
    maybeRenderBackdrop() {
        const { backdropClassName, backdropProps, hasBackdrop, isOpen, transitionDuration, transitionName } = this.props;
        if (hasBackdrop && isOpen) {
            return (React.createElement(react_transition_group_1.CSSTransition, { classNames: transitionName, key: "__backdrop", timeout: transitionDuration, addEndListener: this.handleTransitionAddEnd },
                React.createElement("div", { ...backdropProps, className: (0, classnames_1.default)(common_1.Classes.OVERLAY_BACKDROP, backdropClassName, backdropProps?.className), onMouseDown: this.handleBackdropMouseDown })));
        }
        else {
            return null;
        }
    }
    renderDummyElement(key, props) {
        const { transitionDuration, transitionName } = this.props;
        return (React.createElement(react_transition_group_1.CSSTransition, { classNames: transitionName, key: key, addEndListener: this.handleTransitionAddEnd, timeout: transitionDuration, unmountOnExit: true },
            React.createElement("div", { tabIndex: 0, ...props })));
    }
    handleStartFocusTrapElementFocus = (e) => {
        if (!this.props.enforceFocus || this.isAutoFocusing) {
            return;
        }
        if (e.relatedTarget != null &&
            this.containerElement.contains(e.relatedTarget) &&
            e.relatedTarget !== this.endFocusTrapElement) {
            this.endFocusTrapElement?.focus({ preventScroll: true });
        }
    };
    handleStartFocusTrapElementKeyDown = (e) => {
        if (!this.props.enforceFocus) {
            return;
        }
        if (e.shiftKey && e.which === common_1.Keys.TAB) {
            const lastFocusableElement = this.getKeyboardFocusableElements().pop();
            if (lastFocusableElement != null) {
                lastFocusableElement.focus();
            }
            else {
                this.endFocusTrapElement?.focus({ preventScroll: true });
            }
        }
    };
    handleEndFocusTrapElementFocus = (e) => {
        if (e.relatedTarget != null &&
            this.containerElement.contains(e.relatedTarget) &&
            e.relatedTarget !== this.startFocusTrapElement) {
            const firstFocusableElement = this.getKeyboardFocusableElements().shift();
            if (!this.isAutoFocusing && firstFocusableElement != null && firstFocusableElement !== e.relatedTarget) {
                firstFocusableElement.focus();
            }
            else {
                this.startFocusTrapElement?.focus({ preventScroll: true });
            }
        }
        else {
            const lastFocusableElement = this.getKeyboardFocusableElements().pop();
            if (lastFocusableElement != null) {
                lastFocusableElement.focus();
            }
            else {
                this.startFocusTrapElement?.focus({ preventScroll: true });
            }
        }
    };
    getKeyboardFocusableElements() {
        const focusableElements = this.containerElement !== null
            ? Array.from(this.containerElement.querySelectorAll([
                'a[href]:not([tabindex="-1"])',
                'button:not([disabled]):not([tabindex="-1"])',
                'details:not([tabindex="-1"])',
                'input:not([disabled]):not([tabindex="-1"])',
                'select:not([disabled]):not([tabindex="-1"])',
                'textarea:not([disabled]):not([tabindex="-1"])',
                '[tabindex]:not([tabindex="-1"])',
            ].join(",")))
            : [];
        return focusableElements.filter(el => !el.classList.contains(common_1.Classes.OVERLAY_START_FOCUS_TRAP) &&
            !el.classList.contains(common_1.Classes.OVERLAY_END_FOCUS_TRAP));
    }
    overlayWillClose() {
        document.removeEventListener("focus", this.handleDocumentFocus, true);
        document.removeEventListener("mousedown", this.handleDocumentClick);
        const { openStack } = Overlay;
        const stackIndex = openStack.indexOf(this);
        if (stackIndex !== -1) {
            openStack.splice(stackIndex, 1);
            if (openStack.length > 0) {
                const lastOpenedOverlay = Overlay.getLastOpened();
                if (lastOpenedOverlay.props.autoFocus && lastOpenedOverlay.props.enforceFocus) {
                    lastOpenedOverlay.bringFocusInsideOverlay();
                    document.addEventListener("focus", lastOpenedOverlay.handleDocumentFocus, true);
                }
            }
            if (openStack.filter(o => o.props.usePortal && o.props.hasBackdrop).length === 0) {
                document.body.classList.remove(common_1.Classes.OVERLAY_OPEN);
            }
        }
    }
    overlayWillOpen() {
        const { getLastOpened, openStack } = Overlay;
        if (openStack.length > 0) {
            document.removeEventListener("focus", getLastOpened().handleDocumentFocus, true);
        }
        openStack.push(this);
        if (this.props.autoFocus) {
            this.isAutoFocusing = true;
            this.bringFocusInsideOverlay();
        }
        if (this.props.enforceFocus) {
            document.addEventListener("focus", this.handleDocumentFocus, true);
        }
        if (this.props.canOutsideClickClose && !this.props.hasBackdrop) {
            document.addEventListener("mousedown", this.handleDocumentClick);
        }
        if (this.props.hasBackdrop && this.props.usePortal) {
            document.body.classList.add(common_1.Classes.OVERLAY_OPEN);
        }
        this.lastActiveElementBeforeOpened = (0, utils_1.getActiveElement)(this.containerElement);
    }
    handleTransitionExited = (node) => {
        if (this.props.shouldReturnFocusOnClose && this.lastActiveElementBeforeOpened instanceof HTMLElement) {
            this.lastActiveElementBeforeOpened.focus();
        }
        this.props.onClosed?.(node);
    };
    handleBackdropMouseDown = (e) => {
        const { backdropProps, canOutsideClickClose, enforceFocus, onClose } = this.props;
        if (canOutsideClickClose) {
            onClose?.(e);
        }
        if (enforceFocus) {
            this.bringFocusInsideOverlay();
        }
        backdropProps?.onMouseDown?.(e);
    };
    handleDocumentClick = (e) => {
        const { canOutsideClickClose, isOpen, onClose } = this.props;
        const eventTarget = (e.composed ? e.composedPath()[0] : e.target);
        const stackIndex = Overlay.openStack.indexOf(this);
        const isClickInThisOverlayOrDescendant = Overlay.openStack
            .slice(stackIndex)
            .some(({ containerElement: elem }) => {
            return elem && elem.contains(eventTarget) && !elem.isSameNode(eventTarget);
        });
        if (isOpen && !isClickInThisOverlayOrDescendant && canOutsideClickClose) {
            onClose?.(e);
        }
    };
    handleDocumentFocus = (e) => {
        const eventTarget = e.composed ? e.composedPath()[0] : e.target;
        if (this.props.enforceFocus &&
            this.containerElement != null &&
            eventTarget instanceof Node &&
            !this.containerElement.contains(eventTarget)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.bringFocusInsideOverlay();
        }
    };
    handleKeyDown = (e) => {
        const { canEscapeKeyClose, onClose } = this.props;
        if (e.key === "Escape" && canEscapeKeyClose) {
            onClose?.(e);
            e.stopPropagation();
            e.preventDefault();
        }
    };
    handleTransitionAddEnd = () => {
    };
}
exports.Overlay = Overlay;
//# sourceMappingURL=overlay.js.map