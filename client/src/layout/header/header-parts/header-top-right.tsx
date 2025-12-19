import React, { FC, useState } from "react";
import { Link } from "react-router";
import { User } from "@client_types/clientTypes";
import { useLogoutUserMutation } from "@src/redux/features/auth/authApi";
import { notifySuccess, notifyError } from "@src/utils/toastConfig";
import {
  isErrorWithCustomDataServer,
  isFetchBaseQueryError,
} from "@src/helpers/rtk-helpers";
import { useNavigate } from "react-router";

type HeaderTopRightProps = {
  user?: Partial<User['userData']>;
};

type SettingsAndLanguageProps = {
  active: string;
  onHandleActive: (type: string) => void;
  user?: Partial<User['userData']>;
};

const Language: FC<SettingsAndLanguageProps> = ({
  active,
  onHandleActive,
}): JSX.Element => {
  let className = "header__top-right-item-parts";

  return (
    <li className="header__top-right-item">
      <span
        className="header__top-right-item-label"
        onClick={() => onHandleActive("language")}
      >
        English
      </span>
      <ul
        className={
          active === "language"
            ? `${className} is-language-list-open`
            : `${className}`
        }
      >
        <li>Ukrainian</li>
        <li>Russian</li>
        <li>Spanish</li>
      </ul>
    </li>
  );
};

const Settings: FC<SettingsAndLanguageProps> = ({
  active,
  onHandleActive,
  user,
}): JSX.Element => {
  const [logoutUser, mutOption] = useLogoutUserMutation();
  const navigate = useNavigate();
  let className = "header__top-right-item-parts";

  const logoutCurrentUser = async () => {
    try {
      const res = await logoutUser();
      if (res.error) {
        if (isErrorWithCustomDataServer(res.error)) {
          notifyError(res.error.data.errorMessage ?? "default error message");
          throw new Error(res.error.data.errorMessage);
        }
      } else {
        notifySuccess(res.data?.message ?? "default success message");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="header__top-right-item">
      <span
        className="header__top-right-item-label"
        onClick={() => onHandleActive("settings")}
      >
        Настройки
      </span>
      <ul
        className={
          active === "settings"
            ? `${className} is-settings-list-open`
            : `${className}`
        }
      >
        {user ? (
          <li>
            <Link to={`/users/profile/${user.id}`}>Профиль {user.name}</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Мой профиль</Link>
          </li>
        )}
        <li>
          {user ? (
            <Link to="/" onClick={() => logoutCurrentUser()}>
              Выйти
            </Link>
          ) : (
            <Link to="/login">Войти</Link>
          )}
        </li>
      </ul>
    </li>
  );
};

export const HeaderTopRight: FC<HeaderTopRightProps> = ({
  user,
}): JSX.Element => {
  const [active, setActive] = useState("");

  const handleActive = (type: string): void => {
    if (active === type) {
      setActive("");
    } else {
      setActive(type);
    }
  };

  return (
    <ul className="header__top-right-list">
      <Language active={active} onHandleActive={handleActive} />
      <Settings active={active} onHandleActive={handleActive} user={user} />
    </ul>
  );
};
