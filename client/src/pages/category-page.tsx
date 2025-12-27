import { FC, Fragment } from "react";
/* import cat_img from "@images/test-category/category_image.jpg"; */
import { BlogGridArea } from "@components/blog-grid/blog-grid-area";
import { CommonBreadcrumb } from "@components/breadcrumb/common-breadcrumb";
import { Link } from "react-router";
import { useGetSingleCategoryForPageQuery } from "@src/redux/features/categoryApi";
import { useLocation } from "react-router";
import { useOutletContextData } from "@src/layout/root-layout";

export const CategoryPage: FC = (): JSX.Element => {
  const { pathname } = useLocation();
  const locationAttr = pathname.split("/").filter(Boolean);
  const [categorySlug] = [locationAttr[1]];
  const {
    blogsDataPosition: { startPosition, stopPosition },
    setBlogsDataPosition,
    handleAddBlogToWishlist,
    handleDeleteBlogFromWishlist,
  } = useOutletContextData();

  const { data } = useGetSingleCategoryForPageQuery({
    categorySlug,
    startPosition,
    stopPosition,
  });

  return (
    <section className="single-category-page">
      <CommonBreadcrumb
        center
        title={data?.category.name}
        subtitle={data?.category.name}
      />
      <section className="single-category-page__wrapper">
        <div className="single-category-page__top">
          <div className="single-category-page__top-wrapper">
            <div className="single-category-page__image-container">
              <img
                src={data?.category.category_image}
                width={1280}
                height={700}
                alt="category_image"
              />
            </div>
            <div className="single-category-page__description">
              <span>{data?.category.name}</span>
              <h3>{data?.category.description}</h3>
            </div>
          </div>
        </div>
      </section>
      <BlogGridArea
        blogsDataForPagination={data?.blogsDataForPagination}
        blogsLength={data?.singleCategoryBlogsLength}
        setBlogsDataPosition={setBlogsDataPosition}
        onHandleAddBlogToWishlist={handleAddBlogToWishlist}
        onHandleDeleteBlogFromWishlist={handleDeleteBlogFromWishlist}
      />
    </section>
  );
};
