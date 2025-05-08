import React, { FC } from "react";
import { ToastContainer } from "react-toastify";

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
  return (
     <div id="wrapper">
      {children}
      <ToastContainer />
    </div>
  )
};
