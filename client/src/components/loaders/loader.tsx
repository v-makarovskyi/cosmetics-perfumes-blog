import React, { FC } from "react";

const Loader: FC = (): JSX.Element => {
  return (
    <div className="loader">
      <div className="loader__wrapper">
        <div className="loader__ring loader__ring-one"></div>
        <div className="loader__ring loader__ring-two"></div>
        <div className="loader__ring loader__ring-three"></div>
      </div>
    </div>
  );
};

export { Loader };
