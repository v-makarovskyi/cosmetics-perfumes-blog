import React, { FC, useState } from "react";
import { useGetAllPostsQuery } from "@src/redux/features/blog/blogApi";
import { CommonBreadcrumb } from "@components/breadcrumb/common-breadcrumb";
import { BlogGridArea } from "@components/blog-grid/blog-grid-area";
import { SectionTitile } from "@components/blog-grid/section-title";
import home_bg from "@media/images/breadcrumb-bg-home.png";
import { BlogGridAreaSkeleton } from "@src/components/skeletons";
import { useOutletContextData } from "@src/layout/root-layout";

const Home: FC = (): JSX.Element => {
  const {
    blogsDataPosition: { startPosition, stopPosition },
    setBlogsDataPosition,
    handleAddBlogToWishlist,
    handleDeleteBlogFromWishlist,
  } = useOutletContextData();

  const { data, isLoading } = useGetAllPostsQuery({
    startPosition,
    stopPosition,
  });

  return (
    <section className="homePage">
      <CommonBreadcrumb
        home={true}
        title="Ulta"
        subtitle="best perfume blog"
        img={home_bg}
        center={false}
      />
      <SectionTitile />

      <BlogGridArea
        blogsDataForPagination={data?.blogsDataForPagination}
        blogsLength={data?.allBlogsLength}
        setBlogsDataPosition={setBlogsDataPosition}
        onHandleAddBlogToWishlist={handleAddBlogToWishlist}
        onHandleDeleteBlogFromWishlist={handleDeleteBlogFromWishlist}
      />
    </section>
  );
};

export { Home };
