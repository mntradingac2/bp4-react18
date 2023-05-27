"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class Text extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Text`;
    static defaultProps = {
        ellipsize: false,
    };
    state = {
        isContentOverflowing: false,
        textContent: "",
    };
    textRef = null;
    componentDidMount() {
        this.update();
    }
    componentDidUpdate() {
        this.update();
    }
    render() {
        const { children, className, ellipsize, tagName = "div", title, ...htmlProps } = this.props;
        const classes = (0, classnames_1.default)(className, {
            [common_1.Classes.TEXT_OVERFLOW_ELLIPSIS]: ellipsize,
        });
        return React.createElement(tagName, {
            ...htmlProps,
            className: classes,
            ref: (ref) => (this.textRef = ref),
            title: title ?? (this.state.isContentOverflowing ? this.state.textContent : undefined),
        }, children);
    }
    update() {
        if (this.textRef?.textContent == null) {
            return;
        }
        const newState = {
            isContentOverflowing: this.props.ellipsize && this.textRef.scrollWidth > this.textRef.clientWidth,
            textContent: this.textRef.textContent,
        };
        this.setState(newState);
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map