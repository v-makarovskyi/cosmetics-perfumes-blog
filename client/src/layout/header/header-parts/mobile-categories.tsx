import React, { FC, Dispatch, SetStateAction } from "react";
import { Link } from "react-router";
import { useGetAllCategoriesQuery } from "@src/redux/features/categoryApi";

const MobileCategories: FC<{
  isCategoryActive: boolean;
  setIsCategoryActive: Dispatch<SetStateAction<boolean>>;
}> = ({ isCategoryActive, setIsCategoryActive }): JSX.Element => {
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();
  return (
    <ul className={isCategoryActive ? "active" : ""}>
      {categories?.map((cat) => (
        <li key={cat.id}>
          <Link to={`/categories/${cat.slug}`}>{cat.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export { MobileCategories };
