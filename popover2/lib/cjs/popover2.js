"use strict";
/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover2 = exports.Popover2InteractionKind = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var react_popper_1 = require("react-popper");
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("./classes"));
var customModifiers_1 = require("./customModifiers");
var Errors = tslib_1.__importStar(require("./errors"));
var popover2Arrow_1 = require("./popover2Arrow");
var popover2PlacementUtils_1 = require("./popover2PlacementUtils");
var resizeSensor2_1 = require("./resizeSensor2");
// eslint-disable-next-line import/no-cycle
var tooltip2_1 = require("./tooltip2");
var utils_1 = require("./utils");
exports.Popover2InteractionKind = {
    CLICK: "click",
    CLICK_TARGET_ONLY: "click-target",
    HOVER: "hover",
    HOVER_TARGET_ONLY: "hover-target",
};
/**
 * Popover (v2) component, used to display a floating UI next to and tethered to a target element.
 *
 * @template T target element props interface. Consumers wishing to stay in sync with Blueprint's default target HTML
 * props interface should use the `DefaultPopover2TargetHTMLProps` type (although this is already the default type for
 * this type param).
 * @see https://blueprintjs.com/docs/#popover2-package/popover2
 */
var Popover2 = /** @class */ (function (_super) {
    tslib_1.__extends(Popover2, _super);
    function Popover2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hasDarkParent: false,
            isOpen: _this.getIsOpen(_this.props),
        };
        /**
         * DOM element that contains the popover.
         * When `usePortal={true}`, this element will be portaled outside the usual DOM flow,
         * so this reference can be very useful for testing.
         */
        _this.popoverElement = null;
        /** DOM element that contains the target. */
        _this.targetElement = null;
        /** Popover ref handler */
        _this.popoverRef = (0, core_1.refHandler)(_this, "popoverElement", _this.props.popoverRef);
        /** Target ref handler */
        _this.targetRef = function (el) { return (_this.targetElement = el); };
        // a flag that lets us detect mouse movement between the target and popover,
        // now that mouseleave is triggered when you cross the gap between the two.
        _this.isMouseInTargetOrPopover = false;
        // a flag that indicates whether the target previously lost focus to another
        // element on the same page.
        _this.lostFocusOnSamePage = true;
        _this.isControlled = function () { return _this.props.isOpen !== undefined; };
        // arrow is disabled if minimal, or if the arrow modifier was explicitly disabled
        _this.isArrowEnabled = function () { var _a, _b; return !_this.props.minimal && ((_b = (_a = _this.props.modifiers) === null || _a === void 0 ? void 0 : _a.arrow) === null || _b === void 0 ? void 0 : _b.enabled) !== false; };
        _this.isHoverInteractionKind = function () {
            return (_this.props.interactionKind === exports.Popover2InteractionKind.HOVER ||
                _this.props.interactionKind === exports.Popover2InteractionKind.HOVER_TARGET_ONLY);
        };
        /**
         * Instance method to instruct the `Popover` to recompute its position.
         *
         * This method should only be used if you are updating the target in a way
         * that does not cause it to re-render, such as changing its _position_
         * without changing its _size_ (since `Popover` already repositions when it
         * detects a resize).
         */
        _this.reposition = function () { var _a; return (_a = _this.popperScheduleUpdate) === null || _a === void 0 ? void 0 : _a.call(_this); };
        _this.renderTarget = function (_a) {
            var _b, _c;
            var _d, _e;
            var popperChildRef = _a.ref;
            var _f = _this.props, children = _f.children, className = _f.className, fill = _f.fill, openOnTargetFocus = _f.openOnTargetFocus, renderTarget = _f.renderTarget;
            var isOpen = _this.state.isOpen;
            var isControlled = _this.isControlled();
            var isHoverInteractionKind = _this.isHoverInteractionKind();
            var targetTagName = _this.props.targetTagName;
            if (fill) {
                targetTagName = "div";
            }
            var ref = (0, core_1.mergeRefs)(popperChildRef, _this.targetRef);
            var targetEventHandlers = isHoverInteractionKind
                ? {
                    // HOVER handlers
                    onBlur: _this.handleTargetBlur,
                    onContextMenu: _this.handleTargetContextMenu,
                    onFocus: _this.handleTargetFocus,
                    onMouseEnter: _this.handleMouseEnter,
                    onMouseLeave: _this.handleMouseLeave,
                }
                : {
                    // CLICK needs only one handler
                    onClick: _this.handleTargetClick,
                    // For keyboard accessibility, trigger the same behavior as a click event upon pressing ENTER/SPACE
                    onKeyDown: _this.handleKeyDown,
                };
            // Ensure target is focusable if relevant prop enabled
            var targetTabIndex = openOnTargetFocus && isHoverInteractionKind ? 0 : undefined;
            var ownTargetProps = tslib_1.__assign({ "aria-haspopup": (_d = _this.props.popupKind) !== null && _d !== void 0 ? _d : (_this.props.interactionKind === exports.Popover2InteractionKind.HOVER_TARGET_ONLY
                    ? undefined
                    : "true"), 
                // N.B. this.props.className is passed along to renderTarget even though the user would have access to it.
                // If, instead, renderTarget is undefined and the target is provided as a child, this.props.className is
                // applied to the generated target wrapper element.
                className: (0, classnames_1.default)(className, Classes.POPOVER2_TARGET, (_b = {},
                    _b[Classes.POPOVER2_OPEN] = isOpen,
                    // this class is mainly useful for button targets
                    _b[core_1.Classes.ACTIVE] = isOpen && !isControlled && !isHoverInteractionKind,
                    _b)), ref: ref }, targetEventHandlers);
            var targetModifierClasses = (_c = {},
                // this class is mainly useful for Blueprint <Button> targets; we should only apply it for
                // uncontrolled popovers when they are opened by a user interaction
                _c[core_1.Classes.ACTIVE] = isOpen && !isControlled && !isHoverInteractionKind,
                // similarly, this class is mainly useful for targets like <Button>, <InputGroup>, etc.
                _c[core_1.Classes.FILL] = fill,
                _c);
            var target;
            if (renderTarget !== undefined) {
                target = renderTarget(tslib_1.__assign(tslib_1.__assign({}, ownTargetProps), { className: (0, classnames_1.default)(ownTargetProps.className, targetModifierClasses), 
                    // if the consumer renders a tooltip target, it's their responsibility to disable that tooltip
                    // when *this* popover is open
                    isOpen: isOpen, tabIndex: targetTabIndex }));
            }
            else {
                var childTarget = core_1.Utils.ensureElement(React.Children.toArray(children)[0]);
                if (childTarget === undefined) {
                    return null;
                }
                var clonedTarget = React.cloneElement(childTarget, {
                    className: (0, classnames_1.default)(childTarget.props.className, targetModifierClasses),
                    // force disable single Tooltip2 child when popover is open
                    disabled: isOpen && core_1.Utils.isElementOfType(childTarget, tooltip2_1.Tooltip2) ? true : childTarget.props.disabled,
                    tabIndex: (_e = childTarget.props.tabIndex) !== null && _e !== void 0 ? _e : targetTabIndex,
                });
                var wrappedTarget = React.createElement(targetTagName, tslib_1.__assign(tslib_1.__assign({}, ownTargetProps), _this.props.targetProps), clonedTarget);
                target = wrappedTarget;
            }
            return (React.createElement(resizeSensor2_1.ResizeSensor2, { targetRef: ref, onResize: _this.reposition }, target));
        };
        _this.renderPopover = function (popperProps) {
            var _a;
            var _b;
            var _c = _this.props, interactionKind = _c.interactionKind, shouldReturnFocusOnClose = _c.shouldReturnFocusOnClose, usePortal = _c.usePortal;
            var isOpen = _this.state.isOpen;
            // compute an appropriate transform origin so the scale animation points towards target
            var transformOrigin = (0, utils_1.getTransformOrigin)(popperProps.placement, _this.isArrowEnabled() ? popperProps.arrowProps.style : undefined);
            // need to update our reference to this function on every render as it will change.
            _this.popperScheduleUpdate = popperProps.update;
            var popoverHandlers = {
                // always check popover clicks for dismiss class
                onClick: _this.handlePopoverClick,
                // treat ENTER/SPACE keys the same as a click for accessibility
                // eslint-disable-next-line deprecation/deprecation
                onKeyDown: function (event) { return core_1.Keys.isKeyboardClick(event.keyCode) && _this.handlePopoverClick(event); },
            };
            if (interactionKind === exports.Popover2InteractionKind.HOVER ||
                (!usePortal && interactionKind === exports.Popover2InteractionKind.HOVER_TARGET_ONLY)) {
                popoverHandlers.onMouseEnter = _this.handleMouseEnter;
                popoverHandlers.onMouseLeave = _this.handleMouseLeave;
            }
            var basePlacement = (0, utils_1.getBasePlacement)(popperProps.placement);
            var popoverClasses = (0, classnames_1.default)(Classes.POPOVER2, (_a = {},
                _a[core_1.Classes.DARK] = _this.props.inheritDarkTheme && _this.state.hasDarkParent,
                _a[core_1.Classes.MINIMAL] = _this.props.minimal,
                _a[Classes.POPOVER2_CAPTURING_DISMISS] = _this.props.captureDismiss,
                _a[Classes.POPOVER2_MATCH_TARGET_WIDTH] = _this.props.matchTargetWidth,
                _a[Classes.POPOVER2_REFERENCE_HIDDEN] = popperProps.isReferenceHidden === true,
                _a[Classes.POPOVER2_POPPER_ESCAPED] = popperProps.hasPopperEscaped === true,
                _a), "".concat(Classes.POPOVER2_CONTENT_PLACEMENT, "-").concat(basePlacement), _this.props.popoverClassName);
            var defaultAutoFocus = _this.isHoverInteractionKind() ? false : undefined;
            return (React.createElement(core_1.Overlay, { autoFocus: (_b = _this.props.autoFocus) !== null && _b !== void 0 ? _b : defaultAutoFocus, backdropClassName: Classes.POPOVER2_BACKDROP, backdropProps: _this.props.backdropProps, canEscapeKeyClose: _this.props.canEscapeKeyClose, canOutsideClickClose: _this.props.interactionKind === exports.Popover2InteractionKind.CLICK, enforceFocus: _this.props.enforceFocus, hasBackdrop: _this.props.hasBackdrop, isOpen: isOpen, onClose: _this.handleOverlayClose, onClosed: _this.props.onClosed, onClosing: _this.props.onClosing, onOpened: _this.props.onOpened, onOpening: _this.props.onOpening, transitionDuration: _this.props.transitionDuration, transitionName: Classes.POPOVER2, usePortal: _this.props.usePortal, portalClassName: _this.props.portalClassName, portalContainer: _this.props.portalContainer, 
                // if hover interaction, it doesn't make sense to take over focus control
                shouldReturnFocusOnClose: _this.isHoverInteractionKind() ? false : shouldReturnFocusOnClose },
                React.createElement("div", { className: Classes.POPOVER2_TRANSITION_CONTAINER, ref: popperProps.ref, style: popperProps.style },
                    React.createElement(resizeSensor2_1.ResizeSensor2, { onResize: _this.reposition },
                        React.createElement("div", tslib_1.__assign({ className: popoverClasses, style: { transformOrigin: transformOrigin }, ref: _this.popoverRef }, popoverHandlers),
                            _this.isArrowEnabled() && (React.createElement(popover2Arrow_1.Popover2Arrow, { arrowProps: popperProps.arrowProps, placement: popperProps.placement })),
                            React.createElement("div", { className: Classes.POPOVER2_CONTENT }, _this.props.content))))));
        };
        _this.handleTargetFocus = function (e) {
            if (_this.props.openOnTargetFocus && _this.isHoverInteractionKind()) {
                if (e.relatedTarget == null && !_this.lostFocusOnSamePage) {
                    // ignore this focus event -- the target was already focused but the page itself
                    // lost focus (e.g. due to switching tabs).
                    return;
                }
                _this.handleMouseEnter(e);
            }
        };
        _this.handleTargetBlur = function (e) {
            if (_this.props.openOnTargetFocus && _this.isHoverInteractionKind()) {
                if (e.relatedTarget != null) {
                    // if the next element to receive focus is within the popover, we'll want to leave the
                    // popover open.
                    if (e.relatedTarget !== _this.popoverElement &&
                        !_this.isElementInPopover(e.relatedTarget)) {
                        _this.handleMouseLeave(e);
                    }
                }
                else {
                    _this.handleMouseLeave(e);
                }
            }
            _this.lostFocusOnSamePage = e.relatedTarget != null;
        };
        _this.handleTargetContextMenu = function (e) {
            // we assume that when someone prevents the default interaction on this event (a browser native context menu),
            // they are showing a custom context menu (as ContextMenu2 does); in this case, we should close this popover/tooltip
            if (e.defaultPrevented) {
                _this.setOpenState(false, e);
            }
        };
        _this.handleMouseEnter = function (e) {
            _this.isMouseInTargetOrPopover = true;
            // if we're entering the popover, and the mode is set to be HOVER_TARGET_ONLY, we want to manually
            // trigger the mouse leave event, as hovering over the popover shouldn't count.
            if (!_this.props.usePortal &&
                _this.isElementInPopover(e.target) &&
                _this.props.interactionKind === exports.Popover2InteractionKind.HOVER_TARGET_ONLY &&
                !_this.props.openOnTargetFocus) {
                _this.handleMouseLeave(e);
            }
            else if (!_this.props.disabled) {
                // only begin opening popover when it is enabled
                _this.setOpenState(true, e, _this.props.hoverOpenDelay);
            }
        };
        _this.handleMouseLeave = function (e) {
            _this.isMouseInTargetOrPopover = false;
            // wait until the event queue is flushed, because we want to leave the
            // popover open if the mouse entered the popover immediately after
            // leaving the target (or vice versa).
            _this.setTimeout(function () {
                if (_this.isMouseInTargetOrPopover) {
                    return;
                }
                // user-configurable closing delay is helpful when moving mouse from target to popover
                _this.setOpenState(false, e, _this.props.hoverCloseDelay);
            });
        };
        _this.handlePopoverClick = function (e) {
            var _a, _b, _c, _d;
            var eventTarget = e.target;
            var eventPopover = eventTarget.closest(".".concat(Classes.POPOVER2));
            var eventPopoverV1 = eventTarget.closest(".".concat(core_1.Classes.POPOVER));
            var isEventFromSelf = (eventPopover !== null && eventPopover !== void 0 ? eventPopover : eventPopoverV1) === _this.getPopoverElement();
            var isEventPopoverCapturing = (_b = (_a = eventPopover === null || eventPopover === void 0 ? void 0 : eventPopover.classList.contains(Classes.POPOVER2_CAPTURING_DISMISS)) !== null && _a !== void 0 ? _a : eventPopoverV1 === null || eventPopoverV1 === void 0 ? void 0 : eventPopoverV1.classList.contains(core_1.Classes.POPOVER_CAPTURING_DISMISS)) !== null && _b !== void 0 ? _b : false;
            // an OVERRIDE inside a DISMISS does not dismiss, and a DISMISS inside an OVERRIDE will dismiss.
            var dismissElement = eventTarget.closest(".".concat(Classes.POPOVER2_DISMISS, ", .").concat(Classes.POPOVER2_DISMISS_OVERRIDE));
            // dismiss selectors from the "V1" version of Popover in the core package
            // we expect these to be rendered by MenuItem, which at this point has no knowledge of Popover2
            // this can be removed once Popover2 is merged into core in v5.0
            var dismissElementV1 = eventTarget.closest(".".concat(core_1.Classes.POPOVER_DISMISS, ", .").concat(core_1.Classes.POPOVER_DISMISS_OVERRIDE));
            var shouldDismiss = (_d = (_c = dismissElement === null || dismissElement === void 0 ? void 0 : dismissElement.classList.contains(Classes.POPOVER2_DISMISS)) !== null && _c !== void 0 ? _c : dismissElementV1 === null || dismissElementV1 === void 0 ? void 0 : dismissElementV1.classList.contains(core_1.Classes.POPOVER_DISMISS)) !== null && _d !== void 0 ? _d : false;
            var isDisabled = eventTarget.closest(":disabled, .".concat(core_1.Classes.DISABLED)) != null;
            if (shouldDismiss && !isDisabled && (!isEventPopoverCapturing || isEventFromSelf)) {
                _this.setOpenState(false, e);
            }
        };
        _this.handleOverlayClose = function (e) {
            var _a;
            if (_this.targetElement === null || e === undefined) {
                return;
            }
            var event = ((_a = e.nativeEvent) !== null && _a !== void 0 ? _a : e);
            var eventTarget = (event.composed ? event.composedPath()[0] : event.target);
            // if click was in target, target event listener will handle things, so don't close
            if (!core_1.Utils.elementIsOrContains(_this.targetElement, eventTarget) || e.nativeEvent instanceof KeyboardEvent) {
                _this.setOpenState(false, e);
            }
        };
        _this.handleKeyDown = function (e) {
            // eslint-disable-next-line deprecation/deprecation
            var isKeyboardClick = core_1.Keys.isKeyboardClick(e.keyCode);
            // For keyboard accessibility, trigger the same behavior as a click event upon pressing ENTER/SPACE
            if (isKeyboardClick) {
                _this.handleTargetClick(e);
            }
        };
        _this.handleTargetClick = function (e) {
            // Target element(s) may fire simulated click event upon pressing ENTER/SPACE, which we should ignore
            // see: https://github.com/palantir/blueprint/issues/5775
            var shouldIgnoreClick = _this.state.isOpen && _this.isSimulatedButtonClick(e);
            if (!shouldIgnoreClick) {
                // ensure click did not originate from within inline popover before closing
                if (!_this.props.disabled && !_this.isElementInPopover(e.target)) {
                    if (_this.props.isOpen == null) {
                        _this.setState(function (prevState) { return ({ isOpen: !prevState.isOpen }); });
                    }
                    else {
                        _this.setOpenState(!_this.props.isOpen, e);
                    }
                }
            }
        };
        _this.isSimulatedButtonClick = function (e) {
            return !e.isTrusted && e.target.matches(".".concat(core_1.Classes.BUTTON));
        };
        return _this;
    }
    // popper innerRef gives us a handle on the transition container, since that's what we render as the overlay child,
    // so if we want to look at our actual popover element, we need to reach inside a bit
    Popover2.prototype.getPopoverElement = function () {
        var _a;
        return (_a = this.popoverElement) === null || _a === void 0 ? void 0 : _a.querySelector(".".concat(Classes.POPOVER2));
    };
    Popover2.prototype.getIsOpen = function (props) {
        var _a;
        // disabled popovers should never be allowed to open.
        if (props.disabled) {
            return false;
        }
        else {
            return (_a = props.isOpen) !== null && _a !== void 0 ? _a : props.defaultIsOpen;
        }
    };
    Popover2.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, content = _a.content, placement = _a.placement, _b = _a.position, position = _b === void 0 ? "auto" : _b, positioningStrategy = _a.positioningStrategy;
        var isOpen = this.state.isOpen;
        var isContentEmpty = content == null || (typeof content === "string" && content.trim() === "");
        if (isContentEmpty) {
            // need to do this check in render(), because `isOpen` is derived from
            // state, and state can't necessarily be accessed in validateProps.
            if (!disabled && isOpen !== false && !core_1.Utils.isNodeEnv("production")) {
                console.warn(Errors.POPOVER2_WARN_EMPTY_CONTENT);
            }
            // just render the target without a content overlay if there is no content to display
            return this.renderTarget({ ref: noop });
        }
        return (React.createElement(react_popper_1.Manager, null,
            React.createElement(react_popper_1.Reference, null, this.renderTarget),
            React.createElement(react_popper_1.Popper, { innerRef: this.popoverRef, placement: placement !== null && placement !== void 0 ? placement : (0, popover2PlacementUtils_1.positionToPlacement)(position), strategy: positioningStrategy, modifiers: this.getPopperModifiers() }, this.renderPopover)));
    };
    Popover2.prototype.componentDidMount = function () {
        this.updateDarkParent();
    };
    Popover2.prototype.componentDidUpdate = function (props, state) {
        _super.prototype.componentDidUpdate.call(this, props, state);
        this.updateDarkParent();
        var nextIsOpen = this.getIsOpen(this.props);
        if (this.props.isOpen != null && nextIsOpen !== this.state.isOpen) {
            this.setOpenState(nextIsOpen);
            // tricky: setOpenState calls setState only if this.props.isOpen is
            // not controlled, so we need to invoke setState manually here.
            this.setState({ isOpen: nextIsOpen });
        }
        else if (this.props.disabled && this.state.isOpen && this.props.isOpen == null) {
            // special case: close an uncontrolled popover when disabled is set to true
            this.setOpenState(false);
        }
    };
    Popover2.prototype.validateProps = function (props) {
        if (props.isOpen == null && props.onInteraction != null) {
            console.warn(Errors.POPOVER2_WARN_UNCONTROLLED_ONINTERACTION);
        }
        if (props.hasBackdrop && !props.usePortal) {
            console.warn(Errors.POPOVER2_WARN_HAS_BACKDROP_INLINE);
        }
        if (props.hasBackdrop && props.interactionKind !== exports.Popover2InteractionKind.CLICK) {
            console.warn(Errors.POPOVER2_HAS_BACKDROP_INTERACTION);
        }
        if (props.placement !== undefined && props.position !== undefined) {
            console.warn(Errors.POPOVER2_WARN_PLACEMENT_AND_POSITION_MUTEX);
        }
        var childrenCount = React.Children.count(props.children);
        var hasRenderTargetProp = props.renderTarget !== undefined;
        var hasTargetPropsProp = props.targetProps !== undefined;
        if (childrenCount === 0 && !hasRenderTargetProp) {
            console.warn(Errors.POPOVER2_REQUIRES_TARGET);
        }
        if (childrenCount > 1) {
            console.warn(Errors.POPOVER2_WARN_TOO_MANY_CHILDREN);
        }
        if (childrenCount > 0 && hasRenderTargetProp) {
            console.warn(Errors.POPOVER2_WARN_DOUBLE_TARGET);
        }
        if (hasRenderTargetProp && hasTargetPropsProp) {
            console.warn(Errors.POPOVER2_WARN_TARGET_PROPS_WITH_RENDER_TARGET);
        }
    };
    Popover2.prototype.getPopperModifiers = function () {
        var _a, _b, _c, _d;
        var _e = this.props, matchTargetWidth = _e.matchTargetWidth, modifiers = _e.modifiers, modifiersCustom = _e.modifiersCustom;
        var popperModifiers = [
            tslib_1.__assign({ enabled: this.isArrowEnabled(), name: "arrow" }, modifiers === null || modifiers === void 0 ? void 0 : modifiers.arrow),
            tslib_1.__assign(tslib_1.__assign({ name: "computeStyles" }, modifiers === null || modifiers === void 0 ? void 0 : modifiers.computeStyles), { options: tslib_1.__assign({ adaptive: true, 
                    // We disable the built-in gpuAcceleration so that
                    // Popper.js will return us easy to interpolate values
                    // (top, left instead of transform: translate3d)
                    // We'll then use these values to generate the needed
                    // css transform values blended with the react-spring values
                    gpuAcceleration: false }, (_a = modifiers === null || modifiers === void 0 ? void 0 : modifiers.computeStyles) === null || _a === void 0 ? void 0 : _a.options) }),
            tslib_1.__assign(tslib_1.__assign({ enabled: this.isArrowEnabled(), name: "offset" }, modifiers === null || modifiers === void 0 ? void 0 : modifiers.offset), { options: tslib_1.__assign({ offset: [0, popover2Arrow_1.POPOVER_ARROW_SVG_SIZE / 2] }, (_b = modifiers === null || modifiers === void 0 ? void 0 : modifiers.offset) === null || _b === void 0 ? void 0 : _b.options) }),
            tslib_1.__assign(tslib_1.__assign({ name: "flip" }, modifiers === null || modifiers === void 0 ? void 0 : modifiers.flip), { options: tslib_1.__assign({ boundary: this.props.boundary, rootBoundary: this.props.rootBoundary }, (_c = modifiers === null || modifiers === void 0 ? void 0 : modifiers.flip) === null || _c === void 0 ? void 0 : _c.options) }),
            tslib_1.__assign(tslib_1.__assign({ name: "preventOverflow" }, modifiers === null || modifiers === void 0 ? void 0 : modifiers.preventOverflow), { options: tslib_1.__assign({ boundary: this.props.boundary, rootBoundary: this.props.rootBoundary }, (_d = modifiers === null || modifiers === void 0 ? void 0 : modifiers.preventOverflow) === null || _d === void 0 ? void 0 : _d.options) }),
        ];
        if (matchTargetWidth) {
            popperModifiers.push(customModifiers_1.matchReferenceWidthModifier);
        }
        if (modifiersCustom !== undefined) {
            popperModifiers.push.apply(popperModifiers, modifiersCustom);
        }
        return popperModifiers;
    };
    // a wrapper around setState({ isOpen }) that will call props.onInteraction instead when in controlled mode.
    // starts a timeout to delay changing the state if a non-zero duration is provided.
    Popover2.prototype.setOpenState = function (isOpen, e, timeout) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        // cancel any existing timeout because we have new state
        (_a = this.cancelOpenTimeout) === null || _a === void 0 ? void 0 : _a.call(this);
        if (timeout !== undefined && timeout > 0) {
            this.cancelOpenTimeout = this.setTimeout(function () { return _this.setOpenState(isOpen, e); }, timeout);
        }
        else {
            if (this.props.isOpen == null) {
                this.setState({ isOpen: isOpen });
            }
            else {
                (_c = (_b = this.props).onInteraction) === null || _c === void 0 ? void 0 : _c.call(_b, isOpen, e);
            }
            if (!isOpen) {
                // non-null assertion because the only time `e` is undefined is when in controlled mode
                // or the rare special case in uncontrolled mode when the `disabled` flag is toggled true
                (_e = (_d = this.props).onClose) === null || _e === void 0 ? void 0 : _e.call(_d, e);
            }
        }
    };
    Popover2.prototype.updateDarkParent = function () {
        if (this.props.usePortal && this.state.isOpen) {
            var hasDarkParent = this.targetElement != null && this.targetElement.closest(".".concat(core_1.Classes.DARK)) != null;
            this.setState({ hasDarkParent: hasDarkParent });
        }
    };
    Popover2.prototype.isElementInPopover = function (element) {
        var _a, _b;
        return (_b = (_a = this.getPopoverElement()) === null || _a === void 0 ? void 0 : _a.contains(element)) !== null && _b !== void 0 ? _b : false;
    };
    Popover2.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".Popover2");
    Popover2.defaultProps = {
        boundary: "clippingParents",
        captureDismiss: false,
        defaultIsOpen: false,
        disabled: false,
        fill: false,
        hasBackdrop: false,
        hoverCloseDelay: 300,
        hoverOpenDelay: 150,
        inheritDarkTheme: true,
        interactionKind: exports.Popover2InteractionKind.CLICK,
        matchTargetWidth: false,
        minimal: false,
        openOnTargetFocus: true,
        // N.B. we don't set a default for `placement` or `position` here because that would trigger
        // a warning in validateProps if the other prop is specified by a user of this component
        positioningStrategy: "absolute",
        renderTarget: undefined,
        shouldReturnFocusOnClose: false,
        targetTagName: "span",
        transitionDuration: 300,
        usePortal: true,
    };
    return Popover2;
}(core_1.AbstractPureComponent2));
exports.Popover2 = Popover2;
function noop() {
    // no-op
}
//# sourceMappingURL=popover2.js.map