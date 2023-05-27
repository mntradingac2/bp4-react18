"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionModeEngine = void 0;
class InteractionModeEngine {
    container;
    className;
    isRunning = false;
    constructor(container, className) {
        this.container = container;
        this.className = className;
    }
    isActive() {
        return this.isRunning;
    }
    start() {
        this.container.addEventListener("mousedown", this.handleMouseDown);
        this.isRunning = true;
    }
    stop() {
        this.reset();
        this.isRunning = false;
    }
    reset() {
        this.container.classList.remove(this.className);
        this.container.removeEventListener("keydown", this.handleKeyDown);
        this.container.removeEventListener("mousedown", this.handleMouseDown);
    }
    handleKeyDown = (e) => {
        if (e.key === "Tab") {
            this.reset();
            this.container.addEventListener("mousedown", this.handleMouseDown);
        }
    };
    handleMouseDown = () => {
        this.reset();
        this.container.classList.add(this.className);
        this.container.addEventListener("keydown", this.handleKeyDown);
    };
}
exports.InteractionModeEngine = InteractionModeEngine;
//# sourceMappingURL=interactionMode.js.map