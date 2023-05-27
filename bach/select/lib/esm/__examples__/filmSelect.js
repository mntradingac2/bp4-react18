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
import { __assign, __rest, __spreadArray } from "tslib";
import * as React from "react";
import { Button } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { Select2 } from "../components/select/select2";
import { areFilmsEqual, createFilm, filterFilm, getFilmItemProps, maybeAddCreatedFilmToArrays, maybeDeleteCreatedFilmFromArrays, renderCreateFilmMenuItem, TOP_100_FILMS, } from "./films";
export function FilmSelect(_a) {
    var _b = _a.allowCreate, allowCreate = _b === void 0 ? false : _b, fill = _a.fill, restProps = __rest(_a, ["allowCreate", "fill"]);
    var _c = React.useState(__spreadArray([], TOP_100_FILMS, true)), items = _c[0], setItems = _c[1];
    var _d = React.useState([]), createdItems = _d[0], setCreatedItems = _d[1];
    var _e = React.useState(TOP_100_FILMS[0]), selectedFilm = _e[0], setSelectedFilm = _e[1];
    var handleItemSelect = React.useCallback(function (newFilm) {
        // Delete the old film from the list if it was newly created.
        var step1Result = maybeDeleteCreatedFilmFromArrays(items, createdItems, selectedFilm);
        // Add the new film to the list if it is newly created.
        var step2Result = maybeAddCreatedFilmToArrays(step1Result.items, step1Result.createdItems, newFilm);
        setCreatedItems(step2Result.createdItems);
        setSelectedFilm(newFilm);
        setItems(step2Result.items);
    }, []);
    var itemRenderer = React.useCallback(function (film, props) {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }
        return React.createElement(MenuItem2, __assign({}, getFilmItemProps(film, props), { selected: film === selectedFilm }));
    }, [selectedFilm]);
    return (React.createElement(Select2, __assign({ createNewItemFromQuery: allowCreate ? createFilm : undefined, createNewItemRenderer: allowCreate ? renderCreateFilmMenuItem : undefined, fill: fill, itemPredicate: filterFilm, itemRenderer: itemRenderer, items: items, itemsEqual: areFilmsEqual, menuProps: { "aria-label": "films" }, noResults: React.createElement(MenuItem2, { disabled: true, text: "No results.", roleStructure: "listoption" }), onItemSelect: handleItemSelect }, restProps),
        React.createElement(Button, { disabled: restProps.disabled, fill: fill, icon: "film", rightIcon: "caret-down", text: selectedFilm ? "".concat(selectedFilm.title, " (").concat(selectedFilm.year, ")") : "(No selection)" })));
}
//# sourceMappingURL=filmSelect.js.map