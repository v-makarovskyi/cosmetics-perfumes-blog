import React, { FC } from "react";
import { SearchForm } from "../forms/search-form";
import { BlogSidebarLatest } from "./blog-sidebar-latest";
import { BlogSidebarCategories } from "./blog-sidebar-categories";
import { BlogSidebarTags } from "./blog-sidebar-tags";

export const BlogSidebar: FC = (): JSX.Element => {
  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar__wrapper">
        <div className="blog-sidebar__item">
          <div className="blog-sidebar__search">
            <SearchForm placeholder="Search..." />
          </div>
        </div>
        <div className="blog-sidebar__item">
          <div className="blog-sidebar__categories">
            <BlogSidebarCategories />
          </div>
        </div>
        <div className="blog-sidebar__item">
          <div className="blog-sidebar__latest">
            <BlogSidebarLatest />
          </div>
        </div>
        <div className="blog-sidebar__item">
          <div className="blog-sidebar__latest">
            <BlogSidebarTags />
          </div>
        </div>
      </div>
    </div>
  );
};
