import React, { FC } from "react";
import { CommonBreadcrumb } from "../components/breadcrumb/common-breadcrumb";
import { RegisterArea } from "../components/login-register/register-area";

export const RegisterPage: FC = (): JSX.Element => {
  return (
    <>
      <CommonBreadcrumb
        home={false}
        title="Регистрация"
        subtitle="Регистрация"
        center={true}
      />
      <RegisterArea />
    </>
  );
};
