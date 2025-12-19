import { FC } from "react";
import type { Author } from "@client_types/clientTypes";

type BlogSidebarAuthorProps = {
  author: Partial<Author> | undefined
}

export const BlogSidebarAuthor: FC<
  BlogSidebarAuthorProps
> = ({author}): JSX.Element => {
  return (
    <div className="blog-sidebar__widget author-widget">
      <h4 className="blog-sidebar__widget-title">Автор</h4>
      <div className="blog-sidebar__widget-content">
        <div className="author-widget__wrapper">
          <div className="author-widget__img-container">
            <a href="/">
              <img src={author?.image_url} alt="author image" />
            </a>
          </div>
          <p className="author-widget__name">
            {author?.first_name} {author?.last_name}
          </p>
          <span className="author-widget__professional">{author?.profession}</span>
          <p className="author-widget__description">
            Lorem ligula eget dolor. Aenean massa. Cum sociis que penatibus
            magnis dis parturient
          </p>
        </div>  
      </div>
    </div>
  );
};
