import React, { FC, useState } from "react";

type SettingsAndLanguageProps = {
  active: string;
  onHandleActive: (type: string) => void;
};

const Language: FC<SettingsAndLanguageProps> = ({
  active,
  onHandleActive,
}): JSX.Element => {
  let className = 'header__top-right-item-parts'

  return (
    <li className="header__top-right-item">
      <span className="header__top-right-item-label" onClick={() => onHandleActive('language')}>English</span>
      <ul className={active === 'language' ? `${className} is-language-list-open` : `${className}`}>
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
}): JSX.Element => {
  let className = "header__top-right-item-parts";

  return (
    <li className="header__top-right-item">
      <span
        className="header__top-right-item-label"
        onClick={() => onHandleActive("settings")}
      >
        Settings
      </span>
      <ul
        className={
          active === "settings" ? `${className} is-settings-list-open` : `${className}`
        }
      >
        <li>My profile</li>
        <li>Login</li>
      </ul>
    </li>
  );
};

export const HeaderTopRight: FC = (): JSX.Element => {
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
      <Settings active={active} onHandleActive={handleActive} />
    </ul>
  );
};
