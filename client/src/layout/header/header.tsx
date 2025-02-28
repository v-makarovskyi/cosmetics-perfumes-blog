import React, { FC } from "react";
import logo from "../../images/logos/logo-2.png";
import { PhoneTwo } from "../../svg/phoneTwo";
import { Facebook } from "../../svg/facebook";
import { Wishlist } from "../../svg/wishlist";
import { Hamburger } from "../../svg/hamburger";
import { User } from "../../svg/user";
import { Search } from "../../svg/search";
import { HeaderTopRight } from "./header-parts/header-top-right";
import { Menus } from "./header-parts/menus";
import { useSticky } from "../../hooks/useSticky";

export const Header: FC = (): JSX.Element => {
  const { sticky } = useSticky();

  return (
    <header className="header">
      <div className="header__inner">
        {/*   HEADER TOP */}
        <div className="header__top d-none d-md-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="header__top-info">
                  <ul className="header__top-info-list">
                    <li className="header__top-info-item">
                      <a className="header__top-info-link" href="/">
                        <span className="visually-hidden">header info</span>
                        <Facebook />
                        <span className="header__top-info-part">
                          6600K Followers
                        </span>
                      </a>
                    </li>
                    <li className="header__top-info-item">
                      <a
                        className="header__top-info-link"
                        href="tel:12345678899"
                      >
                        <span className="visually-hidden">
                          header info phone
                        </span>
                        <PhoneTwo />
                        <span className="header__top-info-part">
                          +(1)-234-567-88-99
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="header__top-right">
                  <HeaderTopRight />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  HEADER BOTTOM */}
        <div
          className={`header__bottom ${sticky ? "header__bottom--sticky" : ""}`}
        >
          <div className="container">
            <div className="header__bottom-inner">
              <div className="row align-items-center">
                <div className="col-6 col-sm-4 col-md-5 col-lg-5 col-xl-2">
                  <a className="header__logo logo" href="/">
                    <img
                      className="logo__image"
                      src={logo}
                      alt=""
                      width="500"
                      height="178"
                      loading="lazy"
                    />
                  </a>
                </div>
                <div className="d-none d-xl-block col-xl-5">
                  <nav className="header__menu menus">
                    <Menus />
                  </nav>
                </div>
                <div className="col-6 col-sm-8 col-md-7 col-lg-7 col-xl-5">
                  <div className="header__bottom-right d-flex align-items-center justify-content-end">
                    <div className="header__search search d-none d-sm-block">
                      <form className="search__form">
                        <input
                          className="search__input input"
                          type="text"
                          placeholder="Search for blogs..."
                        />
                        <button className="search__button button" type="submit">
                          <Search />
                        </button>
                      </form>
                    </div>
                    <ul className="header__actions d-flex align-items-center">
                      <li className="header__actions-item">
                        <a className="header__actios-link" href="/">
                          <User />
                        </a>
                      </li>
                      <li className="header__actions-item d-none d-lg-block">
                        <a className="header__actios-link" href="/">
                          <Wishlist />
                        </a>
                      </li>
                      <li className="header__actions-item d-block d-xl-none">
                        <button className="header__actios-link header__hamburger-button button">
                          <Hamburger />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
