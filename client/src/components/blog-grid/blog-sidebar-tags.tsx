import React, { FC } from "react";

export const BlogSidebarTags: FC = (): JSX.Element => {
  return (
    <>
      <h3 className="blog-sidebar__title">Популярные tags</h3>
      <div className="blog-sidebar__item-content blog-sidebar__tags-content">
        <a href="#">Парфюмерия</a>
        <a href="#">Советы</a>
        <a href="#">Помада</a>
        <a href="#">Макияж</a>
        <a href="#">Тренды</a>
        <a href="#">Get the look</a>
        <a href="">Лайфхак</a>
        <a href="">Шампунь</a>
        <a href="">Мастер-класс</a>
      </div>
    </>
  );
};


