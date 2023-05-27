"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const utils_1 = require("../../common/utils");
const icon_1 = require("../icon/icon");
const text_1 = require("../text/text");
class Tag extends common_1.AbstractPureComponent2 {
    static displayName = `${common_1.DISPLAYNAME_PREFIX}.Tag`;
    render() {
        const { active, children, className, fill, icon, intent, interactive, large, minimal, multiline, onRemove, rightIcon, round, tabIndex = 0, htmlTitle, elementRef, ...htmlProps } = this.props;
        const isRemovable = common_1.Utils.isFunction(onRemove);
        const tagClasses = (0, classnames_1.default)(common_1.Classes.TAG, common_1.Classes.intentClass(intent), {
            [common_1.Classes.ACTIVE]: active,
            [common_1.Classes.FILL]: fill,
            [common_1.Classes.INTERACTIVE]: interactive,
            [common_1.Classes.LARGE]: large,
            [common_1.Classes.MINIMAL]: minimal,
            [common_1.Classes.ROUND]: round,
        }, className);
        const isLarge = large || tagClasses.indexOf(common_1.Classes.LARGE) >= 0;
        const removeButton = isRemovable ? (React.createElement("button", { "aria-label": "Remove Tag", type: "button", className: common_1.Classes.TAG_REMOVE, onClick: this.onRemoveClick, tabIndex: tabIndex },
            React.createElement(icon_1.Icon, { icon: "small-cross", size: isLarge ? icon_1.IconSize.LARGE : icon_1.IconSize.STANDARD }))) : null;
        return (React.createElement("span", { ...htmlProps, className: tagClasses, tabIndex: interactive ? tabIndex : undefined, ref: elementRef },
            React.createElement(icon_1.Icon, { icon: icon }),
            !(0, utils_1.isReactNodeEmpty)(children) && (React.createElement(text_1.Text, { className: common_1.Classes.FILL, ellipsize: !multiline, tagName: "span", title: htmlTitle }, children)),
            React.createElement(icon_1.Icon, { icon: rightIcon }),
            removeButton));
    }
    onRemoveClick = (e) => {
        this.props.onRemove?.(e, this.props);
    };
}
exports.Tag = Tag;
//# sourceMappingURL=tag.js.map