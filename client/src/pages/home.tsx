import React from "react";
import { CommonBreadcrumb } from "@src/components/breadcrumb/common-breadcrumb";
import { BlogGridArea } from "@src/components/blog-grid/blog-grid-area";
import home_bg from "@images/breadcrumb-bg-home.png";

export function Home() {
  return (
    <>
      <CommonBreadcrumb
        home={true}
        title="Ulta"
        subtitle="best perfume blog"
        img={home_bg}
        center={false}
      />
      <BlogGridArea />
    </>
  );
}
