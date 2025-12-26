import React, { FC, useState } from "react";
import AsyncSelect from "react-select/async";
import store from "@src/redux/store";
import { Controller } from "react-hook-form";
import { categoryApi } from "@src/redux/features";
import { tagApi } from "@src/redux/features";
import { authorApi } from "@src/redux/features";

interface CategorySelect {
  label: string;
  value: string;
}

type SelectProps = {
  form: string;
  control: any;
 /*  defaultValue?:
    | { label: string; value: string }
    | { label: string; value: string }[]
    | string; */
  name: string;
  placeholder: string;
};

const loadCategoryOptions = async (input: string, cb: Function) => {
  const categories = await store
    .dispatch(categoryApi.endpoints.getAllCategories.initiate())
    .unwrap();
  return categories.map((cat) => ({ label: cat.name, value: cat.id }));
};

const loadAuthorOptions = async (input: string, cb: Function) => {
  const authors = await store
    .dispatch(authorApi.endpoints.getAllAuthors.initiate())
    .unwrap();
  return authors.map((author) => ({
    label: `${author.first_name} ${author.last_name}`,
    value: author.id,
  }));
};

const loadTagOptions = (input: string, cb: Function) => {
  const tags = store.dispatch(tagApi.endpoints.getAllTags.initiate()).unwrap();
  return tags.then((data) => {
    return data.map((t) => ({ label: t.name, value: t.id }));
  });
};

const CustomAsyncSelect: FC<SelectProps> = ({
  name,
  control,
  form,
  /* defaultValue, */
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        //console.log("f", field);
        return (
          <AsyncSelect
            {...field}
            form={form}
            cacheOptions
            defaultOptions
            isClearable
            isSearchable
            placeholder={placeholder}
            isMulti={name === "tags"}
            loadOptions={
              name === "category"
                ? loadCategoryOptions
                : name === "author"
                ? loadAuthorOptions
                : loadTagOptions
            }
            /* onChange={(selectedOption) => field.onChange(selectedOption)} */
            value={field.value}
            defaultValue
            autoFocus
            blurInputOnSelect
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "orange",
                primary25: "lightGrey",
              },
            })}
          />
        );
      }}
    />
  );
};

export { CustomAsyncSelect };

/* styles={{
  container: (styles, state) => ({
      ...styles, width: '50%',
      outline: state.isFocused ? '3px solid teal' : '',
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    width: "100%",
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: "10px",
    color: "blue",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    width: "100%",
    backgroundColor: "orange",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    console.log(styles);
    return {
      ...styles,
      border: "3px solid white",
      backgroundColor: isFocused ? "red" : "blue",
      color: "#FFF",
      cursor: isDisabled ? "not-allowed" : "default",
      transition: "all .6s easy",
    };
  },
}} */
