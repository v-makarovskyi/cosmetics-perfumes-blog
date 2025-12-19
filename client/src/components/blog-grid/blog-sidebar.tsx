import React, { FC, useEffect } from "react";
import { SearchForm } from "../forms/search-form";
import {
  BlogSidebarCats,
  BlogSidebarLatest,
  BlogSidebarTags,
  BlogSidebarAuthor
} from "./blog-sidebar-items";

import type { Author, Blog } from "@client_types/clientTypes";

type BlogSidebarProps = {
  blogSinglePage?: boolean;
  author?: Partial<Author>
};

export const BlogSidebar: FC<BlogSidebarProps> = ({
  blogSinglePage,
  author,
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
        {blogSinglePage && <BlogSidebarAuthor author={author} />} 
        <BlogSidebarLatest />
        <BlogSidebarTags />
      </div>
    </div>
  );
};
