"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = exports.Expander = void 0;
const tslib_1 = require("tslib");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const common_1 = require("../../common");
const props_1 = require("../../common/props");
const Utils = tslib_1.__importStar(require("../../common/utils"));
const tab_1 = require("./tab");
const tabTitle_1 = require("./tabTitle");
const Expander = () => React.createElement("div", { className: common_1.Classes.FLEX_EXPANDER });
exports.Expander = Expander;
const TAB_SELECTOR = `.${common_1.Classes.TAB}`;
class Tabs extends common_1.AbstractPureComponent2 {
    static Expander = exports.Expander;
    static Tab = tab_1.Tab;
    static defaultProps = {
        animate: true,
        fill: false,
        large: false,
        renderActiveTabPanelOnly: false,
        vertical: false,
    };
    static displayName = `${props_1.DISPLAYNAME_PREFIX}.Tabs`;
    static getDerivedStateFromProps({ selectedTabId }) {
        if (selectedTabId !== undefined) {
            return { selectedTabId };
        }
        return null;
    }
    tablistElement = null;
    refHandlers = {
        tablist: (tabElement) => (this.tablistElement = tabElement),
    };
    constructor(props) {
        super(props);
        const selectedTabId = this.getInitialSelectedTabId();
        this.state = { selectedTabId };
    }
    render() {
        const { indicatorWrapperStyle, selectedTabId } = this.state;
        const tabTitles = React.Children.map(this.props.children, this.renderTabTitle);
        const tabPanels = this.getTabChildren()
            .filter(this.props.renderActiveTabPanelOnly ? tab => tab.props.id === selectedTabId : () => true)
            .map(this.renderTabPanel);
        const tabIndicator = this.props.animate ? (React.createElement("div", { className: common_1.Classes.TAB_INDICATOR_WRAPPER, style: indicatorWrapperStyle },
            React.createElement("div", { className: common_1.Classes.TAB_INDICATOR }))) : null;
        const classes = (0, classnames_1.default)(common_1.Classes.TABS, this.props.className, {
            [common_1.Classes.VERTICAL]: this.props.vertical,
            [common_1.Classes.FILL]: this.props.fill,
        });
        const tabListClasses = (0, classnames_1.default)(common_1.Classes.TAB_LIST, {
            [common_1.Classes.LARGE]: this.props.large,
        });
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: tabListClasses, onKeyDown: this.handleKeyDown, onKeyPress: this.handleKeyPress, ref: this.refHandlers.tablist, role: "tablist" },
                tabIndicator,
                tabTitles),
            tabPanels));
    }
    componentDidMount() {
        this.moveSelectionIndicator(false);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedTabId !== prevState.selectedTabId) {
            this.moveSelectionIndicator();
        }
        else if (prevState.selectedTabId != null) {
            const didChildrenChange = !Utils.arraysEqual(this.getTabChildrenProps(prevProps), this.getTabChildrenProps(), Utils.shallowCompareKeys);
            if (didChildrenChange) {
                this.moveSelectionIndicator();
            }
        }
    }
    getInitialSelectedTabId() {
        const { defaultSelectedTabId, selectedTabId } = this.props;
        if (selectedTabId !== undefined) {
            return selectedTabId;
        }
        else if (defaultSelectedTabId !== undefined) {
            return defaultSelectedTabId;
        }
        else {
            const tabs = this.getTabChildren();
            return tabs.length === 0 ? undefined : tabs[0].props.id;
        }
    }
    getKeyCodeDirection(e) {
        if (isEventKeyCode(e, common_1.Keys.ARROW_LEFT, common_1.Keys.ARROW_UP)) {
            return -1;
        }
        else if (isEventKeyCode(e, common_1.Keys.ARROW_RIGHT, common_1.Keys.ARROW_DOWN)) {
            return 1;
        }
        return undefined;
    }
    getTabChildrenProps(props = this.props) {
        return this.getTabChildren(props).map(child => child.props);
    }
    getTabChildren(props = this.props) {
        return React.Children.toArray(props.children).filter(isTabElement);
    }
    getTabElements(subselector = "") {
        if (this.tablistElement == null) {
            return [];
        }
        return Array.from(this.tablistElement.querySelectorAll(TAB_SELECTOR + subselector));
    }
    handleKeyDown = (e) => {
        const focusedElement = Utils.getActiveElement(this.tablistElement)?.closest(TAB_SELECTOR);
        if (focusedElement == null) {
            return;
        }
        const enabledTabElements = this.getTabElements().filter(el => el.getAttribute("aria-disabled") === "false");
        const focusedIndex = enabledTabElements.indexOf(focusedElement);
        const direction = this.getKeyCodeDirection(e);
        if (focusedIndex >= 0 && direction !== undefined) {
            e.preventDefault();
            const { length } = enabledTabElements;
            const nextFocusedIndex = (focusedIndex + direction + length) % length;
            enabledTabElements[nextFocusedIndex].focus();
        }
    };
    handleKeyPress = (e) => {
        const targetTabElement = e.target.closest(TAB_SELECTOR);
        if (targetTabElement != null && common_1.Keys.isKeyboardClick(e.which)) {
            e.preventDefault();
            targetTabElement.click();
        }
    };
    handleTabClick = (newTabId, event) => {
        this.props.onChange?.(newTabId, this.state.selectedTabId, event);
        if (this.props.selectedTabId === undefined) {
            this.setState({ selectedTabId: newTabId });
        }
    };
    moveSelectionIndicator(animate = true) {
        if (this.tablistElement == null || !this.props.animate) {
            return;
        }
        const tabIdSelector = `${TAB_SELECTOR}[data-tab-id="${this.state.selectedTabId}"]`;
        const selectedTabElement = this.tablistElement.querySelector(tabIdSelector);
        let indicatorWrapperStyle = { display: "none" };
        if (selectedTabElement != null) {
            const { clientHeight, clientWidth, offsetLeft, offsetTop } = selectedTabElement;
            indicatorWrapperStyle = {
                height: clientHeight,
                transform: `translateX(${Math.floor(offsetLeft)}px) translateY(${Math.floor(offsetTop)}px)`,
                width: clientWidth,
            };
            if (!animate) {
                indicatorWrapperStyle.transition = "none";
            }
        }
        this.setState({ indicatorWrapperStyle });
    }
    renderTabPanel = (tab) => {
        const { className, panel, id, panelClassName } = tab.props;
        if (panel === undefined) {
            return undefined;
        }
        return (React.createElement("div", { "aria-labelledby": (0, tabTitle_1.generateTabTitleId)(this.props.id, id), "aria-hidden": id !== this.state.selectedTabId, className: (0, classnames_1.default)(common_1.Classes.TAB_PANEL, className, panelClassName), id: (0, tabTitle_1.generateTabPanelId)(this.props.id, id), key: id, role: "tabpanel" }, panel));
    };
    renderTabTitle = (child) => {
        if (isTabElement(child)) {
            const { id } = child.props;
            return (React.createElement(tabTitle_1.TabTitle, { ...child.props, parentId: this.props.id, onClick: this.handleTabClick, selected: id === this.state.selectedTabId }));
        }
        return child;
    };
}
exports.Tabs = Tabs;
function isEventKeyCode(e, ...codes) {
    return codes.indexOf(e.which) >= 0;
}
function isTabElement(child) {
    return Utils.isElementOfType(child, tab_1.Tab);
}
//# sourceMappingURL=tabs.js.map