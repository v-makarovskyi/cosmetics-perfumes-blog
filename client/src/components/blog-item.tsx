import React, { FC } from "react";
import { Blog } from "@src/layout/header/header-parts/menus";
import { Tags } from "@svg/tags";
import { Date } from "@svg/date";
import { Comment } from "@svg/comment";
import { ArrowRightLong } from "@svg/arrow-right-long";

type BlogItemProps = {
  blog: Blog;
  blogGridItem?: boolean;
  blogMenusItem?: boolean;
  blogListItem?: boolean;
};

export const BlogItem: FC<BlogItemProps> = ({
  blog,
  blogMenusItem = false,
  blogGridItem = false,
  blogListItem = false,
}): JSX.Element => {
  const { id, title, image, date, description_sm, comments, tags } = blog || {};

  return (
    <div
      className={`blog-item ${
        blogMenusItem
          ? "blog-item__menus"
          : blogGridItem
          ? "blog-item__grid"
          : blogListItem
          ? "blog-item__list"
          : ""
      }`}
    >
      <div className="blog-item__top">
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

        {blogGridItem || blogMenusItem ? (
          <div className="blog-item__body">
            <div className="blog-item__date">
              <span>
                <Date />
              </span>
              {date}
            </div>

            {blogGridItem ? (
              <div className="blog-item__comments">
                <span>
                  <Comment />
                </span>
                Comments: {comments}
              </div>
            ) : null}

            {blogMenusItem ? (
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
            ) : null}
          </div>
        ) : null}
      </div>
      {blogMenusItem ? (
        <h2 className="blog-item__title h4">{title}</h2>
      ) : null}

      {blogGridItem || blogListItem ? (
        <div className="blog-item__content">
          {blogListItem ? (
            <div className="blog-item__body">
              <div className="blog-item__date">
                <span>
                  <Date />
                </span>
                {date}
              </div>

              {blogGridItem || blogListItem ? (
                <div className="blog-item__comments">
                  <span>
                    <Comment />
                  </span>
                  Comments: {comments}
                </div>
              ) : null}
            </div>
          ) : null}
          <h2 className="blog-item__title h4">{blogListItem ? title : title.slice(0,41)+`...`}</h2>
          <p className="blog-item__description">
            {blogListItem ? description_sm.slice(0, 121) : description_sm.slice(0,71)+`...`}
          </p>
          <button className="blog-item__btn button">
            Read more
            <span>
              <ArrowRightLong />
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
};
