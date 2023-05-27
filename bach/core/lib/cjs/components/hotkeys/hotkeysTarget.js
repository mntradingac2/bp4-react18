"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotkeysTarget = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const errors_1 = require("../../common/errors");
const utils_1 = require("../../common/utils");
const hotkeysEvents_1 = require("./hotkeysEvents");
function HotkeysTarget(WrappedComponent) {
    if (!(0, utils_1.isFunction)(WrappedComponent.prototype.renderHotkeys)) {
        console.warn(errors_1.HOTKEYS_WARN_DECORATOR_NO_METHOD);
    }
    return class HotkeysTargetClass extends WrappedComponent {
        static displayName = `HotkeysTarget(${(0, utils_1.getDisplayName)(WrappedComponent)})`;
        globalHotkeysEvents = new hotkeysEvents_1.HotkeysEvents(hotkeysEvents_1.HotkeyScope.GLOBAL);
        localHotkeysEvents = new hotkeysEvents_1.HotkeysEvents(hotkeysEvents_1.HotkeyScope.LOCAL);
        componentDidMount() {
            if (super.componentDidMount != null) {
                super.componentDidMount();
            }
            document.addEventListener("keydown", this.globalHotkeysEvents.handleKeyDown);
            document.addEventListener("keyup", this.globalHotkeysEvents.handleKeyUp);
        }
        componentWillUnmount() {
            super.componentWillUnmount?.();
            document.removeEventListener("keydown", this.globalHotkeysEvents.handleKeyDown);
            document.removeEventListener("keyup", this.globalHotkeysEvents.handleKeyUp);
            this.globalHotkeysEvents.clear();
            this.localHotkeysEvents.clear();
        }
        render() {
            const element = super.render();
            if (element == null) {
                return element;
            }
            if (!React.isValidElement(element)) {
                console.warn(errors_1.HOTKEYS_WARN_DECORATOR_NEEDS_REACT_ELEMENT);
                return element;
            }
            if ((0, utils_1.isFunction)(this.renderHotkeys)) {
                const hotkeys = this.renderHotkeys();
                if (this.localHotkeysEvents) {
                    this.localHotkeysEvents.setHotkeys(hotkeys.props);
                }
                if (this.globalHotkeysEvents) {
                    this.globalHotkeysEvents.setHotkeys(hotkeys.props);
                }
                if (this.localHotkeysEvents.count() > 0) {
                    const tabIndex = hotkeys.props.tabIndex === undefined ? 0 : hotkeys.props.tabIndex;
                    const { onKeyDown: existingKeyDown, onKeyUp: existingKeyUp } = element.props;
                    const handleKeyDownWrapper = (e) => {
                        this.localHotkeysEvents.handleKeyDown(e.nativeEvent);
                        existingKeyDown?.(e);
                    };
                    const handleKeyUpWrapper = (e) => {
                        this.localHotkeysEvents.handleKeyUp(e.nativeEvent);
                        existingKeyUp?.(e);
                    };
                    return React.cloneElement(element, {
                        onKeyDown: handleKeyDownWrapper,
                        onKeyUp: handleKeyUpWrapper,
                        tabIndex,
                    });
                }
            }
            return element;
        }
    };
}
exports.HotkeysTarget = HotkeysTarget;
//# sourceMappingURL=hotkeysTarget.js.map