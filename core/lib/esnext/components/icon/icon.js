"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.IconSize = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@blueprintjs/icons");
const common_1 = require("../../common");
const utils_1 = require("../../common/utils");
var IconSize;
(function (IconSize) {
    IconSize[IconSize["STANDARD"] = 16] = "STANDARD";
    IconSize[IconSize["LARGE"] = 20] = "LARGE";
})(IconSize = exports.IconSize || (exports.IconSize = {}));
class Icon extends common_1.AbstractPureComponent2 {
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.Icon`;
    render() {
        const { icon } = this.props;
        if (icon == null || typeof icon === "boolean") {
            return null;
        }
        else if (typeof icon !== "string") {
            return icon;
        }
        const { className, color, htmlTitle, iconSize, intent, size = iconSize ?? IconSize.STANDARD, svgProps, title, tagName = "span", ...htmlprops } = this.props;
        const pixelGridSize = size >= IconSize.LARGE ? IconSize.LARGE : IconSize.STANDARD;
        const paths = this.renderSvgPaths(pixelGridSize, icon);
        const classes = (0, classnames_1.default)(common_1.Classes.ICON, common_1.Classes.iconClass(icon), common_1.Classes.intentClass(intent), className);
        const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`;
        const titleId = (0, utils_1.uniqueId)("iconTitle");
        return React.createElement(tagName, {
            "aria-hidden": title ? undefined : true,
            ...htmlprops,
            className: classes,
            title: htmlTitle,
        }, React.createElement("svg", { fill: color, "data-icon": icon, width: size, height: size, viewBox: viewBox, "aria-labelledby": title ? titleId : undefined, role: "img", ...svgProps },
            title && React.createElement("title", { id: titleId }, title),
            paths));
    }
    renderSvgPaths(pathsSize, iconName) {
        const svgPathsRecord = pathsSize === IconSize.STANDARD ? icons_1.IconSvgPaths16 : icons_1.IconSvgPaths20;
        const paths = svgPathsRecord[(0, icons_1.iconNameToPathsRecordKey)(iconName)];
        if (paths == null) {
            return null;
        }
        return paths.map((path, i) => React.createElement("path", { key: i, d: path, fillRule: "evenodd" }));
    }
}
exports.Icon = Icon;
//# sourceMappingURL=icon.js.map