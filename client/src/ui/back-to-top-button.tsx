import React, { FC, useEffect } from "react";

function subscribeScroll(value: string): void {
  const result = document.querySelector(value) as HTMLDivElement;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      result.classList.add("backToTop--show");
    } else {
      result.classList.remove("backToTop--show");
    }
  });
  result.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const BackToTopButton: FC = (): JSX.Element => {
  useEffect(() => {
    subscribeScroll(".backToTop");
  }, []);
  return (
    <div className="backToTop">
      <button className="button backToTop__btn">
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 6L6 1L1 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export { BackToTopButton };
