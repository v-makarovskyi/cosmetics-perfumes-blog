import { FC } from "react";
import { blog_data } from "@src/data/blog-data";

export const BlogSidebarLatest: FC = (): JSX.Element => {
  return (
    <div className="blog-sidebar__widget widget-latest">
      <h4 className="blog-sidebar__widget-title">Последние записи</h4>
      <div className="blog-sidebar__widget-content">
        <ul className="blog-sidebar__widget-list">
          {blog_data.map((blog) => (
            <li key={blog.id} className="blog-sidebar__widget-item">
              <div className="blog-sidebar__widget-latest">
                <div className="blog-sidebar__widget-latest-img-container">
                  <a href="/">
                    <img src={blog.image} alt="image blog sidebar" />
                  </a>
                </div>
                <div className="blog-sidebar__widget-latest-content">
                  <div className="blog-sidebar__widget-latest-meta">
                    <span>{blog.date}</span>
                  </div>
                  <h5 className="blog-sidebar__widget-latest-title">
                    {blog.title.slice(0, 21)}...
                  </h5>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
