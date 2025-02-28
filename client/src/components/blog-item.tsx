import React, { FC } from "react";
import { Blog } from "../layout/header/header-parts/menus";
import { Tags } from "../svg/tags";

type BlogItemProps = {
  blog: Blog;
};

export const BlogItem: FC<BlogItemProps> = ({ blog }): JSX.Element => {
  const { id, image, title, date, tags } = blog;

  return (
    <div className="blog-item">
      <header className="blog-item__header">
        <a className="blog-item__link" href="/">
          <img
            className="blog-item__image"
            src={image}
            alt=""
            width="700"
            height="390"
            loading="lazy"
          />
        </a>
        <div className="blog-item__body">
          <div className="blog__item-date">{date}</div>
          <div className="blog-item__tags">
            <span>
              <Tags />
            </span>
            {tags.map((tag, idx) => (
              <a key={idx} href="/">
                {tag}
               {/*  {idx < tags.length - 1 && ","} */}
              </a>
            ))}
          </div>
        </div>
      </header>

      <h2 className="blog-item__title h4">{blog.title}</h2>
    </div>
  );
};
