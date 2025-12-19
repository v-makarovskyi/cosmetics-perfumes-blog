import React, { FC, useEffect, useState } from "react";
import { Search } from "@svg/search";
import * as YUP from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDebounce } from "@src/hooks/useDebounce";

export type SearchFormProps = {
  placeholder?: string;
  onSearchDataHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchForm: FC<SearchFormProps> = ({
  placeholder,
}): JSX.Element => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<string>("");

  const searchDataDebounce = useDebounce(searchData, 2000);

  useEffect(() => {
    if (searchDataDebounce && searchDataDebounce !== "") {
      navigate(`/blogs/search/${searchDataDebounce}`);
      setSearchData('')
    }
  }, [searchDataDebounce]);

  return (
    <form className="search__form">
      <input
        onChange={(e) => {
          setSearchData(e.target.value);
        }}
        value={searchData}
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
