"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTabTitleId = exports.generateTabPanelId = exports.TabTitle = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const icon_1 = require("../icon/icon");
const tag_1 = require("../tag/tag");
class TabTitle extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.TabTitle`;
    render() {
        const { className, children, disabled, id, parentId, selected, title, icon, tagContent, tagProps, ...htmlProps } = this.props;
        const intent = selected ? common_1.Intent.PRIMARY : common_1.Intent.NONE;
        return (React.createElement("div", { ...(0, props_1.removeNonHTMLProps)(htmlProps), "aria-controls": generateTabPanelId(parentId, id), "aria-disabled": disabled, "aria-expanded": selected, "aria-selected": selected, className: (0, classnames_1.default)(common_1.Classes.TAB, className), "data-tab-id": id, id: generateTabTitleId(parentId, id), onClick: disabled ? undefined : this.handleClick, role: "tab", tabIndex: disabled ? undefined : selected ? 0 : -1 },
            icon != null && React.createElement(icon_1.Icon, { icon: icon, intent: intent, className: common_1.Classes.TAB_ICON }),
            title,
            children,
            tagContent != null && (React.createElement(tag_1.Tag, { minimal: true, intent: intent, ...tagProps, className: (0, classnames_1.default)(common_1.Classes.TAB_TAG, tagProps?.className) }, tagContent))));
    }
    handleClick = (e) => this.props.onClick(this.props.id, e);
}
exports.TabTitle = TabTitle;
function generateTabPanelId(parentId, tabId) {
    return `${common_1.Classes.TAB_PANEL}_${parentId}_${tabId}`;
}
exports.generateTabPanelId = generateTabPanelId;
function generateTabTitleId(parentId, tabId) {
    return `${common_1.Classes.TAB}-title_${parentId}_${tabId}`;
}
exports.generateTabTitleId = generateTabTitleId;
//# sourceMappingURL=tabTitle.js.map