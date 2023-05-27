"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorButton = exports.Button = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const props_1 = require("../../common/props");
const refs_1 = require("../../common/refs");
const abstractButton_1 = require("./abstractButton");
class Button extends abstractButton_1.AbstractButton {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Button`;
    buttonRef = null;
    handleRef = (0, refs_1.refHandler)(this, "buttonRef", this.props.elementRef);
    render() {
        return (React.createElement("button", { type: "button", ref: this.handleRef, ...(0, props_1.removeNonHTMLProps)(this.props), ...this.getCommonButtonProps() }, this.renderChildren()));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.elementRef !== this.props.elementRef) {
            (0, refs_1.setRef)(prevProps.elementRef, null);
            this.handleRef = (0, refs_1.refHandler)(this, "buttonRef", this.props.elementRef);
            (0, refs_1.setRef)(this.props.elementRef, this.buttonRef);
        }
    }
}
exports.Button = Button;
class AnchorButton extends abstractButton_1.AbstractButton {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.AnchorButton`;
    buttonRef = null;
    handleRef = (0, refs_1.refHandler)(this, "buttonRef", this.props.elementRef);
    render() {
        const { href, tabIndex = 0 } = this.props;
        const commonProps = this.getCommonButtonProps();
        return (React.createElement("a", { role: "button", ref: this.handleRef, ...(0, props_1.removeNonHTMLProps)(this.props), ...commonProps, href: commonProps.disabled ? undefined : href, tabIndex: commonProps.disabled ? -1 : tabIndex }, this.renderChildren()));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.elementRef !== this.props.elementRef) {
            (0, refs_1.setRef)(prevProps.elementRef, null);
            this.handleRef = (0, refs_1.refHandler)(this, "buttonRef", this.props.elementRef);
            (0, refs_1.setRef)(this.props.elementRef, this.buttonRef);
        }
    }
}
exports.AnchorButton = AnchorButton;
//# sourceMappingURL=buttons.js.map