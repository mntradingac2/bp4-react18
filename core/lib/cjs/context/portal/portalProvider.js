"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalProvider = exports.PortalContext = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
exports.PortalContext = React.createContext({});
const PortalProvider = ({ children, ...options }) => {
    return React.createElement(exports.PortalContext.Provider, { value: options }, children);
};
exports.PortalProvider = PortalProvider;
//# sourceMappingURL=portalProvider.js.map