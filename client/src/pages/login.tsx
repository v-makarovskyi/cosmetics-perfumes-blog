import React, { FC } from "react";
import { CommonBreadcrumb } from "../components/breadcrumb/common-breadcrumb";
import { LoginArea } from "../components/login-register/login-area";


export const LoginPage: FC = (): JSX.Element => {
  return (
    <>
      <CommonBreadcrumb
        home={false}
        title="Войти"
        subtitle="Войти"
        center={true}
      />
      <LoginArea />
    </>
  );
};
