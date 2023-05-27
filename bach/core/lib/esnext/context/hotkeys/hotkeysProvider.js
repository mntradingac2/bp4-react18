"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotkeysProvider = exports.HotkeysContext = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const utils_1 = require("../../common/utils");
const hotkeysDialog2_1 = require("../../components/hotkeys/hotkeysDialog2");
const initialHotkeysState = { hasProvider: false, hotkeys: [], isDialogOpen: false };
const noOpDispatch = () => null;
exports.HotkeysContext = React.createContext([initialHotkeysState, noOpDispatch]);
const hotkeysReducer = (state, action) => {
    switch (action.type) {
        case "ADD_HOTKEYS":
            const newUniqueHotkeys = [];
            for (const a of action.payload) {
                let isUnique = true;
                for (const b of state.hotkeys) {
                    isUnique &&= !(0, utils_1.shallowCompareKeys)(a, b, { exclude: ["onKeyDown", "onKeyUp"] });
                }
                if (isUnique) {
                    newUniqueHotkeys.push(a);
                }
            }
            return {
                ...state,
                hotkeys: [...state.hotkeys, ...newUniqueHotkeys],
            };
        case "REMOVE_HOTKEYS":
            return {
                ...state,
                hotkeys: state.hotkeys.filter(key => action.payload.indexOf(key) === -1),
            };
        case "OPEN_DIALOG":
            return { ...state, isDialogOpen: true };
        case "CLOSE_DIALOG":
            return { ...state, isDialogOpen: false };
        default:
            return state;
    }
};
const HotkeysProvider = ({ children, dialogProps, renderDialog, value }) => {
    const hasExistingContext = value != null;
    const [state, dispatch] = value ?? React.useReducer(hotkeysReducer, { ...initialHotkeysState, hasProvider: true });
    const handleDialogClose = React.useCallback(() => dispatch({ type: "CLOSE_DIALOG" }), []);
    const dialog = renderDialog?.(state, { handleDialogClose }) ?? (React.createElement(hotkeysDialog2_1.HotkeysDialog2, { ...dialogProps, isOpen: state.isDialogOpen, hotkeys: state.hotkeys, onClose: handleDialogClose }));
    return (React.createElement(exports.HotkeysContext.Provider, { value: [state, dispatch] },
        children,
        hasExistingContext ? undefined : dialog));
};
exports.HotkeysProvider = HotkeysProvider;
//# sourceMappingURL=hotkeysProvider.js.map