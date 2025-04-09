import React, { FC } from "react";
import { LoginShapes } from "./login-shapes";
import { LoginForm } from "../forms/login-form";
import { Link } from "react-router";

export const LoginArea: FC = (): JSX.Element => {
  return (
    <section className="login">
      <LoginShapes />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="login__wrapper">
              <header className="login__header">
                <h3 className="login__title">Войти на Ulta</h3>
                <p className="login__description">
                  Нет аккаунта?&nbsp;{" "}
                  <span>
                    <Link to="/register">Создать учетную запись</Link>
                  </span>
                </p>
              </header>
              <div className="login__body">
                <div className="login__email">
                  <p>Войти по Email</p>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
