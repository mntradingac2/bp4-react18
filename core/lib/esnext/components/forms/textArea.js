"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArea = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class TextArea extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.TextArea`;
    state = {};
    textareaElement = null;
    handleRef = (0, common_1.refHandler)(this, "textareaElement", this.props.inputRef);
    maybeSyncHeightToScrollHeight = () => {
        if (this.props.growVertically && this.textareaElement != null) {
            const { scrollHeight } = this.textareaElement;
            if (scrollHeight > 0) {
                this.setState({ height: scrollHeight });
            }
        }
    };
    componentDidMount() {
        this.maybeSyncHeightToScrollHeight();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.inputRef !== this.props.inputRef) {
            (0, common_1.setRef)(prevProps.inputRef, null);
            this.handleRef = (0, common_1.refHandler)(this, "textareaElement", this.props.inputRef);
            (0, common_1.setRef)(this.props.inputRef, this.textareaElement);
        }
        if (prevProps.value !== this.props.value || prevProps.style !== this.props.style) {
            this.maybeSyncHeightToScrollHeight();
        }
    }
    render() {
        const { className, fill, inputRef, intent, large, small, growVertically, ...htmlProps } = this.props;
        const rootClasses = (0, classnames_1.default)(common_1.Classes.INPUT, common_1.Classes.intentClass(intent), {
            [common_1.Classes.FILL]: fill,
            [common_1.Classes.LARGE]: large,
            [common_1.Classes.SMALL]: small,
        }, className);
        let { style = {} } = htmlProps;
        if (growVertically && this.state.height != null) {
            style = {
                ...style,
                height: `${this.state.height}px`,
            };
        }
        return (React.createElement("textarea", { ...htmlProps, className: rootClasses, onChange: this.handleChange, ref: this.handleRef, style: style }));
    }
    handleChange = (e) => {
        this.maybeSyncHeightToScrollHeight();
        this.props.onChange?.(e);
    };
}
exports.TextArea = TextArea;
//# sourceMappingURL=textArea.js.map