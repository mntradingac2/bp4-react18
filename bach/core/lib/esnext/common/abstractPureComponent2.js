"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPureComponent2 = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const utils_1 = require("./utils");
class AbstractPureComponent2 extends React.PureComponent {
    componentWillUpdate;
    componentWillReceiveProps;
    componentWillMount;
    getDerivedStateFromProps;
    displayName;
    timeoutIds = [];
    requestIds = [];
    constructor(props, context) {
        super(props, context);
        if (!(0, utils_1.isNodeEnv)("production")) {
            this.validateProps(this.props);
        }
    }
    componentDidUpdate(_prevProps, _prevState, _snapshot) {
        if (!(0, utils_1.isNodeEnv)("production")) {
            this.validateProps(this.props);
        }
    }
    componentWillUnmount() {
        this.clearTimeouts();
        this.cancelAnimationFrames();
    }
    requestAnimationFrame(callback) {
        const handle = window.requestAnimationFrame(callback);
        this.requestIds.push(handle);
        return () => window.cancelAnimationFrame(handle);
    }
    setTimeout(callback, timeout) {
        const handle = window.setTimeout(callback, timeout);
        this.timeoutIds.push(handle);
        return () => window.clearTimeout(handle);
    }
    clearTimeouts = () => {
        if (this.timeoutIds.length > 0) {
            for (const timeoutId of this.timeoutIds) {
                window.clearTimeout(timeoutId);
            }
            this.timeoutIds = [];
        }
    };
    cancelAnimationFrames = () => {
        if (this.requestIds.length > 0) {
            for (const requestId of this.requestIds) {
                window.cancelAnimationFrame(requestId);
            }
            this.requestIds = [];
        }
    };
    validateProps(_props) {
    }
}
exports.AbstractPureComponent2 = AbstractPureComponent2;
//# sourceMappingURL=abstractPureComponent2.js.map