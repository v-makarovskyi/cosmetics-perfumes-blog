import React, { FC, useState } from "react";
import * as YUP from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { OpenEye } from "../../svg/open-eye";
import { CloseEye } from "../../svg/close-eye";
import { ErrorMsg } from "../common/error-msg";
import { useNavigate } from "react-router";
import ServerFieldValidationError from "../../../../errors/server-validation-error";
import AuthError from "../../../../errors/auth-error";
import { useRegisterUserMutation } from "@src/redux/features/auth/authApi";
import { notifySuccess, notifyError } from "@src/utils/toastConfig";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "@src/helpers/rtk-helpers";

type Inputs = {
  name: string;
  email: string;
  password: string;
  remember: boolean;
};

const schema = YUP.object().shape({
  name: YUP.string()
    .matches(/^([a-zA-Z'-]{0,50}|[а-яА-ЯёЁ'-]{0,21})$/, {
      excludeEmptyString: false,
      message: `Допустимы символы [a-z, A-z], [а-я, А-Я], [',-]. Не менее2-х и не более 21 символов`,
    })
    .required("Name - обязательное поле. Повторите попытку.")
    .min(3, "поле NAME - не менее 2-х символов")
    .max(21, "поле NAME - не более 21 символов"),
  email: YUP.string()
    .email("Вы должны предоставить действительный email")
    .required("Email - обязательное поле. Повторите попытку."),
  password: YUP.string()
    .min(2, "Пароль должен содержать не менее 6 символов")
    .required(),
  remember: YUP.boolean()
    .required()
    .oneOf(
      [true],
      "Вы должны принять условия Сервиса и Политики конфиденциальности."
    ),
});

export const RegisterForm: FC = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { error }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const [myError, setMyError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", password: "", remember: false },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (res.error) {
        if (isErrorWithMessage(res.error)) {
          notifyError(res.error.data.errorMessage ?? "any error");
          if (res.error.data.errorName === "ServerFieldValidationError") {
            throw new ServerFieldValidationError({
              statusCode: res.error.data.statusCode,
            });
          } else if (res.error.data.errorName === "ApiError") {
            throw new AuthError(
              `${res.error.data.statusCode}`,
              `${res.error.data.errorMessage}`
            );
          } else {
            throw new Error(`${res.error.data.errorMessage}`);
          }
        }
      } else {
        notifySuccess(res.data.message ?? "default message");
      }
    } catch (error: any) {
      if (error instanceof ServerFieldValidationError) {
        console.error(
          `%c${error.name}(${error.statusCode}): ${error.message}.\n%c${error.stack}`,
          "color: red; background-color: white; padding: 2px;",
          "color: black; background-color: yellow"
        );
      } else if (error instanceof AuthError) {
        console.error(
          `%c${error.name}(${error.statusCode}) - ${error.message}.\n%c${error.stack}`,
          "color: teal; background-color: yellow; padding: 2px;",
          "color: green; background-color: white"
        );
      } else {
        console.error(
          `%c${error.name} - ${error.message}.\n%c${error.stack}`,
          "color: blue; background-color: lime; padding: 2px;",
          "color: orange; background-color: black"
        );
      }
    }
  };

  return (
    <form
      className="login__form"
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="login__form-input-box-wrapper">
        <div className="login__form-input-box">
          <input
            className="login__form-input input"
            {...register("name")}
            id="name"
            name="name"
            placeholder="Vladimir Makarovskyi"
            type="text"
          />
          <label className="login__form-title" htmlFor="name">
            Your name*
          </label>
          <ErrorMsg msg={errors.name?.message} />
        </div>
        <div className="login__form-input-box">
          <input
            className="login__form-input  input"
            {...register("email")}
            id="email"
            name="email"
            placeholder="makarovskyi.v@gmail.com"
            type="email"
          />
          <label className="login__form-title" htmlFor="email">
            Your email*
          </label>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="login__form-input-box">
          <input
            className="login__form-input input"
            {...register("password")}
            id="password"
            name="password"
            placeholder="min 6 character"
            type={showPassword ? "text" : "password"}
          />
          <div className="login__form-eye" id="password-show-toggle">
            <span
              className="login__form-open-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <CloseEye /> : <OpenEye />}
            </span>
          </div>
          <label className="login__form-title" htmlFor="password">
            Enter password*
          </label>
          <ErrorMsg msg={errors.password?.message} />
        </div>
      </div>
      <fieldset className="login__form-remember" id="login-form">
        <legend className="visually-hidden">
          accept the terms of the Service{" "}
        </legend>
        <label>
          <input
            className="login__form-remember-checkbox visually-hidden"
            {...register("remember")}
            type="checkbox"
            id="remember"
            name="remember"
          />
          <span className="login__form-remember-emulator"></span>
          <span className="login__form-remember-title">
            I accept the terms of the Service & <a href="/">Privacy Policy</a> .
          </span>
        </label>
        <ErrorMsg msg={errors.remember?.message} />
      </fieldset>
      <button
        className="login__button button"
        type="submit"
        disabled={!isDirty}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};
