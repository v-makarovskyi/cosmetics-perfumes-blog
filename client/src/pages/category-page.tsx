import { FC, Fragment } from "react";
import cat_img from "@images/test-category/category_image.jpg";
import { BlogGridArea } from "@src/components/blog-grid/blog-grid-area";
import { CommonBreadcrumb } from "@src/components/breadcrumb/common-breadcrumb";

const testCategory = {
  id: 1,
  main_image: cat_img,
  description:
    "Бʼюті-новинки, які завжди стануть вам у пригоді. Купуйте сьогодні та починайте користуватися вже від завтра!",
  title: "Trends",
  slug: "trends",
};

export const CategoryPage: FC = (): JSX.Element => {
  return (
    <Fragment>
        <CommonBreadcrumb center title="trends" subtitle="trends" />
      <section className="single-category">
        <div className="single-category__top">
          <div className="single-category__top-wrapper">
            <div className="single-category__image-container">
              <a href="/">
                <img src={testCategory.main_image} alt="" />
              </a>
            </div>
            <div className="single-category__description">
              <span>{testCategory.title}</span>
              <h3>{testCategory.description}</h3>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </section>
      <BlogGridArea />
    </Fragment>
  );
};
