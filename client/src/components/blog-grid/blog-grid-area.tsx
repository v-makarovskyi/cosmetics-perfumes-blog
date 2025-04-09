import { FC, useState } from "react";
import { BlogSidebar } from "./blog-sidebar";
import { ListTab } from "@src/svg/list-tab";
import { GridTab } from "@src/svg/grid-tab";
import { blog_data } from "@src/data/blog-data";
import { BlogData } from "@src/data/blog-data";
import { BlogItem } from "./blog-item";
import { Pagination } from "../pagination";

type BlogGridAreaProps = {
  list_area?: boolean;
};

export const BlogGridArea: FC<BlogGridAreaProps> = ({
  list_area = false,
}): JSX.Element => {
  const filteredData: BlogData[] = blog_data.filter(
    (blog) => blog.blog === "cosmetics"
  );

  const [pageStar, setPageStart] = useState<number>(0);
  const [countOgPage, setCountOfPage] = useState<number>(3);

  return (
    <section className="blog-grid-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-xl-9">
            <div className="blog-grid-area__wrapper">
              <div className="blog-grid-area__top d-flex justify-content-between">
                <div className="blog-grid-area__top-result">
                  <p>Предоставлено 1-6 из 21 результатов</p>
                </div>
                <div className="blog-grid-area__top-tab tab">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tabs" role="tablist">
                      <button
                        className={`nav-link ${list_area ? "" : "active"}`}
                        id="nav-grid-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-grid"
                        type="button"
                        role="tab"
                        aria-controls="nav-grid"
                        aria-selected="true"
                      >
                        <GridTab />
                      </button>
                      <button
                        className={`nav-link ${list_area ? "acive" : ""}`}
                        id="nav-list-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-list"
                        type="button"
                        role="tab"
                        aria-controls="nav-list"
                        aria-selected="false"
                      >
                        <ListTab />
                      </button>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="tab-content" id="nav-tabContent">
                <div
                  className={`tab-pane fade ${list_area ? "" : "show active"}`}
                  role="tabpanel"
                  id="nav-grid"
                  aria-labelledby="nav-grid-tab"
                  tabIndex={0}
                >
                  <div className="blog-grid-area__grid-item-wrapper">
                    <div className="row" style={{ rowGap: 20 }}>
                      {filteredData.map((blog) => {
                        return (
                          <div key={blog.id} className="col-md-6 col-lg-6">
                            <BlogItem blog={blog} blogGridItem />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${list_area ? "show active" : ""}`}
                  role="tabpanel"
                  id="nav-list"
                  aria-labelledby="nav-list-tab"
                  tabIndex={0}
                >
                  <div className="blog-grid-area__list-item-wrapper">
                    {filteredData.map((blog) => {
                      return (
                        <BlogItem key={blog.id} blog={blog} blogListItem />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Pagination />
          </div>

          <div className="col-lg-4 col-xl-3">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};
