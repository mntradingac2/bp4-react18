"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const popover_1 = require("../popover/popover");
class Tooltip extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Tooltip`;
    static defaultProps = {
        hoverCloseDelay: 0,
        hoverOpenDelay: 100,
        minimal: false,
        transitionDuration: 100,
    };
    popover = null;
    render() {
        const { children, intent, popoverClassName, ...restProps } = this.props;
        const classes = (0, classnames_1.default)(common_1.Classes.TOOLTIP, { [common_1.Classes.MINIMAL]: this.props.minimal }, common_1.Classes.intentClass(intent), popoverClassName);
        return (React.createElement(popover_1.Popover, { interactionKind: popover_1.PopoverInteractionKind.HOVER_TARGET_ONLY, modifiers: { arrow: { enabled: !this.props.minimal } }, ...restProps, autoFocus: false, canEscapeKeyClose: false, enforceFocus: false, lazy: true, popoverClassName: classes, portalContainer: this.props.portalContainer, ref: ref => (this.popover = ref) }, children));
    }
    reposition() {
        if (this.popover != null) {
            this.popover.reposition();
        }
    }
}
exports.Tooltip = Tooltip;
//# sourceMappingURL=tooltip.js.map