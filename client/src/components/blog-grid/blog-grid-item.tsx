import { FC } from "react";
import { BlogData } from "@src/data/blog-data";
import { ArrowRightLong } from "@svg/arrow-right-long";
import { Comment } from "@svg/comment";
import { Date } from "@svg/date";

type BlogGridItemProps = {
  blog: BlogData;
};

export const BlogGridItem: FC<BlogGridItemProps> = ({ blog }): JSX.Element => {
  const { id, title, image, date, description_sm, comments } = blog || {};
  return (
    <>
      <div className="blog-grid-item">
        <div className="blog-grid-item__image-container">
          <a href="/">
            <img src={image} alt="image-blog" />
          </a>
        </div>
        <div className="blog-grid-item__content">
          <div className="blog-grid-item__meta">
            <span>
              <span>
                <Date />
              </span>{" "}
              Date: {date}
            </span>
            <span>
              <span>
                <Comment />
              </span>{" "}
              Comments:{comments}
            </span>
          </div>
          <h4 className="blog-grid-item__title">{title}</h4>
          <p className="blog-grid-item__description">
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
