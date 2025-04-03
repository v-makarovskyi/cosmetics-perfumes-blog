import React, { FC } from "react";

export const BlogSidebarCategories: FC = (): JSX.Element => {
  return (
    <>
      <h3 className="blog-sidebar__title">Категории</h3>
      <div className="blog-sidebar__item-content blog-sidebar__categories-content">
        <ul>
          <li>
            {" "}
            <a href="#">Туториалы</a> <span>(12)</span>
          </li>
          <li>
            {" "}
            <a href="#">Тренды</a> <span>(4)</span>
          </li>
          <li>
            {" "}
            <a href="#">Get the look</a> <span>(13)</span>
          </li>
        </ul>
      </div>
    </>
  );
};
