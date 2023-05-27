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
exports.FilmSelect = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var core_1 = require("@blueprintjs/core");
var popover2_1 = require("@blueprintjs/popover2");
var select2_1 = require("../components/select/select2");
var films_1 = require("./films");
function FilmSelect(_a) {
    var _b = _a.allowCreate, allowCreate = _b === void 0 ? false : _b, fill = _a.fill, restProps = tslib_1.__rest(_a, ["allowCreate", "fill"]);
    var _c = React.useState(tslib_1.__spreadArray([], films_1.TOP_100_FILMS, true)), items = _c[0], setItems = _c[1];
    var _d = React.useState([]), createdItems = _d[0], setCreatedItems = _d[1];
    var _e = React.useState(films_1.TOP_100_FILMS[0]), selectedFilm = _e[0], setSelectedFilm = _e[1];
    var handleItemSelect = React.useCallback(function (newFilm) {
        // Delete the old film from the list if it was newly created.
        var step1Result = (0, films_1.maybeDeleteCreatedFilmFromArrays)(items, createdItems, selectedFilm);
        // Add the new film to the list if it is newly created.
        var step2Result = (0, films_1.maybeAddCreatedFilmToArrays)(step1Result.items, step1Result.createdItems, newFilm);
        setCreatedItems(step2Result.createdItems);
        setSelectedFilm(newFilm);
        setItems(step2Result.items);
    }, []);
    var itemRenderer = React.useCallback(function (film, props) {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }
        return React.createElement(popover2_1.MenuItem2, tslib_1.__assign({}, (0, films_1.getFilmItemProps)(film, props), { selected: film === selectedFilm }));
    }, [selectedFilm]);
    return (React.createElement(select2_1.Select2, tslib_1.__assign({ createNewItemFromQuery: allowCreate ? films_1.createFilm : undefined, createNewItemRenderer: allowCreate ? films_1.renderCreateFilmMenuItem : undefined, fill: fill, itemPredicate: films_1.filterFilm, itemRenderer: itemRenderer, items: items, itemsEqual: films_1.areFilmsEqual, menuProps: { "aria-label": "films" }, noResults: React.createElement(popover2_1.MenuItem2, { disabled: true, text: "No results.", roleStructure: "listoption" }), onItemSelect: handleItemSelect }, restProps),
        React.createElement(core_1.Button, { disabled: restProps.disabled, fill: fill, icon: "film", rightIcon: "caret-down", text: selectedFilm ? "".concat(selectedFilm.title, " (").concat(selectedFilm.year, ")") : "(No selection)" })));
}
exports.FilmSelect = FilmSelect;
//# sourceMappingURL=filmSelect.js.map