"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLTable = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
class HTMLTable extends common_1.AbstractPureComponent2 {
    render() {
        const { bordered, className, compact, condensed, elementRef, interactive, striped, ...htmlProps } = this.props;
        const classes = (0, classnames_1.default)(common_1.Classes.HTML_TABLE, {
            [common_1.Classes.COMPACT]: compact,
            [common_1.Classes.HTML_TABLE_BORDERED]: bordered,
            [common_1.Classes.HTML_TABLE_CONDENSED]: condensed,
            [common_1.Classes.HTML_TABLE_STRIPED]: striped,
            [common_1.Classes.INTERACTIVE]: interactive,
        }, className);
        return React.createElement("table", { ...htmlProps, ref: elementRef, className: classes });
    }
}
exports.HTMLTable = HTMLTable;
//# sourceMappingURL=htmlTable.js.map