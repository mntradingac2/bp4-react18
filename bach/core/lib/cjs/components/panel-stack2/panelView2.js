"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelView2 = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const buttons_1 = require("../button/buttons");
const text_1 = require("../text/text");
const PanelView2 = (props) => {
    const handleClose = React.useCallback(() => props.onClose(props.panel), [props.onClose, props.panel]);
    const maybeBackButton = props.previousPanel === undefined ? null : (React.createElement(buttons_1.Button, { "aria-label": "Back", className: common_1.Classes.PANEL_STACK_HEADER_BACK, icon: "chevron-left", minimal: true, onClick: handleClose, small: true, text: props.previousPanel.title, title: props.previousPanel.htmlTitle }));
    const PanelWrapper = React.useMemo(() => () => props.panel.renderPanel({
        closePanel: handleClose,
        openPanel: props.onOpen,
        ...props.panel.props,
    }), [props.panel, props.onOpen]);
    return (React.createElement("div", { className: common_1.Classes.PANEL_STACK2_VIEW },
        props.showHeader && (React.createElement("div", { className: common_1.Classes.PANEL_STACK2_HEADER },
            React.createElement("span", null, maybeBackButton),
            React.createElement(text_1.Text, { className: common_1.Classes.HEADING, ellipsize: true, title: props.panel.htmlTitle }, props.panel.title),
            React.createElement("span", null))),
        React.createElement(PanelWrapper, null)));
};
exports.PanelView2 = PanelView2;
exports.PanelView2.displayName = `${common_1.DISPLAYNAME_PREFIX}.PanelView2`;
//# sourceMappingURL=panelView2.js.map