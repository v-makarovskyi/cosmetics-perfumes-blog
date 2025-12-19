import React, { FC, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useAuthUserChecked from "@src/hooks/useAuthUserChecked";
//import Cookies from 'js-cookie'

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
  const authWrapper = useAuthUserChecked()

  return (
     <div id="wrapper">
      {children}
      <ToastContainer />
    </div>
  )
};
