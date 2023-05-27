/// <reference types="react" />
import { Select2Props } from "../components/select/select2";
import { Film } from "./films";
declare type FilmSelectProps = Omit<Select2Props<Film>, "createNewItemFromQuery" | "createNewItemRenderer" | "itemPredicate" | "itemRenderer" | "items" | "itemsEqual" | "noResults" | "onItemSelect"> & {
    allowCreate?: boolean;
};
export declare function FilmSelect({ allowCreate, fill, ...restProps }: FilmSelectProps): JSX.Element;
export {};
