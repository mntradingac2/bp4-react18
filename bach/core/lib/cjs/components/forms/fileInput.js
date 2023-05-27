"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInput = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class FileInput extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.FileInput`;
    static defaultProps = {
        hasSelection: false,
        inputProps: {},
        text: "Choose file...",
    };
    render() {
        const { buttonText, className, disabled, fill, hasSelection, inputProps, large, onInputChange, small, text, ...htmlProps } = this.props;
        const rootClasses = (0, classnames_1.default)(common_1.Classes.FILE_INPUT, {
            [common_1.Classes.FILE_INPUT_HAS_SELECTION]: hasSelection,
            [common_1.Classes.DISABLED]: disabled,
            [common_1.Classes.FILL]: fill,
            [common_1.Classes.LARGE]: large,
            [common_1.Classes.SMALL]: small,
        }, className);
        const NS = common_1.Classes.getClassNamespace();
        const uploadProps = {
            [`${NS}-button-text`]: buttonText,
            className: (0, classnames_1.default)(common_1.Classes.FILE_UPLOAD_INPUT, {
                [common_1.Classes.FILE_UPLOAD_INPUT_CUSTOM_TEXT]: !!buttonText,
            }),
        };
        return (React.createElement("label", { ...htmlProps, className: rootClasses },
            React.createElement("input", { ...inputProps, onChange: this.handleInputChange, type: "file", disabled: disabled }),
            React.createElement("span", { ...uploadProps }, text)));
    }
    handleInputChange = (e) => {
        this.props.onInputChange?.(e);
        this.props.inputProps?.onChange?.(e);
    };
}
exports.FileInput = FileInput;
//# sourceMappingURL=fileInput.js.map