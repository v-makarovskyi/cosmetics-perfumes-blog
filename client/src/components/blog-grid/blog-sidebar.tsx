import React, { FC } from "react";
import { SearchForm } from "../forms/search-form";
import {
  BlogSidebarCats,
  BlogSidebarLatest,
  BlogSidebarTags,
} from "./blog-sidebar-items";
import { BlogSidebarAuthor } from "./blog-sidebar-items/blog-sidebar-author";

type BlogSidebarProps = {
  blogSinglePage?: boolean;
};

export const BlogSidebar: FC<BlogSidebarProps> = ({
  blogSinglePage,
}): JSX.Element => {
  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar__wrapper">
        <div className="blog-sidebar__widget widget-search">
          <div className="blog-sidebar__search">
            <SearchForm placeholder="Search..." />
          </div>
        </div>

        <BlogSidebarCats />
        {blogSinglePage && <BlogSidebarAuthor />}
        <BlogSidebarLatest />
        <BlogSidebarTags />
      </div>
    </div>
  );
};
