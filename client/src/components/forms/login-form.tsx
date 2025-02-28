import React, { FC, useState } from "react";
import * as YUP from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { OpenEye } from "../../svg/open-eye";
import { CloseEye } from "../../svg/close-eye";
import { ErrorMsg } from "../common/error-msg";

type Inputs = {
  email: string;
  password: string;
};

const loginSchema = YUP.object().shape({
  email: YUP.string()
    .email("Вы должны ввести действительный email")
    .required("* обязательное поле"),
  password: YUP.string()
    .required("* обязательное поле")
    .min(6, "Пароль должен содержать не менее 6 символов"),
});

export const LoginForm: FC = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      className="login__form"
      id="loginForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="login__form-input-box-wrapper">
        <div className="login__form-input-box">
          <input
            {...register("email")}
            className="login__form-input input"
            name="email"
            id="email"
            type="email"
            placeholder="Введите email"
          />
          <label className="login__form-title" htmlFor="email">
            Email
          </label>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="login__form-input-box">
          <input
            {...register("password")}
            className="login__form-input input"
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Введите пароль"
          />
          <div className="login__form-eye">
            <span
              className="login__form-open-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <CloseEye /> : <OpenEye />}
            </span>
          </div>
          <label className="login__form-title" htmlFor="password">
            Password
          </label>
          <ErrorMsg msg={errors.password?.message} />
        </div>
        <fieldset className="login__form-remember">
          <legend className="visually-hidden">
            Remember the password for this site
          </legend>
          <label>
            <input
              className="login__form-remember-checkbox visually-hidden"
              type="checkbox"
              name="remember"
              id="remember"
            />
            <span className="login__form-remember-emulator"></span>
            <span className="login__form-remember-title">
              Запомнить мой пароль
            </span>
            <span className="login__form-remember-forgot">
              <a href="/">Забыли пароль?</a>{" "}
            </span>
          </label>
          <ErrorMsg />
        </fieldset>
      </div>
      <button className="login__button button">Войти</button>
    </form>
  );
};
