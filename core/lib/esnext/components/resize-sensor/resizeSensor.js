"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeSensor = void 0;
const tslib_1 = require("tslib");
const resize_observer_1 = require("@juggle/resize-observer");
const React = tslib_1.__importStar(require("react"));
const react_dom_1 = require("react-dom");
const common_1 = require("../../common");
const props_1 = require("../../common/props");
class ResizeSensor extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.ResizeSensor`;
    element = null;
    observer = new resize_observer_1.ResizeObserver(entries => this.props.onResize?.(entries));
    render() {
        return React.Children.only(this.props.children);
    }
    componentDidMount() {
        this.observeElement();
    }
    componentDidUpdate(prevProps) {
        this.observeElement(this.props.observeParents !== prevProps.observeParents);
    }
    componentWillUnmount() {
        this.observer.disconnect();
        this.element = null;
    }
    observeElement(force = false) {
        const element = this.getElement();
        if (!(element instanceof Element)) {
            this.observer.disconnect();
            return;
        }
        if (element === this.element && !force) {
            return;
        }
        else {
            this.observer.disconnect();
            this.element = element;
        }
        this.observer.observe(element);
        if (this.props.observeParents) {
            let parent = element.parentElement;
            while (parent != null) {
                this.observer.observe(parent);
                parent = parent.parentElement;
            }
        }
    }
    getElement() {
        try {
            return (0, react_dom_1.findDOMNode)(this);
        }
        catch {
            return null;
        }
    }
}
exports.ResizeSensor = ResizeSensor;
//# sourceMappingURL=resizeSensor.js.map