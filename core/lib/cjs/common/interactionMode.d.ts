export declare class InteractionModeEngine {
    private container;
    private className;
    private isRunning;
    constructor(container: HTMLElement, className: string);
    isActive(): boolean;
    start(): void;
    stop(): void;
    private reset;
    private handleKeyDown;
    private handleMouseDown;
}
