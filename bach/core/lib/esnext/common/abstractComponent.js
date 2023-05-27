"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractComponent = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const utils_1 = require("./utils");
class AbstractComponent extends React.Component {
    displayName;
    timeoutIds = [];
    constructor(props, context) {
        super(props, context);
        if (!(0, utils_1.isNodeEnv)("production")) {
            this.validateProps(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!(0, utils_1.isNodeEnv)("production")) {
            this.validateProps(nextProps);
        }
    }
    componentWillUnmount() {
        this.clearTimeouts();
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
    validateProps(_) {
    }
}
exports.AbstractComponent = AbstractComponent;
//# sourceMappingURL=abstractComponent.js.map