"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogStepButton = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const buttons_1 = require("../button/buttons");
const tooltip_1 = require("../tooltip/tooltip");
function DialogStepButton({ tooltipContent, ...props }) {
    const button = React.createElement(buttons_1.AnchorButton, { ...props });
    if (tooltipContent !== undefined) {
        return React.createElement(tooltip_1.Tooltip, { content: tooltipContent }, button);
    }
    else {
        return button;
    }
}
exports.DialogStepButton = DialogStepButton;
//# sourceMappingURL=dialogStepButton.js.map