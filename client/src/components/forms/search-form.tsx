import React, { FC } from "react";
import { Search } from "@svg/search";

export type SearchFormProps = {
    placeholder?: string
}

export const SearchForm: FC<SearchFormProps> = ({ placeholder }): JSX.Element => {
  return (
    <form className="search__form">
      <input
        className="search__input input"
        type="text"
        placeholder={`${placeholder}...`}
      />
      <button className="search__button button" type="submit">
        <Search />
      </button>
    </form>
  );
};
