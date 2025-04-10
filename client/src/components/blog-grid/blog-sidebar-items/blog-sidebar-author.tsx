import React, { FC } from "react";
import author_1 from "@images/blog/blog-sm-1.jpg";

export const BlogSidebarAuthor: FC = (): JSX.Element => {
  return (
    <div className="blog-sidebar__widget author-widget">
      <h4 className="blog-sidebar__widget-title">Автор</h4>
      <div className="blog-sidebar__widget-content">
        <div className="author-widget__wrapper">
          <div className="author-widget__img-container">
            <a href="/">
              <img src={author_1} alt="author image" />
            </a>
          </div>
          <p className="author-widget__name">Елена Петрова</p>
          <span className="author-widget__professional">блогер & фотограф</span>
          <p className="author-widget__description">
            Lorem ligula eget dolor. Aenean massa. Cum sociis que penatibus
            magnis dis parturient
          </p>
        </div>
      </div>
    </div>
  );
};
