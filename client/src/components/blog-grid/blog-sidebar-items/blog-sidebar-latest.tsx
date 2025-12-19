import { FC } from "react";
import type { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router";


export const BlogSidebarLatest: FC = (): JSX.Element => {

  const { blogsDataForSidebar } = useSelector(
    (state: RootState) => state.blogsDataForParts
  );

  return (
    <div className="blog-sidebar__widget widget-latest">
      <h4 className="blog-sidebar__widget-title">Последние записи</h4>
      <div className="blog-sidebar__widget-content">
        <ul className="blog-sidebar__widget-list">
          {blogsDataForSidebar?.map((blog) => (
            <li key={blog.id} className="blog-sidebar__widget-item">
              <div className="blog-sidebar__widget-latest">
                <div className="blog-sidebar__widget-latest-img-container">
                  <a href="/">
                    <img src={blog.main_image} alt="image blog sidebar" />
                  </a>
                </div>
                <div className="blog-sidebar__widget-latest-content">
                  <div className="blog-sidebar__widget-latest-meta">
                    <span>{blog.created_at_for_client}</span>
                  </div>
                  <Link
                    to={`blogs/${blog.category?.slug}/blog-detail/${blog.slug}`}
                  >
                    <h5 className="blog-sidebar__widget-latest-title">
                      {blog.title.slice(0, 21)}...
                    </h5>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
