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
    <section className="single-category-page">
      <CommonBreadcrumb center title="trends" subtitle="trends" />
      <section className="single-category-page__wrapper">
        <div className="single-category-page__top">
          <div className="single-category-page__top-wrapper">
            <div className="single-category-page__image-container">
              <a href="/">
                <img src={testCategory.main_image} alt="" />
              </a>
            </div>
            <div className="single-category-page__description">
              <span>{testCategory.title}</span>
              <h3>{testCategory.description}</h3>
            </div>
          </div>
        </div>
      </section>
      <BlogGridArea />
    </section>
  );
};
