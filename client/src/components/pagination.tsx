import React, { FC, useState } from "react";
import type { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";
import { ArrowRightLong } from "@svg/arrow-right-long";

type PaginationProps = {
  blogsLength: number;
  blogsPosition: { startPosition: number; stopPosition: number } | undefined;
  onSetBlogsPosition:
    | (({
        startPosition,
        stopPosition,
      }: {
        startPosition: number;
        stopPosition: number;
      }) => void)
    | undefined;
};

export const Pagination: FC<PaginationProps> = ({
  blogsPosition,
  onSetBlogsPosition,
  blogsLength
}): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const BLOG_STEP = 4;
 
  const totalPages = Math.ceil(blogsLength / BLOG_STEP);

  function handlePaginationButtonClick(index: number) {
    const start = (index - 1) * BLOG_STEP;
    if (index <= 0 || index > totalPages) return;
    setCurrentPage(index);
    window.scrollTo(0, 0);
    onSetBlogsPosition &&
      onSetBlogsPosition({
        startPosition: start,
        stopPosition: start + BLOG_STEP,
      });
  }

  const paginatedArray = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).map((num) => {
    return (
      <li
        key={num}
        className={`pagination__item ${
          currentPage === num ? "pagination__item--active" : ""
        }`}
      >
        <span onClick={() => handlePaginationButtonClick(num)}>{num}</span>
      </li>
    );
  });

  return (
    <div className="row">
      <div className="col-12">
        <div className="pagination">
          <div className="pagination__wrapper">
            <ul className="pagination__list">
              {paginatedArray}
              <li
                className={`pagination__item ${
                  currentPage === totalPages ? "pagination__item--disabled" : ""
                }`}
              >
                <span
                  role="button"
                  onClick={() => handlePaginationButtonClick(currentPage + 1)}
                >
                  <ArrowRightLong />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
