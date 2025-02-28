import React, { FC } from "react";

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
  return <div id="wrapper">{children}</div>;
};
