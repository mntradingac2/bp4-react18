"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const buttons_1 = require("../button/buttons");
const html_1 = require("../html/html");
const icon_1 = require("../icon/icon");
const overlay_1 = require("../overlay/overlay");
class Dialog extends common_1.AbstractPureComponent2 {
    static defaultProps = {
        canOutsideClickClose: true,
        isOpen: false,
    };
    titleId;
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Dialog`;
    constructor(props) {
        super(props);
        const id = (0, utils_1.uniqueId)("bp-dialog");
        this.titleId = `title-${id}`;
    }
    render() {
        return (React.createElement(overlay_1.Overlay, { ...this.props, className: common_1.Classes.OVERLAY_SCROLL_CONTAINER, hasBackdrop: true },
            React.createElement("div", { className: common_1.Classes.DIALOG_CONTAINER, ref: this.props.containerRef },
                React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.DIALOG, this.props.className), role: "dialog", "aria-labelledby": this.props["aria-labelledby"] || (this.props.title ? this.titleId : undefined), "aria-describedby": this.props["aria-describedby"], style: this.props.style },
                    this.maybeRenderHeader(),
                    this.props.children))));
    }
    validateProps(props) {
        if (props.title == null) {
            if (props.icon != null) {
                console.warn(Errors.DIALOG_WARN_NO_HEADER_ICON);
            }
            if (props.isCloseButtonShown != null) {
                console.warn(Errors.DIALOG_WARN_NO_HEADER_CLOSE_BUTTON);
            }
        }
    }
    maybeRenderCloseButton() {
        if (this.props.isCloseButtonShown !== false) {
            return (React.createElement(buttons_1.Button, { "aria-label": "Close", className: common_1.Classes.DIALOG_CLOSE_BUTTON, icon: React.createElement(icon_1.Icon, { icon: "cross", size: icon_1.IconSize.STANDARD }), minimal: true, onClick: this.props.onClose }));
        }
        else {
            return undefined;
        }
    }
    maybeRenderHeader() {
        const { icon, title } = this.props;
        if (title == null) {
            return undefined;
        }
        return (React.createElement("div", { className: common_1.Classes.DIALOG_HEADER },
            React.createElement(icon_1.Icon, { icon: icon, size: icon_1.IconSize.STANDARD, "aria-hidden": true, tabIndex: -1 }),
            React.createElement(html_1.H6, { id: this.titleId }, title),
            this.maybeRenderCloseButton()));
    }
}
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map