"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = exports.PopoverInteractionKind = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const react_popper_1 = require("react-popper");
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const props_1 = require("../../common/props");
const Utils = tslib_1.__importStar(require("../../common/utils"));
const overlay_1 = require("../overlay/overlay");
const resizeSensor_1 = require("../resize-sensor/resizeSensor");
const tooltip_1 = require("../tooltip/tooltip");
const popoverArrow_1 = require("./popoverArrow");
const popoverMigrationUtils_1 = require("./popoverMigrationUtils");
const popperUtils_1 = require("./popperUtils");
exports.PopoverInteractionKind = {
    CLICK: "click",
    CLICK_TARGET_ONLY: "click-target",
    HOVER: "hover",
    HOVER_TARGET_ONLY: "hover-target",
};
class Popover extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Popover`;
    popoverRef = React.createRef();
    static defaultProps = {
        boundary: "scrollParent",
        captureDismiss: false,
        defaultIsOpen: false,
        disabled: false,
        fill: false,
        hasBackdrop: false,
        hoverCloseDelay: 300,
        hoverOpenDelay: 150,
        inheritDarkTheme: true,
        interactionKind: exports.PopoverInteractionKind.CLICK,
        minimal: false,
        modifiers: {},
        openOnTargetFocus: true,
        shouldReturnFocusOnClose: false,
        targetTagName: "span",
        transitionDuration: 300,
        usePortal: true,
        wrapperTagName: "span",
    };
    popoverElement = null;
    targetElement = null;
    state = {
        hasDarkParent: false,
        isOpen: this.getIsOpen(this.props),
        transformOrigin: "",
    };
    cancelOpenTimeout;
    isMouseInTargetOrPopover = false;
    lostFocusOnSamePage = true;
    popperScheduleUpdate;
    handlePopoverRef = (0, common_1.refHandler)(this, "popoverElement", this.props.popoverRef);
    handleTargetRef = (ref) => (this.targetElement = ref);
    render() {
        const { className, disabled, fill, placement, position = "auto", shouldReturnFocusOnClose } = this.props;
        const { isOpen } = this.state;
        let { wrapperTagName } = this.props;
        if (fill) {
            wrapperTagName = "div";
        }
        const isContentEmpty = Utils.ensureElement(this.understandChildren().content) == null;
        if (isContentEmpty && !disabled && isOpen !== false && !Utils.isNodeEnv("production")) {
            console.warn(Errors.POPOVER_WARN_EMPTY_CONTENT);
        }
        const wrapperClasses = (0, classnames_1.default)(common_1.Classes.POPOVER_WRAPPER, className, {
            [common_1.Classes.FILL]: fill,
        });
        const defaultAutoFocus = this.isHoverInteractionKind() ? false : undefined;
        const wrapper = React.createElement(wrapperTagName, { className: wrapperClasses }, React.createElement(react_popper_1.Reference, { innerRef: this.handleTargetRef }, this.renderTarget), React.createElement(overlay_1.Overlay, { autoFocus: this.props.autoFocus ?? defaultAutoFocus, backdropClassName: common_1.Classes.POPOVER_BACKDROP, backdropProps: this.props.backdropProps, canEscapeKeyClose: this.props.canEscapeKeyClose, canOutsideClickClose: this.props.interactionKind === exports.PopoverInteractionKind.CLICK, className: this.props.portalClassName, enforceFocus: this.props.enforceFocus, hasBackdrop: this.props.hasBackdrop, isOpen: isOpen && !isContentEmpty, onClose: this.handleOverlayClose, onClosed: this.props.onClosed, onClosing: this.props.onClosing, onOpened: this.props.onOpened, onOpening: this.props.onOpening, transitionDuration: this.props.transitionDuration, transitionName: common_1.Classes.POPOVER, usePortal: this.props.usePortal, portalContainer: this.props.portalContainer, shouldReturnFocusOnClose: this.isHoverInteractionKind() ? false : shouldReturnFocusOnClose },
            React.createElement(react_popper_1.Popper, { innerRef: this.handlePopoverRef, placement: placement ?? (0, popoverMigrationUtils_1.positionToPlacement)(position), modifiers: this.getPopperModifiers() }, this.renderPopover)));
        return React.createElement(react_popper_1.Manager, null, wrapper);
    }
    componentDidMount() {
        this.updateDarkParent();
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        if (prevProps.popoverRef !== this.props.popoverRef) {
            (0, common_1.setRef)(prevProps.popoverRef, null);
            this.handlePopoverRef = (0, common_1.refHandler)(this, "popoverElement", this.props.popoverRef);
            (0, common_1.setRef)(this.props.popoverRef, this.popoverElement);
        }
        this.updateDarkParent();
        const nextIsOpen = this.getIsOpen(this.props);
        if (this.props.isOpen != null && nextIsOpen !== this.state.isOpen) {
            this.setOpenState(nextIsOpen);
            this.setState({ isOpen: nextIsOpen });
        }
        else if (this.props.disabled && this.state.isOpen && this.props.isOpen == null) {
            this.setOpenState(false);
        }
    }
    reposition = () => this.popperScheduleUpdate?.();
    validateProps(props) {
        if (props.isOpen == null && props.onInteraction != null) {
            console.warn(Errors.POPOVER_WARN_UNCONTROLLED_ONINTERACTION);
        }
        if (props.hasBackdrop && !props.usePortal) {
            console.warn(Errors.POPOVER_WARN_HAS_BACKDROP_INLINE);
        }
        if (props.hasBackdrop && props.interactionKind !== exports.PopoverInteractionKind.CLICK) {
            console.error(Errors.POPOVER_HAS_BACKDROP_INTERACTION);
        }
        if (props.placement !== undefined && props.position !== undefined) {
            console.warn(Errors.POPOVER_WARN_PLACEMENT_AND_POSITION_MUTEX);
        }
        const childrenCount = React.Children.count(props.children);
        const hasContentProp = props.content !== undefined;
        const hasTargetProp = props.target !== undefined;
        if (childrenCount === 0 && !hasTargetProp) {
            console.error(Errors.POPOVER_REQUIRES_TARGET);
        }
        if (childrenCount > 2) {
            console.warn(Errors.POPOVER_WARN_TOO_MANY_CHILDREN);
        }
        if (childrenCount > 0 && hasTargetProp) {
            console.warn(Errors.POPOVER_WARN_DOUBLE_TARGET);
        }
        if (childrenCount === 2 && hasContentProp) {
            console.warn(Errors.POPOVER_WARN_DOUBLE_CONTENT);
        }
    }
    updateDarkParent() {
        if (this.props.usePortal && this.state.isOpen) {
            const hasDarkParent = this.targetElement != null && this.targetElement.closest(`.${common_1.Classes.DARK}`) != null;
            this.setState({ hasDarkParent });
        }
    }
    renderPopover = (popperProps) => {
        const { interactionKind, usePortal } = this.props;
        const { transformOrigin } = this.state;
        this.popperScheduleUpdate = popperProps.scheduleUpdate;
        const popoverHandlers = {
            onClick: this.handlePopoverClick,
        };
        if (interactionKind === exports.PopoverInteractionKind.HOVER ||
            (!usePortal && interactionKind === exports.PopoverInteractionKind.HOVER_TARGET_ONLY)) {
            popoverHandlers.onMouseEnter = this.handleMouseEnter;
            popoverHandlers.onMouseLeave = this.handleMouseLeave;
        }
        const popoverClasses = (0, classnames_1.default)(common_1.Classes.POPOVER, {
            [common_1.Classes.DARK]: this.props.inheritDarkTheme && this.state.hasDarkParent,
            [common_1.Classes.MINIMAL]: this.props.minimal,
            [common_1.Classes.POPOVER_CAPTURING_DISMISS]: this.props.captureDismiss,
            [common_1.Classes.POPOVER_OUT_OF_BOUNDARIES]: popperProps.outOfBoundaries === true,
        }, this.props.popoverClassName);
        return (React.createElement("div", { className: common_1.Classes.TRANSITION_CONTAINER, ref: popperProps.ref, style: popperProps.style },
            React.createElement(resizeSensor_1.ResizeSensor, { onResize: this.reposition },
                React.createElement("div", { className: popoverClasses, style: { transformOrigin }, ref: this.popoverRef, ...popoverHandlers },
                    this.isArrowEnabled() && (React.createElement(popoverArrow_1.PopoverArrow, { arrowProps: popperProps.arrowProps, placement: popperProps.placement })),
                    React.createElement("div", { className: common_1.Classes.POPOVER_CONTENT }, this.understandChildren().content)))));
    };
    renderTarget = (referenceProps) => {
        const { fill, openOnTargetFocus, targetClassName, targetProps = {} } = this.props;
        const { isOpen } = this.state;
        const isControlled = this.isControlled();
        const isHoverInteractionKind = this.isHoverInteractionKind();
        let { targetTagName } = this.props;
        if (fill) {
            targetTagName = "div";
        }
        const finalTargetProps = isHoverInteractionKind
            ? {
                onBlur: this.handleTargetBlur,
                onFocus: this.handleTargetFocus,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
            }
            : {
                onClick: this.handleTargetClick,
            };
        finalTargetProps["aria-haspopup"] = "true";
        finalTargetProps.className = (0, classnames_1.default)(common_1.Classes.POPOVER_TARGET, { [common_1.Classes.POPOVER_OPEN]: isOpen }, targetProps.className, targetClassName);
        finalTargetProps.ref = referenceProps.ref;
        const rawTarget = Utils.ensureElement(this.understandChildren().target);
        if (rawTarget === undefined) {
            return null;
        }
        const rawTabIndex = rawTarget.props.tabIndex;
        const tabIndex = rawTabIndex == null && openOnTargetFocus && isHoverInteractionKind ? 0 : rawTabIndex;
        const clonedTarget = React.cloneElement(rawTarget, {
            className: (0, classnames_1.default)(rawTarget.props.className, {
                [common_1.Classes.ACTIVE]: isOpen && !isControlled && !isHoverInteractionKind,
            }),
            disabled: isOpen && Utils.isElementOfType(rawTarget, tooltip_1.Tooltip) ? true : rawTarget.props.disabled,
            tabIndex,
        });
        const target = React.createElement(targetTagName, {
            ...targetProps,
            ...finalTargetProps,
        }, clonedTarget);
        return React.createElement(resizeSensor_1.ResizeSensor, { onResize: this.reposition }, target);
    };
    understandChildren() {
        const { children, content: contentProp, target: targetProp } = this.props;
        const [targetChild, contentChild] = React.Children.toArray(children);
        return {
            content: contentChild == null ? contentProp : contentChild,
            target: targetChild == null ? targetProp : targetChild,
        };
    }
    isControlled = () => this.props.isOpen !== undefined;
    getIsOpen(props) {
        if (props.disabled) {
            return false;
        }
        else if (props.isOpen != null) {
            return props.isOpen;
        }
        else {
            return props.defaultIsOpen;
        }
    }
    getPopperModifiers() {
        const { boundary, modifiers } = this.props;
        const { flip = {}, preventOverflow = {} } = modifiers;
        return {
            ...modifiers,
            arrowOffset: {
                enabled: this.isArrowEnabled(),
                fn: popperUtils_1.arrowOffsetModifier,
                order: 510,
            },
            flip: { boundariesElement: boundary, ...flip },
            preventOverflow: { boundariesElement: boundary, ...preventOverflow },
            updatePopoverState: {
                enabled: true,
                fn: this.updatePopoverState,
                order: 900,
            },
        };
    }
    handleTargetFocus = (e) => {
        if (this.props.openOnTargetFocus && this.isHoverInteractionKind()) {
            if (e.relatedTarget == null && !this.lostFocusOnSamePage) {
                return;
            }
            this.handleMouseEnter(e);
        }
        this.props.targetProps?.onFocus?.(e);
    };
    handleTargetBlur = (e) => {
        if (this.props.openOnTargetFocus && this.isHoverInteractionKind()) {
            if (e.relatedTarget != null && !this.isElementInPopover(e.relatedTarget)) {
                this.handleMouseLeave(e);
            }
        }
        this.lostFocusOnSamePage = e.relatedTarget != null;
        this.props.targetProps?.onBlur?.(e);
    };
    handleMouseEnter = (e) => {
        this.isMouseInTargetOrPopover = true;
        if (!this.props.usePortal &&
            this.isElementInPopover(e.target) &&
            this.props.interactionKind === exports.PopoverInteractionKind.HOVER_TARGET_ONLY &&
            !this.props.openOnTargetFocus) {
            this.handleMouseLeave(e);
        }
        else if (!this.props.disabled) {
            this.setOpenState(true, e, this.props.hoverOpenDelay);
        }
        this.props.targetProps?.onMouseEnter?.(e);
    };
    handleMouseLeave = (e) => {
        this.isMouseInTargetOrPopover = false;
        this.setTimeout(() => {
            if (this.isMouseInTargetOrPopover) {
                return;
            }
            this.setOpenState(false, e, this.props.hoverCloseDelay);
        });
        this.props.targetProps?.onMouseLeave?.(e);
    };
    handlePopoverClick = (e) => {
        const eventTarget = e.target;
        const eventPopover = eventTarget.closest(`.${common_1.Classes.POPOVER}`);
        const isEventFromSelf = eventPopover === this.popoverRef.current;
        const isEventPopoverCapturing = eventPopover?.classList.contains(common_1.Classes.POPOVER_CAPTURING_DISMISS);
        const dismissElement = eventTarget.closest(`.${common_1.Classes.POPOVER_DISMISS}, .${common_1.Classes.POPOVER_DISMISS_OVERRIDE}`);
        const shouldDismiss = dismissElement != null && dismissElement.classList.contains(common_1.Classes.POPOVER_DISMISS);
        const isDisabled = eventTarget.closest(`:disabled, .${common_1.Classes.DISABLED}`) != null;
        if (shouldDismiss && !isDisabled && (!isEventPopoverCapturing || isEventFromSelf)) {
            this.setOpenState(false, e);
        }
    };
    handleOverlayClose = (e) => {
        if (this.targetElement === null || e === undefined) {
            return;
        }
        const eventTarget = e.target;
        if (!Utils.elementIsOrContains(this.targetElement, eventTarget) || e.nativeEvent instanceof KeyboardEvent) {
            this.setOpenState(false, e);
        }
    };
    handleTargetClick = (e) => {
        if (!this.props.disabled && !this.isElementInPopover(e.target)) {
            if (this.props.isOpen == null) {
                this.setState(prevState => ({ isOpen: !prevState.isOpen }));
            }
            else {
                this.setOpenState(!this.props.isOpen, e);
            }
        }
        this.props.targetProps?.onClick?.(e);
    };
    setOpenState(isOpen, e, timeout) {
        this.cancelOpenTimeout?.();
        if (timeout !== undefined && timeout > 0) {
            this.cancelOpenTimeout = this.setTimeout(() => this.setOpenState(isOpen, e), timeout);
        }
        else {
            if (this.props.isOpen == null) {
                this.setState({ isOpen });
            }
            else {
                this.props.onInteraction?.(isOpen, e);
            }
            if (!isOpen) {
                this.props.onClose?.(e);
            }
        }
    }
    isArrowEnabled() {
        const { minimal, modifiers } = this.props;
        return !minimal && (modifiers?.arrow == null || modifiers.arrow.enabled);
    }
    isElementInPopover(element) {
        return this.popoverElement?.contains(element);
    }
    isHoverInteractionKind() {
        return (this.props.interactionKind === exports.PopoverInteractionKind.HOVER ||
            this.props.interactionKind === exports.PopoverInteractionKind.HOVER_TARGET_ONLY);
    }
    updatePopoverState = data => {
        this.setState({ transformOrigin: (0, popperUtils_1.getTransformOrigin)(data) });
        return data;
    };
}
exports.Popover = Popover;
//# sourceMappingURL=popover.js.map