import React, { FC, useState } from "react";
import { useNavigate } from "react-router";
import * as YUP from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { OpenEye } from "../../svg/open-eye";
import { CloseEye } from "../../svg/close-eye";
import { ErrorMsg } from "../common/error-msg";
import ServerFieldValidationError from "../../../../errors/server-validation-error";
import AuthError from "../../../../errors/auth-error";
import { useLoginUserMutation } from "@src/redux/features/auth/authApi";
import { isErrorWithCustomDataServer, isFetchBaseQueryError } from "@src/helpers/rtk-helpers";
import { notifySuccess, notifyError } from "@src/utils/toastConfig";

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
  const [userLogin, mutOption] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await userLogin({
        email: data.email,
        password: data.password,
      });
      if (res.error) {
        if (isErrorWithCustomDataServer(res.error)) {
          notifyError(res.error.data.errorMessage);
          if (res.error.data.errorName === "ServerFielfValidationError") {
            throw new ServerFieldValidationError({
              statusCode: res.error.data.statusCode,
            });
          } else if (res.error.data.errorName === "AuthError") {
            throw new AuthError(
              res.error.data.statusCode,
              res.error.data.errorMessage
            );
          } else {
            throw new Error(res.error.data.errorMessage);
          }
        } else  if (isFetchBaseQueryError(res.error)) {
          throw new Error(res.error.message, {cause: res.error})
        }
      } else {
        notifySuccess(res.data?.message);
        navigate(`/users/profile/${res?.data?.id}`) 
      }
      reset();
    } catch (error: any) {
      if (error instanceof ServerFieldValidationError) {
        console.error(
          `%c${error.name}(${error.statusCode}): ${error.message}.\n%c${error.stack}.`,
          "color: red; background-color: white; padding: 2px",
          "color: yellow; background-color: black; padding: 2px"
        );
      } else if (error instanceof AuthError) {
        console.error(
          `%c${error.name}(${error.statusCode}): ${error.message}.\n%c${error.stack}.`,
          "color: teal; background-color: yellow; padding: 2px",
          "color: green; background-color: white; padding: 2px"
        );
      } else {
        console.error(
          `%c${error.name} - ${error.message}.\n%c${error.stack}.`,
          "color: blue; background-color: lime; padding: 2px;",
          "color: orange; background-color: black"
        );
      }
    }
  };

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
      <button type="submit" className="login__button button">Войти</button>
    </form>
  );
};
