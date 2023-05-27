import * as React from "react";
import { MenuItem2Props } from "@blueprintjs/popover2";
import type { ItemPredicate, ItemRenderer, ItemRendererProps } from "../common";
export interface Film {
    /** Title of film. */
    title: string;
    /** Release year. */
    year: number;
    /** IMDb ranking. */
    rank: number;
}
/** Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top */
export declare const TOP_100_FILMS: Film[];
/**
 * Takes the same arguments as `ItemRenderer<Film>`, but returns the common menu item
 * props for that item instead of the rendered element itself. This is useful for implementing
 * custom item renderers.
 */
export declare function getFilmItemProps(film: Film, { handleClick, handleFocus, modifiers, ref, query }: ItemRendererProps): MenuItem2Props & React.Attributes;
/**
 * Simple film item renderer _without_ support for "selected" appearance.
 */
export declare const renderFilm: ItemRenderer<Film>;
/**
 * Renders a menu item to create a single film from a given query string.
 */
export declare const renderCreateFilmMenuItem: (query: string, active: boolean, handleClick: React.MouseEventHandler<HTMLElement>) => JSX.Element;
/**
 * Renders a menu item to create one or more films from a given query string.
 */
export declare const renderCreateFilmsMenuItem: (query: string, active: boolean, handleClick: React.MouseEventHandler<HTMLElement>) => JSX.Element;
export declare const filterFilm: ItemPredicate<Film>;
export declare function createFilm(title: string): Film;
export declare function createFilms(query: string): Film[];
export declare function areFilmsEqual(filmA: Film, filmB: Film): boolean;
export declare function doesFilmEqualQuery(film: Film, query: string): boolean;
export declare function arrayContainsFilm(films: Film[], filmToFind: Film): boolean;
export declare function addFilmToArray(films: Film[], filmToAdd: Film): Film[];
export declare function deleteFilmFromArray(films: Film[], filmToDelete: Film): Film[];
export declare function maybeAddCreatedFilmToArrays(items: Film[], createdItems: Film[], film: Film): {
    createdItems: Film[];
    items: Film[];
};
export declare function maybeDeleteCreatedFilmFromArrays(items: Film[], createdItems: Film[], film: Film): {
    createdItems: Film[];
    items: Film[];
};
