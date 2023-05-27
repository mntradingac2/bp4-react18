"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultistepDialog = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const utils_1 = require("../../common/utils");
const dialog_1 = require("./dialog");
const dialogFooter_1 = require("./dialogFooter");
const dialogStep_1 = require("./dialogStep");
const dialogStepButton_1 = require("./dialogStepButton");
const PADDING_BOTTOM = 0;
const MIN_WIDTH = 800;
class MultistepDialog extends common_1.AbstractPureComponent2 {
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.MultistepDialog`;
    static defaultProps = {
        canOutsideClickClose: true,
        isOpen: false,
        navigationPosition: "left",
        resetOnClose: true,
        showCloseButtonInFooter: false,
    };
    state = this.getInitialIndexFromProps(this.props);
    render() {
        const { className, navigationPosition, showCloseButtonInFooter, isCloseButtonShown, ...otherProps } = this.props;
        return (React.createElement(dialog_1.Dialog, { isCloseButtonShown: isCloseButtonShown, ...otherProps, className: (0, classnames_1.default)({
                [common_1.Classes.MULTISTEP_DIALOG_NAV_RIGHT]: navigationPosition === "right",
                [common_1.Classes.MULTISTEP_DIALOG_NAV_TOP]: navigationPosition === "top",
            }, className), style: this.getDialogStyle() },
            React.createElement("div", { className: common_1.Classes.MULTISTEP_DIALOG_PANELS },
                this.renderLeftPanel(),
                this.maybeRenderRightPanel())));
    }
    componentDidUpdate(prevProps) {
        if ((prevProps.resetOnClose || prevProps.initialStepIndex !== this.props.initialStepIndex) &&
            !prevProps.isOpen &&
            this.props.isOpen) {
            this.setState(this.getInitialIndexFromProps(this.props));
        }
    }
    getDialogStyle() {
        return { minWidth: MIN_WIDTH, paddingBottom: PADDING_BOTTOM, ...this.props.style };
    }
    renderLeftPanel() {
        return (React.createElement("div", { className: common_1.Classes.MULTISTEP_DIALOG_LEFT_PANEL, role: "tablist", "aria-label": "steps" }, this.getDialogStepChildren().filter(isDialogStepElement).map(this.renderDialogStep)));
    }
    renderDialogStep = (step, index) => {
        const stepNumber = index + 1;
        const hasBeenViewed = this.state.lastViewedIndex >= index;
        const currentlySelected = this.state.selectedIndex === index;
        const handleClickDialogStep = index > this.state.lastViewedIndex ? undefined : this.getDialogStepChangeHandler(index);
        return (React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.DIALOG_STEP_CONTAINER, {
                [common_1.Classes.ACTIVE]: currentlySelected,
                [common_1.Classes.DIALOG_STEP_VIEWED]: hasBeenViewed,
            }), key: index, "aria-selected": currentlySelected, role: "tab" },
            React.createElement("div", { className: common_1.Classes.DIALOG_STEP, onClick: handleClickDialogStep, tabIndex: handleClickDialogStep ? 0 : -1, onKeyDown: (0, utils_1.clickElementOnKeyPress)(["Enter", " "]) },
                React.createElement("div", { className: common_1.Classes.DIALOG_STEP_ICON }, stepNumber),
                React.createElement("div", { className: common_1.Classes.DIALOG_STEP_TITLE }, step.props.title))));
    };
    maybeRenderRightPanel() {
        const steps = this.getDialogStepChildren();
        if (steps.length <= this.state.selectedIndex) {
            return null;
        }
        const { className, panel, panelClassName } = steps[this.state.selectedIndex].props;
        return (React.createElement("div", { className: (0, classnames_1.default)(common_1.Classes.MULTISTEP_DIALOG_RIGHT_PANEL, className, panelClassName) },
            panel,
            this.renderFooter()));
    }
    renderFooter() {
        const { closeButtonProps, showCloseButtonInFooter, onClose } = this.props;
        const maybeCloseButton = !showCloseButtonInFooter ? undefined : (React.createElement(dialogStepButton_1.DialogStepButton, { text: "Close", onClick: onClose, ...closeButtonProps }));
        return (React.createElement(dialogFooter_1.DialogFooter, { className: common_1.Classes.MULTISTEP_DIALOG_FOOTER, actions: this.renderButtons() }, maybeCloseButton));
    }
    renderButtons() {
        const { selectedIndex } = this.state;
        const steps = this.getDialogStepChildren();
        const buttons = [];
        if (this.state.selectedIndex > 0) {
            const backButtonProps = steps[selectedIndex].props.backButtonProps ?? this.props.backButtonProps;
            buttons.push(React.createElement(dialogStepButton_1.DialogStepButton, { key: "back", onClick: this.getDialogStepChangeHandler(selectedIndex - 1), text: "Back", ...backButtonProps }));
        }
        if (selectedIndex === this.getDialogStepChildren().length - 1) {
            buttons.push(React.createElement(dialogStepButton_1.DialogStepButton, { intent: "primary", key: "final", text: "Submit", ...this.props.finalButtonProps }));
        }
        else {
            const nextButtonProps = steps[selectedIndex].props.nextButtonProps ?? this.props.nextButtonProps;
            buttons.push(React.createElement(dialogStepButton_1.DialogStepButton, { intent: "primary", key: "next", onClick: this.getDialogStepChangeHandler(selectedIndex + 1), text: "Next", ...nextButtonProps }));
        }
        return buttons;
    }
    getDialogStepChangeHandler(index) {
        return (event) => {
            if (this.props.onChange !== undefined) {
                const steps = this.getDialogStepChildren();
                const prevStepId = steps[this.state.selectedIndex].props.id;
                const newStepId = steps[index].props.id;
                this.props.onChange(newStepId, prevStepId, event);
            }
            this.setState({
                lastViewedIndex: Math.max(this.state.lastViewedIndex, index),
                selectedIndex: index,
            });
        };
    }
    getDialogStepChildren(props = this.props) {
        return React.Children.toArray(props.children).filter(isDialogStepElement);
    }
    getInitialIndexFromProps(props) {
        if (props.initialStepIndex !== undefined) {
            const boundedInitialIndex = Math.max(0, Math.min(props.initialStepIndex, this.getDialogStepChildren(props).length - 1));
            return {
                lastViewedIndex: boundedInitialIndex,
                selectedIndex: boundedInitialIndex,
            };
        }
        else {
            return {
                lastViewedIndex: 0,
                selectedIndex: 0,
            };
        }
    }
}
exports.MultistepDialog = MultistepDialog;
function isDialogStepElement(child) {
    return common_1.Utils.isElementOfType(child, dialogStep_1.DialogStep);
}
//# sourceMappingURL=multistepDialog.js.map