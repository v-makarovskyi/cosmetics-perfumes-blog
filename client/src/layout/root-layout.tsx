import React, { FC } from "react";
import { Outlet } from "react-router";
import { Wrapper } from "@src/layout/wrapper";
import { Header } from "@src/layout/header/header";
import { Footer } from "@src/layout/footer/footer";

export const RootLayout: FC = (): JSX.Element => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};
