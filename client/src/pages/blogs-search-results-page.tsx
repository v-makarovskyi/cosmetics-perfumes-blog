import { FC, JSX } from "react";
import { useGetSearchResultsQuery } from "@src/redux/features/blog/blogApi";
import { useLocation } from "react-router";
import { CommonBreadcrumb } from "@src/components/breadcrumb/common-breadcrumb";
import { BlogGridArea } from "@src/components/blog-grid/blog-grid-area";
import { useOutletContextData } from "@src/layout/root-layout";

const BlogsSearchResultsPage: FC = (): JSX.Element => {
  const {
    blogsDataPosition: { startPosition, stopPosition },
    setBlogsDataPosition,
    handleAddBlogToWishlist,
    handleDeleteBlogFromWishlist,
  } = useOutletContextData();
  const { pathname } = useLocation();
  const reqAttr = pathname.split("/").filter(Boolean);
  const [searchData] = [reqAttr[2]];
  const { data } = useGetSearchResultsQuery({
    searchData,
    startPosition,
    stopPosition,
  });

  return (
    <section className="searchResultsPage">
      <CommonBreadcrumb
        center
        title={`Результаты поиска для ${window.decodeURI(searchData)}...`}
        subtitle="Поиск"
      />
      <BlogGridArea
        blogsLength={data?.searchBlogsResultLength}
        blogsDataForPagination={data?.searchBlogsResultForPagination}
        setBlogsDataPosition={setBlogsDataPosition}
        onHandleAddBlogToWishlist={handleAddBlogToWishlist}
        onHandleDeleteBlogFromWishlist={handleDeleteBlogFromWishlist}
      />
    </section>
  );
};

export { BlogsSearchResultsPage };
