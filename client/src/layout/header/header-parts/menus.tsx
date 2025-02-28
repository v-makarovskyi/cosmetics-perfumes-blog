import React, { FC, useState } from "react";
import { BlogItem } from "../../../components/blog-item";
import { menu_data } from "../../../data/menu-data";
import { blog_data } from "../../../data/blog-data";

export type Blog = {
  id: number;
  image: string;
  date: string;
  author: string;
  title: string;
  tags: string[];
  category: string;
  comments: number;
  description_sm: string;
  blog: string;
};

export const Menus: FC = (): JSX.Element => {
  const blogs: Blog[] = blog_data.filter((b) => b.blog === "cosmetics");

  return (
    <ul className="menus__list">
      {menu_data.map((menu) =>
        menu.home ? (
          <li
            key={menu.id}
            className="menus__item menus__home menus__has-dropdown menus__has-bigmenu"
          >
            <a className="menus__title" href={menu.link}>
              {menu.title}
            </a>
            <div className="menus__submenu menus__bigmenu">
              <div className="row">
                {blogs.map((blog) => (
                  <div key={blog.id}  className="col-xl-4">
                    <BlogItem blog={blog} />
                  </div>
                ))}
              </div>
            </div>
          </li>
        ) : menu.sub_menu ? (
          <li key={menu.id} className="menus__item menus__has-dropdown">
            <a className="menus__title" href={menu.link}>
              {menu.title}
            </a>
            <ul className="menus__submenu">
              {menu.sub_menus.map((submenu, idx) => (
                <li key={idx}>
                  <a href={submenu.link}>{submenu.title}</a>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li className="menus__item" key={menu.id}>
            <a className="menus__title" href={menu.link}>
              {menu.title}
            </a>
          </li>
        )
      )}
    </ul>
  );
};
