"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawer = exports.DrawerSize = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const Errors = tslib_1.__importStar(require("../../common/errors"));
const position_1 = require("../../common/position");
const props_1 = require("../../common/props");
const buttons_1 = require("../button/buttons");
const html_1 = require("../html/html");
const icon_1 = require("../icon/icon");
const overlay_1 = require("../overlay/overlay");
var DrawerSize;
(function (DrawerSize) {
    DrawerSize["SMALL"] = "360px";
    DrawerSize["STANDARD"] = "50%";
    DrawerSize["LARGE"] = "90%";
})(DrawerSize = exports.DrawerSize || (exports.DrawerSize = {}));
class Drawer extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Drawer`;
    static defaultProps = {
        canOutsideClickClose: true,
        isOpen: false,
        position: "right",
        style: {},
    };
    render() {
        const { size, style, position } = this.props;
        const realPosition = (0, position_1.getPositionIgnoreAngles)(position);
        const classes = (0, classnames_1.default)(common_1.Classes.DRAWER, {
            [common_1.Classes.positionClass(realPosition) ?? ""]: true,
        }, this.props.className);
        const styleProp = size == null
            ? style
            : {
                ...style,
                [(0, position_1.isPositionHorizontal)(realPosition) ? "height" : "width"]: size,
            };
        return (React.createElement(overlay_1.Overlay, { ...this.props, className: common_1.Classes.OVERLAY_CONTAINER },
            React.createElement("div", { className: classes, style: styleProp },
                this.maybeRenderHeader(),
                this.props.children)));
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
        if (props.position != null) {
            if (props.position !== (0, position_1.getPositionIgnoreAngles)(props.position)) {
                console.warn(Errors.DRAWER_ANGLE_POSITIONS_ARE_CASTED);
            }
        }
    }
    maybeRenderCloseButton() {
        if (this.props.isCloseButtonShown !== false) {
            return (React.createElement(buttons_1.Button, { "aria-label": "Close", className: common_1.Classes.DIALOG_CLOSE_BUTTON, icon: React.createElement(icon_1.Icon, { icon: "small-cross", size: icon_1.IconSize.LARGE }), minimal: true, onClick: this.props.onClose }));
        }
        else {
            return null;
        }
    }
    maybeRenderHeader() {
        const { icon, title } = this.props;
        if (title == null) {
            return null;
        }
        return (React.createElement("div", { className: common_1.Classes.DRAWER_HEADER },
            React.createElement(icon_1.Icon, { icon: icon, size: icon_1.IconSize.LARGE }),
            React.createElement(html_1.H4, null, title),
            this.maybeRenderCloseButton()));
    }
}
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.js.map