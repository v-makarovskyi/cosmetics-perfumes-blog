import React, { FC, useState, Dispatch, SetStateAction } from "react";
import { CloseTwo } from "@svg/close-two";
import { Link } from "react-router";
import logo from "@media/images/logos/logo-2.png";
import { MobileCategories } from "@src/layout/header/header-parts/mobile-categories";

interface OffCanvasProps {
  isCanvasOpen: boolean;
  setIsCanvasOpen: Dispatch<SetStateAction<boolean>>;
}

const OffCanvas: FC<OffCanvasProps> = ({
  isCanvasOpen,
  setIsCanvasOpen,
}): JSX.Element => {
  const [isCategoryActive, setIsCategoryActive] = useState<boolean>(false);

  return (
    <>
        <div
          className={`offcanvas__area ${
            isCanvasOpen ? "offcanvas__area--opened" : ""
          }`}
        >
          <div className="offcanvas__wrapper">
            <div className="offcanvas__close">
              <button
                className="button offcanvas__close-btn"
                onClick={() => setIsCanvasOpen(false)}
              >
                <CloseTwo />
              </button>
            </div>
            <div className="offcanvas__content">
              <div className="offcanvas__top">
                <div className="offcanvas__logo">
                  <Link to="/" className="logo">
                    <img
                      className="logo__image"
                      src={logo}
                      alt="logo"
                      width="135"
                      height="40"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
              <div className="offcanvas__categories">
                <button
                  className="offcanvas__categories-toggle"
                  onClick={() => setIsCategoryActive(!isCategoryActive)}
                >
                  Все категории
                </button>
                <div className="offcanvas__categories-mobile-menu">
                  <nav
                    className={`offcanvas__categories-mobile-menu-content ${
                      isCategoryActive ? "active" : ""
                    }`}
                  >
                    <MobileCategories isCategoryActive={isCategoryActive} setIsCategoryActive={setIsCategoryActive} />
                  </nav>
                </div>
              </div>
              <div className="offcanvas__contact">
                <a href="https://github.com/v-makarovskyi" target="_blank">Связаться со мной</a>
              </div>
            </div>
            <div className="offcanvas__bottom">
              <a href="github.com" target="_blank">
                makarovskyi.v@gmail.com
              </a>
            </div>
          </div>
        </div>
      <div
        className={`body-overlay ${isCanvasOpen ? "opened" : ""}`}
        onClick={() => setIsCanvasOpen(false)}
      ></div>
    </>
  );
};

export { OffCanvas };
