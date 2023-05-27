"use strict";
/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip2 = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var Classes = tslib_1.__importStar(require("./classes"));
// eslint-disable-next-line import/no-cycle
var popover2_1 = require("./popover2");
var popover2Arrow_1 = require("./popover2Arrow");
var tooltip2Context_1 = require("./tooltip2Context");
/**
 * Tooltip (v2) component.
 *
 * @see https://blueprintjs.com/docs/#popover2-package/tooltip2
 */
var Tooltip2 = /** @class */ (function (_super) {
    tslib_1.__extends(Tooltip2, _super);
    function Tooltip2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popoverRef = React.createRef();
        // any descendant ContextMenu2s may update this ctxState
        _this.renderPopover = function (ctxState) {
            var _a;
            var _b;
            var _c = _this.props, children = _c.children, compact = _c.compact, disabled = _c.disabled, intent = _c.intent, popoverClassName = _c.popoverClassName, restProps = tslib_1.__rest(_c, ["children", "compact", "disabled", "intent", "popoverClassName"]);
            var popoverClasses = (0, classnames_1.default)(Classes.TOOLTIP2, core_1.Classes.intentClass(intent), popoverClassName, (_a = {},
                _a[core_1.Classes.COMPACT] = compact,
                _a));
            return (React.createElement(popover2_1.Popover2, tslib_1.__assign({ modifiers: {
                    arrow: {
                        enabled: !_this.props.minimal,
                    },
                    offset: {
                        options: {
                            offset: [0, popover2Arrow_1.TOOLTIP_ARROW_SVG_SIZE / 2],
                        },
                    },
                } }, restProps, { autoFocus: false, canEscapeKeyClose: false, disabled: (_b = ctxState.forceDisabled) !== null && _b !== void 0 ? _b : disabled, enforceFocus: false, lazy: true, popoverClassName: popoverClasses, portalContainer: _this.props.portalContainer, ref: _this.popoverRef }), children));
        };
        return _this;
    }
    Tooltip2.prototype.render = function () {
        var _this = this;
        // if we have an ancestor Tooltip2Context, we should take its state into account in this render path,
        // it was likely created by a parent ContextMenu2
        return (React.createElement(tooltip2Context_1.Tooltip2Context.Consumer, null, function (_a) {
            var state = _a[0];
            return React.createElement(tooltip2Context_1.Tooltip2Provider, tslib_1.__assign({}, state), _this.renderPopover);
        }));
    };
    Tooltip2.prototype.reposition = function () {
        var _a;
        (_a = this.popoverRef.current) === null || _a === void 0 ? void 0 : _a.reposition();
    };
    Tooltip2.displayName = "".concat(core_1.DISPLAYNAME_PREFIX, ".Tooltip2");
    Tooltip2.defaultProps = {
        compact: false,
        hoverCloseDelay: 0,
        hoverOpenDelay: 100,
        interactionKind: "hover-target",
        minimal: false,
        transitionDuration: 100,
    };
    return Tooltip2;
}(React.PureComponent));
exports.Tooltip2 = Tooltip2;
//# sourceMappingURL=tooltip2.js.map