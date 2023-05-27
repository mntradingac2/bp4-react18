"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelView = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const buttons_1 = require("../button/buttons");
const text_1 = require("../text/text");
class PanelView extends common_1.AbstractPureComponent2 {
    render() {
        const { panel, onOpen } = this.props;
        return (React.createElement("div", { className: common_1.Classes.PANEL_STACK_VIEW },
            this.maybeRenderHeader(),
            React.createElement(panel.component, { openPanel: onOpen, closePanel: this.handleClose, ...panel.props })));
    }
    maybeRenderHeader() {
        if (!this.props.showHeader) {
            return null;
        }
        return (React.createElement("div", { className: common_1.Classes.PANEL_STACK_HEADER },
            React.createElement("span", null, this.maybeRenderBack()),
            React.createElement(text_1.Text, { className: common_1.Classes.HEADING, ellipsize: true, title: this.props.panel.htmlTitle }, this.props.panel.title),
            React.createElement("span", null)));
    }
    maybeRenderBack() {
        if (this.props.previousPanel === undefined) {
            return null;
        }
        return (React.createElement(buttons_1.Button, { "aria-label": "Back", className: common_1.Classes.PANEL_STACK_HEADER_BACK, icon: "chevron-left", minimal: true, onClick: this.handleClose, small: true, text: this.props.previousPanel.title, title: this.props.previousPanel.htmlTitle }));
    }
    handleClose = () => this.props.onClose(this.props.panel);
}
exports.PanelView = PanelView;
//# sourceMappingURL=panelView.js.map