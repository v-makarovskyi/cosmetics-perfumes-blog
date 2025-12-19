import React, { FC, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router";
import { BlogItem } from "@src/components/blog-grid/blog-item";
import { menu_data } from "@src/data/menu-data";
import { useSelector } from "react-redux";
import type { RootState } from "@src/redux/store";
import type { Blog } from "@client_types/clientTypes";

type MenusProps = {
  onHandleAddBlogToWishlist: (
    slug: Blog["slug"]
  ) => Promise<void>;
  onHandleDeleteBlogFromWishlist: (
    slug: Blog["slug"]
  ) => Promise<void>;
};

export const Menus: FC<MenusProps> = ({
  onHandleAddBlogToWishlist,
  onHandleDeleteBlogFromWishlist,
}): JSX.Element => {
  const { blogsDataForHeader } = useSelector(
    (state: RootState) => state.blogsDataForParts
  );

  return (
    <ul className="menus__list">
      {menu_data.map((menu) =>
        menu.home ? (
          <li
            key={menu.id}
            className="menus__item menus__home menus__has-dropdown menus__has-bigmenu"
          >
            <Link className="menus__title" to={menu.link}>
              {menu.title}
            </Link>
            <div className="menus__submenu menus__bigmenu">
              <div className="row">
                {blogsDataForHeader?.map((blog) => (
                  <div key={blog.id} className="col-xl-4">
                    <BlogItem
                      blog={blog}
                      onHandleAddBlogToWishlist={onHandleAddBlogToWishlist}
                      onHandleDeleteBlogFromWishlist={
                        onHandleDeleteBlogFromWishlist
                      }
                      blogMenusItem
                    />
                  </div>
                ))}
              </div>
            </div>
          </li>
        ) : menu.sub_menu ? (
          <li key={menu.id} className="menus__item menus__has-dropdown">
            <Link className="menus__title" to={`categories/${menu.link}`}>
              {menu.title}
            </Link>
            <ul className="menus__submenu">
              {menu.sub_menus?.map((submenu, idx: number) => (
                <li key={idx}>
                  <Link to={`categories/${menu.link}/${submenu.link}`}>
                    {submenu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li className="menus__item" key={menu.id}>
            <Link className="menus__title" to={`categories/${menu.link}`}>
              {menu.title}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};
