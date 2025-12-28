import React, { FC, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useAuthUserChecked from "@src/hooks/useAuthUserChecked";
import { BackToTopButton } from "@src/ui/back-to-top-button";

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper: FC<WrapperProps> = ({ children }): JSX.Element => {
  const authWrapper = useAuthUserChecked()

  return (
     <div id="wrapper">
      <BackToTopButton />
      {children}
      <ToastContainer />
    </div>
  )
};
