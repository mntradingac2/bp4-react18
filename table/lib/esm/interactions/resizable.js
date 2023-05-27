/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
import { __assign, __extends } from "tslib";
import * as React from "react";
import { AbstractPureComponent2 } from "@blueprintjs/core";
import { Utils } from "../common/index";
import { Orientation, ResizeHandle } from "./resizeHandle";
var Resizable = /** @class */ (function (_super) {
    __extends(Resizable, _super);
    function Resizable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            size: _this.props.size,
            unclampedSize: _this.props.size,
        };
        _this.onResizeMove = function (_offset, delta) {
            var _a, _b;
            _this.offsetSize(delta);
            (_b = (_a = _this.props).onSizeChanged) === null || _b === void 0 ? void 0 : _b.call(_a, _this.state.size);
        };
        _this.onResizeEnd = function (_offset) {
            var _a, _b;
            // reset "unclamped" size on end
            _this.setState({ unclampedSize: _this.state.size });
            (_b = (_a = _this.props).onResizeEnd) === null || _b === void 0 ? void 0 : _b.call(_a, _this.state.size);
        };
        return _this;
    }
    Resizable.getDerivedStateFromProps = function (_a, prevState) {
        var size = _a.size;
        if (prevState == null) {
            return {
                size: size,
                unclampedSize: size,
            };
        }
        return null;
    };
    Resizable.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.size !== this.props.size) {
            this.setState(Resizable.getDerivedStateFromProps(this.props, null));
        }
    };
    Resizable.prototype.render = function () {
        var child = React.Children.only(this.props.children);
        var style = __assign(__assign({}, child.props.style), this.getStyle());
        if (this.props.isResizable === false) {
            return React.cloneElement(child, { style: style });
        }
        var resizeHandle = this.renderResizeHandle();
        return React.cloneElement(child, { style: style, resizeHandle: resizeHandle });
    };
    Resizable.prototype.renderResizeHandle = function () {
        var _a = this.props, onLayoutLock = _a.onLayoutLock, onDoubleClick = _a.onDoubleClick, orientation = _a.orientation;
        return (React.createElement(ResizeHandle, { key: "resize-handle", onDoubleClick: onDoubleClick, onLayoutLock: onLayoutLock, onResizeEnd: this.onResizeEnd, onResizeMove: this.onResizeMove, orientation: orientation }));
    };
    /**
     * Returns the CSS style to apply to the child element given the state's
     * size value.
     */
    Resizable.prototype.getStyle = function () {
        if (this.props.orientation === Orientation.VERTICAL) {
            return {
                flexBasis: "".concat(this.state.size, "px"),
                minWidth: "0px",
                width: "".concat(this.state.size, "px"),
            };
        }
        else {
            return {
                flexBasis: "".concat(this.state.size, "px"),
                height: "".concat(this.state.size, "px"),
                minHeight: "0px",
            };
        }
    };
    Resizable.prototype.offsetSize = function (offset) {
        var unclampedSize = this.state.unclampedSize + offset;
        this.setState({
            size: Utils.clamp(unclampedSize, this.props.minSize, this.props.maxSize),
            unclampedSize: unclampedSize,
        });
    };
    Resizable.defaultProps = {
        isResizable: true,
        minSize: 0,
    };
    return Resizable;
}(AbstractPureComponent2));
export { Resizable };
//# sourceMappingURL=resizable.js.map