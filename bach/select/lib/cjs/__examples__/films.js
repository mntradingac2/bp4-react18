"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
exports.maybeDeleteCreatedFilmFromArrays = exports.maybeAddCreatedFilmToArrays = exports.deleteFilmFromArray = exports.addFilmToArray = exports.arrayContainsFilm = exports.doesFilmEqualQuery = exports.areFilmsEqual = exports.createFilms = exports.createFilm = exports.filterFilm = exports.renderCreateFilmsMenuItem = exports.renderCreateFilmMenuItem = exports.renderFilm = exports.getFilmItemProps = exports.TOP_100_FILMS = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var popover2_1 = require("@blueprintjs/popover2");
/** Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top */
exports.TOP_100_FILMS = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
    { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    { title: "The Lord of the Rings: The Two Towers", year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    { title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", year: 1964 },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
].map(function (f, index) { return (tslib_1.__assign(tslib_1.__assign({}, f), { rank: index + 1 })); });
/**
 * Takes the same arguments as `ItemRenderer<Film>`, but returns the common menu item
 * props for that item instead of the rendered element itself. This is useful for implementing
 * custom item renderers.
 */
function getFilmItemProps(film, _a) {
    var handleClick = _a.handleClick, handleFocus = _a.handleFocus, modifiers = _a.modifiers, ref = _a.ref, query = _a.query;
    return {
        active: modifiers.active,
        disabled: modifiers.disabled,
        elementRef: ref,
        key: film.rank,
        label: film.year.toString(),
        onClick: handleClick,
        onFocus: handleFocus,
        roleStructure: "listoption",
        text: highlightText("".concat(film.rank, ". ").concat(film.title), query),
    };
}
exports.getFilmItemProps = getFilmItemProps;
/**
 * Simple film item renderer _without_ support for "selected" appearance.
 */
var renderFilm = function (film, props) {
    if (!props.modifiers.matchesPredicate) {
        return null;
    }
    return React.createElement(popover2_1.MenuItem2, tslib_1.__assign({}, getFilmItemProps(film, props)));
};
exports.renderFilm = renderFilm;
/**
 * Renders a menu item to create a single film from a given query string.
 */
var renderCreateFilmMenuItem = function (query, active, handleClick) { return (React.createElement(popover2_1.MenuItem2, { icon: "add", text: "Create \"".concat(query, "\""), roleStructure: "listoption", active: active, onClick: handleClick, shouldDismissPopover: false })); };
exports.renderCreateFilmMenuItem = renderCreateFilmMenuItem;
/**
 * Renders a menu item to create one or more films from a given query string.
 */
var renderCreateFilmsMenuItem = function (query, active, handleClick) { return (React.createElement(popover2_1.MenuItem2, { icon: "add", text: "Create ".concat(printReadableList(query)), roleStructure: "listoption", active: active, onClick: handleClick, shouldDismissPopover: false })); };
exports.renderCreateFilmsMenuItem = renderCreateFilmsMenuItem;
/**
 * Given a user-provided list of strings separated by commas, this helper function parses the list and
 * returns a more readable version of it.
 *
 * For example, the input 'a, b, c' becomes '"a", "b", and "c"'.
 */
function printReadableList(query) {
    return query
        .split(", ")
        .map(function (title, index, titles) {
        var separator = index > 0 ? (index === titles.length - 1 ? " and " : ", ") : "";
        return "".concat(separator, "\"").concat(title, "\"");
    })
        .join("");
}
var filterFilm = function (query, film, _index, exactMatch) {
    var normalizedTitle = film.title.toLowerCase();
    var normalizedQuery = query.toLowerCase();
    if (exactMatch) {
        return normalizedTitle === normalizedQuery;
    }
    else {
        return "".concat(film.rank, ". ").concat(normalizedTitle, " ").concat(film.year).indexOf(normalizedQuery) >= 0;
    }
};
exports.filterFilm = filterFilm;
function highlightText(text, query) {
    var lastIndex = 0;
    var words = query
        .split(/\s+/)
        .filter(function (word) { return word.length > 0; })
        .map(escapeRegExpChars);
    if (words.length === 0) {
        return [text];
    }
    var regexp = new RegExp(words.join("|"), "gi");
    var tokens = [];
    while (true) {
        var match = regexp.exec(text);
        if (!match) {
            break;
        }
        var length_1 = match[0].length;
        var before_1 = text.slice(lastIndex, regexp.lastIndex - length_1);
        if (before_1.length > 0) {
            tokens.push(before_1);
        }
        lastIndex = regexp.lastIndex;
        tokens.push(React.createElement("strong", { key: lastIndex }, match[0]));
    }
    var rest = text.slice(lastIndex);
    if (rest.length > 0) {
        tokens.push(rest);
    }
    return tokens;
}
function escapeRegExpChars(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function createFilm(title) {
    return {
        rank: 100 + Math.floor(Math.random() * 100 + 1),
        title: title,
        year: new Date().getFullYear(),
    };
}
exports.createFilm = createFilm;
function createFilms(query) {
    var titles = query.split(", ");
    return titles.map(function (title, index) { return ({
        rank: 100 + Math.floor(Math.random() * 100 + index),
        title: title,
        year: new Date().getFullYear(),
    }); });
}
exports.createFilms = createFilms;
function areFilmsEqual(filmA, filmB) {
    // Compare only the titles (ignoring case) just for simplicity.
    return filmA.title.toLowerCase() === filmB.title.toLowerCase();
}
exports.areFilmsEqual = areFilmsEqual;
function doesFilmEqualQuery(film, query) {
    return film.title.toLowerCase() === query.toLowerCase();
}
exports.doesFilmEqualQuery = doesFilmEqualQuery;
function arrayContainsFilm(films, filmToFind) {
    return films.some(function (film) { return film.title === filmToFind.title; });
}
exports.arrayContainsFilm = arrayContainsFilm;
function addFilmToArray(films, filmToAdd) {
    return tslib_1.__spreadArray(tslib_1.__spreadArray([], films, true), [filmToAdd], false);
}
exports.addFilmToArray = addFilmToArray;
function deleteFilmFromArray(films, filmToDelete) {
    return films.filter(function (film) { return film !== filmToDelete; });
}
exports.deleteFilmFromArray = deleteFilmFromArray;
function maybeAddCreatedFilmToArrays(items, createdItems, film) {
    var isNewlyCreatedItem = !arrayContainsFilm(items, film);
    return {
        createdItems: isNewlyCreatedItem ? addFilmToArray(createdItems, film) : createdItems,
        // Add a created film to `items` so that the film can be deselected.
        items: isNewlyCreatedItem ? addFilmToArray(items, film) : items,
    };
}
exports.maybeAddCreatedFilmToArrays = maybeAddCreatedFilmToArrays;
function maybeDeleteCreatedFilmFromArrays(items, createdItems, film) {
    var wasItemCreatedByUser = arrayContainsFilm(createdItems, film);
    // Delete the item if the user manually created it.
    return {
        createdItems: wasItemCreatedByUser ? deleteFilmFromArray(createdItems, film) : createdItems,
        items: wasItemCreatedByUser ? deleteFilmFromArray(items, film) : items,
    };
}
exports.maybeDeleteCreatedFilmFromArrays = maybeDeleteCreatedFilmFromArrays;
//# sourceMappingURL=films.js.map