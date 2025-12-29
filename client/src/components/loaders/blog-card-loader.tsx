import React, { FC } from "react";
import { Loader } from "./loader";

const SingleCardLoader = () => {
  return (
    <div className="col-md-6 col-lg-6" style={{ height: "400px" }}>
      <Loader />
    </div>
  );
};

const BlogCardLoader = () => {
  return (
    <>
      <SingleCardLoader />
      <SingleCardLoader />
      <SingleCardLoader />
      <SingleCardLoader />
    </>
  );
};

export { BlogCardLoader };
