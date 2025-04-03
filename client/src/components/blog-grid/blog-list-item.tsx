import React, { FC } from "react";
import { BlogData } from "src/data/blog-data";
import { Date } from "@svg/date";
import { Comment } from "@svg/comment";
import { ArrowRightLong } from "@svg/arrow-right-long";

type BlogListItemProps = {
  blog: BlogData;
};

export const BlogListItem: FC<BlogListItemProps> = ({ blog }): JSX.Element => {
  const { id, title, description_sm, image, date, comments } = blog;

  return (
    <>
      <div className="blog-list-item d-md-flex d-lg-block d-xl-flex">
        <div className="blog-list-item__image-container">
          <a href="#">
            <img src={image} alt="blog-list-item-image" />
          </a>
        </div>
        <div className="blog-list-item__content">
          <div className="blog-list-item__meta">
            <span>
              <span>
                <Date />
              </span>{" "}
              {date}
            </span>
            <span>
              <span>
                <Comment />
              </span>{" "}
              Comments: {" "} {comments}
            </span>
          </div>
          <h4 className="blog-list-item__title">{title}</h4>
          <p className="blog-list-item__description">
            {description_sm.slice(0, 71)}...
          </p>
          <button className="blog-list-item__btn button">
            <a href="/">
              Read more
              <span>
                <ArrowRightLong />
              </span>
            </a>
          </button>
        </div>
      </div>
    </>
  );
};
