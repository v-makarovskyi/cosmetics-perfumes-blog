import React, { FC } from "react";
import { blog_data } from "@src/data/blog-data";
import { BlogData } from "@src/data/blog-data";

export const BlogSidebarLatest: FC = ():JSX.Element => {
    return (
        <>
      <h3 className="blog-sidebar__title">Новое в блоге</h3>
      <div className="blog-sidebar__item-content blog-sidebar__latest-content">
        <div className="blog-sidebar__latest-wrapper">
            {
                blog_data.map((blog) => (
                    <div key={blog.id} className="blog-sidebar__latest-item d-flex align-items-center">
                        <div className="blog-sidebar__latest-item-img-container">
                            <a href="#">
                                <img src={blog.image} alt="blog-image" />
                            </a>
                        </div>
                        <div className="blog-sidebar__latest-item-content">
                            <div className="blog-sidebar__latest-item-meta">
                                <span>{blog.date}</span>
                            </div>
                            <h4 className="blog-sidebar__latest-item-title">{blog.title.slice(0,30)}...</h4>
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </>
    )
}