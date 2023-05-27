"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UL = exports.OL = exports.Label = exports.Pre = exports.Code = exports.Blockquote = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const classes_1 = require("../../common/classes");
function htmlElement(tagName, tagClassName) {
    return props => {
        const { className, elementRef, children, ...htmlProps } = props;
        return React.createElement(tagName, {
            ...htmlProps,
            className: (0, classnames_1.default)(tagClassName, className),
            ref: elementRef,
        }, children);
    };
}
exports.H1 = htmlElement("h1", classes_1.HEADING);
exports.H2 = htmlElement("h2", classes_1.HEADING);
exports.H3 = htmlElement("h3", classes_1.HEADING);
exports.H4 = htmlElement("h4", classes_1.HEADING);
exports.H5 = htmlElement("h5", classes_1.HEADING);
exports.H6 = htmlElement("h6", classes_1.HEADING);
exports.Blockquote = htmlElement("blockquote", classes_1.BLOCKQUOTE);
exports.Code = htmlElement("code", classes_1.CODE);
exports.Pre = htmlElement("pre", classes_1.CODE_BLOCK);
exports.Label = htmlElement("label", classes_1.LABEL);
exports.OL = htmlElement("ol", classes_1.LIST);
exports.UL = htmlElement("ul", classes_1.LIST);
//# sourceMappingURL=html.js.map